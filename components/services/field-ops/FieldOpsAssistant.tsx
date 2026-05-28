"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsAssistant() {
  const c = fieldOpsContent.assistant;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
            {c.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-subtle leading-relaxed">
            {c.body}
          </motion.p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
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
      </div>
    </motion.section>
  );
}
