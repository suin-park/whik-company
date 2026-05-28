"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

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
          <motion.div key={card.role} variants={fadeUp} className="card p-5 flex flex-col gap-2.5">
            <span className="inline-flex w-fit rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
              {card.role}
            </span>
            <p className="text-sm text-fg/90 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
