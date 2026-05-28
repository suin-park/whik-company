"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 업무 흐름 — 데스크톱 가로 타임라인 / 모바일 세로 타임라인. */
export default function FieldOpsWorkflow() {
  const c = fieldOpsContent.workflow;
  return (
    <motion.section
      variants={staggerContainer(0.03, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 text-subtle">
        {c.desc}
      </motion.p>

      {/* 데스크톱: 가로 타임라인 (연결선 위 노드) */}
      <div className="mt-10 hidden md:block">
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-4 h-[2px] bg-gradient-to-r from-accent/40 via-border to-accent/40"
            aria-hidden
          />
          <ol className="relative grid grid-cols-8 gap-2">
            {c.steps.map((s) => (
              <motion.li key={s.no} variants={fadeUp} className="flex flex-col items-center text-center">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-black text-sm font-semibold ring-4 ring-bg">
                  {s.no}
                </span>
                <span className="mt-3 text-sm font-medium text-fg">{s.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* 모바일: 세로 타임라인 */}
      <ol className="mt-8 md:hidden relative border-l border-border ml-4 space-y-5">
        {c.steps.map((s) => (
          <motion.li key={s.no} variants={fadeUp} className="relative pl-6">
            <span className="absolute -left-[13px] grid place-items-center w-6 h-6 rounded-full bg-accent text-black text-xs font-semibold ring-4 ring-bg">
              {s.no}
            </span>
            <span className="text-sm font-medium text-fg">{s.label}</span>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
