"use client";
import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/messages";
import { homeCopy } from "./homeContent";

export type PlayRequest = { id: string; start?: number; short?: boolean; title: string } | null;

export default function VideoDialog({ video, lang, onClose }: { video: PlayRequest; lang: Lang; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const c = homeCopy(lang);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (video && !d.open) d.showModal();
    if (!video && d.open) d.close();
  }, [video]);

  const start = video?.start ?? 0;
  const external = video ? `https://www.youtube.com/watch?v=${video.id}${start ? `&t=${start}s` : ""}` : "#";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
      }}
      aria-labelledby="player-title"
      className={`home-dialog p-0 bg-[#080a0c] border-[#343c43] ${video?.short ? "w-[min(440px,calc(100%-26px))]" : "w-[min(1100px,calc(100%-32px))]"}`}
    >
      <button type="button" onClick={onClose} aria-label={c.close} className="absolute right-3.5 top-2.5 z-10 grid h-9 w-9 place-items-center bg-[#1f252a] text-2xl font-light">
        ×
      </button>
      <h2 id="player-title" className="m-0 py-5 pl-6 pr-16 text-[15px] font-medium leading-normal tracking-tight">
        {video?.title}
      </h2>
      {video && (
        <iframe
          key={video.id}
          className={`block w-full border-0 bg-black ${video.short ? "aspect-[9/16] max-h-[69svh]" : "aspect-video"}`}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0${start ? `&start=${start}` : ""}`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <div className="flex flex-col gap-2 px-6 py-4 text-[11px] leading-relaxed text-[#929ca5] sm:flex-row sm:items-center sm:justify-between">
        <span>{c.playerHint}</span>
        <a href={external} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-xs text-[#e4ecf3] hover:text-[#a9d0ff]">
          {c.openYoutube} ↗
        </a>
      </div>
    </dialog>
  );
}
