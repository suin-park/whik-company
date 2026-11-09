"use client";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { LOCKER_URL, MAIN_FILM_ID, STUDIO_DOWNLOAD_URL, homeCopy } from "./homeContent";
import { KeyFeatures, NodeReels, Showcase, ToolsInAction, WorkspaceExplorer } from "./StudioSections";
import VideoDialog, { type PlayRequest } from "./VideoDialog";
import ProductCard from "./ProductCard";
import ScannerTeaser from "./ScannerTeaser";
import LanguageStage from "./LanguageStage";
import { useSectionSnap } from "./useSectionSnap";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The logo intro (SplashScreen) covers the page for ~2.1 s; the first screen enters as it fades. */
const INTRO_DELAY = 1.95;
const introStagger = (extra = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: INTRO_DELAY + extra } },
});
const rise: Variants = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const SECTIONS = ["top", "showcase", "features", "feature-videos", "node-demos", "workspace", "languages", "scanner"];

const Arrow = () => (
  <span aria-hidden className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
    ↗
  </span>
);

function SectionDots({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <nav aria-label="Sections" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => onJump(i)}
          aria-label={id}
          aria-current={active === i}
          className="group grid h-4 w-4 place-items-center"
        >
          <span className={`block rounded-full transition-all duration-300 ${active === i ? "h-2.5 w-2.5 bg-[#a9d0ff]" : "h-1.5 w-1.5 bg-white/40 group-hover:bg-white/80"}`} />
        </button>
      ))}
    </nav>
  );
}

