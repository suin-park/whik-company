"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 업무 흐름 진단 → 설계 → 구축 → 보고 → 개선을 보여주는 가로형 프로세스 패널.
 *  카드 그리드 반복을 피하고 넓은 단일 패널로 구성. */
export default function FieldOpsApproach() {
  const c = fieldOpsContent.approach;
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
      <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-subtle leading-relaxed">
        {c.desc}
      </motion.p>

      {/* 넓은 단일 패널 */}
      <motion.div variants={fadeUp} className="card relative mt-10 overflow-hidden p-6 md:p-8">
        {/* 은은한 그라데이션 + 라인 배경 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px 280px at 12% 0%, rgba(255,106,0,0.08), transparent 60%), radial-gradient(520px 260px at 92% 100%, rgba(0,212,255,0.07), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 좌측 — 핵심 문장 */}
          <ul className="space-y-3.5">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span className="text-sm text-fg/90 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          {/* 우측 — 운영 리포트 mockup */}
          <ReportMockup title={c.reportTitle} items={c.reportItems} />
        </div>

        {/* 하단 — 5단계 흐름 */}
        <div className="relative mt-8 border-t border-border pt-7">
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-4 hidden h-px bg-border sm:block"
            />
            <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-5">
              {c.steps.map((s) => (
                <li key={s.no} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-semibold text-black ring-4 ring-[#181b20]">
                    {s.no}
                  </span>
                  <span className="text-xs font-medium text-fg/90">{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

/** 운영 리포트 미리보기 — 짧은 라벨 + 막대 + 체크 아이콘 + 작은 수치 카드. */
function ReportMockup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-xl border border-border bg-fg/[0.03] p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-fg/15" />
            <span className="h-2 w-2 rounded-full bg-fg/15" />
            <span className="h-2 w-2 rounded-full bg-accent/40" />
          </span>
          <span className="text-[11px] text-subtle">{title}</span>
        </div>
        <span className="text-[10px] text-subtle/60">이번 달</span>
      </div>

      {/* 자주 지연되는 단계 — 막대 */}
      <div className="mt-3">
        <p className="text-[11px] text-subtle">{items[0]}</p>
        <div className="mt-2 space-y-1.5">
          {[
            { label: "배정", w: "72%" },
            { label: "보고", w: "48%" },
            { label: "정산", w: "30%" },
          ].map((bar) => (
            <div key={bar.label} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-[10px] text-subtle/70">{bar.label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-fg/[0.06]">
                <span className="block h-full rounded-full bg-accent/70" style={{ width: bar.w }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 반복 문의 유형 — 작은 수치 카드 */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-fg/[0.02] px-3 py-2">
          <p className="text-[10px] text-subtle/70">{items[1]}</p>
          <p className="text-sm font-semibold text-accent-blue tabular-nums">5종</p>
        </div>
        <div className="rounded-lg border border-border bg-fg/[0.02] px-3 py-2">
          <p className="text-[10px] text-subtle/70">{items[2]}</p>
          <p className="text-sm font-semibold text-amber-300 tabular-nums">3건</p>
        </div>
      </div>

      {/* 다음 개선 제안 */}
      <div className="mt-2.5 flex items-center justify-between rounded-lg border border-accent/30 bg-accent/[0.05] px-3 py-2">
        <span className="text-[11px] text-fg/90">{items[3]}</span>
        <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
      </div>
    </div>
  );
}
