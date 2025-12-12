"use client";
import { CTAButton } from "@/components/Section";
import Link from "next/link";
import Image from "next/image";
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
            className="card p-0 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden group"
            {...hoverLift}
          >
            {/* 이미지 영역 */}
            <a
              href="https://www.3d-locker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[16/9] overflow-hidden"
            >
              <Image
                src="/images/3d-thumb2.png"
                alt="3D Locker"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            {/* 정보 영역 */}
            <div className="p-6 sm:p-8 space-y-4">
              {/* 상단: 로고와 배지 */}
              <div className="flex items-center justify-between">
                <div className="relative w-32 h-8 sm:w-36 sm:h-9">
                  <Image
                    src="/images/logo_white.svg"
                    alt="3D Locker"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-accent">공식 오픈</span>
                </div>
              </div>
              
              {/* 제목과 설명 */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
                  이미지 한 장으로 시작하는
                  <br />
                  <span className="text-accent">완전한 3D 워크플로우</span>
                </h3>
                <p className="text-sm sm:text-base text-subtle leading-relaxed">
                  AI 기반 3D 생성부터 AR, 프린팅까지 하나로 연결
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HomeEcosystemDiagram />
      <HomeWhyWhik />
    </>
  );
}
