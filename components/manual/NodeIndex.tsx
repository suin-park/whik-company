"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useM } from "./useM";

/** A node in the list: its summary in each language (null: not translated, English shown). */
export type IndexNode = { cls: string; slug: string; category: string; summary: Record<string, string | null> };
export type IndexCategory = { id: string; count: number };

/** All nodes by category, with a search over names and descriptions. */
export default function NodeIndex({ nodes, categories }: { nodes: IndexNode[]; categories: IndexCategory[] }) {
  const { t, lang } = useM();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const needle = q.trim().toLowerCase();
  const sum = (n: IndexNode) => n.summary[lang] ?? n.summary.en ?? "";
  const shown = useMemo(
    () =>
      nodes.filter(
        (n) =>
          (!cat || n.category === cat) &&
          (!needle ||
            n.cls.toLowerCase().includes(needle) ||
            Object.values(n.summary).some((s) => s?.toLowerCase().includes(needle)) ||
            t(`cat.${n.category}`).toLowerCase().includes(needle)),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, cat, needle, lang],
  );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-1 mb-10 bg-[#0e0f12]/90 px-1 py-4 backdrop-blur-md">
        <div className="flex items-stretch overflow-hidden rounded-2xl border border-white/12 bg-[#121417] focus-within:border-[#a9d0ff]/60">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">{t("n.search")}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("n.search")}
              className="w-full bg-transparent px-5 py-4 text-[15px] text-white outline-none placeholder:text-white/35"
            />
          </label>
          <label className="relative flex shrink-0 items-center border-l border-white/10">
            <span className="sr-only">{t("n.allcats")}</span>
            <select
              value={cat ?? ""}
              onChange={(e) => setCat(e.target.value || null)}
              className="h-full cursor-pointer appearance-none bg-transparent py-0 pl-4 pr-9 text-[14px] text-white/80 outline-none"
            >
              <option value="" className="bg-[#121417]">
                {t("n.allcats")}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#121417]">
                  {t(`cat.${c.id}`)} ({c.count})
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-3.5 text-[11px] text-white/45">
              ▾
            </span>
          </label>
        </div>
        <p className="mb-0 mt-2.5 text-[12px] text-white/40">
          {needle || cat ? t("n.found", { n: shown.length }) : t("n.total", { n: nodes.length })}
        </p>
      </div>

      {categories
        .filter((c) => shown.some((n) => n.category === c.id))
        .map((c) => (
          <section key={c.id} id={c.id.toLowerCase()} className="mb-14 scroll-mt-48">
            <div className="mb-5 flex items-baseline gap-4 border-b border-white/[0.08] pb-3">
              <h2 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{t(`cat.${c.id}`)}</h2>
              <span className="text-[12px] tracking-[0.18em] text-white/35">{c.id.toUpperCase()}</span>
              <span className="ml-auto hidden text-[13px] text-[#8c939a] md:block">{t(`catb.${c.id}`)}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {shown
                .filter((n) => n.category === c.id)
                .map((n) => (
                  <Link
                    key={n.cls}
                    href={`/manual/nodes/${n.slug}`}
                    className="group rounded-2xl border border-white/[0.08] bg-[#111316] p-4 no-underline transition-colors hover:border-[#a9d0ff]/50 hover:bg-[#14171b]"
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-[15px] font-semibold text-white">{n.cls}</span>
                      <span aria-hidden className="text-[#a9d0ff] opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </span>
                    <span
                      className={`mt-1.5 line-clamp-2 block text-[13px] leading-[1.6] ${
                        lang === "en" || n.summary[lang] ? "text-[#a6adb4]" : "text-white/40"
                      }`}
                    >
                      {sum(n)}
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      {shown.length === 0 ? <p className="text-white/50">{t("n.none")}</p> : null}
    </div>
  );
}
