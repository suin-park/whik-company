"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { ContractDocument, DOC_CSS, QuoteDocument, SignaturePad, type ClientInfo, type ContractDoc, type Provider, type QuoteDoc } from "./docs";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

type Quote = QuoteDoc & { id: string; status: string; respondedAt: string | null; respondedName: string | null };
type Contract = ContractDoc & { id: string; status: string; quoteNumber: string | null };
type Data = { client: ClientInfo; provider: Provider; quotes: Quote[]; contracts: Contract[] };

const won = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;
const day = (d?: string | Date | null) => (d ? new Date(d).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }) : "-");

const QS: Record<string, [string, string]> = { SENT: ["확인 대기", "#a9d0ff"], ACCEPTED: ["수락함", "#7fe0c8"], REJECTED: ["거절함", "#ff8a7a"] };
const CS: Record<string, [string, string]> = { SENT: ["서명 필요", "#ffc27a"], CLIENT_SIGNED: ["서명 완료, WHIK 서명 대기", "#a9d0ff"], COMPLETED: ["체결 완료", "#7fe0c8"] };

const ERR: Record<string, string> = {
  INVALID_CODE: "코드가 올바르지 않거나 사용이 중지되었습니다. 담당자에게 받은 코드를 다시 확인해 주세요.",
  TOO_MANY_ATTEMPTS: "시도 횟수가 많아 잠시 막혔습니다. 15분 뒤에 다시 시도해 주세요.",
  NOT_CONFIGURED: "포털을 지금 사용할 수 없습니다. support@whiklab.com으로 연락해 주세요.",
  UPSTREAM_UNREACHABLE: "서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  DOCUMENT_CHANGED: "계약서 내용이 바뀌어 서명할 수 없습니다. 새로고침한 뒤 다시 확인해 주세요.",
  NOT_SIGNABLE: "이미 서명되었거나 서명할 수 없는 계약서입니다.",
  ALREADY_RESPONDED: "이미 응답한 견적서입니다.",
  EXPIRED: "유효기간이 지난 견적서입니다. 담당자에게 문의해 주세요.",
  INVALID_SIGNATURE: "서명을 다시 그려주세요.",
  MISSING_FIELDS: "필수 항목을 확인해 주세요.",
};
const err = (c: string) => ERR[c] ?? "처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";

async function post(url: string, body?: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new Error(json.error || "FAILED");
  return json;
}

