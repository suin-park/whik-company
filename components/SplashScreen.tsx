"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 1800; // 애니메이션 총 길이
const HIDE_DELAY = 300;   // 페이드아웃 여유

type Props = {
  /** 개발 중엔 매번 표시, 배포에선 1회 표시로 바꾸고 싶을 때 false로 */
  always?: boolean;
};

export default function SplashScreen({ always = true }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // always=true면 매 새로고침마다 표시.
    // 배포에서 1회만 표시하려면 always=false로 넘기고 sessionStorage 사용.
    if (!always) {
      const KEY = "whik_seen_splash";
      const seen = sessionStorage.getItem(KEY);
      if (seen) {
        setShow(false);
        return;
      }
      sessionStorage.setItem(KEY, "1");
    }

    const t = setTimeout(() => setShow(false), DURATION_MS + HIDE_DELAY);
    return () => clearTimeout(t);
  }, [always]);

  // 접근성: 모션 줄이기면 스킵
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-neutral-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="WHIK intro"
        >
          <div className="relative w-[260px] h-[120px] sm:w-[320px] sm:h-[150px]">
            <motion.div
              className="absolute -inset-6 rounded-[24px] bg-gradient-to-tr from-orange-500/10 via-white/5 to-transparent blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.2, repeat: 1 }}
            />
            <motion.img
              src="/logo.svg"
              alt="WHIK"
              width={320}
              height={150}
              className="relative mx-auto block"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: [0.85, 1.04, 1], filter: ["blur(6px)","blur(0px)","blur(0px)"] }}
              transition={{ duration: 0.9, times: [0, 0.6, 1], ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 -bottom-3 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/80 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0.6] }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
            />
            <motion.div
              className="mt-6 text-center text-sm text-neutral-300/80"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              Create Faster. Move with Whik.
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
