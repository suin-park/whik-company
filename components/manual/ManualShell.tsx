"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useM } from "./useM";

export type NavCategory = { id: string; ko: string; count: number };

const GUIDE: { href: string; label: string }[] = [
  { href: "/manual", label: "nav.home" },
  { href: "/manual/start", label: "nav.first" },
  { href: "/manual/screen", label: "nav.screen" },
  { href: "/manual/shortcuts", label: "nav.keys" },
];
const HOWTO: { href: string; label: string }[] = [
  { href: "/manual/guides/render", label: "nav.g.render" },
  { href: "/manual/guides/ai-pack", label: "nav.g.ai" },
  { href: "/manual/guides/day-to-night", label: "nav.g.night" },
];

function NavList({ title, items, path }: { title: string; items: { href: string; label: string }[]; path: string }) {
  const { t } = useM();
  return (
    <div className="mb-8">
      <p className="mb-3 mt-0 text-[10px] font-semibold tracking-[0.22em] text-white/40">{title}</p>
      <ul className="m-0 list-none p-0">
        {items.map((i) => {
          const on = path === i.href;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-current={on ? "page" : undefined}
                className={`manual-nav-link block rounded-lg px-3 py-[7px] text-[14px] no-underline transition-colors ${
                  on ? "bg-white/[0.06] font-semibold text-white" : "text-[#a6adb4] hover:text-white"
                }`}
              >
                {t(i.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ManualShell({ categories, children }: { categories: NavCategory[]; children: ReactNode }) {
  const path = usePathname() ?? "/manual";
  const [open, setOpen] = useState(false);
  const { t } = useM();
  useEffect(() => setOpen(false), [path]);

  const nav = (
    <>
      <NavList title={t("nav.start")} items={GUIDE} path={path} />
      <NavList title={t("nav.guides")} items={HOWTO} path={path} />
      <div className="mb-8">
        <p className="mb-3 mt-0 text-[10px] font-semibold tracking-[0.22em] text-white/40">{t("nav.ref")}</p>
        <ul className="m-0 list-none p-0">
          <li>
            <Link
              href="/manual/nodes"
              className={`manual-nav-link block rounded-lg px-3 py-[7px] text-[14px] no-underline ${
                path === "/manual/nodes" ? "bg-white/[0.06] font-semibold text-white" : "text-[#a6adb4] hover:text-white"
              }`}
            >
              {t("nav.all")}
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/manual/nodes#${c.id.toLowerCase()}`}
                className="manual-nav-link flex items-center justify-between rounded-lg px-3 py-[6px] text-[13px] text-[#8c939a] no-underline hover:text-white"
              >
                <span>{t(`cat.${c.id}`)}</span>
                <span className="tabular-nums text-[11px] text-white/30">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="manual-root relative">
      <span aria-hidden className="manual-aura pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" />
      <div className="mx-auto flex w-full max-w-[1440px] gap-10 px-[5.5%] md:px-[3.3%] lg:gap-14">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[240px] shrink-0 overflow-y-auto py-10 pr-2 lg:block">{nav}</aside>
        <div className="min-w-0 flex-1 pb-24 pt-8 md:pt-12">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 text-[13px] text-white/80 lg:hidden"
          >
            <span aria-hidden>☰</span> {t("nav.toc")}
          </button>
          {children}
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-label={t("nav.toc")}>
          <button type="button" aria-label={t("nav.close")} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-y-0 left-0 w-[84%] max-w-[320px] overflow-y-auto border-r border-white/10 bg-[#0d0f11] px-5 py-8">{nav}</div>
        </div>
      ) : null}
    </div>
  );
}
