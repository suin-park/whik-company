"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

export default function FieldOpsCTA() {
  const c = fieldOpsContent.cta;
  return (
    <motion.section
      id="contact"
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="container py-16 md:py-24 scroll-mt-20"
    >
      <div className="card p-8 md:p-12 text-center">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
          {c.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 mx-auto max-w-2xl text-subtle leading-relaxed">
          {c.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={c.contactHref}
            className="min-h-[48px] px-6 rounded-2xl inline-flex items-center justify-center text-[15px] font-semibold bg-accent text-black hover:opacity-90 transition"
          >
            {c.ctaPrimary}
          </Link>
          <Link
            href={c.contactHref}
            className="min-h-[48px] px-6 rounded-2xl inline-flex items-center justify-center text-[15px] font-medium bg-fg/[0.06] text-fg border border-border hover:bg-fg/[0.1] transition"
          >
            {c.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
