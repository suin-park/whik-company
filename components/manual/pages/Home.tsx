"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Card, ManualHero } from "../ui";
import { useM } from "../useM";

// The 10-feature film on YouTube, and the node page each of its chapters opens (in the film's order).
const FILM_ID = "NhTp7c5cGog";
const FILM_CHAPTERS: [string, string][] = [
  ["geoimport", "Free 3D Models"],
  ["puddle", "Puddle"],
  ["membrane", "Membrane"],
  ["daytonight", "DayToNight + LightSpill"],
  ["ageshift", "AgeShift"],
  ["facemap", "FaceMap"],
  ["hairkey", "HairKey"],
  ["surfacestick", "SurfaceStick"],
  ["windowreplace", "WindowReplace"],
  ["mayalive", "MayaLive"],
];

// The guides as a small node graph, in the order of a job: get ready, make (2D, 3D), save.
const GUIDES = [
  { href: "/manual/guides/viewer", key: "g5", step: "s0", accent: "#e6e6a0" },
  { href: "/manual/guides/ai-pack", key: "g2", step: "s1", accent: "#c7a6ff" },
  { href: "/manual/guides/day-to-night", key: "g3", step: "s2", accent: "#ffb27a" },
  { href: "/manual/guides/render3d", key: "g4", step: "s2", accent: "#7ee0c3" },
  { href: "/manual/guides/render", key: "g1", step: "s3", accent: "#a9d0ff" },
  { href: "/manual/guides/edit", key: "g6", step: "s4", accent: "#ff8fb1" },
];

const SECTION = "mt-16 border-t border-white/10 pt-14 md:mt-20 md:pt-16";
const H2 = "mt-0 text-[26px] font-semibold tracking-[-0.03em] md:text-[32px]";

function Wire() {
  return (
    <>
      {/* across (wide screens): a wire from one node's output to the next one's input */}
      <svg aria-hidden className="hidden h-10 w-full min-w-[24px] shrink self-center md:block" viewBox="0 0 80 40" preserveAspectRatio="none">
        <path d="M0 20 C 40 20, 40 20, 80 20" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* down (phones) */}
      <span aria-hidden className="mx-auto block h-7 w-px bg-white/25 md:hidden" />
    </>
  );
}

