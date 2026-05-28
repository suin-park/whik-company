"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 구축 사례 — 특정 업종 색 없이, 실제 구축 화면을 제품 쇼케이스처럼 보여줌. */
export default function FieldOpsCase() {
  const c = fieldOpsContent.caseStudy;
  return (
    <motion.section
      variants={staggerContainer(0.04, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="container py-16 md:py-24"
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center rounded-full border border-border bg-fg/[0.03] px-3 py-1 text-xs text-subtle"
      >
        {c.label}
      </motion.span>

      <motion.h2 variants={fadeUp} className="mt-4 text-2xl md:text-3xl font-semibold text-fg">
        {c.title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 text-subtle leading-relaxed lg:whitespace-nowrap">
        {c.body}
      </motion.p>

      {/* 쇼케이스 — 글로우 + 브라우저 프레임 */}
      <motion.div variants={fadeUp} className="relative mx-auto mt-10 max-w-4xl">
        <div aria-hidden className="pointer-events-none absolute -inset-6">
          <div className="absolute left-[6%] top-[8%] h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-[6%] right-[6%] h-48 w-48 rounded-full bg-accent-blue/12 blur-3xl" />
        </div>

        <div className="card relative overflow-hidden">
          {/* 브라우저 프레임 바 + 라벨 */}
          <div className="flex items-center gap-2 border-b border-border bg-fg/[0.03] px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
            </span>
            <span className="ml-1 text-[11px] text-subtle">{c.imageLabel}</span>
          </div>
          <Image
            src="/images/homes.png"
            alt="흩어져 있던 현장 업무를 하나의 운영 화면에서 확인하도록 구성한 관리자 대시보드 예시"
            width={2134}
            height={1822}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="block h-auto w-full"
          />
        </div>

        <p className="relative mt-3 text-center text-xs text-subtle/70">{c.caption}</p>
      </motion.div>

      {/* 요약 카드 3개 */}
      <motion.ul variants={fadeUp} className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
        {c.highlights.map((h) => (
          <li key={h} className="card flex items-center gap-2.5 p-4">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="text-sm font-medium text-fg/90">{h}</span>
          </li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
