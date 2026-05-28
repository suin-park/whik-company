"use client";

import { motion } from "framer-motion";
import { Video, FileText, type LucideIcon } from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

const ICONS: Record<string, LucideIcon> = {
  video: Video,
  pdf: FileText,
};

/** 도입 후 사용 안내 자료 — 카드 그리드 대신 좌우 와이드 섹션. 문의 버튼은 두지 않음. */
export default function FieldOpsManuals() {
  const c = fieldOpsContent.manuals;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* 좌측 — 설명 */}
        <div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-border bg-fg/[0.03] px-3 py-1 text-xs text-subtle"
          >
            {c.badge}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-2xl md:text-3xl font-semibold text-fg">
            {c.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-subtle leading-relaxed">
            {c.desc}
          </motion.p>
        </div>

        {/* 우측 — 매뉴얼 패널 */}
        <motion.div variants={fadeUp} className="card divide-y divide-border overflow-hidden">
          {c.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Video;
            return (
              <div key={item.title} className="flex items-center gap-3.5 p-4 md:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{item.title}</p>
                  <p className="mt-0.5 text-xs text-subtle">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