export default function Home({ count, categories }: { count: number; categories: { id: string; count: number }[] }) {
  const { t } = useM();
  const [chapters, setChapters] = useState(false);
  return (
    <div>
      <ManualHero index="00" label={t("home.label")} title={t("home.title")} hi={t("home.hi")} lead={t("home.lead", { n: count })} />

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        <Card href="/manual/start" eyebrow={t("home.c1.e")} title={t("home.c1.t")}>
          {t("home.c1.d")}
        </Card>
        <Card href="/manual/screen" eyebrow={t("home.c2.e")} title={t("home.c2.t")} accent="#7ee0c3">
          {t("home.c2.d")}
        </Card>
        <Card href="/manual/nodes" eyebrow={t("home.c3.e")} title={t("home.c3.t", { n: count })} accent="#ffb27a">
          {t("home.c3.d")}
        </Card>
      </div>

      <section className={SECTION} aria-labelledby="manual-film">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="manual-film" className={`${H2} mb-3`}>{t("home.film")}</h2>
            <p className="m-0 break-keep text-[15px] leading-[1.7] text-[#8c939a]">{t("home.film.d")}</p>
          </div>
          <button
            type="button"
            onClick={() => setChapters((v) => !v)}
            aria-expanded={chapters}
            aria-controls="manual-film-chapters"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/85 transition-colors hover:border-[#a9d0ff] hover:text-white"
          >
            {chapters ? t("home.film.close") : t("home.film.open")}
            <span aria-hidden className={`inline-block transition-transform duration-200 ${chapters ? "rotate-180" : ""}`}>▾</span>
          </button>
        </div>
        <div className={chapters ? "grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-6" : ""}>
          <div className="min-w-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-white/10 bg-black">
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${FILM_ID}?rel=0&playsinline=1`}
                title={t("home.film.t")}
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="mb-0 mt-3 break-keep text-[14px] font-medium text-white/80">{t("home.film.t")}</p>
          </div>
          {chapters && (
            <ol
              id="manual-film-chapters"
              className="m-0 grid list-none gap-px self-start overflow-hidden rounded-[20px] border border-white/10 bg-white/10 p-0 sm:grid-cols-2 lg:grid-cols-1"
            >
              {FILM_CHAPTERS.map(([slug, node], i) => (
                <li key={slug} className="bg-[#0f1114]">
                  <Link href={`/manual/nodes/${slug}`} className="group flex items-baseline gap-3 px-4 py-[9px] no-underline transition-colors hover:bg-[#15181c]">
                    <span className="text-[11px] font-semibold tabular-nums tracking-[0.12em] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block break-keep text-[14px] font-semibold text-white">{t(`home.film.c${i + 1}`)}</span>
                      <span className="block text-[12px] text-[#a9d0ff]">{node}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className={SECTION} aria-labelledby="manual-learn">
        <h2 id="manual-learn" className={`${H2} mb-3`}>{t("home.learn")}</h2>
        <p className="mb-10 mt-0 break-keep text-[15px] leading-[1.7] text-[#8c939a]">{t("home.learn.d")}</p>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {GUIDES.map((g, i) => (
            <Fragment key={g.href}>
              <Link
                href={g.href}
                style={{ "--c": g.accent } as React.CSSProperties}
                className="group relative block shrink-0 rounded-[12px] border border-white/15 bg-[#121417] no-underline transition-colors hover:border-[var(--c)] md:w-[14%]"
              >
                {/* a node: its colour strip, step and name; its input and output on the sides */}
                <span aria-hidden className="block h-[3px] rounded-t-[12px] bg-[var(--c)]" />
                {i > 0 && <span aria-hidden className="absolute left-[-5px] top-1/2 hidden h-[9px] w-[9px] -translate-y-1/2 rounded-full border border-white/40 bg-[#0b0d10] md:block" />}
                {i < GUIDES.length - 1 && <span aria-hidden className="absolute right-[-5px] top-1/2 hidden h-[9px] w-[9px] -translate-y-1/2 rounded-full border border-white/40 bg-[#0b0d10] md:block" />}
                <span className="block px-4 pb-5 pt-4">
                  <span className="block text-[11px] font-semibold tracking-[0.2em] text-[var(--c)]">
                    {String(i + 1).padStart(2, "0")}  {t(`home.g.${g.step}`)}
                  </span>
                  <span className="mt-2 block break-keep text-[17px] font-semibold text-white">{t(`home.${g.key}.t`)}</span>
                  <span className="mt-1 block break-keep text-[13px] leading-[1.6] text-[#8c939a]">{t(`home.${g.key}.d`)}</span>
                </span>
              </Link>
              {i < GUIDES.length - 1 && <Wire />}
            </Fragment>
          ))}
        </div>
      </section>

      <section className={SECTION} aria-labelledby="manual-cats">
        <h2 id="manual-cats" className={`${H2} mb-8`}>{t("home.cats")}</h2>
        <div className="grid gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link key={c.id} href={`/manual/nodes#${c.id.toLowerCase()}`} className="group bg-[#0f1114] p-5 no-underline transition-colors hover:bg-[#15181c]">
              <span className="flex items-baseline justify-between">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] tabular-nums text-[#a9d0ff]">{c.count}</span>
              </span>
              <span className="mt-3 block text-[18px] font-semibold text-white">{t(`cat.${c.id}`)}</span>
              <span className="mt-1 block break-keep text-[13px] leading-[1.6] text-[#8c939a]">{t(`catb.${c.id}`)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
