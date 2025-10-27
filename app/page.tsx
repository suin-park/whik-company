"use client";
import { CTAButton } from "@/components/Section";
import Link from "next/link";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useI18n } from "@/components/I18nProvider";
import HomeEcosystemDiagram from "@/components/HomeEcosystemDiagram";
import HomeWhyWhik from "@/components/HomeWhyWhik";
import SplashScreen from "@/components/SplashScreen";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSlow, hoverLift } from "@/components/motionPresets";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <SplashScreen always />
      <section className="relative overflow-hidden">
        <div className="container py-16 sm:py-20 md:py-28 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <motion.div
            variants={staggerContainer(0.05, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              {t("home.hero.title.1")}
              <br />
              <span className="text-accent">{t("home.hero.title.2")}</span>
            </motion.h1>
            <motion.p variants={fadeUpSlow} className="text-subtle max-w-xl text-base sm:text-lg">
              {t("home.hero.subtitle")}
            </motion.p>
            <div className="flex gap-2 sm:gap-3">
              <motion.div variants={fadeUp} {...hoverLift}>
                <Link href="/products" className="inline-block px-4 py-2 sm:px-5 sm:py-3 rounded-2xl bg-accent text-black text-sm sm:text-base">
                  {t("home.hero.cta.primary")}
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} {...hoverLift}>
                <Link href="/partnership" className="inline-block px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border border-border text-sm sm:text-base">
                  {t("home.hero.cta.secondary")}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="card p-0 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg"
          >
            <YouTubeEmbed
              src="https://www.youtube-nocookie.com/embed/03eeHR_qX5E?rel=0&modestbranding=1&playsinline=1"
              title="Whik 3D Converter Demo"
            />
          </motion.div>
        </div>
      </section>

      <HomeEcosystemDiagram />
      <HomeWhyWhik />
    </>
  );
}
