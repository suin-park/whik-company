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

      {/* 우측 비주얼 — 업무 흐름 요약 카드 (예시 데이터) */}
      <motion.div variants={fadeUpSlow} className="card p-5 md:p-6">
        <p className="text-xs text-subtle">운영 화면 미리보기 (예시)</p>
        <div className="mt-4 space-y-2.5">
          {["고객 문의 3건 도착", "오늘 방문 예정 2건", "정산 확인 필요 1건", "완료 보고 대기 2건"].map(
            (line, i) => (
              <div
                key={line}
                className="flex items-center gap-3 rounded-xl border border-border bg-fg/[0.03] px-3.5 py-3"
              >
                <span className="grid place-items-center w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm text-fg/90">{line}</span>
              </div>
            ),
          )}
        </div>
        <p className="mt-4 text-[11px] text-subtle/70">
          실제 화면은 회사 업무에 맞춰 구성되며, 위 내용은 예시입니다.
        </p>
      </motion.div>
    </motion.section>
  );
}
