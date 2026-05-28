"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 자주 묻는 질문 — 데스크톱 2컬럼(아코디언 + 상담 유도 카드), 모바일 세로 스택. */
export default function FieldOpsFAQ() {
  const c = fieldOpsContent.faq;
  const a = c.aside;
  const href = fieldOpsContent.cta.contactHref;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section
      variants={staggerContainer(0.03, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1180px] grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* 왼쪽 — FAQ 아코디언 (약 65%) */}
        <div className="lg:col-span-8">
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-fg">
            {c.title}
          </motion.h2>

          <div className="mt-8 space-y-3">
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
        </div>

        {/* 오른쪽 — 상담 유도 카드 (약 35%, CTA 섹션보다 약하게)
            데스크톱에서는 FAQ 제목 높이(약 36px) + 제목 아래 여백(mt-8, 32px)만큼 내려
            왼쪽 아코디언 첫 항목 상단과 수평을 맞춘다. 모바일에서는 적용하지 않음. */}
        <motion.aside variants={fadeUp} className="lg:col-span-4 lg:mt-[68px]">
          <div className="rounded-2xl border border-accent/30 bg-fg/[0.03] p-6 lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-fg leading-snug">{a.title}</h3>
            <p className="mt-3 text-sm text-subtle leading-relaxed">{a.body}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={href}
                className="min-h-[48px] px-5 rounded-2xl inline-flex items-center justify-center text-[15px] font-semibold bg-accent text-black hover:opacity-90 transition"
              >
                {a.ctaPrimary}
              </Link>
              <Link
                href={href}
                className="min-h-[48px] px-5 rounded-2xl inline-flex items-center justify-center text-[15px] font-medium bg-fg/[0.06] text-fg border border-border hover:bg-fg/[0.1] transition"
              >
                {a.ctaSecondary}
              </Link>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.section>
  );
}
