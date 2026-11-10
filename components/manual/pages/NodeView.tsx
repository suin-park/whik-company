"use client";

import Link from "next/link";
import { Fragment, useState, type ReactNode } from "react";
import { Note } from "../ui";
import { useM } from "../useM";
import type { Knob, ManualNode } from "@/lib/manual/data";
import { defaultIn, inLang } from "@/lib/manual/lang";
import { MERGE_GROUPS, MERGE_LEGEND, MERGE_OPS } from "@/lib/manual/mergeOps";

/** The app's help text (tooltips carry a little HTML: <b>, <i>, <br>, &nbsp;) as React, safely. */
function Tip({ text }: { text: string }) {
  const decode = (s: string) =>
    s.replace(/&nbsp;/g, "\u00a0").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  const out: ReactNode[] = [];
  const re = /<(b|i|em|strong)>(.*?)<\/\1>|<br\s*\/?>|<[^>]+>/gis;
  let at = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > at) out.push(<Fragment key={i++}>{decode(text.slice(at, m.index))}</Fragment>);
    const tag = m[1]?.toLowerCase();
    if (tag === "b" || tag === "strong") out.push(<b key={i++} className="font-semibold text-white">{decode(m[2])}</b>);
    else if (tag === "i" || tag === "em") out.push(<i key={i++}>{decode(m[2])}</i>);
    else if (/^<br/i.test(m[0])) out.push(<br key={i++} />);
    // (any other tag: left out, its text kept by the next slice)
    at = m.index + m[0].length;
  }
  if (at < text.length) out.push(<Fragment key={i++}>{decode(text.slice(at))}</Fragment>);
  return <>{out}</>;
}

function Pending() {
  const { t } = useM();
  return (
    <span className="ml-2 align-middle text-[11px] text-white/35">
      {t("c.pending")}
    </span>
  );
}

