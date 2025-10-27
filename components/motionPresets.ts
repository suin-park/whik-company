"use client";
import { Variants } from "framer-motion";

// 컨테이너: 자식들을 순차 재생
export const staggerContainer = (delay = 0, stagger = 0.06): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay, staggerChildren: stagger, when: "beforeChildren" },
  },
});

// 기본 페이드 업
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
};

// 살짝 늦게
export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// 버튼/카드 호버 리프트
export const hoverLift = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
};

