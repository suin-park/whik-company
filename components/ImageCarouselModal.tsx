"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  images: { src: string; alt?: string }[];
  startIndex?: number;
};

export default function ImageCarouselModal({ open, onClose, images, startIndex = 0 }: Props) {
  const [idx, setIdx] = useState(startIndex);
  const [showUI, setShowUI] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) setIdx(startIndex); }, [open, startIndex]);

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);
  const next = () => setIdx((v) => (v + 1) % images.length);

  // 모바일 스와이프
  const touch = useRef<{x: number; y: number} | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;

    // ↓ 스와이프: 닫기 (세로 90px 이상, 가로 흔들림은 60px 미만)
    if (Math.abs(dy) > 90 && Math.abs(dx) < 60) {
      if (dy > 0) onClose();
      touch.current = null;
      return;
    }

    // ↔ 슬라이드: 이전/다음
    if (Math.abs(dx) > 40 && Math.abs(dy) < 60) {
      dx < 0 ? next() : prev();
    }
    touch.current = null;
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      ref={wrapRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      {/* 닫기 */}
      {showUI && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="닫기"
          className="fixed right-3 top-[max(env(safe-area-inset-top),12px)] md:right-6 md:top-6
                     rounded-full bg-black/60 backdrop-blur border border-white/25 px-4 py-2
                     text-sm text-white shadow-lg active:scale-[0.98] z-[60]"
        >
          닫기
        </button>
      )}

      {/* 이미지 영역: 모바일 full-bleed, 데스크톱 16:9 박스 */}
      <div
        className="absolute inset-0 flex items-center justify-center p-0 md:p-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setShowUI((s) => !s)} // 단일 탭으로 UI 토글
      >
        <div className="relative w-[100vw] h-[100svh] md:w-[92vw] md:max-w-5xl md:h-auto md:aspect-[16/9] rounded-none md:rounded-2xl overflow-hidden ring-0 md:ring-1 md:ring-white/10 bg-black">
          <Image
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt ?? `slide ${idx + 1}`}
            fill
            className="object-contain select-none"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>

        {/* 좌우 화살표: 모바일도 충분히 크게 */}
        {showUI && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="이전"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25
                         w-12 h-12 md:w-14 md:h-14 ring-1 ring-white/25 grid place-items-center text-xl"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="다음"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25
                         w-12 h-12 md:w-14 md:h-14 ring-1 ring-white/25 grid place-items-center text-xl"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* 인디케이터 */}
      {showUI && (
        <div className="fixed bottom-[max(env(safe-area-inset-bottom),14px)] left-0 right-0 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              aria-label={`슬라이드 ${i + 1}`}
              className={`w-2.5 h-2.5 flex-none shrink-0 rounded-full transition-opacity ${i === idx ? "bg-white opacity-100" : "bg-white/45 opacity-70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