/** A knob's choices: a few as small pills; many folded into a table of name and value. */
function Choices({ choices }: { choices: NonNullable<Knob["choices"]> }) {
  const { t, lang } = useM();
  const [open, setOpen] = useState(() => choices.some((c) => !!c.hint));  // (formulas: shown at once)
  const name = (c: (typeof choices)[number]) => (lang === "en" ? c.en : ((c as unknown as Record<string, string | null>)[lang] ?? c.en));
  const hint = (c: (typeof choices)[number]) => (c.hint ? ((c.hint as Record<string, string | null>)[lang] ?? c.hint.en) : "");
  const withHints = choices.some((c) => c.hint);
  if (choices.length <= 6 && !withHints)
    return (
      <span className="mt-2 block text-[13px] text-white/50">
        <span className="mr-2 text-[11px] font-semibold tracking-[0.12em] text-white/35">{t("n.choicesLabel")}</span>
        <span className="text-white/75">{choices.map(name).join(", ")}</span>
      </span>
    );
  return (
    <span className="mt-2 block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#a9d0ff] hover:text-white"
      >
        {open ? t("n.hide") : t("n.choices", { n: choices.length })}
        <span aria-hidden className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && withHints ? (
        // each choice with its formula: a table of name, value and formula
        <span className="mt-3 block overflow-hidden rounded-xl border border-white/[0.08]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-white/[0.03] text-left text-[11px] tracking-[0.12em] text-white/40">
                <th className="px-3 py-2 font-semibold">{t("n.th.choice")}</th>
                <th className="px-3 py-2 font-semibold">{t("n.th.value")}</th>
                <th className="px-3 py-2 font-semibold">{t("n.th.formula")}</th>
              </tr>
            </thead>
            <tbody>
              {choices.map((c) => (
                <tr key={c.en} className="border-t border-white/[0.06]">
                  <td className="whitespace-nowrap px-3 py-2 text-white/90">{name(c)}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[12px] text-white/45">{c.en}</td>
                  <td className="px-3 py-2 font-mono text-[12px] text-[#c8d8ec]">{hint(c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
      ) : open ? (
        <span className="mt-3 grid max-w-[560px] overflow-hidden rounded-xl border border-white/[0.08] sm:grid-cols-2">
          {choices.map((c) => (
            <span key={c.en} className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] px-3 py-2 text-[13px] sm:border-r">
              <span className="break-keep text-white/90">{name(c)}</span>
              {name(c) !== c.en ? <span className="shrink-0 font-mono text-[11px] text-white/35">{c.en}</span> : null}
            </span>
          ))}
        </span>
      ) : null}
    </span>
  );
}

/** Merge and Comp operations: grouped by what they are for, each with its formula and what it does. */
function MergeTable({ choices }: { choices: NonNullable<Knob["choices"]> }) {
  const { t, lang } = useM();
  const have = new Set(choices.map((c) => c.en));
  const name = (en: string) => {
    const c = choices.find((x) => x.en === en) as unknown as Record<string, string | null> | undefined;
    return (lang === "en" ? en : c?.[lang]) ?? en;
  };
  return (
    <span className="block overflow-hidden rounded-xl border border-white/[0.08]">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-white/[0.03] text-left text-[11px] tracking-[0.12em] text-white/40">
            <th className="w-[26%] px-4 py-2.5 font-semibold">{t("n.th.choice")}</th>
            <th className="w-[34%] px-4 py-2.5 font-semibold">{t("n.th.formula")}</th>
            <th className="px-4 py-2.5 font-semibold">{t("n.th.desc")}</th>
          </tr>
        </thead>
        {MERGE_GROUPS.map((g) => {
          const ops = g.ops.filter((o) => have.has(o) && MERGE_OPS[o]);
          if (!ops.length) return null;
          return (
            <tbody key={g.key}>
              <tr className="border-t border-white/[0.08]">
                <td colSpan={3} className="px-4 pb-1.5 pt-4 text-[11px] font-semibold tracking-[0.16em] text-[#a9d0ff]">
                  {g.title[lang]}
                </td>
              </tr>
              {ops.map((o) => (
                <tr key={o} className="border-t border-white/[0.05] align-top">
                  <td className="px-4 py-2.5">
                    <span className="block text-white">{name(o)}</span>
                    {name(o) !== o ? <span className="font-mono text-[11px] text-white/35">{o}</span> : null}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[12.5px] leading-[1.7] text-[#d6e6fa]">
                    {MERGE_OPS[o].f.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-2.5 leading-[1.65] text-[#b8bfc6]">{MERGE_OPS[o].d[lang]}</td>
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    </span>
  );
}

function KnobRow({ k, cls }: { k: Knob; cls: string }) {
  const { t, lang } = useM();
  const label = inLang(k, "label", lang);
  const tip = inLang(k, "tooltip", lang);
  const def = defaultIn(k, lang, t("n.on"), t("n.off"));
  // (Merge and Comp's operation: a row like the others, its operations table opening below it)
  const mergeOp = (cls === "Merge" || cls === "Comp") && k.name === "operation" && !!k.choices;
  const [open, setOpen] = useState(false);
  return (
    <>
    <tr>
      <td className="w-[30%]">
        <span className="block font-semibold text-white">{label.text}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-white/35">{k.name}</span>
      </td>
      <td>
        {mergeOp ? (
          <span>
            {MERGE_LEGEND[lang]}
            <span className="mt-2 block">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#a9d0ff] hover:text-white"
              >
                {open ? t("n.hide") : t("n.choices", { n: k.choices!.length })}
                <span aria-hidden className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
            </span>
          </span>
        ) : tip.text ? (
          <span className={tip.fallback ? "text-white/50" : undefined}>
            <Tip text={tip.text} />
            {tip.fallback ? <Pending /> : null}
          </span>
        ) : (
          <span className="text-white/30">{t("n.nodesc")}</span>
        )}
        {!mergeOp && k.choices && k.choices.length ? <Choices choices={k.choices} /> : null}
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
    {mergeOp && open ? (
      <tr>
        <td colSpan={3} className="!pt-0">
          <MergeTable choices={k.choices!} />
        </td>
      </tr>
    ) : null}
    </>
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
          <Tip text={help.text} />
          {help.fallback ? <Pending /> : null}
        </p>
        <dl className="mb-0 mt-8 grid grid-cols-1 border-y border-white/[0.08] sm:grid-cols-[2fr_1fr_1fr]">
          {[
            [t("n.inputs"), n.inputs.length ? n.inputs.map((i) => i.label).join(", ") : t("n.none2")],
            [t("n.output"), n.output || t("n.none2")],
            [t("n.options"), String(knobCount)],
          ].map(([k, v], i) => (
            <div key={k} className={`py-4 sm:px-5 ${i === 0 ? "sm:pl-0" : "border-t border-white/[0.08] sm:border-l sm:border-t-0"}`}>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-white/40">{k}</dt>
              <dd className="m-0 mt-1.5 text-[15px] font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
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
                    <KnobRow key={k.name} k={k} cls={n.cls} />
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
