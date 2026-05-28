"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../motionPresets";
import { fieldOpsContent } from "./fieldOpsContent";

/** 역할별 화면 — 한 장의 구조 이미지로 대표, 운영팀, 현장 담당자, AI 에이전트 화면을 함께 보여줌. */
export default function FieldOpsRoles() {
  const c = fieldOpsContent.roles;
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

      <motion.div variants={fadeUp} className="mt-8">
        <Image
          src="/images/process2.png"
          alt="대표, 운영팀, 현장 담당자, AI 에이전트가 각자 다른 화면으로 같은 업무 흐름을 보는 운영 시스템 구조"
          width={1672}
          height={941}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-auto w-full rounded-2xl border border-white/[0.08] shadow-soft"
        />
      </motion.div>
    </motion.section>
  );
}
