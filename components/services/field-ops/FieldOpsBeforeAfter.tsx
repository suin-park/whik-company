"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 문제 제기를 Before / After 2단 비교로 대체. */
export default function FieldOpsBeforeAfter() {
  const c = fieldOpsContent.beforeAfter;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Before — 어두운 회색 톤 */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-fg/[0.02] p-6">
          <p className="text-sm font-semibold text-subtle">{c.before.title}</p>
          <ul className="mt-4 space-y-2.5">
            {c.before.items.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-sm text-subtle leading-relaxed">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-fg/30" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* After — 개선 후. 카드 뒤 약한 오렌지 포인트로 시선 유도 */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/[0.05] p-6"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm font-semibold text-accent">{c.after.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.after.items.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm text-fg/90 leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
