"use client";
import { useEffect, useMemo, useState } from "react";
import { CUSTOMERS, SOURCES, STORE, fmt, maskPhone, type Customer, type Source } from "./data";
import type { CampaignPreset, Go } from "./ViewHome";
import { Chip, Eyebrow, Panel, PhoneFrame, SourceBadge } from "./ui";

type Filter = "all" | "vip" | "dormant" | "birthday" | "marketing";
const FILTERS: [Filter, string][] = [
  ["all", "전체"],
  ["vip", "단골 (10회 이상)"],
  ["dormant", "60일 이상 미방문"],
  ["birthday", "이번 달 생일"],
  ["marketing", "광고 수신 동의"],
];

const consentExpiry = (d: string) => {
  const t = new Date(d);
  t.setFullYear(t.getFullYear() + 2);
  return t;
};
const TODAY = new Date("2026-11-08");

export function ViewCustomers({ go }: { go: Go }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState<Filter>("all");
  const [src, setSrc] = useState<Source | null>(null);
  const [open, setOpen] = useState<Customer | null>(null);

  const rows = useMemo(
    () =>
      CUSTOMERS.filter((c) => {
        if (q && !c.name.includes(q) && !c.phone.replace(/-/g, "").includes(q.replace(/-/g, ""))) return false;
        if (src && !c.sources.includes(src)) return false;
        if (f === "vip") return c.visits >= 10;
        if (f === "dormant") return c.lastVisitDays >= 60;
        if (f === "birthday") return c.birthday?.startsWith("11-");
        if (f === "marketing") return c.marketing;
        return true;
      }).sort((a, b) => b.visits - a.visits),
    [q, f, src],
  );

  return (
    <div className="grid gap-5">
      <Panel className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>CUSTOMERS</Eyebrow>
            <h3 className="m-0 mt-1 text-xl font-semibold md:text-2xl">네이버 예약, 카카오 채널, 알리미, 응모권 고객을 한 명부로</h3>
            <p className="m-0 mt-1 text-[13px] text-white/50">어디서 들어왔든 전화번호가 같으면 한 사람입니다. 방문 횟수와 마지막 방문일이 자동으로 쌓입니다.</p>
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름 또는 번호 검색" className="w-full rounded-xl border border-white/12 bg-black/30 px-4 py-2.5 text-[14px] outline-none placeholder:text-white/30 focus:border-[#ff5a36] lg:w-64" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map(([k, l]) => (
            <button key={k} type="button" onClick={() => setF(k)} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${f === k ? "bg-[#ff5a36] text-white" : "bg-white/[.06] text-white/65 hover:text-white"}`}>
              {l}
            </button>
          ))}
          <span className="mx-1 hidden h-7 w-px bg-white/10 sm:block" />
          {SOURCES.map((s) => (
            <button key={s} type="button" onClick={() => setSrc(src === s ? null : s)} className={`rounded-full transition ${src && src !== s ? "opacity-35" : ""}`}>
              <SourceBadge s={s} />
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[.07] px-4 py-3 text-[12.5px] text-white/55 md:px-5">
          <span>
            <b className="text-white">{fmt(rows.length)}명</b> (데모에는 64명만 표시, 실제 3,184명)
          </span>
          {(f === "dormant" || f === "birthday" || f === "vip") && (
            <button type="button" onClick={() => go("campaign", (f === "vip" ? "vip" : f) as CampaignPreset)} className="rounded-lg bg-[#ff5a36] px-3 py-1.5 text-[12px] font-bold text-white">
              이 손님들에게 쿠폰 보내기 →
            </button>
          )}
        </div>
        <ul className="m-0 grid list-none gap-0 p-0 md:hidden">
          {rows.slice(0, 30).map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => setOpen(c)} className="w-full border-t border-white/[.05] px-4 py-3.5 text-left first:border-0 active:bg-white/[.04]">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[15px] font-semibold">
                    {c.name}
                    {c.tags.map((t) => (
                      <span key={t} className="ml-1.5 align-middle">
                        <Chip tone={t === "단골" ? "gold" : t === "휴면 위험" ? "rose" : "slate"}>{t}</Chip>
                      </span>
                    ))}
                  </span>
                  <span className="text-[13px] font-bold tabular-nums">{c.visits}회</span>
                </span>
                <span className="mt-1 flex items-center justify-between gap-2 text-[12px] text-white/50">
                  <span className="tabular-nums">{maskPhone(c.phone)}</span>
                  <span className={c.lastVisitDays >= 60 ? "text-[#ffa3b4]" : ""}>{c.lastVisitDays === 0 ? "오늘 방문" : `${c.lastVisitDays}일 전 방문`}</span>
                </span>
                <span className="mt-2 flex flex-wrap gap-1">
                  {c.sources.map((s) => (
                    <SourceBadge key={s} s={s} />
                  ))}
                  {c.marketing ? <Chip tone="mint">광고 동의</Chip> : <Chip>광고 미동의</Chip>}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead className="text-[11.5px] text-white/40">
              <tr>
                {["이름", "연락처", "방문", "마지막 방문", "생일", "들어온 곳", "광고 수신", "매장"].map((h) => (
                  <th key={h} className="px-5 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 40).map((c) => (
                <tr key={c.id} onClick={() => setOpen(c)} className="cursor-pointer border-t border-white/[.04] transition hover:bg-white/[.03]">
                  <td className="px-5 py-3 font-semibold">
                    {c.name}
                    {c.tags.map((t) => (
                      <span key={t} className="ml-1.5 align-middle">
                        <Chip tone={t === "단골" ? "gold" : t === "휴면 위험" ? "rose" : "slate"}>{t}</Chip>
                      </span>
                    ))}
                  </td>
                  <td className="px-5 py-3 tabular-nums text-white/60">{maskPhone(c.phone)}</td>
                  <td className="px-5 py-3 tabular-nums">{c.visits}회</td>
                  <td className={`px-5 py-3 tabular-nums ${c.lastVisitDays >= 60 ? "text-[#ffa3b4]" : "text-white/70"}`}>{c.lastVisitDays === 0 ? "오늘" : `${c.lastVisitDays}일 전`}</td>
                  <td className="px-5 py-3 tabular-nums text-white/60">{c.birthday ? c.birthday.replace("-", "월 ") + "일" : "-"}</td>
                  <td className="px-5 py-3">
                    <span className="flex flex-wrap gap-1">
                      {c.sources.map((s) => (
                        <SourceBadge key={s} s={s} />
                      ))}
                    </span>
                  </td>
                  <td className="px-5 py-3">{c.marketing ? <Chip tone="mint">동의</Chip> : <Chip>미동의</Chip>}</td>
                  <td className="px-5 py-3 text-white/55">{c.store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {open && <Profile c={open} onClose={() => setOpen(null)} go={go} />}
    </div>
  );
}

function Profile({ c, onClose, go }: { c: Customer; onClose: () => void; go: Go }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);
  const exp = consentExpiry(c.consentDate);
  const soon = exp.getTime() - TODAY.getTime() < 60 * 86400_000;
  const timeline = [
    { d: `${c.lastVisitDays === 0 ? "오늘" : `${c.lastVisitDays}일 전`}`, t: "방문, 스탬프 적립", s: "매장 태블릿" as Source },
    { d: `${c.lastVisitDays + 21}일 전`, t: "생일 쿠폰 사용 (철판 1인분)", s: "카카오 채널" as Source },
    { d: `${c.lastVisitDays + 44}일 전`, t: "4명 예약 후 방문", s: "네이버 예약" as Source },
    { d: `${c.lastVisitDays + 90}일 전`, t: "첫 방문, 응모권 작성", s: "응모권" as Source },
  ];
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="dk-slide h-full w-full max-w-[440px] overflow-y-auto border-l border-white/10 bg-[#120f0d] p-5 pt-20 sm:p-6 sm:pt-20" role="dialog" aria-label={`${c.name} 고객 정보`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="m-0 text-[22px] font-bold">{c.name}</p>
            <p className="m-0 mt-0.5 text-[13px] text-white/50">{maskPhone(c.phone)} | {c.store}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="닫기" className="grid h-9 w-9 place-items-center rounded-lg text-xl text-white/50 hover:bg-white/5 hover:text-white">
            ×
          </button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            ["방문", `${c.visits}회`],
            ["포인트", fmt(c.points)],
            ["생일", c.birthday ? c.birthday.replace("-", "/") : "-"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white/[.04] py-3">
              <p className="m-0 text-[11px] text-white/45">{k}</p>
              <p className="m-0 mt-0.5 text-[16px] font-bold">{v}</p>
            </div>
          ))}
        </div>

        <p className="m-0 mt-6 text-[12px] font-semibold text-white/50">동의 현황</p>
        <div className="mt-2 grid gap-2 text-[13px]">
          <div className="flex items-center justify-between rounded-xl bg-white/[.03] px-4 py-3">
            <span>[필수] 경품 응모</span>
            <Chip tone="mint">동의 {c.consentDate}</Chip>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white/[.03] px-4 py-3">
            <span>[선택] 광고 문자</span>
            {c.marketing ? <Chip tone={soon ? "fire" : "mint"}>{soon ? "곧 만료, 재동의 안내 예정" : `${exp.toISOString().slice(0, 10)}까지`}</Chip> : <Chip>미동의</Chip>}
          </div>
        </div>

        <p className="m-0 mt-6 text-[12px] font-semibold text-white/50">방문 기록</p>
        <ol className="m-0 mt-2 grid list-none gap-0 border-l border-white/10 pl-0">
          {timeline.map((x) => (
            <li key={x.t} className="relative py-2.5 pl-5">
              <span className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full bg-[#ff5a36]" />
              <p className="m-0 text-[13px] font-semibold">{x.t}</p>
              <p className="m-0 mt-0.5 flex items-center gap-2 text-[11.5px] text-white/45">
                {x.d} <SourceBadge s={x.s} />
              </p>
            </li>
          ))}
        </ol>

        <button
          type="button"
          disabled={!c.marketing}
          onClick={() => {
            onClose();
            go("campaign", c.lastVisitDays >= 60 ? "dormant" : "vip");
          }}
          className="mt-6 w-full rounded-xl bg-[#ff5a36] py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {c.marketing ? "이 손님에게 쿠폰 보내기" : "광고 수신 미동의 고객은 문자를 보낼 수 없어요"}
        </button>
      </aside>
    </div>
  );
}

/* ---------------- Coupon SMS campaigns ---------------- */

const SEGMENTS: Record<Exclude<CampaignPreset, null>, { title: string; desc: string; count: number; excluded: number; coupon: string; text: string }> = {
  birthday: {
    title: "이번 주 생일 손님",
    desc: "11월 8일부터 14일 생일, 광고 수신 동의",
    count: 4,
    excluded: 1,
    coupon: "생일 축하 불쭈꾸미 철판 1인분 무료",
    text: "#{이름}님, 생일 축하드려요! 🎂\n생일 주간에 오시면 불쭈꾸미 철판 1인분을 선물로 드립니다.\n쿠폰은 11월 30일까지 쓸 수 있어요.",
  },
  dormant: {
    title: "60일 넘게 안 오신 단골",
    desc: "방문 5회 이상, 마지막 방문 60일 전",
    count: 23,
    excluded: 7,
    coupon: "다시 오세요 20% 할인",
    text: "#{이름}님, 요즘 통 안 보이셔서 보고 싶었어요.\n불맛 그대로 기다리고 있습니다. 이번 달 안에 오시면 20% 할인해 드릴게요!",
  },
  vip: {
    title: "단골 손님 (10회 이상)",
    desc: "누적 방문 10회 이상, 광고 수신 동의",
    count: 186,
    excluded: 41,
    coupon: "단골 전용 치즈 폭포 볶음밥 무료",
    text: "#{이름}님은 저희 가게 단골이세요. 감사한 마음을 담아\n신메뉴 치즈 폭포 볶음밥을 단골분들께 먼저 무료로 드려요!",
  },
  reconsent: {
    title: "광고 수신 동의 2년 만료 예정",
    desc: "정보통신망법에 따른 수신 동의 확인 안내",
    count: 31,
    excluded: 0,
    coupon: "없음 (안내 문자)",
    text: "#{이름}님, " + "돗가비불쭈꾸미" + " 혜택 문자 수신에 동의하신 지 2년이 되어 안내드립니다.\n계속 받으시려면 아무것도 하지 않으셔도 되고, 원치 않으시면 아래 번호로 수신을 거부하실 수 있습니다.",
  },
};

export function ViewCampaign({ preset, toast }: { preset: CampaignPreset; toast: (m: string) => void }) {
  const [seg, setSeg] = useState<Exclude<CampaignPreset, null>>(preset ?? "dormant");
  const S = SEGMENTS[seg];
  const [text, setText] = useState(S.text);
  const [time, setTime] = useState("11:00");
  const [sent, setSent] = useState<null | number>(null);
  useEffect(() => {
    if (preset) setSeg(preset);
  }, [preset]);
  useEffect(() => {
    setText(SEGMENTS[seg].text);
    setSent(null);
  }, [seg]);

  const isAd = seg !== "reconsent";
  const full = `${isAd ? "(광고) " : ""}[${STORE.brand}]\n${text.replace(/#\{이름\}/g, "박정은")}\n\n${S.coupon !== "없음 (안내 문자)" ? `🎟 ${S.coupon}\n\n` : ""}무료수신거부 080-123-4567`;
  const lms = full.length > 45;
  const hour = Number(time.slice(0, 2));
  const night = hour >= 21 || hour < 8;
  const cost = S.count * (lms ? 45 : 18);

  const send = () => {
    let n = 0;
    setSent(0);
    const id = setInterval(() => {
      n += Math.max(1, Math.ceil(S.count / 12));
      if (n >= S.count) {
        n = S.count;
        clearInterval(id);
        toast(`${S.count}명에게 예약 발송 완료 (${time})`);
      }
      setSent(n);
    }, 110);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="grid gap-5">
        <Panel className="p-5">
          <Eyebrow>WHO</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">누구에게 보낼까요?</h3>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {(Object.keys(SEGMENTS) as (keyof typeof SEGMENTS)[]).map((k) => (
              <button key={k} type="button" onClick={() => setSeg(k)} className={`rounded-xl border p-4 text-left transition ${seg === k ? "border-[#ff5a36] bg-[#ff5a36]/[.08]" : "border-white/[.08] bg-white/[.02] hover:border-white/25"}`}>
                <span className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold">{SEGMENTS[k].title}</span>
                  <span className="text-[18px] font-bold tabular-nums">{SEGMENTS[k].count}명</span>
                </span>
                <span className="mt-1 block text-[11.5px] text-white/45">{SEGMENTS[k].desc}</span>
              </button>
            ))}
          </div>
          {S.excluded > 0 && <p className="m-0 mt-3 text-[12px] text-white/50">✓ 광고 수신에 동의하지 않은 {S.excluded}명은 자동으로 뺐습니다.</p>}
        </Panel>

        <Panel className="p-5">
          <Eyebrow>WHAT</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">무엇을 보낼까요?</h3>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="mt-3 w-full resize-y rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-[14px] leading-relaxed outline-none focus:border-[#ff5a36]" />
          <div className="mt-2 flex flex-wrap gap-2 text-[11.5px]">
            <Chip tone="slate">#{"{이름}"} 은 손님 이름으로 바뀝니다</Chip>
            {isAd && <Chip tone="mint">✓ (광고) 표시 자동</Chip>}
            <Chip tone="mint">✓ 무료 수신거부 번호 자동</Chip>
            <Chip tone="gold">쿠폰: {S.coupon}</Chip>
          </div>
        </Panel>

        <Panel className="p-5">
          <Eyebrow>WHEN</Eyebrow>
          <h3 className="m-0 mt-1 text-lg font-semibold">언제 보낼까요?</h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-xl border border-white/12 bg-black/30 px-4 py-2.5 text-[15px] outline-none [color-scheme:dark] focus:border-[#ff5a36]" />
            {night && isAd ? (
              <span className="text-[12.5px] text-[#ffa3b4]">밤 9시부터 아침 8시까지는 광고 문자를 보낼 수 없어요(정보통신망법). 아침 11시로 바꿀까요?</span>
            ) : (
              <span className="text-[12.5px] text-white/50">점심 손님이 결정하는 11시 발송이 쿠폰 사용률이 가장 높았습니다.</span>
            )}
            {night && isAd && (
              <button type="button" onClick={() => setTime("11:00")} className="rounded-lg bg-white/10 px-3 py-1.5 text-[12px] font-semibold">
                11시로 변경
              </button>
            )}
          </div>
        </Panel>

        <Panel glow className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 gap-6 text-[12px]">
            <div>
              <p className="m-0 text-white/45">대상</p>
              <p className="m-0 mt-0.5 text-xl font-bold">{S.count}명</p>
            </div>
            <div>
              <p className="m-0 text-white/45">비용 ({lms ? "장문" : "단문"})</p>
              <p className="m-0 mt-0.5 text-xl font-bold">{fmt(cost)}원</p>
            </div>
            <div>
              <p className="m-0 text-white/45">예상 방문</p>
              <p className="m-0 mt-0.5 text-xl font-bold">{Math.max(1, Math.round(S.count * 0.18))}팀</p>
            </div>
          </div>
          <button type="button" onClick={send} disabled={(night && isAd) || sent !== null} className="rounded-xl bg-[#ff5a36] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_40px_-10px_rgba(255,90,54,.8)] disabled:opacity-40">
            {sent === null ? `${time} 발송 예약` : sent < S.count ? `예약 중 ${sent}/${S.count}` : "예약 완료 ✓"}
          </button>
        </Panel>
      </div>

      <div className="xl:sticky xl:top-24 xl:self-start">
        <p className="m-0 mb-3 text-center text-[12px] text-white/45">손님 휴대폰에 이렇게 보입니다</p>
        <PhoneFrame>
          <div className="flex h-full flex-col bg-[#f2f2f7] pt-11">
            <div className="border-b border-black/10 pb-2 text-center">
              <img src="/demo/dokkaebi/emblem.png" alt="" width={36} height={36} className="mx-auto mb-1 h-9 w-9 rounded-full" />
              <p className="m-0 text-[13px] font-semibold">{STORE.brand}</p>
              <p className="m-0 text-[10px] text-black/45">문자 메시지 | 오늘 {time}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[12.5px] leading-relaxed shadow-sm">{full}</div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
