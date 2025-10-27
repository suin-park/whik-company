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
      const value = messages[lang][key];
      // 값이 없으면 키를 반환
      return value !== undefined ? value : key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}







