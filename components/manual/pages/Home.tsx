"use client";

import Link from "next/link";
import { Card, ManualHero } from "../ui";
import { useM } from "../useM";

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
