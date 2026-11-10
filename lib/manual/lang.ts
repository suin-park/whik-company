import type { Knob } from "./data";

/** A field in a language (its _ko, _ja, _zh twin), English when not translated (and whether it fell back). */
export function inLang(obj: object, field: string, lang: string): { text: string; fallback: boolean } {
  const o = obj as Record<string, unknown>;
  const en = (o[field] as string) ?? "";
  if (lang === "en") return { text: en, fallback: false };
  const own = o[`${field}_${lang}`] as string | null | undefined;
  return own ? { text: own, fallback: false } : { text: en, fallback: !!en };
}

/** A knob's default as it reads in a language (on / off and choices in its words). */
export function defaultIn(k: Knob, lang: string, on: string, off: string): string {
  const v = k.default;
  if (v === null || v === undefined || v === "") return "";
  if (k.kind === "bool") return v ? on : off;
  if (k.kind === "enum" && typeof v === "number" && k.choices?.[v]) {
    const c = k.choices[v] as unknown as Record<string, string | null>;
    return (lang === "en" ? c.en : c[lang]) ?? c.en ?? "";
  }
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}
