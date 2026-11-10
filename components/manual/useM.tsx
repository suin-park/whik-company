"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { useI18n } from "@/components/I18nProvider";
import { pick } from "@/lib/manual/text";
import type { Lang } from "@/lib/messages";

/** The manual's light markup as React: **bold**, `code`, [[Key]], [label](/link). */
export function Rich({ text }: { text: string }): ReactNode {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[\[(.+?)\]\]|\[([^\]]+)\]\(([^)]+)\)/g;
  let at = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > at) out.push(<Fragment key={i++}>{text.slice(at, m.index)}</Fragment>);
    if (m[1] !== undefined) out.push(<b key={i++}>{m[1]}</b>);
    else if (m[2] !== undefined) out.push(<code key={i++}>{m[2]}</code>);
    else if (m[3] !== undefined) out.push(<kbd key={i++} className="manual-kbd">{m[3]}</kbd>);
    else {
      const href = m[5];
      out.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href}>
            {m[4]}
          </Link>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer">
            {m[4]}
          </a>
        ),
      );
    }
    at = m.index + m[0].length;
  }
  if (at < text.length) out.push(<Fragment key={i++}>{text.slice(at)}</Fragment>);
  return <>{out}</>;
}

/** The manual's texts in the site's language: t (plain), r (with its markup). */
export function useM() {
  const { lang } = useI18n();
  const t = (key: string, vars?: Record<string, string | number>) => pick(key, lang, vars);
  const r = (key: string, vars?: Record<string, string | number>) => <Rich text={t(key, vars)} />;
  return { lang, t, r };
}

/** A screenshot in the site's language (the app shown in that language). */
export const shot = (lang: Lang, name: string) => `/manual/${lang}/${name}.jpg`;
