"use client";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/messages";
import { SUPPORT_EMAIL, copy, services, type ServiceKey } from "./businessContent";

type Pick = ServiceKey | "other";

/** Support request form; posts to the site's existing /api/contact mailer. */
export default function RequestDialog({ open, initial, lang, onClose }: { open: boolean; initial: Pick; lang: Lang; onClose: () => void }) {
  const c = copy[lang];
  const ref = useRef<HTMLDialogElement>(null);
  const [pick, setPick] = useState<Pick>(initial);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setPick(initial);
      setState("idle");
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open, initial]);

  const typeLabel = (p: Pick) => (p === "other" ? c.other : services.find((s) => s.key === p)!.title[lang]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          company: String(f.get("company") || ""),
          website: String(f.get("website") || ""),
          message: `[기업 지원: ${typeLabel(pick)}]\n\n${String(f.get("message") || "")}`,
        }),
      });
      const json = await res.json().catch(() => ({}));
      setState(res.ok && json.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  };

  const accent = pick === "other" ? "#f5f5f4" : services.find((s) => s.key === pick)!.accent;
  const field =
    "w-full border border-white/12 bg-white/[.03] px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/30 focus:border-[var(--acc)] focus:bg-white/[.05]";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
      }}
      style={{ "--acc": accent } as React.CSSProperties}
      className="home-dialog biz-dialog w-[min(620px,calc(100%-24px))] border-white/12 bg-[#101316] p-0"
    >
      <span aria-hidden className="block h-[2px] w-full bg-[var(--acc)] transition-colors duration-500" />
      <button type="button" onClick={onClose} aria-label={c.close} className="absolute right-3 top-4 z-10 grid h-9 w-9 place-items-center text-2xl font-light text-white/70 hover:text-white">
        ×
      </button>

      {state === "sent" ? (
        <div className="px-7 py-14 text-center md:px-10">
          <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-[var(--acc)] text-2xl text-[#0b0d0f]">✓</span>
          <h2 className="m-0 text-2xl font-semibold tracking-[-0.03em]">{c.sent}</h2>
          <p className="mt-3 text-[15px] text-white/60">{c.sentBody}</p>
          <button type="button" onClick={onClose} className="mt-8 inline-flex min-h-[46px] items-center bg-[#f5f5f4] px-7 text-sm font-bold text-[#0b0d0f] hover:bg-[var(--acc)]">
            {c.done}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="px-6 pb-7 pt-8 md:px-10 md:pb-9 md:pt-10">
          <p className="m-0 text-[10px] font-semibold tracking-[0.22em] text-[var(--acc)]">WHIK FOR BUSINESS</p>
          <h2 className="m-0 mt-3 text-[26px] font-semibold tracking-[-0.04em] md:text-[30px]">{c.formTitle}</h2>
          <p className="m-0 mt-2 text-sm text-white/55">{c.formBody}</p>

          <fieldset className="m-0 mt-7 border-0 p-0">
            <legend className="mb-3 text-xs text-white/50">{c.type}</legend>
            <div className="flex flex-wrap gap-2">
              {([...services.map((s) => s.key), "other"] as Pick[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={pick === p}
                  onClick={() => setPick(p)}
                  className={`border px-3.5 py-2 text-[13px] transition ${pick === p ? "border-[var(--acc)] bg-[var(--acc)] font-semibold text-[#0b0d0f]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
                >
                  {typeLabel(p)}
                </button>
              ))}
            </div>
          </fieldset>

          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs text-white/50">{c.name} *</span>
              <input name="name" required maxLength={100} autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs text-white/50">{c.email} *</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs text-white/50">{c.company}</span>
              <input name="company" maxLength={200} autoComplete="organization" className={field} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs text-white/50">{c.message} *</span>
              <textarea name="message" required maxLength={4800} rows={5} placeholder={c.messagePh} className={`${field} resize-y`} />
            </label>
          </div>

          {state === "failed" && (
            <p role="alert" className="m-0 mt-4 text-[13px] text-[#ff8a7a]">
              {c.failed}{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-2">
                {SUPPORT_EMAIL}
              </a>
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-4">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-xs text-white/45 hover:text-white">
              {SUPPORT_EMAIL} ↗
            </a>
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex min-h-[48px] items-center gap-2 bg-[#f5f5f4] px-7 text-sm font-bold text-[#0b0d0f] transition hover:bg-[var(--acc)] disabled:opacity-60"
            >
              {state === "sending" ? c.sending : c.send}
              <span aria-hidden>↗</span>
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
