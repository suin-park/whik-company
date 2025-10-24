"use client";
import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-20 border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-subtle">{t("footer.copyright")}</p>
        <p className="text-subtle">{t("footer.email")}</p>
      </div>
    </footer>
  )
}
