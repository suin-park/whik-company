"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsCase() {
  const c = fieldOpsContent.caseStudy;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <div className="card p-6 md:p-10">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
          {c.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-subtle leading-relaxed">
          {c.body}
        </motion.p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {c.points.map((p) => (
            <motion.div
              key={p}
              variants={fadeUp}
              className="rounded-xl border border-border bg-fg/[0.03] px-4 py-3.5 text-sm text-fg/90 leading-relaxed"
            >
              {p}
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="mt-6 text-xs text-subtle/70">
          {c.note}
        </motion.p>
      </div>
    </motion.section>
  );
}
