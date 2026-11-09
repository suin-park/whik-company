"use client";
import type { ReactNode } from "react";
import { tx, type Lang, type Tx } from "@/lib/messages";

export const field =
  "w-full border border-white/12 bg-white/[.03] px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-[var(--acc)] focus:bg-white/[.05]";

export function Label({ children, required, hint }: { children: ReactNode; required?: boolean; hint?: string }) {
  return (
    <span className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-[13px] font-semibold text-white/80">
        {children}
        {required && <span className="ml-1 text-[var(--acc)]">*</span>}
      </span>
      {hint && <span className="text-[11px] text-white/40">{hint}</span>}
    </span>
  );
}

/** Single or multi choice rendered as toggle chips. */
export function Chips({ options, value, onChange, multi }: { options: { v: string; l: string }[]; value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean }) {
  const on = (v: string) => (multi ? (value as string[]).includes(v) : value === v);
  const toggle = (v: string) => {
    if (!multi) return onChange(v);
    const cur = value as string[];
    onChange(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
  };
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role={multi ? "checkbox" : "radio"}
          aria-checked={on(o.v)}
          onClick={() => toggle(o.v)}
          className={`border px-3.5 py-2 text-[13px] transition ${on(o.v) ? "border-[var(--acc)] bg-[var(--acc)] font-semibold text-[#0b0d0f]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

export function Consent({ checked, onChange, lang }: { checked: boolean; onChange: (v: boolean) => void; lang: Lang }) {
  return (
    <div className="border border-white/10 bg-white/[.02] p-4">
      <label className="flex cursor-pointer items-start gap-3 text-[13px] text-white/80">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--acc)]" required />
        <span>
          {tx(lang, "개인정보 수집 및 이용에 동의합니다.", "I agree to the collection and use of my personal information.", "個人情報の収集と利用に同意します。", "我同意收集和使用我的个人信息。")} <span className="text-[var(--acc)]">*</span>
          <span className="mt-1.5 block text-[11.5px] leading-relaxed text-white/45">
            {tx(
              lang,
              "수집 항목: 회사명, 담당자 이름, 이메일, 연락처, 문의 내용 | 목적: 문의 확인과 상담 회신 | 보유 기간: 상담 종료 후 1년 (계약 시 관련 법령에 따른 기간). 동의하지 않으실 수 있으며, 이 경우 온라인 문의 대신 support@whiklab.com으로 연락해 주세요.",
              "Collected: company, name, email, phone, message | Purpose: replying to your request | Kept: 1 year after the conversation ends (longer if a contract requires it by law). You may decline and email support@whiklab.com instead.",
              "収集項目: 会社名、ご担当者名、メールアドレス、電話番号、お問い合わせ内容 | 目的: お問い合わせの確認とご返信 | 保有期間: ご相談終了後1年（契約時は関連法令に定める期間）。同意しないこともでき、その場合はオンラインフォームの代わりに support@whiklab.com までご連絡ください。",
              "收集项目：公司名称、负责人姓名、邮箱、联系电话、咨询内容 | 目的：确认咨询并回复 | 保存期限：咨询结束后1年（签订合同时按相关法律规定的期限）。您可以不同意，此时请改为发送邮件至 support@whiklab.com 与我们联系。",
            )}
          </span>
        </span>
      </label>
    </div>
  );
}

export function Done({ title, body, onReset, resetLabel }: { title: string; body: string; onReset: () => void; resetLabel: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[var(--acc)] text-3xl text-[#0b0d0f]">✓</span>
      <h3 className="m-0 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
      <p className="mx-auto mt-3 max-w-md break-keep text-[15px] leading-relaxed text-white/60">{body}</p>
      <button type="button" onClick={onReset} className="mt-8 text-sm text-white/60 underline underline-offset-4 hover:text-white">
        {resetLabel}
      </button>
    </div>
  );
}

const ERR: Record<string, Tx> = {
  MISSING_FIELDS: { ko: "필수 항목을 확인해 주세요.", en: "Please fill in the required fields.", ja: "必須項目をご確認ください。", zh: "请检查必填项。" },
  NOT_CONFIGURED: {
    ko: "지금은 온라인 신청을 받을 수 없습니다. support@whiklab.com으로 보내주세요.",
    en: "Online requests are unavailable right now. Please email support@whiklab.com.",
    ja: "現在オンラインでのお申し込みを受け付けられません。support@whiklab.com までお送りください。",
    zh: "目前无法在线提交申请，请发送邮件至 support@whiklab.com。",
  },
  UPSTREAM_UNREACHABLE: { ko: "서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.", en: "Couldn't reach the server. Please try again shortly.", ja: "サーバーに接続できませんでした。しばらくしてから再度お試しください。", zh: "无法连接服务器，请稍后再试。" },
};
export const errMsg = (code: string, lang: Lang) =>
  ERR[code]?.[lang] ??
  tx(lang, "보내지 못했습니다. 잠시 후 다시 시도하거나 support@whiklab.com으로 보내주세요.", "Couldn't send. Try again or email support@whiklab.com.", "送信できませんでした。再度お試しいただくか support@whiklab.com までお送りください。", "发送失败。请重试或发送邮件至 support@whiklab.com。");
