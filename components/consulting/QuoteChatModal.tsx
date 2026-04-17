"use client";

import { useEffect, useRef, useState } from "react";

type Props = { open: boolean; onClose: () => void };
type ChatMsg = { role: "user" | "ai"; text: string };

const FIRST_MESSAGE =
  "안녕하세요, Whik AI Lab입니다.\n" +
  "아이디어만 있으면 기획 2주, 시제품 2주로 한 달 안에 사업 프로토타입까지 함께 만듭니다.\n" +
  "어떤 아이디어인지 간단하게 알려주세요.\n" +
  "예) 의료 상담 챗봇, 여행 코스 자동 추천, 입점몰 3D 뷰어 등";

const SECOND_PROMPT_PURPOSE_AUDIENCE_FEATURES =
  "좋아요! 아이디어를 조금 더 이해하려고 해요. 아래 세 가지를 알려주세요.\n" +
  "1) 목적: 어떤 문제를 해결하거나 어떤 성과를 내고 싶나요?\n" +
  "2) 대상: 주요 사용자/고객은 누구인가요?\n" +
  "3) 핵심 기능(2~3개): 꼭 들어가야 하는 기능을 적어주세요.\n" +
  "답변 예시)\n" +
  "목적: 온라인 상담 자동화 / 대상: 병원 방문 환자 / 핵심 기능: 증상 입력 챗봇, 의사 연결, 기록 대시보드";

function isTooShort(text: string) {
  const t = (text || "").trim();
  const words = t.split(/\s+/).filter(Boolean);
  return t.length < 20 || words.length < 4;
}

export default function QuoteChatModal({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", text: FIRST_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  if (!open) return null;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setMessages((prev) => [...prev, { role: "user" as const, text: userInput }]);
    setInput("");

    const isFirstUserReply = messages.length === 1;

    if (isFirstUserReply && isTooShort(userInput)) {
      setMessages((prev) => [
        ...prev,
        { role: "ai" as const, text: SECOND_PROMPT_PURPOSE_AUDIENCE_FEATURES },
      ]);
      return;
    }

    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, { role: "user", text: userInput }],
      }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "ai" as const, text: data.reply }]);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className="card w-full max-w-2xl p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="font-semibold">AI 견적 상담</div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-3 py-1 border border-border hover:border-accent text-sm"
          >
            닫기
          </button>
        </div>

        <div ref={scrollRef} className="px-4 py-3 h-80 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "ai"
                  ? "text-accent whitespace-pre-wrap"
                  : "text-fg whitespace-pre-wrap"
              }
            >
              {m.role === "ai" ? "🤖 " : "🙋 "} {m.text}
            </div>
          ))}
        </div>

        <form onSubmit={send} className="flex gap-2 p-3 border-t border-border">
          <input
            className="flex-1 rounded-xl px-3 py-2 bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="원하시는 결과/기간/예산 대략을 알려주세요…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="inline-flex items-center justify-center rounded-xl px-4 bg-accent text-black">
            보내기
          </button>
        </form>

        <div className="px-4 pb-3 text-xs text-subtle">
          결과가 마음에 드시면{" "}
          <a href="#contact" className="underline">
            문의 폼
          </a>
          으로 바로 이어서 제출해 주세요.
        </div>
      </div>
    </div>
  );
}

