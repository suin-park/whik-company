"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Bot, Boxes, Crosshair, Eraser, Scissors, Sparkles, Sun, Orbit, type LucideIcon } from "lucide-react";
import { sp, tx, type Lang } from "@/lib/messages";
import { featureVideos, formatStart, homeCopy, nodeShorts, workspaceScreens, type Video } from "./homeContent";
import { capabilities, headings, keyFeatures, nodeAccents, stats, videoTags, workspaceDetails, type KeyFeature } from "./studioContent";
import type { PlayRequest } from "./VideoDialog";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };
const grow: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } };

/* ---------- shared frame ---------- */

export function StudioStop({
  id,
  index,
  accent = "#a9d0ff",
  children,
}: {
  id: string;
  index: string;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-snap
      aria-labelledby={`${id}-title`}
      style={{ "--sec": accent } as React.CSSProperties}
      className="studio-stop relative isolate flex flex-col justify-center overflow-hidden border-t border-[#1f2327] md:min-h-[100svh]"
    >
      <span aria-hidden className="studio-num pointer-events-none absolute -right-[2vw] top-[8%] -z-10 select-none font-black italic leading-none">
        {index}
      </span>
      <span aria-hidden className="studio-aura pointer-events-none absolute inset-0 -z-20" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-[1600px] px-[6%] py-16 md:pb-12 md:pt-24"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function StudioHeading({ id, index, keyName, lang, aside }: { id: string; index: string; keyName: keyof typeof headings; lang: Lang; aside?: ReactNode }) {
  const h = headings[keyName];
  const [plain, hi] = h.title[lang];
  return (
    <div className="mb-8 md:mb-10">
      <motion.div variants={rise} className="mb-5 flex items-center gap-4 text-[10px] font-semibold tracking-[0.22em] md:text-[11px]">
        <span className="tabular-nums text-[var(--sec)]">{index}</span>
        <motion.span variants={grow} className="block h-px w-14 origin-left bg-[var(--sec)] md:w-20" />
        <span className="text-white/55">{h.label}</span>
      </motion.div>
      <div className="gap-10 md:flex md:items-end md:justify-between">
        <h2 id={id} className="m-0 break-keep text-[34px] font-semibold leading-[1.15] tracking-[-0.05em] md:text-[clamp(34px,3.9vw,58px)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={mask} className="inline-block">
              {plain}{sp(lang)}<span className="studio-hi">{hi}</span>
            </motion.span>
          </span>
        </h2>
        <motion.div variants={rise} className="mt-4 max-w-[420px] shrink-0 md:mt-0">
          <p className="m-0 break-keep text-sm leading-[1.75] text-[#a6adb4] md:text-[15px]">{h.body[lang]}</p>
          {aside}
        </motion.div>
      </div>
    </div>
  );
}

const Play = ({ big }: { big?: boolean }) => (
  <span
    aria-hidden
    className={`studio-play absolute left-1/2 top-1/2 z-[3] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${big ? "h-14 w-14 md:h-20 md:w-20" : "h-12 w-12"}`}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className={`ml-1 ${big ? "h-5 w-5 md:h-6 md:w-6" : "h-4 w-4"}`}>
      <path d="M6 3l15 9-15 9z" />
    </svg>
  </span>
);

/* ---------- 02 showcase ---------- */

export function Showcase({ lang, onPlay, filmTitle }: { lang: Lang; onPlay: () => void; filmTitle: string }) {
  const c = homeCopy(lang);
  return (
    <StudioStop id="showcase" index="02">
      <StudioHeading id="showcase-title" index="02" keyName="showcase" lang={lang} />
      <motion.button
        variants={rise}
        type="button"
        onClick={onPlay}
        aria-label={`${filmTitle} ${c.play}`}
        className="studio-film group relative mx-auto block aspect-[16/10] w-full overflow-hidden bg-[#0b0d0f] p-0 text-left md:aspect-[16/7.6] md:w-[min(100%,calc((100svh-400px)*16/7.6))]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/studio-3dgs.jpg"
          width={2048}
          height={1133}
          alt={tx(lang, "WHIK Studio의 3DGS 뷰어와 합성 작업 화면", "WHIK Studio 3DGS viewer and compositing workspace", "WHIK Studio の3DGSビューアーと合成作業画面", "WHIK Studio 的3DGS查看器与合成工作界面")}
          loading="lazy"
          className="block h-full w-full object-cover brightness-[.7] transition duration-[1.2s] group-hover:scale-[1.03] group-hover:brightness-90"
        />
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_45%,transparent_40%,rgba(0,0,0,.75))]" />
        {/* letterbox bars open when the film arrives */}
        <motion.span aria-hidden variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 1.1, ease: EASE, delay: 0.35 } } }} className="absolute inset-x-0 top-0 z-[2] h-1/2 origin-top bg-[#0b0d0f]" />
        <motion.span aria-hidden variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 1.1, ease: EASE, delay: 0.35 } } }} className="absolute inset-x-0 bottom-0 z-[2] h-1/2 origin-bottom bg-[#0b0d0f]" />
        {/* HUD */}
        <span aria-hidden className="absolute left-4 top-4 z-[3] flex items-center gap-2 text-[9px] tracking-[0.2em] text-white/70 md:left-7 md:top-6 md:text-[10px]">
          <span className="st-dot h-1.5 w-1.5 rounded-full bg-[#ff5a4e]" /> INTRO FILM
        </span>
        <span aria-hidden className="absolute right-4 top-4 z-[3] text-[9px] tracking-[0.2em] text-white/50 tabular-nums md:right-7 md:top-6 md:text-[10px]">
          WHIK STUDIO
        </span>
        <span aria-hidden className="studio-film-frame pointer-events-none absolute inset-3 z-[3] md:inset-5" />
        <Play big />
        <span className="absolute bottom-5 left-5 z-[3] md:bottom-8 md:left-9">
          <span className="block text-[15px] font-semibold md:text-2xl">{c.filmCaption}</span>
        </span>
        <span className="absolute bottom-[22px] right-[18px] z-[3] text-[9px] tracking-[0.18em] text-[#c3cbd3] md:bottom-9 md:right-9 md:text-[11px]">WATCH THE FILM ↗</span>
      </motion.button>

      <motion.div variants={rise} className="studio-ticker relative mt-7 overflow-hidden md:mt-8">
        <div className="studio-ticker-track flex w-max">
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
              {capabilities.map((cap) => (
                <span key={cap.en} className="flex items-center whitespace-nowrap text-[13px] text-white/70 md:text-[15px]">
                  <span className="px-5 md:px-7">{cap[lang]}</span>
                  <span aria-hidden className="text-[10px] text-[var(--sec)]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </StudioStop>
  );
}

/* ---------- 03 key features ---------- */

const ICONS: Record<KeyFeature["icon"], LucideIcon> = {
  splat: Orbit,
  erase: Eraser,
  matte: Scissors,
  track: Crosshair,
  sparkle: Sparkles,
  light: Sun,
  shapes: Boxes,
  bot: Bot,
};

function glowMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function KeyFeatures({ lang }: { lang: Lang }) {
  return (
    <StudioStop id="features" index="03">
      <StudioHeading
        id="features-title"
        index="03"
        keyName="features"
        lang={lang}
        aside={
          <dl className="mt-5 flex gap-7 md:gap-9">
            {stats.map((s) => (
              <div key={s.label.en}>
                <dt className="sr-only">{s.label[lang]}</dt>
                <dd className="m-0 text-2xl font-semibold tracking-[-0.03em] text-white md:text-[28px]">{typeof s.value === "string" ? s.value : s.value[lang]}</dd>
                <dd className="m-0 mt-1 text-[11px] text-white/45">{s.label[lang]}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <div className="grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
        {keyFeatures.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <motion.article
              key={f.title.en}
              variants={rise}
              onPointerMove={glowMove}
              style={{ "--accent": f.accent } as React.CSSProperties}
              className="fx-card group relative overflow-hidden border border-white/[.08] bg-[#101316] p-4 md:min-h-[clamp(150px,19vh,200px)] md:p-6"
            >
              <span aria-hidden className="fx-glow pointer-events-none absolute inset-0" />
              <span aria-hidden className="fx-line pointer-events-none absolute inset-x-0 top-0 h-px" />
              <span className="relative z-[1] flex items-start justify-between">
                <span className="fx-icon grid h-9 w-9 place-items-center rounded-full border border-white/15 md:h-10 md:w-10">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="text-[10px] tabular-nums tracking-[0.18em] text-white/35">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="relative z-[1] mb-1.5 mt-3 text-[15px] font-semibold tracking-[-0.03em] md:mt-4 md:text-lg">{f.title[lang]}</h3>
              <p className="relative z-[1] m-0 break-keep text-xs leading-[1.6] text-[#9aa4ad] md:text-[13px]">{f.desc[lang]}</p>
              <p className="fx-nodes relative z-[1] m-0 mt-3 hidden whitespace-pre font-mono md:block text-[10.5px] tracking-tight text-white/35">{f.nodes}</p>
            </motion.article>
          );
        })}
      </div>
    </StudioStop>
  );
}

/* ---------- 04 tools in action ---------- */

function FeatureFilm({ v, i, lang, onPlay }: { v: Video; i: number; lang: Lang; onPlay: (p: PlayRequest) => void }) {
  const c = homeCopy(lang);
  const title = v.title[lang];
  const tag = videoTags[v.id]?.[lang];
  return (
    <motion.article variants={rise} className="min-w-0">
      <button
        type="button"
        onClick={() => onPlay({ id: v.id, start: v.start, title })}
        onPointerMove={glowMove}
        aria-label={`${title} ${c.play}`}
        className="film-card group relative block aspect-[16/10] w-full overflow-hidden border border-white/10 bg-[#111417] p-0 text-left md:aspect-video"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover brightness-[.62] transition duration-[1.1s] group-hover:scale-[1.05] group-hover:brightness-[.8]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 md:via-black/55" />
        <span aria-hidden className="fx-glow pointer-events-none absolute inset-0" />
        <span className="absolute left-4 top-4 z-[3] flex items-center gap-2 md:left-6 md:top-6">
          {tag && <span className="film-tag border px-2 py-1 text-[10px] font-semibold tracking-[0.12em]">{tag}</span>}
        </span>
        {v.start ? (
          <span className="absolute right-4 top-4 z-[3] bg-black/70 px-2 py-1 text-[10px] tabular-nums tracking-[0.08em] text-white/80 md:right-6 md:top-6">
            {formatStart(v.start)} {c.from}
          </span>
        ) : null}
        <Play />
        <span className="absolute inset-x-4 bottom-4 z-[3] hidden items-end gap-4 md:inset-x-6 md:bottom-6 md:flex">
          <span aria-hidden className="film-num text-[52px] font-black italic leading-[.8] md:text-[clamp(56px,5vw,84px)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="block break-keep text-[16px] font-semibold leading-snug tracking-[-0.03em] md:text-[clamp(17px,1.45vw,22px)]">{title}</span>
            <span className="mt-1 block text-xs text-white/55 md:text-[13px]">{v.caption[lang]}</span>
          </span>
        </span>
      </button>
      <div className="mt-3 flex items-start gap-3 md:hidden">
        <span aria-hidden className="film-num text-[40px] font-black italic leading-[.85]">{String(i + 1).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="block break-keep text-[15px] font-semibold leading-snug tracking-[-0.03em]">{title}</span>
          <span className="mt-1 block text-xs text-white/55">{v.caption[lang]}</span>
        </span>
      </div>
    </motion.article>
  );
}

export function ToolsInAction({ lang, onPlay }: { lang: Lang; onPlay: (p: PlayRequest) => void }) {
  return (
    <StudioStop id="feature-videos" index="04" accent="#c9a8ff">
      <StudioHeading id="feature-videos-title" index="04" keyName="tools" lang={lang} />
      <div className="grid gap-4 md:mx-auto md:w-[min(100%,calc((100svh-380px)*32/9+20px))] md:grid-cols-2 md:gap-5">
        {featureVideos.map((v, i) => (
          <FeatureFilm key={v.id} v={v} i={i} lang={lang} onPlay={onPlay} />
        ))}
      </div>
    </StudioStop>
  );
}

/* ---------- 05 node shorts ---------- */

export function NodeReels({ lang, onPlay }: { lang: Lang; onPlay: (p: PlayRequest) => void }) {
  const c = homeCopy(lang);
  return (
    <StudioStop id="node-demos" index="05" accent="#7ff0d2">
      <StudioHeading id="node-demos-title" index="05" keyName="shorts" lang={lang} />
      <div className="grid grid-cols-2 gap-3 md:mx-auto md:w-[min(100%,calc((100svh-370px)*3.2+60px))] md:grid-cols-4 md:gap-5">
        {nodeShorts.map((v, i) => {
          const title = v.title[lang];
          return (
            <motion.article key={v.id} variants={rise} className="min-w-0">
              <button
                type="button"
                onClick={() => onPlay({ id: v.id, short: true, title })}
                aria-label={`${title} ${c.play}`}
                style={{ "--accent": nodeAccents[v.id] } as React.CSSProperties}
                className="reel-card group relative block aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#111417] p-0 text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="reel-img absolute left-1/2 top-1/2 h-auto w-[316%] max-w-none -translate-x-1/2 -translate-y-1/2"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/40" />
                <span className="absolute left-3 top-3 z-[2] text-[9px] font-semibold tracking-[0.18em] text-white/70 md:left-4 md:top-4 md:text-[10px]">
                  NODE {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="reel-pill absolute right-3 top-3 z-[2] flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] md:right-4 md:top-4">
                  ▶ PLAY
                </span>
                <span className="absolute inset-x-3 bottom-3 z-[2] md:inset-x-4 md:bottom-4">
                  <span className="block text-lg font-bold tracking-[-0.02em] md:text-[clamp(18px,1.6vw,24px)]">{title}</span>
                  <span className="mt-1 block break-keep text-[11px] leading-snug text-white/60 md:text-[13px]">{v.caption[lang]}</span>
                  <span aria-hidden className="reel-bar mt-3 block h-[2px] w-full origin-left" />
                </span>
              </button>
            </motion.article>
          );
        })}
      </div>
    </StudioStop>
  );
}

/* ---------- 06 workspace explorer ---------- */

const STEP_MS = 6000;

export function WorkspaceExplorer({ lang }: { lang: Lang }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % workspaceScreens.length), STEP_MS);
    return () => clearTimeout(t);
  }, [i, running]);

  const s = workspaceScreens[i];
  return (
    <StudioStop id="workspace" index="06" accent="#ffd36e">
      <StudioHeading id="workspace-title" index="06" keyName="workspace" lang={lang} />
      <motion.div
        ref={ref}
        variants={rise}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="grid gap-5 lg:grid-cols-[minmax(260px,.75fr)_2fr] lg:gap-10"
      >
        <div role="tablist" aria-label={tx(lang, "작업 화면 선택", "Choose a workspace", "作業画面を選択", "选择工作界面")} aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
          {workspaceScreens.map((w, k) => {
            const on = k === i;
            return (
              <button
                key={w.src}
                type="button"
                role="tab"
                id={`ws-tab-${k}`}
                aria-selected={on}
                aria-controls="ws-panel"
                onClick={() => setI(k)}
                onKeyDown={(e) => {
                  if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
                  e.preventDefault();
                  const n = workspaceScreens.length;
                  const next = (k + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + n) % n;
                  setI(next);
                  (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
                }}
                className={`ws-tab relative shrink-0 border-white/10 py-3 pr-4 text-left lg:border-b lg:py-5 ${on ? "text-white" : "text-white/45 hover:text-white/75"}`}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`text-[10px] tabular-nums tracking-[0.18em] ${on ? "text-[var(--sec)]" : ""}`}>{String(k + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold md:text-base">{w.tab[lang]}</span>
                </span>
                <span className={`ws-more hidden overflow-hidden transition-all duration-500 lg:block ${on ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <span className="block break-keep pl-[34px] text-[13px] leading-[1.6] text-white/55">{w.caption[lang]}</span>
                  <span className="mt-2 block pl-[34px] font-mono text-[10.5px] text-white/35">{workspaceDetails[k].nodes}</span>
                </span>
                <span aria-hidden className="absolute inset-x-0 bottom-[-1px] hidden h-px bg-white/10 lg:block">
                  {on && <span key={`${i}-${running}`} className={`ws-progress block h-full origin-left bg-[var(--sec)] ${running ? "is-running" : "is-full"}`} style={{ animationDuration: `${STEP_MS}ms` }} />}
                </span>
              </button>
            );
          })}
        </div>

        <figure id="ws-panel" role="tabpanel" aria-labelledby={`ws-tab-${i}`} className="relative m-0 min-w-0 lg:mx-auto lg:w-[min(100%,calc((100svh-340px)*2048/1131))]">
          <div className="ws-frame relative overflow-hidden border border-white/10 bg-black">
            <motion.img
              key={s.src}
              src={s.src}
              alt={`WHIK Studio ${s.tab[lang]}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="block h-auto w-full"
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_70%,rgba(0,0,0,.55))]" />
            <motion.span
              key={`t-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="absolute bottom-3 left-4 text-sm font-semibold md:bottom-5 md:left-6 md:text-lg"
            >
              {workspaceDetails[i].title[lang]}
            </motion.span>
          </div>
          <figcaption className="mt-3 text-[13px] leading-relaxed text-[#919ba4] lg:hidden">{s.caption[lang]}</figcaption>
        </figure>
      </motion.div>
    </StudioStop>
  );
}
