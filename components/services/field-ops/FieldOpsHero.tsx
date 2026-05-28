"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeUp, fadeUpSlow } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";
import FieldOpsHeroVideo from "./FieldOpsHeroVideo";

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

        <motion.h1
          variants={fadeUp}
          className="space-y-1.5 break-keep text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.14]"
        >
          <span className="block text-fg">{c.headline.line1}</span>
          <span className="block text-fg">{c.headline.line2}</span>
          <span className="block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-blue">
              {c.headline.accent}
            </span>
            <span className="text-fg">{c.headline.tail}</span>
          </span>
        </motion.h1>

        <motion.p variants={fadeUpSlow} className="text-base text-subtle leading-relaxed">
          {c.sub}
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

        {/* 핵심 업무 범위 칩 */}
        <motion.ul variants={fadeUpSlow} className="flex flex-wrap gap-2 pt-2">
          {c.scope.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-fg/[0.03] px-3 py-1.5 text-xs text-subtle"
            >
              {s}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* 우측 비주얼 — 서비스 소개 영상 */}
      <motion.div variants={fadeUpSlow}>
        <FieldOpsHeroVideo
          src="https://www.youtube.com/embed/x3atbF0Ah4s"
          title="Whik Lab 업무 시스템 소개 영상"
        />
      </motion.div>
    </motion.section>
  );
}
