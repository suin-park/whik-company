"use client"
import { useState } from "react"
import { useI18n } from "@/components/I18nProvider"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)
  const [error, setError] = useState<string | null>(null)
  const { t } = useI18n()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setOk(null)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.error || "Failed to send")
      setOk(true)
      form.reset()
    } catch (err: any) {
      setOk(false)
      setError(err.message || "Failed to send")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10 md:py-14 max-w-2xl">
      <h1 className="text-2xl md:text-3xl">{t("contact.title")}</h1>
      <p className="text-subtle mt-2">{t("contact.subtitle")}</p>

      <form onSubmit={onSubmit} className="card p-4 md:p-6 mt-6 space-y-3 md:space-y-4">
        {/* honeypot (화면에 안보이게) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <input
          name="name"
          placeholder={t("contact.name")}
          className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          required
          maxLength={100}
        />
        <input
          name="email"
          type="email"
          placeholder={t("contact.email")}
          className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          required
        />
        <input
          name="company"
          placeholder={t("contact.company")}
          className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          maxLength={200}
        />
        <textarea
          name="message"
          placeholder={t("contact.message")}
          rows={6}
          className="w-full rounded-xl border border-border bg-transparent px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          required
          maxLength={5000}
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 md:px-5 md:py-3 rounded-2xl bg-accent text-black text-sm md:text-base disabled:opacity-60 transition-opacity"
          >
            {loading ? t("contact.sending") : t("contact.send")}
          </button>

          {ok === true && <span className="text-emerald-400 text-sm">{t("contact.success")}</span>}
          {ok === false && <span className="text-red-400 text-sm">Failed: {error}</span>}
        </div>
      </form>
    </div>
  )
}