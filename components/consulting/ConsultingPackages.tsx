"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/components/motionPresets";

export default function ConsultingPackages() {
  const items = [
    {
      n: "1",
      title: "기획 컨설팅",
      desc: "업무·산업 분석 후 적용 가능한 사업 시나리오 정의",
      bullets: ["산출물: AI 도입 기획서, UX 흐름", "워크숍: 킥오프/요구사항 정리"],
    },
    {
      n: "2",
      title: "시제품 제작(PoC)",
      desc: "핵심 기능을 작동하는 데모로 구현",
      bullets: ["산출물: 웹/앱 데모, 시연 영상", "옵션: 샌드박스·목업 연동"],
    },
    {
      n: "3",
      title: "소개 자료 제작",
      desc: "내부 보고·투자 제안용 문서와 페이지 제작",
      bullets: ["산출물: 제안서 PDF, 요약 랜딩", "브랜딩: 썸네일/에셋 제공"],
    },
  ];

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      id="services"
      className="container py-14 md:py-20"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold">
        Whik의 3단계 패키지로 해결합니다
      </motion.h2>

      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {items.map((it) => (
          <motion.article key={it.n} variants={fadeUp} className="card p-6 md:p-7">
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-sky-300/80 to-fuchsia-300/80 text-black font-semibold">
                {it.n}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="text-sm text-subtle mt-2">{it.desc}</p>
                <ul className="mt-3 text-sm text-subtle list-disc list-inside space-y-1">
                  {it.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

