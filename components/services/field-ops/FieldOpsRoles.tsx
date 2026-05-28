"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 역할별 카드 — 설명 1줄 + 미니 화면 프리뷰(리스트 줄 + 상태칩). */
export default function FieldOpsRoles() {
  const c = fieldOpsContent.roles;
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.cards.map((card) => (
          <motion.div key={card.role} variants={fadeUp} className="card p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-sm font-semibold text-fg">{card.role}</span>
              <span className="flex gap-1" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-fg/15" />
                <span className="h-2 w-2 rounded-full bg-accent/40" />
              </span>
            </div>
            <p className="text-xs text-subtle leading-relaxed">{card.desc}</p>
            <div className="space-y-1.5">
              {card.preview.map((row) => (
                <div
                  key={row.text}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-fg/[0.03] px-2.5 py-1.5"
                >
                  <span className="text-[12px] text-fg/85 truncate">{row.text}</span>
                  <span className="shrink-0 rounded-full bg-accent/[0.12] px-1.5 py-0.5 text-[10px] font-medium text-accent">
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
