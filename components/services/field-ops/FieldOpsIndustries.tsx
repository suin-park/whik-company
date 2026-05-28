"use client";

import { motion } from "framer-motion";
import {
  Blinds,
  Grid3x3,
  Wind,
  Sparkles,
  Sofa,
  Bath,
  Wrench,
  PaintRoller,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

const ICONS: Record<string, LucideIcon> = {
  wallpaper: PaintRoller,
  blinds: Blinds,
  grid: Grid3x3,
  wind: Wind,
  sparkles: Sparkles,
  sofa: Sofa,
  bath: Bath,
  wrench: Wrench,
};

/** 적용 업종 — 아이콘 타일로 텍스트 박스 느낌 줄임. */
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
        {c.items.map((item) => {
          const Icon = ICONS[item.icon] ?? Wrench;
          return (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="card p-4 flex flex-col items-center gap-2.5 text-center"
            >
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent/12 text-accent">
                <Icon className="w-5 h-5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-fg/90 leading-snug">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