function BackButton() {
  const router = useRouter();
  const back = () => {
    // Came from inside the site: go back. Opened directly (link in an email): go to 기업 지원.
    const fromSite = typeof document !== "undefined" && document.referrer.startsWith(window.location.origin);
    if (fromSite && window.history.length > 1) router.back();
    else router.push("/business");
  };
  return (
    <button
      type="button"
      onClick={back}
      aria-label="뒤로 가기"
      className="group relative inline-flex items-stretch overflow-hidden border border-white/12 bg-white/[.03] backdrop-blur-sm transition duration-300 hover:border-[#ffc27a]/60 hover:shadow-[0_0_28px_-6px_rgba(255,194,122,.45)]"
    >
      <span className="relative grid w-10 place-items-center overflow-hidden border-r border-white/12 transition duration-300 group-hover:border-[#ffc27a]/60 group-hover:bg-[#ffc27a]">
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/70 transition duration-300 group-hover:-translate-x-0.5 group-hover:text-[#0b0d0f]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16 10H4M9 5l-5 5 5 5" />
        </svg>
      </span>
      <span className="flex flex-col justify-center px-4 py-2 text-left leading-none">
        <span className="font-mono text-[9px] font-semibold tracking-[0.24em] text-[#ffc27a]/70 transition group-hover:text-[#ffc27a]">BACK</span>
        <span className="mt-1.5 text-[13px] font-semibold text-white/75 transition group-hover:text-white">뒤로 가기</span>
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
    </button>
  );
}

function CodeGate({ onIn }: { onIn: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const format = (v: string) => {
    const raw = v.toUpperCase().replace(/[^0-9A-Z]/g, "").replace(/^WHIK/, "").slice(0, 8);
    return raw.length > 4 ? `${raw.slice(0, 4)}-${raw.slice(4)}` : raw;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await post("/api/business/portal/login", { code: `WHIK-${code}` });
      onIn();
    } catch (x) {
      setError(err((x as Error).message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.section initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="mx-auto flex min-h-[78vh] max-w-[820px] flex-col justify-center px-[6%] pb-24 pt-32">
      <motion.div variants={rise} className="mb-10">
        <BackButton />
      </motion.div>
      <motion.p variants={rise} className="mb-4 text-center text-[11px] font-semibold tracking-[0.22em] text-[#ffc27a]">
        CONTRACTS & QUOTES
      </motion.p>
      <motion.h1 variants={rise} className="m-0 whitespace-nowrap text-center text-[26px] font-semibold tracking-[-0.05em] sm:text-[38px] md:text-[48px]">
        기업 관리 코드를 입력하세요.
      </motion.h1>
      <motion.p variants={rise} className="mx-auto mt-5 break-keep text-center text-[16px] leading-relaxed text-white/65 md:text-[18px]">
        담당자에게 받은 코드로 견적서를 확인하고,<br />계약서에 전자서명할 수 있습니다.
      </motion.p>
      <motion.form variants={rise} onSubmit={submit} className="mx-auto mt-10 w-full max-w-[680px]">
        <label className="portal-code relative flex items-center border border-white/15 bg-white/[.03] transition focus-within:border-[#ffc27a]">
          <span className="select-none pl-5 font-mono text-xl font-semibold tracking-[0.12em] text-white/40 md:text-2xl">WHIK-</span>
          <input
            value={code}
            onChange={(e) => setCode(format(e.target.value))}
            placeholder="XXXX-XXXX"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            aria-label="기업 관리 코드"
            className="h-16 w-full bg-transparent pr-5 font-mono text-xl font-semibold tracking-[0.12em] text-white outline-none placeholder:text-white/20 md:text-2xl"
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 break-keep text-[13px] text-[#ff8a7a]">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy || code.replace("-", "").length !== 8} className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#f5f5f4] text-sm font-bold text-[#0b0d0f] transition hover:bg-[#ffc27a] disabled:opacity-40">
          {busy ? "확인 중…" : "들어가기"} <span aria-hidden>→</span>
        </button>
      </motion.form>
      <motion.p variants={rise} className="mt-8 text-center text-[12px] text-white/40">
        코드가 없으신가요?{" "}
        <Link href="/business" className="text-white/70 underline underline-offset-4 hover:text-white">
          기업 지원 문의
        </Link>
      </motion.p>
    </motion.section>
  );
}

/** One numbered step of the signing panel (outside SignPanel so the signature pad isn't remounted on every keystroke). */
function Step({ n, done, children }: { n: number; done: boolean; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${done ? "bg-[#7fe0c8] text-[#0b0d0f]" : "border border-white/25 text-white/60"}`}>{done ? "✓" : n}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function SignPanel({ k, onSigned }: { k: Contract; onSigned: () => void }) {
  const [read, setRead] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [sig, setSig] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ready = read && name.trim() && sig && agree;

  const sign = async () => {
    if (!ready) return;
    setBusy(true);
    setError(null);
    try {
      await post(`/api/business/portal/contracts/${k.id}/sign`, { signerName: name, signerTitle: title, signature: sig, documentHash: k.documentHash, agree: true });
      onSigned();
    } catch (x) {
      setError(err((x as Error).message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-[#ffc27a]/40 bg-[#ffc27a]/[.04] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">E-SIGNATURE</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">계약서에 서명하기</h3>
      <div className="mt-5 grid gap-5">
        <Step n={1} done={read}>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-white/85">
            <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ffc27a]" />
            계약서 전문(제1조부터 마지막 조항까지)을 모두 읽고 내용을 확인했습니다.
          </label>
        </Step>
        <Step n={2} done={!!name.trim()}>
          <div className="grid gap-2 sm:grid-cols-2">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="서명자 이름 *" className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#ffc27a]" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="직책 (예: 대표이사)" className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#ffc27a]" />
          </div>
          <p className="mt-1.5 text-[11.5px] text-white/45">회사를 대표해 계약할 권한이 있는 분이 서명해 주세요.</p>
        </Step>
        <Step n={3} done={!!sig}>
          <SignaturePad onChange={setSig} height={170} />
        </Step>
        <Step n={4} done={agree}>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-white/85">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ffc27a]" />
            <span>
              위 계약을 전자문서로 체결하며, 이 전자서명이 서면 서명과 같은 효력을 가지는 것에 동의합니다.
              <span className="mt-1 block break-all font-mono text-[10.5px] text-white/40">문서 해시 {k.documentHash}</span>
            </span>
          </label>
        </Step>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-[13px] text-[#ff8a7a]">
          {error}
        </p>
      )}
      <button type="button" onClick={sign} disabled={!ready || busy} className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#ffc27a] text-sm font-bold text-[#0b0d0f] transition hover:bg-[#ffd7a6] disabled:opacity-40">
        {busy ? "서명 중…" : "전자서명 완료하기"}
      </button>
      <p className="mt-3 text-center text-[11px] text-white/40">서명 시각, 접속 IP, 문서 해시가 계약 증명서에 함께 기록됩니다.</p>
    </div>
  );
}

function QuoteAnswer({ q, onDone }: { q: Quote; onDone: () => void }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<"" | "ACCEPTED" | "REJECTED">("");
  const [error, setError] = useState<string | null>(null);
  const answer = async (decision: "ACCEPTED" | "REJECTED") => {
    if (!name.trim()) return setError("확인자 이름을 입력해 주세요.");
    if (decision === "REJECTED" && !confirm("이 견적서를 거절할까요?")) return;
    setBusy(decision);
    setError(null);
    try {
      await post(`/api/business/portal/quotes/${q.id}/respond`, { decision, name, note });
      onDone();
    } catch (x) {
      setError(err((x as Error).message));
    } finally {
      setBusy("");
    }
  };
  return (
    <div className="border border-[#a9d0ff]/35 bg-[#a9d0ff]/[.04] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">YOUR ANSWER</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">견적서 확인</h3>
      <p className="mt-1.5 text-[13px] text-white/55">수락하시면 담당자가 계약서를 준비해 포털로 보내드립니다.</p>
      <div className="mt-4 grid gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="확인자 이름 *" className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#a9d0ff]" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} rows={2} placeholder="전달할 메모 (선택)" className="w-full resize-y border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#a9d0ff]" />
      </div>
      {error && <p className="mt-3 text-[13px] text-[#ff8a7a]">{error}</p>}
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button type="button" disabled={!!busy} onClick={() => answer("ACCEPTED")} className="min-h-[48px] bg-[#a9d0ff] text-sm font-bold text-[#0b0d0f] hover:bg-[#cfe4ff] disabled:opacity-50">
          {busy === "ACCEPTED" ? "처리 중…" : "견적 수락"}
        </button>
        <button type="button" disabled={!!busy} onClick={() => answer("REJECTED")} className="min-h-[48px] border border-white/20 px-5 text-sm text-white/75 hover:border-[#ff8a7a] hover:text-[#ff8a7a] disabled:opacity-50">
          거절
        </button>
      </div>
    </div>
  );
}

export default function PortalPage() {
  useI18n();
  const [state, setState] = useState<"loading" | "gate" | "in">("loading");
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<"quotes" | "contracts">("quotes");
  const [sel, setSel] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async (keepSel = true) => {
    const res = await fetch("/api/business/portal/documents", { cache: "no-store" });
    if (res.status === 401 || res.status === 404) {
      setState("gate");
      return;
    }
    const json = await res.json().catch(() => null);
    if (!json?.ok) {
      setState("gate");
      return;
    }
    setData(json);
    setState("in");
    if (!keepSel) {
      const firstSign = (json.contracts as Contract[]).find((c) => c.status === "SENT");
      if (firstSign) {
        setTab("contracts");
        setSel(firstSign.id);
      } else if (json.quotes.length) setSel(json.quotes[0].id);
      else if (json.contracts.length) {
        setTab("contracts");
        setSel(json.contracts[0].id);
      }
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const items = useMemo(() => (data ? (tab === "quotes" ? data.quotes : data.contracts) : []), [data, tab]);
  const current = items.find((i) => i.id === sel) ?? null;

  // Log contract views for the audit trail.
  useEffect(() => {
    if (tab === "contracts" && current) fetch(`/api/business/portal/contracts/${current.id}/view`, { method: "POST" }).catch(() => {});
  }, [tab, current?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = async () => {
    await post("/api/business/portal/logout").catch(() => {});
    setData(null);
    setSel(null);
    setState("gate");
  };

  const pending = data ? data.quotes.filter((q) => q.status === "SENT").length : 0;
  const toSign = data ? data.contracts.filter((c) => c.status === "SENT").length : 0;

  return (
    <div className="biz-page relative isolate -mt-16 min-h-screen overflow-hidden bg-[#0b0d0f] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-[radial-gradient(50%_60%_at_80%_0%,rgba(255,194,122,.12),transparent_70%),radial-gradient(40%_50%_at_0%_10%,rgba(169,208,255,.07),transparent_70%)]" />
      <span aria-hidden className="biz-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]" />

      {state === "loading" && <div className="grid min-h-[70vh] place-items-center text-sm text-white/40">불러오는 중…</div>}
      {state === "gate" && <CodeGate onIn={() => load(false)} />}

      {state === "in" && data && (
        <div className="mx-auto max-w-[1600px] px-[5%] pb-24 pt-28 md:pt-32">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[#ffc27a]">CLIENT PORTAL</p>
              <h1 className="m-0 text-[30px] font-semibold tracking-[-0.045em] md:text-[40px]">{data.client.companyName}</h1>
              <p className="mt-1.5 text-sm text-white/50">
                {pending > 0 || toSign > 0 ? `확인할 견적서 ${pending}건, 서명할 계약서 ${toSign}건이 있습니다.` : "새로 확인할 문서가 없습니다."}
              </p>
            </div>
            <button type="button" onClick={logout} className="self-start text-sm text-white/50 underline underline-offset-4 hover:text-white md:self-auto">
              나가기
            </button>
          </div>

          <div role="tablist" className="mb-6 flex gap-2 border-b border-white/10">
            {(
              [
                ["quotes", "견적 확인", data.quotes.length, pending],
                ["contracts", "계약 진행", data.contracts.length, toSign],
              ] as const
            ).map(([k, l, n, badge]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                type="button"
                onClick={() => {
                  setTab(k);
                  const list = k === "quotes" ? data.quotes : data.contracts;
                  setSel(list[0]?.id ?? null);
                }}
                className={`-mb-px flex items-center gap-2 border-b-2 px-4 pb-3.5 pt-1 text-[15px] font-semibold transition ${tab === k ? "border-[#ffc27a] text-white" : "border-transparent text-white/45 hover:text-white/80"}`}
              >
                {l} <span className="text-white/35">{n}</span>
                {badge > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ffc27a] px-1.5 text-[11px] font-bold text-[#0b0d0f]">{badge}</span>}
              </button>
            ))}
          </div>

          {notice && (
            <div role="status" className="mb-5 border border-[#7fe0c8]/40 bg-[#7fe0c8]/[.07] px-4 py-3 text-sm text-[#bff3e5]">
              {notice}
            </div>
          )}

          {items.length === 0 ? (
            <div className="border border-dashed border-white/12 px-6 py-20 text-center text-sm text-white/45">
              {tab === "quotes" ? "아직 받은 견적서가 없습니다." : "아직 받은 계약서가 없습니다."}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
              <ul className="m-0 grid list-none content-start gap-2 p-0">
                {items.map((it) => {
                  const st = tab === "quotes" ? QS[it.status] : CS[it.status];
                  return (
                    <li key={it.id}>
                      <button
                        type="button"
                        onClick={() => setSel(it.id)}
                        className={`w-full border p-4 text-left transition ${sel === it.id ? "border-[#ffc27a]/60 bg-white/[.05]" : "border-white/10 bg-white/[.02] hover:border-white/25"}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-white/45">{it.number}</span>
                          {st && (
                            <span className="text-[11px] font-semibold" style={{ color: st[1] }}>
                              ● {st[0]}
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 block font-semibold">{it.title}</span>
                        <span className="mt-1 block text-[13px] text-white/55">
                          {won(tab === "quotes" ? (it as Quote).totalAmount : (it as Contract).amount)} | {day(it.sentAt)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {current && (
                <div className="min-w-0">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[13px] text-white/50">브라우저 인쇄에서 &lsquo;PDF로 저장&rsquo;을 고르면 파일로 보관할 수 있습니다.</p>
                    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-semibold hover:border-white/50">
                      출력 / PDF 저장
                    </button>
                  </div>
                  <div className={`grid gap-6 ${(tab === "quotes" && current.status === "SENT") || (tab === "contracts" && current.status === "SENT") ? "2xl:grid-cols-[minmax(0,1fr)_380px]" : ""}`}>
                    <div className="wb-print min-w-0 overflow-x-auto bg-white/[.03] p-3 md:p-6">
                      {tab === "quotes" ? <QuoteDocument q={current as Quote} client={data.client} provider={data.provider} /> : <ContractDocument k={current as Contract} client={data.client} provider={data.provider} />}
                    </div>
                    {tab === "quotes" && current.status === "SENT" && (
                      <div className="2xl:sticky 2xl:top-28 2xl:self-start">
                        <QuoteAnswer
                          q={current as Quote}
                          onDone={async () => {
                            setNotice("견적서 응답을 보냈습니다. 담당자가 확인 후 연락드립니다.");
                            await load();
                          }}
                        />
                      </div>
                    )}
                    {tab === "contracts" && current.status === "SENT" && (
                      <div className="2xl:sticky 2xl:top-28 2xl:self-start">
                        <SignPanel
                          k={current as Contract}
                          onSigned={async () => {
                            setNotice("전자서명이 접수되었습니다. 계약서와 계약 증명서를 출력해 보관하실 수 있습니다.");
                            await load();
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
