"use client";
import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-20 border-t border-border py-10">
      <div className="container">
        {/* 모바일 레이아웃 */}
        <div className="flex flex-col gap-4 md:hidden text-sm">
          <div className="flex flex-col items-center gap-2">
            <p className="text-subtle text-center">{t("footer.copyright")}</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs">
            <div className="text-subtle">{t("footer.company_name_full")}</div>
            <div className="text-subtle text-center">
              {t("footer.representative")}: {t("footer.representative_name")}
            </div>
            <div className="text-subtle text-center">
              {t("footer.business_reg_no")}: {t("footer.business_reg_number")}
            </div>
            <div className="text-subtle text-center">
              {t("footer.online_sales_reg_no")}: {t("footer.online_sales_reg_number")}
            </div>
            <div className="text-subtle text-center">
              {t("footer.address_label")}: {t("footer.address")}
            </div>
            <div className="text-subtle text-center">
              {t("footer.phone_label")}: {t("footer.phone")}
            </div>
            <div className="text-subtle text-center">
              {t("footer.customer_service")}:{" "}
              <a
                href={`mailto:${t("footer.customer_service_email")}`}
                className="hover:text-fg underline-offset-2 hover:underline"
              >
                {t("footer.customer_service_email")}
              </a>
            </div>
          </div>
        </div>
        
        {/* 데스크톱 레이아웃 */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:gap-4 text-sm">
          <p className="text-subtle">{t("footer.copyright")}</p>
          <div className="text-right space-y-1 text-xs">
            <div className="text-subtle">{t("footer.company_name_full")}</div>
            <div className="text-subtle">
              {t("footer.representative")}: {t("footer.representative_name")}
            </div>
            <div className="text-subtle">
              {t("footer.business_reg_no")}: {t("footer.business_reg_number")}
            </div>
            <div className="text-subtle">
              {t("footer.online_sales_reg_no")}: {t("footer.online_sales_reg_number")}
            </div>
            <div className="text-subtle">
              {t("footer.address_label")}: {t("footer.address")}
            </div>
            <div className="text-subtle">
              {t("footer.phone_label")}: {t("footer.phone")}
            </div>
            <div className="text-subtle">
              {t("footer.customer_service")}:{" "}
              <a
                href={`mailto:${t("footer.customer_service_email")}`}
                className="hover:text-fg underline-offset-2 hover:underline"
              >
                {t("footer.customer_service_email")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
