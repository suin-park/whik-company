"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  fadeUp,
  fadeUpSlow,
  hoverLift,
} from "@/components/motionPresets";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Failed to send");
      setOk(true);
      form.reset();
    } catch (err: any) {
      setOk(false);
      setError(err.message || "Failed to send");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-10 md:py-14 max-w-2xl">
      {/* Hero */}
      <motion.section
        variants={staggerContainer(0.05, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.h1 variants={fadeUp} className="text-2xl md:text-3xl">
          {t("contact.title")}
        </motion.h1>
        <motion.p variants={fadeUpSlow} className="text-subtle mt-2">
          {t("contact.subtitle")}
        </motion.p>
      </motion.section>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        className="card p-4 md:p-6 mt-6 space-y-3 md:space-y-4"
        variants={staggerContainer(0.08, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* honeypot (화면에 안 보이게) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <motion.div variants={fadeUp}>
          <input
            name="name"
            placeholder={t("contact.name")}
            className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            required
            maxLength={100}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <input
            name="email"
            type="email"
            placeholder={t("contact.email")}
            className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            required
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <input
            name="company"
            placeholder={t("contact.company")}
            className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            maxLength={200}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <textarea
            name="message"
            placeholder={t("contact.message")}
            rows={6}
            className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow"
            required
            maxLength={5000}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <motion.button
            type="submit"
            disabled={loading}
            className="px-4 py-2 md:px-5 md:py-3 rounded-2xl bg-accent text-black text-sm md:text-base disabled:opacity-60 transition-opacity"
            {...hoverLift}
          >
            <span className="inline-flex items-center gap-2">
              {/* 로딩 스피너 */}
              <AnimatePresence>
                {loading && (
                  <motion.span
                    className="inline-block h-4 w-4 rounded-full border-2 border-black/40 border-t-black"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                )}
              </AnimatePresence>
              {loading ? t("contact.sending") : t("contact.send")}
            </span>
          </motion.button>

          {/* 성공/실패 메시지 애니메이션 */}
          <AnimatePresence mode="popLayout">
            {ok === true && (
              <motion.span
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-emerald-400 text-sm inline-flex items-center gap-1"
              >
                {/* 체크 아이콘 드로잉 */}
                <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </motion.svg>
                {t("contact.success")}
              </motion.span>
            )}
            {ok === false && (
              <motion.span
                key="fail"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-red-400 text-sm"
              >
                Failed: {error}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.form>

      {/* 아래 서브 정보(선택): 연락처/메일 블록 등을 추가하려면 여기에 fadeUp으로 더 배치 가능 */}
    </div>
  );
}
