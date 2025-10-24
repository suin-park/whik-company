"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import type { Lang } from "@/lib/messages";

function useOutside(ref: React.RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && onClose();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose, ref]);
}

type Props = {
  size?: "sm" | "md";
  wide?: boolean;            // 모바일 시트 하단용 가로폭 버튼
  icon?: React.ReactNode;
};

export default function LanguageSwitch({ size = "md", wide = false, icon }: Props) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutside(ref, () => setOpen(false));

  const base = size === "sm" ? "px-2.5 py-1.5 text-xs rounded-lg" : "px-3 py-2 text-sm rounded-xl";
  const width = wide ? "w-full justify-between" : "";

  const options: { code: Lang; label: string }[] = [
    { code: "en", label: "English" },
    { code: "ko", label: "한국어" },
  ];

  return (
    <div ref={ref} className={`relative ${wide ? "w-full" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`${base} ${width} inline-flex items-center gap-2 border border-border bg-bg/80 hover:border-accent`}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Language"
      >
        {icon ?? null}
        {lang === "en" ? "EN" : "KR"}
        <span className="opacity-60">▾</span>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-bg shadow-soft p-1">
          {options.map((o) => (
            <button
              key={o.code}
              onClick={() => { setLang(o.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                lang === o.code ? "bg-accent/20 text-accent" : "hover:bg-muted/40"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}