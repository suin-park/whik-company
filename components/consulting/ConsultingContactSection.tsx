"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSlow } from "@/components/motionPresets";

export default function ConsultingContactSection({
  title = "사업 아이디어, 지금 실현해 보세요!",
  description = "간단한 내용을 남겨주시면 1 영업일 내 담당자가 직접 연락드립니다.",
  submitLabel = "무료 컨설팅 신청",
}: {
  title?: string;
  description?: string;
  submitLabel?: string;
}) {
  const [contactLoading, setContactLoading] = useState(false);
  const [contactOk, setContactOk] = useState<null | boolean>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactLoading(true);
    setContactOk(null);
    setContactError(null);

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
      setContactOk(true);
      form.reset();
    } catch (err: unknown) {
      setContactOk(false);
      const message = err instanceof Error ? err.message : String(err);
      setContactError(message || "Failed to send");
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      id="contact"
      className="container py-14 md:py-20"
    >
      <motion.div variants={fadeUp} className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        <p className="text-subtle mt-2">{description}</p>

        <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={handleContactSubmit}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <input
            name="name"
            placeholder="이름"
            className="rounded-xl px-4 py-3 bg-muted/30 placeholder:text-neutral-500 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            required
            maxLength={100}
          />
          <input
            name="company"
            placeholder="회사명(선택)"
            className="rounded-xl px-4 py-3 bg-muted/30 placeholder:text-neutral-500 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            maxLength={200}
          />
          <input
            name="email"
            type="email"
            placeholder="이메일"
            className="rounded-xl px-4 py-3 bg-muted/30 placeholder:text-neutral-500 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            required
          />
          <input
            name="phone"
            placeholder="연락처 (선택)"
            className="rounded-xl px-4 py-3 bg-muted/30 placeholder:text-neutral-500 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            maxLength={50}
          />
          <textarea
            name="message"
            placeholder="문의 내용"
            className="md:col-span-2 rounded-xl px-4 py-3 bg-muted/30 h-36 placeholder:text-neutral-500 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            required
            maxLength={5000}
          />

          <motion.div variants={fadeUpSlow} className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={contactLoading}
              className="inline-flex items-center justify-center rounded-2xl bg-accent text-black px-5 py-3 disabled:opacity-60 transition-opacity"
            >
              {contactLoading ? "전송 중..." : submitLabel}
            </button>

            {contactOk === true && (
              <span className="text-emerald-400 text-sm">문의가 접수되었습니다! 곧 연락드리겠습니다.</span>
            )}
            {contactOk === false && (
              <span className="text-red-400 text-sm">전송 실패: {contactError}</span>
            )}
          </motion.div>
        </form>
      </motion.div>
    </motion.section>
  );
}

