"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsWorkflow() {
  const c = fieldOpsContent.workflow;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.05)}
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

      <ol className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {c.steps.map((s) => (
          <motion.li key={s.no} variants={fadeUp} className="card p-4 flex flex-col gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-semibold">
              {s.no}
            </span>
            <span className="text-sm font-medium text-fg">{s.label}</span>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
