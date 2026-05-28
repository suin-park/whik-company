"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 업무를 먼저 듣고 화면을 만든다 — 3단계 프로세스. PC 가로 라인, 모바일 세로 스택. */
export default function FieldOpsApproach() {
  const c = fieldOpsContent.approach;
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
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-subtle leading-relaxed">
        {c.desc}
      </motion.p>

      {/* PC: 가로 프로세스 라인 */}
      <div className="mt-12 hidden sm:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 h-px bg-border" aria-hidden />
          <ol className="relative grid grid-cols-3 gap-6">
            {c.steps.map((s) => (
              <motion.li key={s.no} variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-semibold text-black ring-4 ring-bg">
                  {s.no}
                </span>
                <span className="text-sm font-medium text-fg">{s.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* 모바일: 세로 타임라인 */}
      <ol className="relative mt-8 ml-3 space-y-5 border-l border-border sm:hidden">
        {c.steps.map((s) => (
          <motion.li key={s.no} variants={fadeUp} className="relative pl-5">
            <span className="absolute -left-[14px] grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-semibold text-black ring-4 ring-bg">
              {s.no}
            </span>
            <span className="text-sm font-medium text-fg">{s.label}</span>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
