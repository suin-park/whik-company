"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGS, messages, type Lang } from "@/lib/messages";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => any;
};

const I18nContext = createContext<Ctx | null>(null);
export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // saved choice first; on a first visit, the browser's language (Japanese and Chinese browsers get their own language)
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("whik.lang");
    } catch {}
    if (saved && LANGS.some((l) => l.code === saved)) return setLangState(saved as Lang);
    const pref = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((x) => x.toLowerCase());
    const first = pref.find((x) => /^(ko|en|ja|zh)/.test(x)) ?? "ko";
    setLangState(first.startsWith("ja") ? "ja" : first.startsWith("zh") ? "zh" : first.startsWith("en") ? "en" : "ko");
  }, []);

  // keep <html lang> in step so fonts, screen readers and translation tools know the page language
  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)?.html ?? "ko";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("whik.lang", l);
    } catch {}
  };

  const t = useMemo(() => {
    return (key: string) => {
      // Japanese and Chinese only carry the strings they translate; everything else falls back to English
      const own = messages[lang];
      const dict = lang === "ja" || lang === "zh" ? { ...messages.en, ...own } : own;
      
      // 1. flat 키로 먼저 시도 (예: "nav.home")
      if (key in dict) {
        return dict[key];
      }
      
      // 2. dot notation으로 중첩 객체 탐색 (예: "home.ecosystem.title")
      const keys = key.split(".");
      let value: any = dict;
      
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // 키를 찾을 수 없으면 원래 키 반환
          return key;
        }
      }
      
      return value !== undefined ? value : key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}







