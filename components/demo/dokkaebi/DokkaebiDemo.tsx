"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { STORE, TICKETS } from "./data";
import { CountUp, useToast } from "./ui";
import { ViewAI, ViewHome, type CampaignPreset, type ViewId } from "./ViewHome";
import { PaperTicket, ViewEntry, ViewTablet } from "./ViewEntry";
import { ViewCampaign, ViewCustomers } from "./ViewCustomers";
import { ViewContent, ViewHQ } from "./ViewMore";

const NAV: { id: ViewId; label: string; hint: string; icon: string }[] = [
  { id: "home", label: "오늘의 매장", hint: "한눈에 보는 현황", icon: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" },
  { id: "ai", label: "AI 비서", hint: "말로 시키기", icon: "M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" },
  { id: "entry", label: "응모 접수", hint: "응모권 사진, QR", icon: "M4 7h3l2-3h6l2 3h3v12H4z M12 17a4 4 0 100-8 4 4 0 000 8z" },
  { id: "tablet", label: "매장 태블릿", hint: "방문 스탬프", icon: "M6 3h12v18H6z M10 18h4" },
  { id: "customers", label: "고객 명부", hint: "흩어진 고객 통합", icon: "M9 11a4 4 0 100-8 4 4 0 000 8z M2 21a7 7 0 0114 0 M17 11a3 3 0 100-6 M22 20a5 5 0 00-5-5" },
  { id: "campaign", label: "쿠폰 문자", hint: "생일, 미방문 손님", icon: "M4 5h16v11H8l-4 4z" },
  { id: "content", label: "SNS 콘텐츠", hint: "인스타, 스레드, 쇼츠", icon: "M4 4h16v16H4z M4 15l5-5 4 4 3-3 4 4 M15 8.5h.01" },
  { id: "hq", label: "가맹점 관리", hint: "본사 화면", icon: "M3 21V9l6-4v16 M9 21V3l12 6v12z M3 21h18" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function DokkaebiDemo() {
  const [view, setView] = useState<ViewId>("home");
  const [preset, setPreset] = useState<CampaignPreset>(null);
  const { show, node } = useToast();
  const consoleRef = useRef<HTMLDivElement>(null);

  const go = (v: ViewId, p: CampaignPreset = null) => {
    setView(v);
    if (v === "campaign") setPreset(p);
    consoleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dk relative isolate -mt-16 overflow-hidden break-keep bg-[#0d0a09] text-[#f7efe6] [font-family:'Pretendard','Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[88svh] overflow-hidden px-[5%] pb-20 pt-28 md:pt-36">
        <span aria-hidden className="dk-ember pointer-events-none absolute inset-0 -z-10" />
        <span aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,90,54,.45),rgba(179,38,30,.18)_55%,transparent)] blur-2xl" />
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div>
            <p className="m-0 inline-flex items-center gap-2 rounded-full border border-[#ffb547]/30 bg-[#ffb547]/[.08] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#ffd79a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" /> WHIK 제안 시연 | {STORE.legal} 전용
            </p>
            <h1 className="m-0 mt-6 text-[36px] font-extrabold leading-[1.1] tracking-[-0.05em] sm:text-[56px] lg:text-[72px]">
              손님이 쓴 응모권 한 장이
              <br />
              <span className="dk-fire-text">다시 오는 단골</span>이 됩니다.
            </h1>
            <p className="m-0 mt-6 max-w-[560px] text-[16px] leading-relaxed text-white/65 md:text-[18px]">
              응모권과 QR로 손님을 모으고, 네이버 예약과 카카오 채널까지 한 명부로 합치고, 생일과 미방문 손님에게 쿠폰을 보내는 일. 말 한마디면 AI가 준비합니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={() => go("home")} className="rounded-2xl bg-[#ff5a36] px-7 py-4 text-[15px] font-bold text-white shadow-[0_18px_50px_-12px_rgba(255,90,54,.9)] transition hover:-translate-y-0.5">
                시연 시작하기 ↓
              </button>
              <button type="button" onClick={() => go("ai")} className="rounded-2xl border border-white/20 px-7 py-4 text-[15px] font-bold text-white transition hover:border-white/50">
                AI 비서에게 말 걸기
              </button>
            </div>
            <div className="mt-12 grid max-w-[560px] grid-cols-3 gap-6">
              {[
                { v: 3, s: "초", k: "응모권 1장 인식" },
                { v: 6, s: "곳", k: "흩어진 고객 통합" },
                { v: 41, s: "%", k: "재방문율 (시연 데이터)" },
              ].map((x) => (
                <div key={x.k}>
                  <p className="m-0 text-[32px] font-extrabold tracking-[-0.04em] md:text-[40px]">
                    <CountUp to={x.v} suffix={x.s} />
                  </p>
                  <p className="m-0 mt-0.5 text-[12px] text-white/45">{x.k}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-[560px] md:h-[540px]" aria-hidden>
            <div className="dk-float absolute left-[2%] top-[4%] w-[46%]" style={{ animationDelay: "0s" }}>
              <PaperTicket t={TICKETS[0]} small />
            </div>
            <div className="dk-float absolute right-[0%] top-[0%] w-[44%]" style={{ animationDelay: "-2s" }}>
              <PaperTicket t={TICKETS[4]} small />
            </div>
            <div className="dk-float absolute left-[10%] top-[38%] w-[44%]" style={{ animationDelay: "-4s" }}>
              <PaperTicket t={TICKETS[3]} small />
            </div>
            <div className="absolute bottom-0 right-[4%] w-[58%] rounded-3xl border border-white/10 bg-[#15100e]/90 p-4 shadow-[0_40px_90px_-30px_rgba(255,90,54,.55)] backdrop-blur">
              <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffb547]">JUST NOW</p>
              {["박OO 님 응모권 접수", "김OO 님 4번째 방문", "생일 쿠폰 대상 +1"].map((t, i) => (
                <p key={t} className="dk-feed m-0 mt-2.5 flex items-center gap-2 rounded-xl bg-white/[.05] px-3 py-2.5 text-[13px]" style={{ animationDelay: `${0.6 + i * 0.5}s` }}>
                  <span className="h-2 w-2 rounded-full bg-[#3ee0a5]" /> {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Console ---------- */}
      <section ref={consoleRef} className="relative scroll-mt-16 border-t border-white/[.06] bg-[#0f0c0b] px-[3%] pb-24 pt-8 md:pt-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
            <div className="mb-4 hidden items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-3.5 lg:flex">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#ff5a36] to-[#8a1c14] text-[15px] font-black">돗</span>
              <span className="min-w-0">
                <span className="block break-keep text-[13px] font-bold leading-snug">{STORE.legal}</span>
                <span className="block text-[11px] text-white/45">사장님 화면</span>
              </span>
            </div>
            <nav className="-mx-[3%] flex gap-1.5 overflow-x-auto px-[3%] pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0" aria-label="시연 메뉴">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => go(n.id)}
                  aria-current={view === n.id ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition lg:py-3 ${view === n.id ? "bg-[#ff5a36] text-white shadow-[0_10px_30px_-12px_rgba(255,90,54,.9)]" : "text-white/65 hover:bg-white/[.05] hover:text-white"}`}
                >
                  <Icon d={n.icon} />
                  <span>
                    <span className="block whitespace-nowrap text-[13.5px] font-semibold">{n.label}</span>
                    <span className={`hidden text-[11px] lg:block ${view === n.id ? "text-white/80" : "text-white/35"}`}>{n.hint}</span>
                  </span>
                </button>
              ))}
            </nav>
            <div className="mt-4 hidden rounded-2xl border border-white/[.07] bg-white/[.02] p-4 text-[11.5px] leading-relaxed text-white/45 lg:block">
              시연용 가상 데이터입니다. 실제 손님 정보는 들어 있지 않습니다.
            </div>
          </aside>

          <div key={view} className="dk-view min-w-0">
            {view === "home" && <ViewHome go={go} />}
            {view === "ai" && <ViewAI go={go} />}
            {view === "entry" && <ViewEntry toast={show} />}
            {view === "tablet" && <ViewTablet toast={show} />}
            {view === "customers" && <ViewCustomers go={go} />}
            {view === "campaign" && <ViewCampaign preset={preset} toast={show} />}
            {view === "content" && <ViewContent toast={show} />}
            {view === "hq" && <ViewHQ toast={show} />}
          </div>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="relative overflow-hidden px-[5%] py-24 text-center">
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(255,90,54,.35),transparent_70%)]" />
        <p className="m-0 text-[11px] font-semibold tracking-[0.22em] text-[#ffb547]">NEXT STEP</p>
        <h2 className="m-0 mt-4 text-[32px] font-extrabold leading-tight tracking-[-0.04em] md:text-[48px]">
          청주 본점에서 먼저 시작하고,
          <br />
          가맹점이 늘면 그대로 넓힙니다.
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-white/60">
          1단계는 응모권 인식과 QR 응모, 고객 명부, 쿠폰 문자입니다. 실제 응모권으로 시험한 뒤 매장에 바로 적용하고, 네이버 예약 연동과 SNS 콘텐츠는 다음 단계로 이어갑니다.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/business/portal" className="rounded-2xl bg-white px-7 py-4 text-[15px] font-bold text-[#111] transition hover:bg-[#ffb547]">
            견적서 확인하기
          </Link>
          <Link href="/business" className="rounded-2xl border border-white/20 px-7 py-4 text-[15px] font-bold text-white transition hover:border-white/50">
            WHIK 기업 지원 더 보기
          </Link>
        </div>
      </section>
      {node}
    </div>
  );
}

const CSS = `
.dk .dk-hand{font-family:var(--font-hand),'Nanum Pen Script',cursive;color:#1f3a8a}
.dk-fire-text{background:linear-gradient(100deg,#ffb547 0%,#ff5a36 45%,#ff2d55 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.dk-ember{background:
  radial-gradient(2px 2px at 12% 78%,rgba(255,181,71,.8),transparent),
  radial-gradient(2px 2px at 28% 92%,rgba(255,90,54,.8),transparent),
  radial-gradient(1.5px 1.5px at 47% 84%,rgba(255,181,71,.7),transparent),
  radial-gradient(2px 2px at 66% 95%,rgba(255,90,54,.8),transparent),
  radial-gradient(1.5px 1.5px at 81% 80%,rgba(255,181,71,.7),transparent),
  radial-gradient(2px 2px at 92% 90%,rgba(255,90,54,.7),transparent);
  animation:dk-rise 7s linear infinite;opacity:.9}
@keyframes dk-rise{from{transform:translateY(0)}to{transform:translateY(-70%);opacity:0}}
.dk-float{animation:dk-float 7s ease-in-out infinite}
@keyframes dk-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-14px) rotate(1deg)}}
.dk-feed{animation:dk-in .5s cubic-bezier(.22,1,.36,1) both}
@keyframes dk-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.dk-view{animation:dk-in .45s cubic-bezier(.22,1,.36,1) both}
.dk-beam{background:linear-gradient(180deg,transparent,rgba(255,90,54,.55),transparent);box-shadow:0 0 24px rgba(255,90,54,.6);animation:dk-scan .72s ease-in-out both}
@keyframes dk-scan{from{transform:translateY(-40px)}to{transform:translateY(240px)}}
.dk-pop{animation:dk-pop .5s cubic-bezier(.34,1.56,.64,1) both}
@keyframes dk-pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
.dk-stamp{animation:dk-stamp .45s cubic-bezier(.34,1.56,.64,1) both}
@keyframes dk-stamp{from{transform:scale(1.8) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}
.dk-slide{animation:dk-slide .35s cubic-bezier(.22,1,.36,1) both}
@keyframes dk-slide{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
.dk-orb{background:conic-gradient(from 0deg,#ff5a36,#ffb547,#ff2d55,#ff5a36);animation:dk-spin 6s linear infinite}
@keyframes dk-spin{to{filter:hue-rotate(0deg)}}
.dk-dot{width:7px;height:7px;border-radius:9999px;background:#ffb547;animation:dk-blink 1s infinite ease-in-out}
@keyframes dk-blink{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
.dk-steam{background:radial-gradient(40% 30% at 30% 20%,rgba(255,255,255,.18),transparent 70%),radial-gradient(30% 25% at 70% 30%,rgba(255,255,255,.12),transparent 70%);animation:dk-steam 5s ease-in-out infinite}
@keyframes dk-steam{0%,100%{transform:translateY(0);opacity:.7}50%{transform:translateY(-8px);opacity:1}}
@media (prefers-reduced-motion:reduce){.dk *{animation:none!important;transition:none!important}}
`;
