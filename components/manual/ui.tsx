"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Rich, useM } from "./useM";

/** A page's top: a small numbered label, a big title with a highlighted end, a lead. */
export function ManualHero({ index, label, title, hi, lead }: { index: string; label: string; title: string; hi?: string; lead?: ReactNode }) {
  return (
    <header className="relative mb-14 md:mb-20">
      <span aria-hidden className="manual-num pointer-events-none absolute -right-2 -top-10 select-none font-black italic leading-none md:-top-16">
        {index}
      </span>
      <div className="mb-5 flex items-center gap-4 text-[10px] font-semibold tracking-[0.22em] md:text-[11px]">
        <span className="tabular-nums text-[#a9d0ff]">{index}</span>
        <span className="block h-px w-14 bg-[#a9d0ff] md:w-20" />
        <span className="text-white/55">{label}</span>
      </div>
      <h1 className="m-0 break-keep text-[34px] font-semibold leading-[1.15] tracking-[-0.05em] md:text-[clamp(38px,4vw,60px)]">
        {title}
        {hi ? (
          <>
            {" "}
            <span className="manual-hi">{hi}</span>
          </>
        ) : null}
      </h1>
      {lead ? <p className="mb-0 mt-6 max-w-[640px] break-keep text-[15px] leading-[1.8] text-[#a6adb4] md:text-base">{lead}</p> : null}
    </header>
  );
}

/** A section within a page, with its own small heading. */
export function Section({ id, title, kicker, children }: { id?: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.07] py-12 md:py-16">
      {kicker ? <p className="mb-3 mt-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">{kicker}</p> : null}
      <h2 className="mb-6 mt-0 break-keep text-[24px] font-semibold tracking-[-0.03em] md:text-[30px]">{title}</h2>
      <div className="manual-prose">{children}</div>
    </section>
  );
}

/** A numbered step: a big number, its title and what to do. */
export function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="relative grid grid-cols-[52px_1fr] gap-4 py-6 md:grid-cols-[72px_1fr] md:gap-6">
      <span className="manual-step-n select-none text-[40px] font-black italic leading-none md:text-[56px]">{String(n).padStart(2, "0")}</span>
      <div>
        <h3 className="mb-2 mt-1 break-keep text-[18px] font-semibold tracking-[-0.02em] md:text-[20px]">{title}</h3>
        <div className="manual-prose">{children}</div>
      </div>
    </div>
  );
}

/** A key or a key chord, as on the keyboard. */
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="manual-kbd">{children}</kbd>;
}

/** A note beside the text: tip (blue), heads-up (orange). */
export function Note({ kind = "tip", title, children }: { kind?: "tip" | "warn"; title?: string; children: ReactNode }) {
  const { t } = useM();
  const c = kind === "warn" ? "border-[#ff9b4a]/40 bg-[#ff9b4a]/[0.06]" : "border-[#a9d0ff]/30 bg-[#a9d0ff]/[0.05]";
  const tone = kind === "warn" ? "text-[#ffb27a]" : "text-[#a9d0ff]";
  return (
    <aside className={`my-6 rounded-2xl border px-5 py-4 ${c}`}>
      <p className={`m-0 text-[12px] font-semibold tracking-[0.12em] ${tone}`}>{title ?? t(kind === "warn" ? "c.warn" : "c.tip")}</p>
      <div className="manual-prose mt-2 text-[14px]">{children}</div>
    </aside>
  );
}

/** A screenshot with numbered marks on it and their legend below. */
export type Mark = { n: number; x: number; y: number; label: string; text?: string };
export function Shot({ src, alt, marks = [], caption, maxWidth }: { src: string; alt: string; marks?: Mark[]; caption?: string; maxWidth?: number }) {
  return (
    <figure className="my-8" style={maxWidth ? { maxWidth } : undefined}>
      <div className="manual-shot relative overflow-hidden rounded-[18px] border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
        {marks.map((m) => (
          <span key={m.n} className="manual-mark absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
            {m.n}
          </span>
        ))}
      </div>
      {marks.length > 0 ? (
        <ol className="mt-5 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
          {marks.map((m) => (
            <li key={m.n} className="flex gap-3 text-[14px] leading-[1.7] text-[#c8cdd2]">
              <span className="manual-mark manual-mark--legend shrink-0">{m.n}</span>
              <span>
                <b className="font-semibold text-white">{m.label}</b>
                {m.text ? <span className="text-[#a6adb4]"> {m.text}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
      {caption ? <figcaption className="mt-3 text-[13px] text-white/45">{caption}</figcaption> : null}
    </figure>
  );
}

/** A big link card (where to go next). */
export function Card({ href, eyebrow, title, children, accent = "#a9d0ff" }: { href: string; eyebrow: string; title: string; children: ReactNode; accent?: string }) {
  return (
    <Link
      href={href}
      style={{ "--c": accent } as React.CSSProperties}
      className="manual-card group relative flex min-h-[184px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#121417] p-6 no-underline transition-colors hover:border-[var(--c)] md:p-7"
    >
      <span aria-hidden className="manual-card-glow pointer-events-none absolute inset-0" />
      {/* (from the top: every card's title on one line with the others, the arrow at the bottom) */}
      <span className="relative text-[11px] font-semibold tracking-[0.2em] text-[var(--c)]">{eyebrow}</span>
      <span className="relative mt-3 block break-keep text-[22px] font-semibold tracking-[-0.03em] text-white md:text-[24px]">{title}</span>
      <span className="relative mt-2 block break-keep text-[14px] leading-[1.7] text-[#a6adb4]">{children}</span>
      <span aria-hidden className="relative mt-auto inline-block pt-4 text-[var(--c)] transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** A topic of a guide: its number, a short title, the one line that matters, then short details (one a line). */
export function Topic({ n, title, core, details }: { n: number; title: string; core: string; details?: string }) {
  const items = (details ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 border-t border-white/[0.07] py-5 first:border-t-0 md:grid-cols-[56px_1fr] md:gap-5">
      <span className="select-none pt-[3px] text-[13px] font-semibold tabular-nums tracking-[0.08em] text-[#a9d0ff]">{String(n).padStart(2, "0")}</span>
      <div className="min-w-0">
        <h3 className="m-0 break-keep text-[17px] font-semibold tracking-[-0.02em] md:text-[18px]">{title}</h3>
        <p className="mb-0 mt-1.5 break-keep text-[15px] leading-[1.7] text-white/90">
          <Rich text={core} />
        </p>
        {items.length > 0 ? (
          <ul className="mb-0 mt-3 list-disc space-y-1 pl-5 text-[14px] leading-[1.65] text-[#a6adb4] marker:text-white/25">
            {items.map((x, i) => (
              <li key={i} className="break-keep">
                <Rich text={x} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

/** A page's sections at a glance: number, name and what it is for, each a link to it. */
export function Glance({ title, items }: { title: string; items: { id: string; title: string; lead: string }[] }) {
  return (
    <nav className="mb-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 md:px-7">
      <p className="m-0 text-[12px] font-semibold tracking-[0.14em] text-[#a9d0ff]">{title}</p>
      <ol className="m-0 mt-4 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.id} className="grid grid-cols-[28px_1fr] gap-2">
            <span className="pt-[2px] text-[12px] font-semibold tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${it.id}`} className="block no-underline">
              <span className="block text-[15px] font-semibold text-white">{it.title}</span>
              <span className="block break-keep text-[13px] leading-[1.6] text-[#a6adb4]">{it.lead}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
