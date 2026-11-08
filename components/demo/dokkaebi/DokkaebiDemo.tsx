"use client";
import { useEffect, useRef, useState } from "react";
import { STORE } from "./data";
import { useToast } from "./ui";
import { ViewAI, ViewHome, type CampaignPreset, type ViewId } from "./ViewHome";
import { ViewEntry, ViewTablet } from "./ViewEntry";
import { ViewCampaign, ViewCustomers } from "./ViewCustomers";
import { ViewContent, ViewHQ } from "./ViewMore";

const NAV: { id: ViewId; label: string; hint: string }[] = [
  { id: "home", label: "오늘의 매장", hint: "한눈에 보는 현황" },
  { id: "ai", label: "AI 비서", hint: "말로 시키기" },
  { id: "entry", label: "응모 접수", hint: "응모권 사진, QR" },
  { id: "tablet", label: "매장 태블릿", hint: "방문 스탬프" },
  { id: "customers", label: "고객 명부", hint: "흩어진 고객 통합" },
  { id: "campaign", label: "쿠폰 문자", hint: "생일, 미방문 손님" },
  { id: "content", label: "SNS 콘텐츠", hint: "인스타, 스레드, 쇼츠" },
  { id: "hq", label: "가맹점 관리", hint: "본사 화면" },
];

export default function DokkaebiDemo() {
  const [view, setView] = useState<ViewId>("home");
  const [preset, setPreset] = useState<CampaignPreset>(null);
  const { show, node } = useToast();
  const consoleRef = useRef<HTMLDivElement>(null);
  // Keep the active menu item visible in the horizontal phone menu.
  useEffect(() => {
    document.querySelector<HTMLElement>(`.dk-nav [aria-current="page"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [view]);

  const go = (v: ViewId, p: CampaignPreset = null) => {
    setView(v);
    if (v === "campaign") setPreset(p);
    const top = (consoleRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 64;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="dk relative isolate min-h-[calc(100svh-4rem)] overflow-x-clip break-keep bg-[#0d0a09] text-[#f7efe6] [font-family:'Pretendard','Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ---------- Console ---------- */}
      <section ref={consoleRef} className="relative scroll-mt-16 bg-[#0f0c0b] px-4 pb-20 pt-4 sm:px-[3%] md:pt-8">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-6">
          <aside className="min-w-0 max-lg:contents lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-3 lg:mb-4 lg:p-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff5a36] to-[#8a1c14] text-[14px] font-black lg:h-10 lg:w-10 lg:text-[15px]">돗</span>
              <span className="min-w-0">
                <span className="block break-keep text-[13px] font-bold leading-snug">{STORE.legal}</span>
                <span className="block text-[11px] text-white/45">사장님 화면 <span className="lg:hidden">| 시연용 가상 데이터</span></span>
              </span>
            </div>
            <nav className="dk-nav sticky top-16 z-30 -mx-4 flex gap-1.5 overflow-x-auto border-b border-white/[.06] bg-[#0f0c0b]/90 px-4 py-2 backdrop-blur sm:-mx-[3%] sm:px-[3%] lg:static lg:mx-0 lg:grid lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none" aria-label="시연 메뉴">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => go(n.id)}
                  aria-current={view === n.id ? "page" : undefined}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-left transition lg:px-4 lg:py-3 ${view === n.id ? "bg-[#ff5a36] text-white shadow-[0_10px_30px_-12px_rgba(255,90,54,.9)]" : "text-white/65 hover:bg-white/[.05] hover:text-white"}`}
                >
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

      {node}
    </div>
  );
}

const CSS = `
.dk .dk-hand{font-family:var(--font-hand),'Nanum Pen Script',cursive;color:#1f3a8a}
.dk-fire-text{background:linear-gradient(100deg,#ffb547 0%,#ff5a36 45%,#ff2d55 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
/* */.dk-ember{background:
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
.dk-nav::-webkit-scrollbar{display:none}.dk-nav{scrollbar-width:none}
@media (prefers-reduced-motion:reduce){.dk *{animation:none!important;transition:none!important}}
`;
