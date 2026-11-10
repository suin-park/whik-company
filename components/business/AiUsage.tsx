"use client";
import { useMemo, useState } from "react";

export type AiPlan = {
  key: string;
  label: string;
  price: number;
  summary: string;
  accuracy: string;
  marketing: string;
  unflagged: string;
  flagged: string;
  speed: string;
  recommended?: boolean;
};
export type AiOrder = {
  id: string;
  number: string;
  plan: string;
  qty: number;
  unitPrice: number;
  discountRate: number;
  supplyAmount: number;
  vatAmount: number;
  totalAmount: number;
  remaining: number;
  status: "REQUESTED" | "PAID" | "CANCELED";
  requestedAt: string;
  paidAt: string | null;
  expiresAt: string | null;
};
export type AiData = {
  plan: string;
  plans: AiPlan[];
  rules: { freeMonthly: number; overdraft: number; validDays: number; minQty: number; maxQty: number; packs: number[]; bulkQty: number; bulkRate: number; maxOpen: number };
  month: string;
  freeLeft: number;
  credits: number;
  owed: number;
  creditLine: number;
  orders: AiOrder[];
  usage: { month: string; photos: number; freeUsed: number; paidUsed: number; owedUsed: number }[];
};

const n = (v: number) => Math.round(v).toLocaleString("ko-KR");
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }) : "-");
const ERR: Record<string, string> = {
  INVALID_QTY: "장수를 다시 확인해 주세요.",
  TOO_MANY_OPEN: "입금 대기 중인 신청이 많습니다. 먼저 입금하시거나 신청을 취소해 주세요.",
  NOT_REQUESTED: "이미 처리된 신청입니다.",
};

/** Same price rule as 3D Locker (lib/whik-business/ai-plans.ts aiQuote); the server recalculates on request. */
function quote(plan: AiPlan | undefined, qty: number, rules: AiData["rules"]) {
  if (!plan || !Number.isFinite(qty) || qty < rules.minQty || qty > rules.maxQty) return null;
  const discountRate = qty >= rules.bulkQty ? rules.bulkRate : 0;
  const supply = Math.round((qty * plan.price * (100 - discountRate)) / 100);
  const vat = Math.floor(supply * 0.1);
  return { discountRate, supply, vat, total: supply + vat, plain: qty * plan.price };
}

