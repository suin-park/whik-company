"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsPackages() {
  const c = fieldOpsContent.packages;
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

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {c.cards.map((card) => (
          <motion.div
            key={card.name}
            variants={fadeUp}
            className={`card p-6 flex flex-col gap-3 ${
              "featured" in card && card.featured ? "border-accent/50" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-semibold text-fg">{card.name}</span>
              {"featured" in card && card.featured ? (
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  추천
                </span>
              ) : null}
            </div>
            <p className="text-sm text-subtle leading-relaxed flex-1">{card.desc}</p>
            <p className="text-sm font-medium text-fg/90">{card.price}</p>
          </motion.div>
        ))}
      </div>

      <motion.p variants={fadeUp} className="mt-6 text-xs text-subtle/70">
        {c.priceNote}
      </motion.p>
    </motion.section>
  );
}
