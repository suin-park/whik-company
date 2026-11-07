"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { STUDIO_DOWNLOAD_URL, STUDIO_RELEASES_URL } from "./home/homeContent";

type NavLink = { href: string; ko: string; en: string; external?: boolean };

const LINKS: NavLink[] = [
  { href: "/#products", ko: "제품", en: "Products" },
  { href: "/#showcase", ko: "쇼케이스", en: "Showcase" },
  { href: "/#feature-videos", ko: "학습", en: "Learn" },
  { href: STUDIO_RELEASES_URL, ko: "새 소식", en: "What's new", external: true },
  { href: "/business", ko: "기업 지원", en: "For business" },
];

export default function TopNav() {
  const pathname = usePathname();
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !home || scrolled || open;

  const renderLink = (l: NavLink, mobile = false) => {
    const cls = mobile
      ? "block w-full py-[15px] text-base font-semibold hover:text-[#a9d0ff]"
      : "whitespace-nowrap text-sm font-semibold transition-colors hover:text-[#a9d0ff]";
    const label = lang === "en" ? l.en : l.ko;
    return l.external ? (
      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={() => setOpen(false)}>
        {label}
      </a>
    ) : (
      <Link key={l.href} href={l.href} className={cls} onClick={() => setOpen(false)}>
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-[#f5f5f4] transition-colors duration-300 ${
        solid ? "bg-[#0d0f11]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label={lang === "en" ? "Main menu" : "주 메뉴"} className="relative px-[5.5%] md:px-[3.3%]">
        <div className={`flex h-16 items-center justify-between gap-4 border-b md:gap-8 ${solid ? "border-white/10" : "border-white/20"}`}>
          <Link href="/" aria-label="Whik Lab" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo2.svg" alt="Whik Lab" className="h-6 w-auto md:h-7" />
          </Link>

          <div className="mx-auto hidden items-center gap-5 md:flex lg:gap-[38px]">{LINKS.map((l) => renderLink(l))}</div>

          <div className="ml-auto flex items-center gap-4 md:ml-0 md:gap-7">
            <button
              type="button"
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              aria-label={lang === "ko" ? "Switch to English" : "한국어로 변경"}
              title="한국어 / English"
              className="bg-transparent py-3 text-xs md:text-[13px]"
            >
              {lang === "en" ? "EN" : "KR"}
            </button>
            <a
              href={STUDIO_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[35px] items-center justify-center bg-[#a9d0ff] px-[15px] text-xs font-bold text-[#0a141d] transition-colors hover:bg-[#d1e5ff] md:min-h-[38px] md:px-[23px] md:text-[13px]"
            >
              {lang === "en" ? "Download" : "다운로드"}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={lang === "en" ? (open ? "Close menu" : "Open menu") : open ? "메뉴 닫기" : "메뉴 열기"}
              className="flex h-10 w-10 items-center justify-center border border-white/20 bg-transparent md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-navigation" className="absolute inset-x-0 top-16 flex flex-col items-start border-b border-white/20 bg-[#111518] px-[5.5%] pb-6 pt-4 md:hidden">
            {LINKS.map((l) => renderLink(l, true))}
          </div>
        )}
      </nav>
    </header>
  );
}
