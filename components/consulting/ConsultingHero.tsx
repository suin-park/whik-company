"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSlow, hoverLift } from "@/components/motionPresets";
import ConsultingCtas from "./ConsultingCtas";

export default function ConsultingHero({
  titleLines = ["아이디어 기획 2주,", "시제품 제작 2주.", "한 달 안에 사업", "프로토타입 완성하기!"],
  subtitle = "AI 기반 사업 기획부터 시제품 제작, 소개 자료까지 원스톱으로 제공합니다.",
}: {
  titleLines?: string[];
  subtitle?: string;
}) {
  return (
    <>
      <motion.section
        variants={staggerContainer(0.05, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-6">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-semibold leading-relaxed">
            <span className="block">{titleLines[0]}</span>
            <span className="block">{titleLines[1]}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-300">
              {titleLines[2]}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-300">
              {titleLines[3]}
            </span>
          </motion.h1>

          <motion.p variants={fadeUpSlow} className="text-subtle max-w-xl text-base md:text-lg">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUpSlow}>
            <ConsultingCtas />
          </motion.div>

          <motion.div variants={fadeUpSlow} className="flex items-center gap-3 pt-1 text-xs text-subtle">
            <div className="h-px w-10 bg-border" /> Made with Whik Lab
          </motion.div>
        </div>

        <motion.a
          href="https://ai.whik.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUpSlow}
          className="card p-0 rounded-2xl overflow-hidden group block cursor-pointer"
          {...hoverLift}
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src="/images/3d-thumb2.png"
              alt="Whik 사례 미리보기"
              fill
              className="object-cover object-left-top transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6 md:p-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-subtle">Whik AI Lab</div>
              <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs text-accent">
                빠르게 시작
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                기획부터 데모까지
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-fuchsia-300">
                  실행 가능한 형태로 정리
                </span>
              </h3>
              <p className="text-sm md:text-base text-subtle">
                복잡한 기술보다 “지금 필요한 결과물”을 기준으로 진행합니다.
              </p>
            </div>
          </div>
        </motion.a>
      </motion.section>
    </>
  );
}