export default function HomePage() {
  const { lang } = useI18n();
  const c = homeCopy(lang);
  const [video, setVideo] = useState<PlayRequest>(null);
  const [active, setActive] = useState(0);
  const studioDialog = useRef<HTMLDialogElement>(null);

  useSectionSnap();

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(SECTIONS.indexOf(e.target.id));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => document.getElementById(SECTIONS[i])?.scrollIntoView({ behavior: "smooth" });

  const playFilm = () => setVideo({ id: MAIN_FILM_ID, title: c.filmTitle });

  return (
    <div className="-mt-16 bg-[#0d0f11] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      <SectionDots active={active} onJump={jump} />

      {/* 1. Hero + products: one screen, like the design */}
      <section id="top" data-snap className="flex min-h-[100svh] flex-col">
        <div className="relative isolate flex min-h-[560px] flex-1 overflow-hidden bg-[#171b1e] md:min-h-[400px]" aria-labelledby="hero-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/hero.jpg"
            alt=""
            fetchPriority="high"
            className="home-hero-image absolute inset-0 -z-[3] h-full w-full object-cover object-[64%_center] md:object-[center_55%]"
          />
          <div className="home-hero-shade absolute inset-0 -z-[2]" aria-hidden />
          <motion.div
            variants={introStagger()}
            initial="hidden"
            animate="show"
            className="mx-auto flex w-full max-w-[1450px] flex-col items-start justify-end px-[6%] pb-14 pt-28 md:px-[5.2%] md:pb-20"
          >
            <motion.h1 variants={rise} id="hero-title" className="m-0 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/whik-studio.svg" alt="WHIK Studio" width={1075} height={390} className="block h-auto w-[clamp(220px,26vw,420px)]" />
            </motion.h1>
            <motion.p variants={rise} className="m-0 mb-5 text-[clamp(28px,3.1vw,49px)] font-semibold leading-[1.24] tracking-[-0.04em]">
              {c.tagline}
            </motion.p>
            <motion.p variants={rise} className="m-0 mb-8 text-base leading-normal tracking-[-0.02em] text-[#e2e2e2] md:mb-9 md:text-[clamp(16px,1.45vw,22px)]">
              {c.intro}
            </motion.p>
            <motion.div variants={rise} className="flex items-center gap-6 md:gap-8">
              <a
                href={STUDIO_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[47px] items-center justify-center bg-[#f5f5f4] px-6 text-sm font-bold text-[#101214] transition hover:-translate-y-0.5 hover:bg-[#a9d0ff] md:min-h-[49px] md:px-7 md:text-base"
              >
                {c.download}
              </a>
              <button type="button" onClick={playFilm} className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#a9d0ff] md:text-base">
                {c.watchFilm}
                <Arrow />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          id="products"
          variants={introStagger(0.35)}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-[6%] py-10 md:py-8 lg:py-9 min-[1800px]:py-[72px]"
        >
          <motion.div variants={rise} className="mb-7 md:mb-8">
            <h2 className="m-0 text-4xl font-semibold leading-[1.2] tracking-[-0.045em] md:text-[clamp(34px,3.5vw,49px)]">
              {c.ecoTitle1} {c.ecoTitle2}
            </h2>
          </motion.div>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <ProductCard
              variants={rise}
              index="01"
              tag={lang === "ko" ? "무료" : "FREE"}
              image="/images/home/card-studio.jpg"
              accent="#a9d0ff"
              logo={
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/logos/whik-studio.svg" alt="WHIK Studio" className="block h-11 w-auto md:h-[clamp(40px,3.6vw,54px)]" />
              }
              desc={c.studioDesc}
              cta={c.studioCta}
              onClick={() => studioDialog.current?.showModal()}
            />
            <ProductCard
              variants={rise}
              index="02"
              tag={lang === "ko" ? "서비스 중" : "LIVE"}
              image="/images/home/card-locker.jpg"
              accent="#3fe0c5"
              logo={
                <span className="flex h-11 items-center md:h-[clamp(40px,3.6vw,54px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo_white.svg" alt="3D Locker" className="block h-7 w-auto md:h-[clamp(24px,2.1vw,32px)]" />
                </span>
              }
              desc={c.lockerDesc}
              cta={c.lockerCta}
              href={LOCKER_URL}
            />
            <ProductCard
              variants={rise}
              index="03"
              tag={c.comingSoon}
              image="/images/home/card-scanner.jpg"
              accent="#ffc27a"
              muted
              logo={
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/logos/whik-3d-scanner.svg" alt="WHIK 3D Scanner" className="block h-11 w-auto md:h-[clamp(40px,3.6vw,54px)]" />
              }
              desc={c.scannerDesc}
              cta={c.comingSoon}
              onClick={() => jump(SECTIONS.indexOf("scanner"))}
            />
          </div>
        </motion.div>
      </section>

      {/* 2-6. Studio */}
      <Showcase lang={lang} onPlay={playFilm} filmTitle={c.filmTitle} />
      <KeyFeatures lang={lang} />
      <ToolsInAction lang={lang} onPlay={setVideo} />
      <NodeReels lang={lang} onPlay={setVideo} />
      <WorkspaceExplorer lang={lang} />

      {/* 7. Languages */}
      <LanguageStage lang={lang} />

      {/* 8. Scanner: coming soon */}
      <ScannerTeaser lang={lang} />

      {/* Studio detail */}
      <dialog
        ref={studioDialog}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.currentTarget.close();
        }}
        className="home-dialog w-[min(580px,calc(100%-36px))] border-[#393e44] bg-[#14171a] px-[26px] py-9 md:p-[43px]"
      >
        <button type="button" onClick={() => studioDialog.current?.close()} aria-label={c.close} className="absolute right-3 top-3 h-9 w-9 text-[26px] font-light">
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/whik-studio.svg" alt="WHIK Studio" className="mb-5 block h-11 w-auto" />
        <h2 className="mb-5 text-[29px] tracking-[-0.03em] md:text-[34px]">{c.studioDialogTitle}</h2>
        <p className="text-[15px] leading-[1.8] text-[#c1c5c9]">{c.studioDialogBody}</p>
        <div className="flex flex-wrap gap-2.5 pb-2.5 pt-4">
          {c.studioFeatures.map((f) => (
            <span key={f} className="mr-2.5 border-b border-[#41474e] pb-[7px] text-[13px] text-[#d2d6db]">
              {f}
            </span>
          ))}
        </div>
        <a
          href={STUDIO_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[47px] items-center justify-center bg-[#f5f5f4] px-6 text-sm font-bold text-[#101214] transition hover:bg-[#a9d0ff]"
        >
          {c.download} ↗
        </a>
      </dialog>

      <VideoDialog video={video} lang={lang} onClose={() => setVideo(null)} />
    </div>
  );
}
