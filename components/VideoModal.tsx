"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({
  open,
  onClose,
  title,
  youtubeId, // 예: "03eeHR_qX5E"
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  youtubeId: string;
}) {
  // ESC 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Dim */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-x-4 md:inset-x-16 lg:inset-x-40 top-16 md:top-20
                   bg-bg rounded-2xl border border-border shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="text-sm md:text-base">{title}</div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded-lg border border-transparent hover:border-border"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 16:9 영상 영역 */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

