"use client";

import Link from "next/link";
import { Note } from "../ui";
import { useM } from "../useM";
import type { Knob, ManualNode } from "@/lib/manual/data";
import { defaultIn, inLang } from "@/lib/manual/lang";

function Pending() {
  const { t } = useM();
  return (
    <span className="ml-2 inline-block rounded-full border border-white/12 px-2 py-0 align-middle text-[10px] tracking-[0.12em] text-white/40">
      {t("c.pending")}
    </span>
  );
}

function KnobRow({ k }: { k: Knob }) {
  const { t, lang } = useM();
  const label = inLang(k, "label", lang);
  const tip = inLang(k, "tooltip", lang);
  const def = defaultIn(k, lang, t("n.on"), t("n.off"));
  return (
    <tr>
      <td className="w-[30%]">
        <span className="block font-semibold text-white">{label.text}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-white/35">{k.name}</span>
      </td>
      <td>
        {tip.text ? (
          <span className={tip.fallback ? "text-white/50" : undefined}>
            {tip.text}
            {tip.fallback ? <Pending /> : null}
          </span>
        ) : (
          <span className="text-white/30">{t("n.nodesc")}</span>
        )}
        {k.choices && k.choices.length ? (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {k.choices.map((c) => {
              const own = lang === "en" ? c.en : (c as unknown as Record<string, string | null>)[lang];
              return (
                <span key={c.en} className="manual-pill">
                  {own ?? c.en}
                </span>
              );
            })}
          </span>
        ) : null}
      </td>
      <td className="w-[22%] text-[13px]">
        <span className="block text-white/70">{t(`kind.${k.kind}`)}</span>
        {def ? <span className="mt-0.5 block text-white/45">{t("n.default", { v: def })}</span> : null}
        {k.range ? (
          <span className="mt-0.5 block text-white/35">
            {k.range[0]} ~ {k.range[1]}
          </span>
        ) : null}
      </td>
    </tr>
  );
}

export default function NodeView({ n, prev, next }: { n: ManualNode; prev?: { cls: string; slug: string }; next?: { cls: string; slug: string } }) {
  const { t, r, lang } = useM();
  const help = inLang(n, "help", lang);
  const knobCount = n.groups.reduce((s, g) => s + g.knobs.length, 0);

  return (
    <article>
      <nav className="mb-8 text-[13px] text-white/45">
        <Link href="/manual/nodes" className="text-white/45 no-underline hover:text-white">
          {t("nav.ref")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/manual/nodes#${n.category.toLowerCase()}`} className="text-white/45 no-underline hover:text-white">
          {t(`cat.${n.category}`)}
        </Link>
      </nav>

      <header className="relative mb-12">
        <span aria-hidden className="manual-num pointer-events-none absolute -right-2 -top-12 select-none font-black italic leading-none">
          {n.cls.slice(0, 2)}
        </span>
        <div className="mb-4 flex items-center gap-4 text-[10px] font-semibold tracking-[0.22em] md:text-[11px]">
          <span className="text-[#a9d0ff]">{n.category.toUpperCase()}</span>
          <span className="block h-px w-14 bg-[#a9d0ff] md:w-20" />
          <span className="text-white/55">{t("n.node")}</span>
        </div>
        <h1 className="m-0 text-[40px] font-semibold tracking-[-0.04em] md:text-[56px]">{n.cls}</h1>
        <p className={`mb-0 mt-5 max-w-[760px] break-keep text-[15px] leading-[1.85] md:text-base ${help.fallback ? "text-white/55" : "text-[#c8cdd2]"}`}>
          {help.text}
          {help.fallback ? <Pending /> : null}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="manual-pill">
            {t("n.inputs")}
            {n.inputs.length ? (
              n.inputs.map((i) => (
                <b key={i.label} className="font-semibold text-white">
                  {i.label}
                </b>
              ))
            ) : (
              <span className="text-white/40">{t("n.none2")}</span>
            )}
          </span>
          <span className="manual-pill">
            {t("n.output")} <b className="font-semibold text-white">{n.output || t("n.none2")}</b>
          </span>
          <span className="manual-pill">
            {t("n.options")} <b className="font-semibold text-white">{knobCount}</b>
          </span>
        </div>
      </header>

      {n.groups.map((g, i) => {
        const title = g.title ? inLang(g, "title", lang).text.replace(/^\//, "") : i === 0 ? t("n.basic") : "";
        return (
          <section key={i} className="mb-10">
            {title ? <h2 className="mb-4 mt-0 text-[18px] font-semibold tracking-[-0.02em] text-white">{title}</h2> : null}
            <div className="overflow-x-auto">
              <table className="manual-table min-w-[620px]">
                <thead>
                  <tr>
                    <th>{t("n.th.opt")}</th>
                    <th>{t("n.th.desc")}</th>
                    <th>{t("n.th.kind")}</th>
                  </tr>
                </thead>
                <tbody>
                  {g.knobs.map((k) => (
                    <KnobRow key={k.name} k={k} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <Note title={t("n.common.t")}>
        <p>{r("n.common.d")}</p>
      </Note>

      <nav className="mt-14 grid gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/manual/nodes/${prev.slug}`} className="rounded-2xl border border-white/[0.08] p-4 no-underline hover:border-[#a9d0ff]/50">
            <span className="block text-[11px] tracking-[0.18em] text-white/40">{t("n.prev")}</span>
            <span className="mt-1 block text-[16px] font-semibold text-white">← {prev.cls}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/manual/nodes/${next.slug}`} className="rounded-2xl border border-white/[0.08] p-4 text-right no-underline hover:border-[#a9d0ff]/50">
            <span className="block text-[11px] tracking-[0.18em] text-white/40">{t("n.next")}</span>
            <span className="mt-1 block text-[16px] font-semibold text-white">{next.cls} →</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
