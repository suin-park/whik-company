"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsProcess() {
  const c = fieldOpsContent.process;
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

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {c.steps.map((s) => (
          <motion.li key={s.no} variants={fadeUp} className="card p-5 flex flex-col gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-accent/15 text-accent text-sm font-semibold">
              {s.no}
            </span>
            <span className="font-medium text-fg">{s.title}</span>
            <p className="text-xs text-subtle leading-relaxed">{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
