"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSlow } from "@/components/motionPresets";

export default function ConsultingProcess() {
  const steps = [
    { title: "상담 접수", desc: "요구 사항 브리핑 / 일정 조율" },
    { title: "킥오프", desc: "목표·범위 정의 / 레퍼런스 정리" },
    { title: "기획서", desc: "UX 흐름·기능 명세 초안" },
    { title: "시제품", desc: "작동 데모(PoC) 제작" },
    { title: "소개 자료", desc: "내부 보고·투자 제안 자료" },
    { title: "전달/검수", desc: "납품·피드백 반영" },
  ];

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      id="process"
      className="container py-14 md:py-20"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold">
        프로세스와 비용 구조
      </motion.h2>

      <ol className="mt-6 grid md:grid-cols-6 gap-4">
        {steps.map((s, i) => (
          <motion.li key={s.title} variants={fadeUp} className="card p-4 text-center">
            <div className="mx-auto grid place-items-center w-8 h-8 rounded-full bg-accent text-black font-semibold">
              {i + 1}
            </div>
            <div className="mt-3 font-semibold">{s.title}</div>
            <p className="text-xs text-subtle mt-2">{s.desc}</p>
          </motion.li>
        ))}
      </ol>

      <motion.p variants={fadeUpSlow} className="text-xs text-subtle mt-4">
        * 업종·범위에 따라 견적이 달라질 수 있습니다. 상세 내용은 미팅에서 안내드립니다.
      </motion.p>
    </motion.section>
  );
}

