"use client";
import { useEffect, useMemo, useState } from "react";
import { CUSTOMERS, DAY_LABELS, SOURCE_SHARE, VISITS_14, fmt, mask, type Source } from "./data";
import { Bars, Chip, CountUp, Eyebrow, Panel, SourceBadge, useTypewriter } from "./ui";

export type Go = (view: ViewId, preset?: CampaignPreset) => void;
export type ViewId = "home" | "ai" | "entry" | "tablet" | "customers" | "campaign" | "content" | "hq";
export type CampaignPreset = "birthday" | "dormant" | "vip" | "reconsent" | null;

const FEED: { who: string; src: Source; what: string }[] = [
  { who: "박정은", src: "응모권", what: "응모권 접수, 생일 쿠폰 대상" },
  { who: "윤서연", src: "QR 응모", what: "테이블 QR로 1초 응모" },
  { who: "강도윤", src: "네이버 예약", what: "오늘 19:00 4명 예약" },
  { who: "임채원", src: "매장 태블릿", what: "스탬프 7개째, 쿠폰까지 3개" },
  { who: "조영수", src: "카카오 채널", what: "채널 추가, 첫 방문 쿠폰 발급" },
];

export function ViewHome({ go }: { go: Go }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);
  // Newest first, each person once: a window that moves through FEED.
  const feed = Array.from({ length: 4 }, (_, k) => FEED[(tick + FEED.length * 4 - k) % FEED.length]);
  const total = SOURCE_SHARE.reduce((a, b) => a + b.count, 0);
  const birthdays = useMemo(() => CUSTOMERS.filter((c) => c.birthday && c.birthday >= "11-08" && c.birthday <= "11-14" && c.marketing).length, []);

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "전체 고객", v: 3184, s: "명", d: "+412 이번 달" },
          { k: "재방문율", v: 41, s: "%", d: "+6%p 지난달 대비" },
          { k: "쿠폰 사용률", v: 18, s: "%", d: "문자 1건당 매출 9,400원" },
          { k: "광고 수신 동의", v: 72, s: "%", d: "동의 만료 예정 31명" },
        ].map((t) => (
          <Panel key={t.k} className="p-4 md:p-5">
            <p className="m-0 text-[12px] text-white/50">{t.k}</p>
            <p className="m-0 mt-1.5 text-[28px] font-bold tracking-[-0.04em] md:text-[34px]">
              <CountUp to={t.v} suffix={t.s} />
            </p>
            <p className="m-0 mt-1 text-[11.5px] text-[#ffb547]/85">{t.d}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel className="p-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <Eyebrow>VISITS</Eyebrow>
              <h3 className="m-0 mt-1 text-lg font-semibold">최근 14일 방문 고객</h3>
            </div>
            <Chip tone="fire">오늘 188명</Chip>
          </div>
          <Bars values={VISITS_14} labels={DAY_LABELS} unit="명" />
          <p className="m-0 mt-2 text-[12px] text-white/45">금요일, 토요일 방문이 평일의 2배입니다. 목요일 저녁 쿠폰이 가장 잘 쓰였습니다.</p>
        </Panel>

        <Panel className="p-5">
          <Eyebrow>ONE DATABASE</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">흩어진 고객이 한 곳에</h3>
          <p className="m-0 mt-1 text-[12px] text-white/45">전화번호 기준으로 자동으로 합쳐, 같은 손님이 두 번 세어지지 않습니다.</p>
          <ul className="m-0 mt-4 grid list-none gap-2.5 p-0">
            {SOURCE_SHARE.map((s) => (
              <li key={s.source} className="grid grid-cols-[92px_1fr_52px] items-center gap-3 text-[12.5px]">
                <SourceBadge s={s.source} />
                <span className="h-2 overflow-hidden rounded-full bg-white/[.06]">
                  <span className="block h-full rounded-full bg-[#ffb547]/70" style={{ width: `${(s.count / SOURCE_SHARE[0].count) * 100}%` }} />
                </span>
                <span className="text-right tabular-nums text-white/70">{fmt(s.count)}</span>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-3 text-right text-[11px] text-white/40">중복 제거 전 {fmt(total)}건, 실제 고객 3,184명</p>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel className="p-5">
          <Eyebrow>TODAY</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">오늘 해두면 좋은 일</h3>
          <div className="mt-4 grid gap-2.5">
            {[
              { t: `이번 주 생일 손님 ${birthdays}명`, d: "생일 쿠폰을 미리 보내면 생일 주간 방문이 늘어납니다.", a: "생일 쿠폰 보내기", p: "birthday" as const },
              { t: "60일 넘게 안 오신 단골 23명", d: "평균 방문 9회였던 분들입니다. 다시 오시게 할 때입니다.", a: "다시 오세요 쿠폰", p: "dormant" as const },
              { t: "광고 수신 동의 2년 만료 예정 31명", d: "법에 따라 2년마다 동의 여부를 다시 알려야 합니다.", a: "재동의 안내 보내기", p: "reconsent" as const },
            ].map((x) => (
              <button
                key={x.t}
                type="button"
                onClick={() => go("campaign", x.p)}
                className="group flex flex-col items-stretch gap-3 rounded-xl border border-white/[.07] bg-white/[.02] p-4 text-left transition hover:border-[#ff5a36]/50 hover:bg-[#ff5a36]/[.06] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <span>
                  <span className="block text-[14.5px] font-semibold">{x.t}</span>
                  <span className="mt-0.5 block text-[12px] text-white/50">{x.d}</span>
                </span>
                <span className="shrink-0 rounded-lg bg-white/[.07] px-3 py-2.5 text-center text-[12.5px] font-semibold text-white/80 transition group-hover:bg-[#ff5a36] group-hover:text-white sm:py-2 sm:text-[12px]">{x.a} →</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow>LIVE</Eyebrow>
              <h3 className="m-0 mt-1 text-lg font-semibold">지금 매장에서</h3>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-[#3ee0a5]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#3ee0a5]" /> 실시간
            </span>
          </div>
          <ul className="m-0 mt-4 grid list-none gap-2 p-0">
            {feed.map((f, i) => (
              <li key={`${f.who}-${tick - i}`} className="dk-feed flex items-center gap-3 rounded-xl bg-white/[.025] px-3.5 py-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ff5a36]/15 text-[12px] font-bold text-[#ffb19c]">{f.who[0]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold">{mask(f.who)} 님</span>
                  <span className="block truncate text-[11.5px] text-white/50">{f.what}</span>
                </span>
                <SourceBadge s={f.src} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

/* ---------------- AI assistant ---------------- */

type Reply = { text: string; card?: "dormant" | "birthday" | "compare" | "post"; action?: { label: string; view: ViewId; preset?: CampaignPreset } };

const PROMPTS: { q: string; r: Reply }[] = [
  {
    q: "한 달 넘게 안 온 단골에게 쿠폰 보내줘",
    r: {
      text: "방문 5회 이상이면서 30일 넘게 오지 않으신 손님을 찾았어요. 광고 수신에 동의한 분만 골랐고, 밤 9시 이후라 내일 오전 11시 발송으로 잡아뒀습니다. 문구를 확인하고 보내기만 누르시면 됩니다.",
      card: "dormant",
      action: { label: "문구 확인하고 보내기", view: "campaign", preset: "dormant" },
    },
  },
  {
    q: "이번 주 생일 손님 축하 문자 준비해줘",
    r: {
      text: "11월 8일부터 14일 사이 생일인 손님 4명입니다. 생일 당일까지 쓸 수 있는 '불쭈꾸미 철판 1인분 무료' 쿠폰을 붙인 문구를 준비했어요.",
      card: "birthday",
      action: { label: "생일 쿠폰 보내기", view: "campaign", preset: "birthday" },
    },
  },
  {
    q: "판교점이랑 이번 달 비교해줘",
    r: {
      text: "청주 본점이 재방문율 41%로 판교점(36%)보다 높습니다. 차이는 응모권이에요. 본점은 신규 고객의 45%가 응모권으로 들어오는데, 판교점은 아직 응모권을 쓰지 않습니다. 판교점에도 응모권과 테이블 QR을 같이 두는 걸 추천합니다.",
      card: "compare",
      action: { label: "가맹점 현황 보기", view: "hq" },
    },
  },
  {
    q: "신메뉴 치즈 폭포 볶음밥 인스타 글 써줘",
    r: {
      text: "사진 한 장으로 인스타그램, 스레드, 유튜브 쇼츠용 글을 각각 만들었어요. 금요일 오후 6시 업로드가 반응이 가장 좋았습니다.",
      card: "post",
      action: { label: "콘텐츠 만들기로 이동", view: "content" },
    },
  },
];

function ReplyCard({ kind }: { kind: NonNullable<Reply["card"]> }) {
  if (kind === "dormant" || kind === "birthday") {
    const n = kind === "dormant" ? 23 : 4;
    return (
      <div className="mt-3 grid gap-2 rounded-xl border border-white/10 bg-black/25 p-4 text-[12.5px] sm:grid-cols-3">
        <div>
          <p className="m-0 text-white/45">보낼 대상</p>
          <p className="m-0 mt-0.5 text-lg font-bold">{n}명</p>
        </div>
        <div>
          <p className="m-0 text-white/45">예상 비용</p>
          <p className="m-0 mt-0.5 text-lg font-bold">{fmt(n * 45)}원</p>
        </div>
        <div>
          <p className="m-0 text-white/45">예상 방문</p>
          <p className="m-0 mt-0.5 text-lg font-bold">{kind === "dormant" ? "4~6팀" : "2~3팀"}</p>
        </div>
      </div>
    );
  }
  if (kind === "compare") {
    return (
      <div className="mt-3 grid gap-2 rounded-xl border border-white/10 bg-black/25 p-4 text-[12.5px]">
        {[
          ["재방문율", 41, 36, "%"],
          ["쿠폰 사용률", 18.2, 15.4, "%"],
          ["이번 달 신규", 412, 268, "명"],
        ].map(([k, a, b, u]) => (
          <div key={k as string} className="grid grid-cols-[88px_1fr] items-center gap-3">
            <span className="text-white/55">{k}</span>
            <span className="grid gap-1">
              <span className="flex items-center gap-2">
                <span className="h-2 rounded-full bg-[#ff5a36]" style={{ width: `${((a as number) / Math.max(a as number, b as number)) * 70}%` }} />
                <span className="tabular-nums">
                  본점 {a}
                  {u}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 rounded-full bg-white/30" style={{ width: `${((b as number) / Math.max(a as number, b as number)) * 70}%` }} />
                <span className="tabular-nums text-white/60">
                  판교 {b}
                  {u}
                </span>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/25 p-3 text-[11.5px]">
      {["인스타그램 피드", "스레드", "유튜브 쇼츠 대본"].map((t) => (
        <span key={t} className="shrink-0 rounded-lg bg-white/[.06] px-3 py-2 text-white/75">
          ✓ {t}
        </span>
      ))}
    </div>
  );
}

export function ViewAI({ go }: { go: Go }) {
  const [log, setLog] = useState<{ q: string; r: Reply }[]>([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const last = log[log.length - 1];
  const typed = useTypewriter(last?.r.text ?? "", !!last && !busy);
  const done = last && typed.length >= last.r.text.length;

  const ask = (q: string) => {
    const hit = PROMPTS.find((p) => p.q === q) ?? PROMPTS.find((p) => q.includes("생일")) ?? PROMPTS[0];
    setBusy(true);
    setLog((l) => [...l, { q, r: hit.r }]);
    setInput("");
    setTimeout(() => setBusy(false), 900);
  };

  return (
    <Panel glow className="flex min-h-[72svh] flex-col overflow-hidden sm:min-h-[620px]">
      <div className="flex items-center gap-3 border-b border-white/[.07] px-5 py-4">
        <span className="dk-orb grid h-10 w-10 place-items-center rounded-full text-lg font-black text-white">W</span>
        <div>
          <p className="m-0 text-[15px] font-semibold">WHIK 매장 비서</p>
          <p className="m-0 text-[11.5px] text-white/45">말로 시키면 고객을 찾고, 문구를 쓰고, 보낼 준비까지 합니다. 보내기는 항상 사장님이 누릅니다.</p>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
        {log.length === 0 && (
          <div className="grid place-items-center py-10 text-center">
            <p className="m-0 text-2xl font-bold tracking-[-0.03em] md:text-3xl">
              사장님, 오늘은 <span className="text-[#ff5a36]">무엇을</span> 도와드릴까요?
            </p>
            <p className="m-0 mt-2 text-sm text-white/45">아래 예시를 눌러 보세요.</p>
          </div>
        )}
        {log.map((x, i) => {
          const isLast = i === log.length - 1;
          return (
            <div key={i} className="grid gap-3">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#ff5a36] px-4 py-2.5 text-[14px] font-medium text-white">{x.q}</div>
              <div className="max-w-full sm:max-w-[92%]">
                {isLast && busy ? (
                  <div className="flex items-center gap-1.5 px-1 py-2">
                    <span className="dk-dot" />
                    <span className="dk-dot [animation-delay:.15s]" />
                    <span className="dk-dot [animation-delay:.3s]" />
                    <span className="ml-2 text-[12px] text-white/45">고객 3,184명 중에서 찾는 중…</span>
                  </div>
                ) : (
                  <div className="rounded-2xl rounded-bl-md border border-white/[.07] bg-white/[.035] px-4 py-3 text-[14px] leading-relaxed text-white/90">
                    {isLast ? typed : x.r.text}
                    {(!isLast || done) && x.r.card && <ReplyCard kind={x.r.card} />}
                    {(!isLast || done) && x.r.action && (
                      <button type="button" onClick={() => go(x.r.action!.view, x.r.action!.preset ?? null)} className="mt-3 rounded-lg bg-white px-3.5 py-2 text-[12.5px] font-bold text-[#111] hover:bg-[#ffb547]">
                        {x.r.action.label} →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/[.07] p-4">
        <div className="mb-3 flex flex-wrap gap-2 pb-1 sm:flex-nowrap sm:overflow-x-auto">
          {PROMPTS.map((p) => (
            <button key={p.q} type="button" disabled={busy} onClick={() => ask(p.q)} className="shrink-0 rounded-full border border-white/12 px-3.5 py-1.5 text-[12.5px] text-white/75 transition hover:border-[#ff5a36] hover:text-white disabled:opacity-40">
              {p.q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input.trim());
          }}
          className="flex gap-2"
        >
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="예: 지난달 3번 이상 온 손님한테 신메뉴 알려줘" className="min-w-0 flex-1 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-[14px] outline-none placeholder:text-white/30 focus:border-[#ff5a36]" />
          <button type="submit" disabled={busy || !input.trim()} className="rounded-xl bg-[#ff5a36] px-5 text-sm font-bold text-white disabled:opacity-40">
            보내기
          </button>
        </form>
      </div>
    </Panel>
  );
}
