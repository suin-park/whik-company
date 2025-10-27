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
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) setIdx(startIndex); }, [open, startIndex]);

  // esc/arrow 키
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, idx]);

  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);
  const next = () => setIdx((v) => (v + 1) % images.length);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex items-center justify-center"
      onClick={(e) => { if (e.target === wrapRef.current) onClose(); }}
      ref={wrapRef}
    >
      <div className="relative w-[92vw] max-w-5xl">
        {/* 이미지 */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
          <Image
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt ?? `work ${idx + 1}`}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 92vw, 1024px"
          />
        </div>

        {/* 좌우 화살표 */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 ring-1 ring-white/20"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 ring-1 ring-white/20"
        >
          ›
        </button>

        {/* 닫기 */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1 ring-1 ring-white/20"
        >
          닫기
        </button>

        {/* 인디케이터 */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