/** Portal tab: compare the AI reading plans, work out a top-up, request it, and follow tickets and usage. */
export function AiUsage({
  ai,
  bankAccount,
  onChange,
  post,
}: {
  ai: AiData;
  bankAccount: string;
  onChange: (next: AiData, message: string) => void;
  post: (url: string, body?: unknown) => Promise<{ ai?: AiData; order?: { number: string } }>;
}) {
  const [planKey, setPlanKey] = useState(ai.plan || "basic");
  const [qtyText, setQtyText] = useState(String(ai.rules.packs[1] ?? 10000));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const plan = ai.plans.find((p) => p.key === planKey);
  const qty = Number(qtyText.replace(/\D/g, ""));
  const q = useMemo(() => quote(plan, qty, ai.rules), [plan, qty, ai.rules]);
  const open = ai.orders.filter((o) => o.status === "REQUESTED");
  const label = (k: string) => ai.plans.find((p) => p.key === k)?.label ?? k;
  const current = ai.plans.find((p) => p.key === ai.plan);

  const request = async () => {
    if (!q || !plan) return;
    if (!window.confirm(`${plan.label} ${n(qty)}장, ${n(q.total)}원(부가세 포함)으로 충전을 신청할까요? 입금이 확인되면 바로 사용할 수 있습니다.`)) return;
    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/business/portal/ai-orders", { action: "request", plan: plan.key, qty });
      if (r.ai) onChange(r.ai, `충전 신청이 접수되었습니다 (${r.order?.number ?? ""}). 아래 계좌로 입금해 주시면 확인 후 바로 열어 드립니다.`);
    } catch (e) {
      setError(ERR[(e as Error).message] ?? "신청하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  };
  const cancel = async (o: AiOrder) => {
    if (!window.confirm(`${o.number} 신청을 취소할까요?`)) return;
    setBusy(true);
    try {
      const r = await post("/api/business/portal/ai-orders", { action: "cancel", id: o.id });
      if (r.ai) onChange(r.ai, "신청을 취소했습니다.");
    } catch (e) {
      setError(ERR[(e as Error).message] ?? "취소하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const box = "border border-white/10 bg-white/[.02] p-5 md:p-6";
  return (
    <div className="grid gap-6">
      {/* balance */}
      <section className={box}>
        <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">AI USAGE</p>
        <h3 className="m-0 mt-2 text-xl font-semibold">응모권 AI 인식 사용 현황</h3>
        <p className="mt-1.5 text-[13px] text-white/55">매장 관리 화면에서 응모권을 읽을 때마다 아래 순서로 차감됩니다: 이번 달 무료, 충전한 장수, 먼저 쓰기({n(ai.rules.overdraft)}장까지).</p>
        <div className="mt-5 grid gap-px bg-white/10 sm:grid-cols-4">
          {[
            ["지금 요금제", current ? `${current.label} (1장 ${current.price}원)` : "-"],
            [`${ai.month.replace("-", "년 ")}월 무료 남음`, `${n(ai.freeLeft)} / ${n(ai.rules.freeMonthly)}장`],
            ["충전 남음", `${n(ai.credits)}장`],
            ["먼저 쓴 장수", ai.owed ? `${n(ai.owed)}장 (다음 충전에서 차감)` : "없음"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#0b0d0f] px-4 py-3.5">
              <p className="m-0 text-[12px] text-white/45">{k}</p>
              <p className="m-0 mt-1 text-[16px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* plans */}
      <section className={box}>
        <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">PLANS</p>
        <h3 className="m-0 mt-2 text-xl font-semibold">요금제 비교</h3>
        <p className="mt-1.5 text-[13px] text-white/55">검증 단계를 늘릴수록 틀린 칸을 더 잘 잡아내지만, 응모권 1장당 비용도 함께 오릅니다. 어떤 요금제든 직원분은 '확인 필요' 칸만 확인하시면 됩니다.</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {ai.plans.map((p) => {
            const on = p.key === planKey;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPlanKey(p.key)}
                aria-pressed={on}
                className={`relative border p-4 text-left transition ${on ? "border-[#ffc27a] bg-[#ffc27a]/[.06]" : "border-white/10 hover:border-white/30"}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[17px] font-semibold">
                    {p.label}
                    {p.recommended && <span className="ml-2 rounded-sm bg-[#7fe0c8]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[#7fe0c8]">추천</span>}
                  </span>
                  <span className="text-[15px] font-semibold text-[#ffc27a]">1장 {p.price}원</span>
                </div>
                <p className="m-0 mt-2 text-[13px] leading-relaxed text-white/60">{p.summary}</p>
                <dl className="m-0 mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[12.5px]">
                  <dt className="text-white/45">전체 칸 정확도</dt>
                  <dd className="m-0 text-white/85">{p.accuracy}</dd>
                  <dt className="text-white/45">광고 동의 칸</dt>
                  <dd className="m-0 text-white/85">{p.marketing}</dd>
                  <dt className="text-white/45">표시 없이 틀린 칸</dt>
                  <dd className="m-0 text-white/85">{p.unflagged}</dd>
                  <dt className="text-white/45">직원 확인 칸</dt>
                  <dd className="m-0 text-white/85">{p.flagged}</dd>
                  <dt className="text-white/45">처리 시간</dt>
                  <dd className="m-0 text-white/85">{p.speed}</dd>
                  <dt className="text-white/45">1만 장</dt>
                  <dd className="m-0 text-white/85">{n(p.price * 10000)}원 (부가세 별도)</dd>
                </dl>
              </button>
            );
          })}
        </div>
        <p className="m-0 mt-3 text-[12px] leading-relaxed text-white/40">정확도는 실제 손님 응모권 20장을 2번씩 읽어 잰 값입니다(카카오톡으로 받은 저화질 사진). 매장에서 관리 화면으로 바로 찍으면 더 높아질 수 있으며, 운영 첫 달 실제 촬영본으로 다시 측정해 알려 드립니다.</p>
      </section>

      {/* calculator */}
      <section className={`${box} grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]`}>
        <div>
          <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">TOP UP</p>
          <h3 className="m-0 mt-2 text-xl font-semibold">충전 금액 계산하기</h3>
          <p className="mt-1.5 text-[13px] text-white/55">
            요금제를 고르고 장수를 정하면 금액이 바로 계산됩니다. {n(ai.rules.bulkQty)}장 이상은 {ai.rules.bulkRate}% 할인됩니다.
          </p>
          <p className="m-0 mt-5 text-[13px] font-semibold text-white/70">요금제</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ai.plans.map((p) => (
              <button key={p.key} type="button" onClick={() => setPlanKey(p.key)} className={`border px-3.5 py-2 text-[14px] font-semibold transition ${p.key === planKey ? "border-[#ffc27a] text-white" : "border-white/15 text-white/55 hover:text-white"}`}>
                {p.label} {p.price}원
              </button>
            ))}
          </div>
          <p className="m-0 mt-5 text-[13px] font-semibold text-white/70">장수</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ai.rules.packs.map((k) => (
              <button key={k} type="button" onClick={() => setQtyText(String(k))} className={`border px-3.5 py-2 text-[14px] font-semibold transition ${qty === k ? "border-[#ffc27a] text-white" : "border-white/15 text-white/55 hover:text-white"}`}>
                {n(k)}장
              </button>
            ))}
            <label className="flex items-center gap-2 border border-white/15 px-3 py-1.5">
              <span className="text-[13px] text-white/50">직접 입력</span>
              <input inputMode="numeric" value={qtyText} onChange={(e) => setQtyText(e.target.value.replace(/[^\d]/g, "").slice(0, 6))} className="w-24 bg-transparent text-right text-[16px] font-semibold text-white outline-none" aria-label="충전할 장수" />
              <span className="text-[13px] text-white/50">장</span>
            </label>
          </div>
          <p className="m-0 mt-2 text-[12px] text-white/40">
            {n(ai.rules.minQty)}장부터 {n(ai.rules.maxQty)}장까지 신청할 수 있습니다. 사진 1장에 응모권 4장을 찍으면 사진 {n(Math.ceil((qty || 0) / 4))}장 분량입니다.
          </p>
        </div>

        <div className="flex flex-col justify-between border border-white/10 bg-black/30 p-5">
          {q && plan ? (
            <dl className="m-0 grid grid-cols-[minmax(0,1fr)_auto] gap-y-2 text-[14px]">
              <dt className="text-white/55">
                {plan.label} {n(qty)}장 × {plan.price}원
              </dt>
              <dd className="m-0 text-right">{n(q.plain)}원</dd>
              {q.discountRate > 0 && (
                <>
                  <dt className="text-[#7fe0c8]">대량 할인 {q.discountRate}%</dt>
                  <dd className="m-0 text-right text-[#7fe0c8]">-{n(q.plain - q.supply)}원</dd>
                </>
              )}
              <dt className="text-white/55">공급가</dt>
              <dd className="m-0 text-right">{n(q.supply)}원</dd>
              <dt className="text-white/55">부가세 10%</dt>
              <dd className="m-0 text-right">{n(q.vat)}원</dd>
              <dt className="border-t border-white/10 pt-3 text-[15px] font-semibold">입금하실 금액</dt>
              <dd className="m-0 border-t border-white/10 pt-3 text-right text-[22px] font-semibold text-[#ffc27a]">{n(q.total)}원</dd>
            </dl>
          ) : (
            <p className="m-0 text-[14px] text-white/50">장수를 {n(ai.rules.minQty)}장 이상 넣어 주세요.</p>
          )}
          {error && <p className="m-0 mt-3 text-[13px] text-[#ff9b8a]">{error}</p>}
          <button type="button" disabled={!q || busy} onClick={request} className="mt-5 bg-[#ffc27a] px-5 py-3.5 text-[15px] font-bold text-[#0b0d0f] transition hover:brightness-110 disabled:opacity-40">
            {busy ? "처리 중…" : "충전 신청"}
          </button>
          <p className="m-0 mt-2 text-[12px] leading-relaxed text-white/40">신청하면 휙랩에 알림이 가고, 입금이 확인되는 대로 바로 사용할 수 있습니다. 세금계산서는 '거래 정보' 탭에 적어 주신 정보로 발행합니다.</p>
        </div>
      </section>

      {/* orders */}
      <section className={box}>
        <h3 className="m-0 text-lg font-semibold">충전 내역</h3>
        {open.length > 0 && (
          <div className="mt-4 border border-[#ffc27a]/40 bg-[#ffc27a]/[.06] px-4 py-3 text-[13.5px] leading-relaxed text-[#ffe2bd]">
            입금 계좌: <b>{bankAccount}</b>
            <br />
            입금하실 때 보내는 분 이름에 신청 번호 뒤 4자리(예: {open[0].number.slice(-4)})를 함께 적어 주시면 더 빨리 확인됩니다.
          </div>
        )}
        {ai.orders.length === 0 ? (
          <p className="m-0 mt-4 text-[13px] text-white/45">아직 충전 내역이 없습니다. 매월 {n(ai.rules.freeMonthly)}장까지는 충전 없이 쓰실 수 있습니다.</p>
        ) : (
          <ul className="m-0 mt-4 list-none divide-y divide-white/10 border-y border-white/10 p-0">
            {ai.orders.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[14.5px] font-semibold">
                    {label(o.plan)} {n(o.qty)}장 <span className="font-normal text-white/55">| {n(o.totalAmount)}원 (부가세 포함)</span>
                  </p>
                  <p className="m-0 mt-0.5 text-[12.5px] text-white/45">
                    {o.number} | 신청 {day(o.requestedAt)}
                    {o.status === "PAID" && ` | 남은 ${n(o.remaining)}장 | ${day(o.expiresAt)}까지 사용`}
                  </p>
                </div>
                <span className={`text-[12.5px] font-semibold ${o.status === "PAID" ? "text-[#7fe0c8]" : o.status === "REQUESTED" ? "text-[#ffc27a]" : "text-white/35"}`}>
                  {o.status === "PAID" ? "사용 중" : o.status === "REQUESTED" ? "입금 대기" : "취소됨"}
                </span>
                {o.status === "REQUESTED" && (
                  <button type="button" disabled={busy} onClick={() => cancel(o)} className="text-[12.5px] text-white/45 underline underline-offset-4 hover:text-white disabled:opacity-40">
                    신청 취소
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* usage */}
      {ai.usage.length > 0 && (
        <section className={box}>
          <h3 className="m-0 text-lg font-semibold">월별 사용량</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-[13.5px]">
              <thead className="text-[12px] text-white/45">
                <tr className="border-b border-white/10">
                  <th className="py-2 font-semibold">월</th>
                  <th className="py-2 font-semibold">사진</th>
                  <th className="py-2 font-semibold">무료</th>
                  <th className="py-2 font-semibold">충전분</th>
                  <th className="py-2 font-semibold">먼저 쓰기</th>
                </tr>
              </thead>
              <tbody>
                {ai.usage.map((u) => (
                  <tr key={u.month} className="border-b border-white/[.06]">
                    <td className="py-2">{u.month.replace("-", "년 ")}월</td>
                    <td className="py-2">{n(u.photos)}장</td>
                    <td className="py-2">{n(u.freeUsed)}장</td>
                    <td className="py-2">{n(u.paidUsed)}장</td>
                    <td className="py-2">{n(u.owedUsed)}장</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* terms */}
      <section className="border border-white/10 px-5 py-4 text-[12.5px] leading-relaxed text-white/50">
        <p className="m-0 mb-1.5 font-semibold text-white/70">충전 안내</p>
        <ul className="m-0 grid list-disc gap-1 pl-5">
          <li>매월 응모권 {n(ai.rules.freeMonthly)}장까지는 무료이며, 남은 무료 장수는 다음 달로 넘어가지 않습니다.</li>
          <li>충전한 장수는 입금 확인일부터 {Math.round(ai.rules.validDays / 365)}년 동안 쓸 수 있습니다.</li>
          <li>남은 장수가 없을 때도 매장 업무가 멈추지 않도록 {n(ai.rules.overdraft)}장까지 먼저 쓸 수 있으며, 다음 충전에서 차감됩니다.</li>
          <li>쓰지 않은 장수는 입금 확인일부터 7일 안에는 전액 환불되고, 그 뒤에는 남은 장수만큼 수수료 10%를 빼고 환불됩니다.</li>
          <li>새로 충전하면 그때 고른 요금제가 이후 인식에 적용됩니다.</li>
          <li>단가는 입금 확인일부터 6개월 동안 보장합니다.</li>
        </ul>
      </section>
    </div>
  );
}
