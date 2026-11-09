"use client";
import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { tx, type Lang, type Tx } from "@/lib/messages";
import { homeCopy } from "./homeContent";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const MODES: { n: string; name: string; d: Tx }[] = [
  { n: "01", name: "360° Space", d: { ko: "한 자리에서 둘러보기", en: "Look around from one spot", ja: "その場で360°見渡す", zh: "原地环视一周" } },
  { n: "02", name: "3D Space", d: { ko: "걸으며 공간 담기", en: "Walk around your space", ja: "歩きながら空間を記録", zh: "边走边记录空间" } },
  { n: "03", name: "3D Object", d: { ko: "사물의 모든 면 담기", en: "Capture every side", ja: "物のすべての面を記録", zh: "记录物体的每一面" } },
];

/** Last stop: a "coming soon" teaser for WHIK 3D Scanner. */
export default function ScannerTeaser({ lang }: { lang: Lang }) {
  const c = homeCopy(lang);
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", `${x * 14}deg`);
    ref.current.style.setProperty("--rx", `${-y * 10}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <section
      ref={ref}
      id="scanner"
      data-snap
      aria-labelledby="scanner-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="scanner-teaser relative isolate flex flex-col justify-center overflow-hidden border-t border-[#25292d] md:min-h-[100svh]"
    >
      {/* backdrop */}
      <div aria-hidden className="st-glow pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="st-floor pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46%]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[13%] -z-10 overflow-hidden md:top-[11%]">
        <div className="st-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="st-outline pr-[0.4em] text-[clamp(72px,13vw,210px)] font-black italic leading-none tracking-[-0.04em]">
              COMING SOON — COMING SOON — COMING SOON —&nbsp;
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-[6%] py-16 md:grid-cols-[1fr_1fr] md:gap-10 md:pb-14 md:pt-28 lg:gap-[70px]"
      >
        <div className="min-w-0">
          <motion.div variants={rise} className="mb-7 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em]">
            <span className="st-chip inline-flex items-center gap-2 px-3 py-[7px] text-[#0b0d0f]">
              <span className="st-dot h-1.5 w-1.5 rounded-full bg-[#0b0d0f]" />
              COMING SOON
            </span>
            <span className={`text-white/50 ${lang === "en" ? "" : "tracking-[0.04em]"}`}>{tx(lang, "출시 준비 중", "IN DEVELOPMENT", "リリース準備中", "开发中")}</span>
          </motion.div>

          <motion.div variants={rise}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/whik-3d-scanner.svg" alt="WHIK 3D Scanner" className="block h-auto w-[clamp(220px,24vw,380px)]" />
          </motion.div>

          <motion.h2 variants={rise} id="scanner-title" className="mb-5 mt-7 break-keep text-[34px] font-semibold leading-[1.16] tracking-[-0.045em] md:text-[clamp(32px,3.4vw,50px)]">
            {c.scannerTitle1}
            <br />
            <span className="st-gradient-text">{c.scannerTitle2}</span>
          </motion.h2>

          <motion.p variants={rise} className="max-w-[460px] break-keep text-[15px] leading-[1.85] text-[#a6b0b8] md:text-base">
            {c.scannerBody}
          </motion.p>

          <motion.ul variants={rise} className="mt-8 grid max-w-[560px] grid-cols-3 border-t border-white/10">
            {MODES.map((m) => (
              <li key={m.n} className="st-mode relative border-r border-white/10 py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-3 md:pr-4 md:[&:not(:first-child)]:pl-4">
                <span className="block text-[10px] tracking-[0.18em] text-[#ffc27a]">{m.n}</span>
                <span className="mt-2 block text-[13px] font-semibold md:text-[15px]">{m.name}</span>
                <span className="mt-1 block text-[11px] leading-snug text-[#8f99a2] md:text-xs">{m.d[lang]}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* phones */}
        <motion.div variants={rise} className="st-stage relative flex min-w-0 items-center justify-center">
          <div aria-hidden className="st-halo pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="st-tilt relative flex items-center justify-center gap-4 md:gap-6">
            {/* viewfinder corners */}
            <span aria-hidden className="st-corner left-[-14px] md:left-[-22px] top-[-14px] md:top-[-22px] border-l border-t" />
            <span aria-hidden className="st-corner right-[-14px] md:right-[-22px] top-[-14px] md:top-[-22px] border-r border-t" />
            <span aria-hidden className="st-corner bottom-[-14px] md:bottom-[-22px] left-[-14px] md:left-[-22px] border-b border-l" />
            <span aria-hidden className="st-corner bottom-[-14px] md:bottom-[-22px] right-[-14px] md:right-[-22px] border-b border-r" />

            <div className="st-phone relative overflow-hidden rounded-[22px] md:rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/scanner-home.jpg"
                alt={tx(lang, "WHIK 3D Scanner 홈 화면", "WHIK 3D Scanner home screen", "WHIK 3D Scanner のホーム画面", "WHIK 3D Scanner 主界面")}
                width={720}
                height={1562}
                loading="lazy"
                className="block h-auto w-full"
              />
              <span aria-hidden className="st-scan pointer-events-none absolute inset-x-0 top-0 h-[38%]" />
            </div>
            <div className="st-phone st-phone-back relative mt-12 overflow-hidden rounded-[22px] md:mt-20 md:rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/scanner-capture.jpg"
                alt={tx(lang, "WHIK 3D Scanner 공간과 사물 촬영 메뉴", "WHIK 3D Scanner capture menu", "WHIK 3D Scanner の空間と物の撮影メニュー", "WHIK 3D Scanner 空间与物体拍摄菜单")}
                width={720}
                height={1562}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>

            <span aria-hidden className="st-rec absolute -top-12 left-0 hidden items-center gap-2 text-[10px] tracking-[0.2em] text-white/60 md:flex">
              <span className="st-dot h-1.5 w-1.5 rounded-full bg-[#ff5a4e]" />
              SCANNING
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
