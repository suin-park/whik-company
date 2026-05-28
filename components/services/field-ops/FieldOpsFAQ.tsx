"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsFAQ() {
  const c = fieldOpsContent.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section
      variants={staggerContainer(0.03, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>

      <div className="mt-8 space-y-3 max-w-3xl">
        {c.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={item.q}
              variants={fadeUp}
              className={`rounded-2xl border bg-fg/[0.02] overflow-hidden transition-colors ${
                isOpen ? "border-accent/40" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-fg">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-subtle transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <p className="px-5 pb-4 text-sm text-subtle leading-relaxed">{item.a}</p>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
