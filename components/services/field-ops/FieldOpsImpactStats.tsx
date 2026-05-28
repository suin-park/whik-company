"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 구조 설명용 숫자 띠 — 성과 과장 아님. */
export default function FieldOpsImpactStats() {
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="container py-6 md:py-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fieldOpsContent.impact.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="card p-4 text-center"
          >
            <div className="text-2xl md:text-3xl font-semibold text-accent">{s.value}</div>
            <div className="mt-1 text-xs md:text-sm text-subtle">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
