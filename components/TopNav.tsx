"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "./I18nProvider";

function MobileMenu({
  open, onClose, links, activePath,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  activePath: string;
}) {
  // 스크롤 잠금
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* 스크림: 더 어둡게 + 블러 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* 시트: 상단바 높이(56px)만큼 아래에서 시작 */}
      <div
        className="absolute inset-x-0 top-14 h-[calc(100dvh-56px)]
                   bg-bg border-t border-border rounded-t-2xl shadow-2xl
                   p-4 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Whik" className="h-6" />
            <span className="sr-only">Menu</span>
          </div>
          <button
            aria-label="Close menu"
            className="p-2 rounded-lg border border-border hover:border-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 내비 항목 */}
        <nav className="mt-3 overflow-auto">
          <ul className="space-y-1">
            {links.map((l) => {
              const active = activePath === l.href;
              
              // AI Lab은 새 탭으로 열기
              if (l.href === "/ai-lab") {
                return (
                  <li key={l.href}>
                    <a
                      href="https://ai.whik.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="block px-4 py-3 rounded-xl text-lg font-medium
                                 focus:outline-none focus:ring-2 focus:ring-accent/60
                                 text-fg hover:bg-muted/40"
                    >
                      {l.label}
                    </a>
                  </li>
                );
              }
              
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium
                                focus:outline-none focus:ring-2 focus:ring-accent/60
                                ${active
                                  ? "bg-accent/20 text-accent"
                                  : "text-fg hover:bg-muted/40"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 구분선 */}
          <div className="my-4 border-t border-border" />

          {/* 하단 보조 영역: 언어 토글 크게 */}
          <div className="pt-1">
            <LanguageSwitch wide />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function TopNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
    { href: "/ai-lab", label: t("nav.ailab") },
    { href: "/partnership", label: t("nav.partnership") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="container h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Whik" className="h-6 md:h-8" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            // AI Lab은 새 탭으로 열기
            if (l.href === "/ai-lab") {
              return (
                <a
                  key={l.href}
                  href="https://ai.whik.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-subtle hover:text-fg"
                >
                  {l.label}
                </a>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm ${pathname === l.href ? "text-accent" : "text-subtle hover:text-fg"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right area */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitch size="sm" />
          <button
            aria-label="Open menu"
            className="p-2 rounded-lg border border-border"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <MobileMenu open={open} onClose={() => setOpen(false)} links={links} activePath={pathname} />
      )}
    </header>
  );
}