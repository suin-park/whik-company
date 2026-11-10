"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useM } from "./useM";

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
export function Shot({ src, alt, marks = [], caption }: { src: string; alt: string; marks?: Mark[]; caption?: string }) {
  return (
    <figure className="my-8">
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
      className="manual-card group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-[#121417] p-6 no-underline transition-colors hover:border-[var(--c)] md:p-7"
    >
      <span aria-hidden className="manual-card-glow pointer-events-none absolute inset-0" />
      <span className="relative text-[11px] font-semibold tracking-[0.2em] text-[var(--c)]">{eyebrow}</span>
      <span className="relative">
        <span className="block break-keep text-[22px] font-semibold tracking-[-0.03em] text-white md:text-[24px]">{title}</span>
        <span className="mt-2 block break-keep text-[14px] leading-[1.7] text-[#a6adb4]">{children}</span>
        <span aria-hidden className="mt-4 inline-block text-[var(--c)] transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
