"use client";
import { CTAButton } from "@/components/Section";
import Link from "next/link";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useI18n } from "@/components/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container py-16 sm:py-20 md:py-28 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              {t("home.hero.title.1")}
              <span className="text-accent">{t("home.hero.title.2")}</span>
            </h1>
            <p className="text-subtle max-w-xl text-base sm:text-lg">{t("home.hero.subtitle")}</p>
            <div className="flex gap-2 sm:gap-3">
              <Link href="/products" className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl bg-accent text-black text-sm sm:text-base">
                {t("home.hero.viewProducts")}
              </Link>
              <Link href="/partnership" className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border border-border text-sm sm:text-base">
                {t("home.hero.partnerInquiry")}
              </Link>
            </div>
          </div>

          <div className="card p-0 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg">
            <YouTubeEmbed
              src="https://www.youtube-nocookie.com/embed/03eeHR_qX5E?rel=0&modestbranding=1&playsinline=1"
              title="Whik 3D Converter Demo"
            />
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-10 grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {[
          { title: t("home.card.studio.title"), desc: t("home.card.studio.desc") },
          { title: t("home.card.3d.title"), desc: t("home.card.3d.desc") },
          { title: t("home.card.lab.title"), desc: t("home.card.lab.desc") },
        ].map((c) => (
          <div key={c.title} className="card p-4 sm:p-5 md:p-6">
            <h3 className="text-lg">{c.title}</h3>
            <p className="text-subtle mt-2">{c.desc}</p>
            <Link href="/products" className="text-accent mt-4 inline-block">{t("home.card.more")}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
