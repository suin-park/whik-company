"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeUp, fadeUpSlow } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsHero() {
  const c = fieldOpsContent.hero;
  return (
    <motion.section
      variants={staggerContainer(0.05, 0.08)}
      initial="hidden"
      animate="show"
      className="container pt-24 pb-16 md:pt-32 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center"
    >
      <div className="space-y-5 max-w-xl">
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {c.badges.map((b) => (
            <span
              key={b}
              className="text-[11px] text-subtle rounded-full border border-border bg-fg/[0.03] px-2.5 py-1"
            >
              {b}
            </span>
          ))}
        </motion.div>

        <motion.h1 variants={fadeUp} className="space-y-1.5">
          <span className="block text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.12] text-fg">
            {c.headline[0]}
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.12]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-blue">
              하나로 연결
            </span>
            <span className="text-fg">합니다</span>
          </span>
        </motion.h1>

        <motion.p variants={fadeUpSlow} className="text-base text-subtle leading-relaxed">
          {c.sub}
        </motion.p>

        <motion.p variants={fadeUpSlow} className="text-sm text-subtle/80 leading-relaxed">
          {c.notice}
        </motion.p>

        <motion.div variants={fadeUpSlow} className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={fieldOpsContent.cta.contactHref}
            className="min-h-[48px] px-6 rounded-2xl inline-flex items-center justify-center text-[15px] font-semibold bg-accent text-black hover:opacity-90 transition"
          >
            {c.ctaPrimary}
          </Link>
          <a
            href="#field-ops-industries"
            className="min-h-[48px] px-6 rounded-2xl inline-flex items-center justify-center text-[15px] font-medium bg-fg/[0.06] text-fg border border-border hover:bg-fg/[0.1] transition"
          >
            {c.ctaSecondary}
          </a>
        </motion.div>
      </div>

      {/* 우측 비주얼 — 관리자 대시보드 목업 (예시 데이터) */}
      <motion.div variants={fadeUpSlow} className="card p-5 md:p-6">
        {/* 목업 헤더 — 창 점 + 라벨 */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
            </span>
            <span className="text-xs text-subtle">{c.dashboard.label}</span>
          </div>
          <span className="text-[11px] text-subtle/70">오늘</span>
        </div>

        <p className="mt-4 text-xs font-medium text-subtle">{c.dashboard.today}</p>
        <div className="mt-2.5 space-y-2">
          {c.dashboard.items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-fg/[0.03] px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`h-2 w-2 rounded-full ${TONE_DOT[item.tone]}`} aria-hidden />
                <span className="text-sm text-fg/90 truncate">{item.label}</span>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${TONE_CHIP[item.tone]}`}>
                {item.count}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-subtle/70">{c.dashboard.note}</p>
      </motion.div>
    </motion.section>
  );
}

const TONE_DOT: Record<string, string> = {
  info: "bg-accent-blue",
  active: "bg-accent",
  warn: "bg-amber-400",
  done: "bg-emerald-400",
};

const TONE_CHIP: Record<string, string> = {
  info: "bg-accent-blue/15 text-accent-blue",
  active: "bg-accent/15 text-accent",
  warn: "bg-amber-400/15 text-amber-300",
  done: "bg-emerald-400/15 text-emerald-300",
};
