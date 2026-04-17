"use client";

import { useState } from "react";
import QuoteChatModal from "./QuoteChatModal";

export default function ConsultingCtas({
  primaryLabel = "무료 컨설팅 신청",
  secondaryLabel = "AI 상담 챗봇",
}: {
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-2xl bg-accent text-black px-5 py-3"
        >
          {primaryLabel}
        </a>
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="inline-flex items-center justify-center rounded-2xl border border-border bg-muted/30 px-5 py-3 hover:bg-muted/40"
          aria-label="AI 상담 챗봇 열기"
        >
          {secondaryLabel}
        </button>
      </div>

      <QuoteChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

