"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsProblems() {
  const c = fieldOpsContent.problems;
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {c.cards.map((line) => (
          <motion.div
            key={line}
            variants={fadeUp}
            className="card p-4 text-sm text-fg/90 leading-relaxed"
          >
            {line}
          </motion.div>
        ))}
      </div>

      <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-subtle leading-relaxed">
        {c.body}
      </motion.p>
    </motion.section>
  );
}
