"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsIndustries() {
  const c = fieldOpsContent.industries;
  return (
    <motion.section
      id="field-ops-industries"
      variants={staggerContainer(0.03, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24 scroll-mt-20"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-subtle leading-relaxed">
        {c.desc}
      </motion.p>

      <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
        {c.items.map((item) => (
          <motion.div
            key={item}
            variants={fadeUp}
            className="card p-4 text-sm font-medium text-fg/90 text-center"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
