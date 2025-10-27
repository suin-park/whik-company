"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Lang } from "@/lib/messages";

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

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("whik.lang")) as Lang | null;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("whik.lang", l);
  };

  const t = useMemo(() => {
    return (key: string) => {
      const dict = messages[lang];
      
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







