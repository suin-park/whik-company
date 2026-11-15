"use client";

import Link from "next/link";
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

export default function Home({ count, categories }: { count: number; categories: { id: string; count: number }[] }) {
  const { t } = useM();
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

      <section className="mt-20 md:mt-28" aria-labelledby="manual-film">
        <h2 id="manual-film" className="mb-3 mt-0 text-[26px] font-semibold tracking-[-0.03em] md:text-[32px]">{t("home.film")}</h2>
        <p className="mb-8 mt-0 break-keep text-[15px] leading-[1.7] text-[#8c939a]">{t("home.film.d")}</p>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-6">
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
          <ol className="m-0 grid list-none gap-px self-start overflow-hidden rounded-[20px] border border-white/10 bg-white/10 p-0 sm:grid-cols-2 lg:grid-cols-1">
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
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <h2 className="mb-8 mt-0 text-[26px] font-semibold tracking-[-0.03em] md:text-[32px]">{t("home.learn")}</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <Card href="/manual/guides/render" eyebrow="GUIDE" title={t("home.g1.t")}>
            {t("home.g1.d")}
          </Card>
          <Card href="/manual/guides/ai-pack" eyebrow="GUIDE" title={t("home.g2.t")} accent="#c7a6ff">
            {t("home.g2.d")}
          </Card>
          <Card href="/manual/guides/day-to-night" eyebrow="GUIDE" title={t("home.g3.t")} accent="#ffb27a">
            {t("home.g3.d")}
          </Card>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <h2 className="mb-8 mt-0 text-[26px] font-semibold tracking-[-0.03em] md:text-[32px]">{t("home.cats")}</h2>
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
