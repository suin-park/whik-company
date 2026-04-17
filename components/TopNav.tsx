"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { useI18n } from "./I18nProvider";

const WHIK_AI_LAB_URL = "https://ai.whik.co.kr/";

type SimpleLink = { href: string; label: string; external?: boolean };

function MobileMenu({
  open,
  onClose,
  linksBeforeServices,
  linksAfterServices,
  activePath,
  servicesLabel,
  serviceItems,
}: {
  open: boolean;
  onClose: () => void;
  linksBeforeServices: SimpleLink[];
  linksAfterServices: SimpleLink[];
  activePath: string;
  servicesLabel: string;
  serviceItems: SimpleLink[];
}) {
  // 스크롤 잠금
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const linkClass = (active: boolean) =>
    `block px-4 py-3 rounded-xl text-lg font-medium
     focus:outline-none focus:ring-2 focus:ring-accent/60
     ${active ? "bg-accent/20 text-accent" : "text-fg hover:bg-muted/40"}`;

  const renderLink = (l: SimpleLink) => {
    const active = !l.external && activePath === l.href;
    if (l.external) {
      return (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={`${linkClass(false)} font-medium`}
        >
          {l.label}
        </a>
      );
    }
    return (
      <Link key={l.href} href={l.href} onClick={onClose} className={linkClass(active)}>
        {l.label}
      </Link>
    );
  };

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
            <img src="/logo2.svg" alt="Whik" className="h-6" />
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
            {linksBeforeServices.map((l) => (
              <li key={l.href}>{renderLink(l)}</li>
            ))}

            <li>
              <a
                href={WHIK_AI_LAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`${linkClass(false)} font-medium`}
              >
                {servicesLabel}
              </a>
              <ul className="mt-1 space-y-0.5 border-l border-border ml-4 pl-3">
                {serviceItems.map((item) => (
                  <li key={item.label}>{renderLink(item)}</li>
                ))}
              </ul>
            </li>

            {linksAfterServices.map((l) => (
              <li key={l.href}>{renderLink(l)}</li>
            ))}
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

  const serviceItems: SimpleLink[] = [
    { href: WHIK_AI_LAB_URL, label: t("nav.aiSolutions"), external: true },
    { href: "https://ai.whik.co.kr/sales", label: t("nav.salesSupport"), external: true },
  ];

  const linksBeforeServices: SimpleLink[] = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/products", label: t("nav.products") },
  ];

  const linksAfterServices: SimpleLink[] = [
    { href: "/partnership", label: t("nav.partnership") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="container h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo2.svg" alt="Whik" className="h-6 md:h-8" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {linksBeforeServices.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${pathname === l.href ? "text-accent" : "text-subtle hover:text-fg"}`}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative group">
            <a
              href={WHIK_AI_LAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-subtle hover:text-fg inline-flex items-center gap-1"
            >
              {t("nav.services")}
            </a>
            <div
              className="absolute left-0 top-full pt-2 opacity-0 invisible pointer-events-none
                         group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                         group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto
                         transition-opacity duration-150 z-50"
            >
              <div
                className="min-w-[11rem] rounded-lg border border-border bg-bg py-1 shadow-lg"
                role="menu"
                aria-label={t("nav.services")}
              >
                {serviceItems.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-sm text-fg hover:bg-muted/50"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-fg hover:bg-muted/50"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>

          {linksAfterServices.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${pathname === l.href ? "text-accent" : "text-subtle hover:text-fg"}`}
            >
              {l.label}
            </Link>
          ))}
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
        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          linksBeforeServices={linksBeforeServices}
          linksAfterServices={linksAfterServices}
          activePath={pathname}
          servicesLabel={t("nav.services")}
          serviceItems={serviceItems}
        />
      )}
    </header>
  );
}
