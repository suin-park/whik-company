"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import type { Lang } from "@/lib/messages";
import { StudioStop } from "./StudioSections";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise: Variants = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };
const grow: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } };

const STEP_MS = 2800;

/** WHIK Studio's interface languages, each with the screenshot of the app in that language. */
const LANGS = [
  { code: "KO", native: "한국어", en: "Korean", src: "/images/home/lang/studio-kor.jpg", menu: "파일  편집  보기  작업 공간  렌더" },
  { code: "EN", native: "English", en: "English", src: "/images/home/lang/studio-eng.jpg", menu: "File  Edit  View  Workspace  Render" },
  { code: "JA", native: "日本語", en: "Japanese", src: "/images/home/lang/studio-jpn.jpg", menu: "ファイル  編集  表示  ワークスペース" },
  { code: "ZH", native: "中文", en: "Chinese", src: "/images/home/lang/studio-chn.jpg", menu: "文件  编辑  视图  工作区  渲染" },
] as const;

/** Greetings that drift past under "more languages coming": a hint, not a promise of specific languages. */
const NEXT = ["Hola", "Bonjour", "Hallo", "Xin chào", "Olá", "Ciao", "Привет", "สวัสดี", "Merhaba", "Hej", "नमस्ते", "Salam"];

const COPY = {
  ko: {
    label: "SPEAKS YOUR LANGUAGE",
    plain: "4개 언어로,",
    hi: "지금 바로.",
    body: "메뉴, 패널, 노드 설명까지 화면 전체가 바뀝니다. 설치 후 언어만 고르면 됩니다.",
    pick: "언어 선택",
    now: "지금 지원",
    more: "더 많은 언어가 곧 추가됩니다",
    moreSub: "다음 업데이트에서 만나요.",
  },
  en: {
    label: "SPEAKS YOUR LANGUAGE",
    plain: "Four languages.",
    hi: "Built in.",
    body: "Menus, panels and node help all switch together. Pick a language after you install, and that's it.",
    pick: "Choose a language",
    now: "Available now",
    more: "More languages are on the way",
    moreSub: "Coming in future updates.",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function LanguageStage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setI((n) => (n + 1) % LANGS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [i, running]);

  // warm the other screenshots so the switch never flashes
  useEffect(() => {
    LANGS.forEach((l) => {
      const img = new Image();
      img.src = l.src;
    });
  }, []);

  const L = LANGS[i];

  return (
    <StudioStop id="languages" index="07" accent="#ff9ad5">
      {/* heading */}
      <div className="mb-8 md:mb-10">
        <motion.div variants={rise} className="mb-5 flex items-center gap-4 text-[10px] font-semibold tracking-[0.22em] md:text-[11px]">
          <span className="tabular-nums text-[var(--sec)]">07</span>
          <motion.span variants={grow} className="block h-px w-14 origin-left bg-[var(--sec)] md:w-20" />
          <span className="text-white/55">{t.label}</span>
        </motion.div>
        <div className="gap-10 md:flex md:items-end md:justify-between">
          <h2 id="languages-title" className="m-0 break-keep text-[34px] font-semibold leading-[1.15] tracking-[-0.05em] md:text-[clamp(34px,3.9vw,58px)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={mask} className="inline-block">
                {t.plain} <span className="studio-hi">{t.hi}</span>
              </motion.span>
            </span>
          </h2>
          <motion.p variants={rise} className="m-0 mt-4 max-w-[420px] shrink-0 break-keep text-sm leading-[1.75] text-[#a6adb4] md:mt-0 md:text-[15px]">
            {t.body}
          </motion.p>
        </div>
      </div>

      <motion.div
        ref={ref}
        variants={rise}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(280px,.8fr)_minmax(0,2fr)] lg:gap-12"
      >
        {/* big native-script language list */}
        <div className="min-w-0">
          <p className="m-0 mb-3 text-[10.5px] font-semibold tracking-[0.22em] text-white/40">{t.now}</p>
          <div role="tablist" aria-label={t.pick} className="grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {LANGS.map((l, k) => {
              const on = k === i;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="lang-panel"
                  onClick={() => setI(k)}
                  className="lang-word group relative flex items-baseline gap-3 py-1 text-left lg:py-1.5"
                >
                  <span className={`w-6 shrink-0 text-[10px] font-semibold tabular-nums tracking-[0.18em] transition-colors ${on ? "text-[var(--sec)]" : "text-white/30"}`}>{l.code}</span>
                  <span
                    lang={l.code === "KO" ? "ko" : l.code === "JA" ? "ja" : l.code === "ZH" ? "zh" : "en"}
                    className={`lang-native text-[clamp(30px,4.2vw,64px)] font-bold leading-[1.08] tracking-[-0.04em] transition-all duration-500 ${on ? "is-on" : ""}`}
                  >
                    {l.native}
                  </span>
                  <span aria-hidden className="absolute inset-x-0 -bottom-px hidden h-px bg-white/[.07] lg:block">
                    {on && <span key={`${i}-${running}`} className={`ws-progress block h-full origin-left bg-[var(--sec)] ${running ? "is-running" : "is-full"}`} style={{ animationDuration: `${STEP_MS}ms` }} />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* coming soon */}
          <div className="lang-next relative mt-7 overflow-hidden rounded-2xl border border-dashed border-white/15 px-5 py-4">
            <p className="m-0 flex items-center gap-2 text-[14px] font-semibold text-white/85 md:text-[15px]">
              <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-[var(--sec)]/15 text-[15px] leading-none text-[var(--sec)]">+</span>
              {t.more}
            </p>
            <p className="m-0 mt-1 pl-8 text-[12.5px] text-white/45">{t.moreSub}</p>
            <div aria-hidden className="lang-next-rail mt-3 overflow-hidden">
              <div className="lang-next-track flex w-max gap-5 whitespace-nowrap text-[13px] font-semibold text-white/25">
                {[...NEXT, ...NEXT].map((g, k) => (
                  <span key={k}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* app screenshot, switching language */}
        <figure id="lang-panel" role="tabpanel" aria-live="polite" className="relative m-0 min-w-0 lg:mx-auto lg:w-[min(100%,calc((100svh-300px)*1600/839))]">
          <div className="lang-frame relative overflow-hidden rounded-[10px] border border-white/10 bg-black">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={L.src}
                src={L.src}
                alt={lang === "ko" ? `${L.native}로 표시된 WHIK Studio 화면` : `WHIK Studio in ${L.en}`}
                width={1600}
                height={839}
                initial={reduce ? false : { opacity: 0, filter: "blur(10px)", scale: 1.025 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="block h-auto w-full"
              />
            </AnimatePresence>
            <span aria-hidden className="lang-scan pointer-events-none absolute inset-0" key={`scan-${i}`} />
          </div>

          {/* magnified menu bar */}
          <div className="lang-lens absolute -left-2 -top-5 hidden rounded-xl border border-white/15 bg-[#0e1013]/90 px-4 py-2.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,.8)] backdrop-blur-md sm:block md:-left-6 md:-top-7">
            <span className="mb-1 block text-[9.5px] font-semibold tracking-[0.2em] text-[var(--sec)]">MENU</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={L.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block whitespace-pre text-[13px] font-semibold text-white md:text-[15px]"
              >
                {L.menu}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* language pill, like the one in the app's corner */}
          <div className="absolute -bottom-4 right-3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0e1013]/90 py-1.5 pl-2.5 pr-3.5 text-[12.5px] font-semibold shadow-[0_14px_40px_-12px_rgba(0,0,0,.8)] backdrop-blur-md md:-bottom-5 md:right-6 md:text-[14px]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--sec)]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
            </svg>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={L.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {L.native}
              </motion.span>
            </AnimatePresence>
            <span className="text-white/35">{i + 1} / {LANGS.length}</span>
          </div>
        </figure>
      </motion.div>
    </StudioStop>
  );
}
