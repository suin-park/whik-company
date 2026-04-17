"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, hoverLift } from "@/components/motionPresets";

export default function ConsultingProblems() {
  const items = [
    "어디서부터 AI를 도입해야 할지 모르겠습니다",
    "내부에 개발 리소스가 부족합니다",
    "투자자·고객에게 보여줄 시제품이 필요합니다",
  ];

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="container py-14 md:py-20"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold">
        많은 기업이 이런 고민을 합니다
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {items.map((t) => (
          <motion.div
            key={t}
            variants={fadeUp}
            {...hoverLift}
            className="card p-6 grid place-items-center text-center"
          >
            <div className="text-base md:text-lg font-medium">{t}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

