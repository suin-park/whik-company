"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 도입 효과 예시 — 카드 그리드가 아닌 하나의 리포트 패널 안 가로 진행 바.
 *  실제 측정값이 아니라 기대 효과 예시임을 배지와 주석으로 명시. */
export default function FieldOpsOutcome() {
  const c = fieldOpsContent.outcome;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center rounded-full border border-border bg-fg/[0.03] px-3 py-1 text-xs text-subtle"
      >
        {c.badge}
      </motion.span>
      <motion.h2 variants={fadeUp} className="mt-4 text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-subtle leading-relaxed">
        {c.desc}
      </motion.p>

      {/* 리포트 패널 — 가로 진행 바 */}
      <motion.div variants={fadeUp} className="card mt-8 p-6 md:p-8">
        <div className="space-y-5">
          {c.bars.map((bar, i) => (
            <div key={bar.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-fg/90">{bar.label}</span>
                <span className="text-sm font-semibold text-accent tabular-nums">{bar.value}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-fg/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-blue"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.value}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.08 }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-subtle/70">{c.note}</p>
      </motion.div>
    </motion.section>
  );
}
