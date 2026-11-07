"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { Chips, Consent, Done, Label, errMsg, field } from "./formUi";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.95, ease: EASE } } };

const TOPICS = [
  { v: "WHIK Studio 기초", en: "WHIK Studio basics", d: "노드 그래프, 뷰어, 렌더까지 처음부터", den: "Node graph, viewer and rendering from scratch" },
  { v: "영상 합성 실무", en: "Compositing in practice", d: "키잉, 로토, 트래킹, 색 보정", den: "Keying, roto, tracking, grading" },
  { v: "3DGS 공간 합성", en: "3DGS compositing", d: "스캔한 공간을 영상에 합성하기", den: "Bring scanned spaces into footage" },
  { v: "AI 노드 활용", en: "AI nodes", d: "지우기, 매트, 업스케일, 나이 조절", den: "Removal, mattes, upscale, age" },
  { v: "AI 어시스턴트와 자동화", en: "AI assistants & automation", d: "플러그인 만들기, MCP 연결", den: "Plugins by prompt, MCP" },
  { v: "맞춤 커리큘럼", en: "Custom curriculum", d: "팀 프로젝트에 맞춰 구성", den: "Built around your project" },
];
const LEVELS = ["입문", "실무자", "숙련자", "섞여 있음"];
const LEVELS_EN = ["Beginner", "Working", "Advanced", "Mixed"];
const TIMES = ["오전", "오후", "종일", "협의"];
const TIMES_EN = ["Morning", "Afternoon", "Full day", "Flexible"];
const DURATIONS = ["2시간", "4시간", "1일 (8시간)", "2일 이상"];
const DURATIONS_EN = ["2 hours", "4 hours", "1 day", "2+ days"];
const MODES = [
  { v: "onsite", ko: "방문 교육", en: "On site" },
  { v: "online", ko: "온라인", en: "Online" },
  { v: "either", ko: "상관없음", en: "Either" },
];

const T = {
  ko: {
    crumb: "사내 교육 요청",
    label: "IN-HOUSE TRAINING",
    title: ["팀의 손에 맞춘", "실무 교육."] as [string, string],
    body: "팀의 작업 환경과 수준에 맞춰 커리큘럼을 짜고, 실제 프로젝트 예제로 바로 써먹는 교육을 진행합니다.",
    cta: "교육 신청하기",
    stats: [
      ["팀 맞춤", "커리큘럼"],
      ["실습", "중심 진행"],
      ["방문", "또는 온라인"],
    ],
    formLabel: "REQUEST",
    formTitle: "교육 신청",
    formBody: "희망 날짜를 최대 3개까지 골라주세요. 일정을 확인한 뒤 확정 안내를 이메일로 드립니다.",
    topics: "원하는 교육",
    level: "참여자 수준",
    headcount: "예상 참여 인원",
    dates: "희망 날짜",
    datesHint: "최대 3개",
    time: "희망 시간대",
    duration: "교육 시간",
    mode: "진행 방식",
    location: "교육 장소",
    locationPh: "방문 교육일 때 주소 또는 지역",
    company: "회사명",
    name: "담당자 이름",
    email: "이메일",
    phone: "연락처",
    message: "추가로 알려주실 내용",
    messagePh: "사용 중인 장비, 다루는 프로젝트, 꼭 다뤄야 할 주제 등",
    send: "교육 신청하기",
    sending: "보내는 중…",
    doneTitle: "교육 신청이 접수되었습니다.",
    doneBody: "희망 날짜를 확인한 뒤 남겨주신 이메일로 일정 확정을 안내드리겠습니다.",
    again: "다른 신청 작성하기",
    needDate: "희망 날짜를 하나 이상 골라주세요.",
    needTopic: "원하는 교육을 하나 이상 골라주세요.",
  },
  en: {
    crumb: "In-house training",
    label: "IN-HOUSE TRAINING",
    title: ["Hands-on training,", "shaped to your team."] as [string, string],
    body: "We plan the curriculum around your setup and level, and teach with examples from real projects.",
    cta: "Request training",
    stats: [
      ["Tailored", "curriculum"],
      ["Hands-on", "sessions"],
      ["On site", "or online"],
    ],
    formLabel: "REQUEST",
    formTitle: "Training request",
    formBody: "Pick up to three preferred dates. We'll confirm the schedule by email.",
    topics: "Training you want",
    level: "Team level",
    headcount: "Expected attendees",
    dates: "Preferred dates",
    datesHint: "Up to 3",
    time: "Time of day",
    duration: "Length",
    mode: "Format",
    location: "Location",
    locationPh: "Address or area for on-site training",
    company: "Company",
    name: "Your name",
    email: "Email",
    phone: "Phone",
    message: "Anything else",
    messagePh: "Your hardware, projects, must-cover topics",
    send: "Send request",
    sending: "Sending…",
    doneTitle: "Training request received.",
    doneBody: "We'll check your dates and confirm the schedule by email.",
    again: "Write another request",
    needDate: "Pick at least one preferred date.",
    needTopic: "Pick at least one training topic.",
  },
};

export default function TrainingPage() {
  const { lang } = useI18n();
  const t = T[lang];
  const [topics, setTopics] = useState<string[]>([]);
  const [level, setLevel] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("either");
  const [dates, setDates] = useState<string[]>(["", "", ""]);
  const [headcount, setHeadcount] = useState(10);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const minDate = useMemo(() => new Date(Date.now() + 86400000).toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }), []);
  const pick = (arr: string[], en: string[]) => arr.map((v, i) => ({ v, l: lang === "ko" ? v : en[i] }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const chosen = Array.from(new Set(dates.filter(Boolean))).sort();
    if (topics.length === 0) return setError(t.needTopic);
    if (chosen.length === 0) return setError(t.needDate);
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/business/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "TRAINING",
          companyName: f.get("companyName"),
          contactName: f.get("contactName"),
          email: f.get("email"),
          phone: f.get("phone"),
          message: f.get("message"),
          website: f.get("website"),
          details: { topics, level, headcount, preferredDates: chosen, timeOfDay: time, durationHours: duration, mode, location: f.get("location") },
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "FAILED");
      setState("sent");
    } catch (err) {
      setError(errMsg((err as Error).message, lang));
      setState("idle");
    }
  };

  return (
    <div className="biz-page relative isolate -mt-16 overflow-hidden bg-[#0b0d0f] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]" style={{ "--acc": "#a9d0ff" } as React.CSSProperties}>
      {/* hero with photo */}
      <section className="relative isolate min-h-[640px] overflow-hidden md:min-h-[78vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/business/training.jpg" alt="" className="home-hero-image absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" style={{ animationDelay: "0s" }} />
        <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,13,15,.92)_0%,rgba(11,13,15,.6)_45%,rgba(11,13,15,.15)_80%),linear-gradient(0deg,#0b0d0f_0%,transparent_40%)]" />
        <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto flex min-h-[640px] max-w-[1600px] flex-col justify-end px-[6%] pb-16 pt-28 md:min-h-[78vh] md:pb-20">
          <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-auto flex items-center gap-3 pt-6 text-[11px] text-white/55">
            <Link href="/business" className="hover:text-white">
              {lang === "ko" ? "기업 지원" : "For business"}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/80">{t.crumb}</span>
          </motion.nav>
          <motion.p variants={rise} className="mb-5 mt-16 text-[11px] font-semibold tracking-[0.22em] text-[var(--acc)]">
            {t.label}
          </motion.p>
          <h1 className="m-0 break-keep text-[40px] font-semibold leading-[1.1] tracking-[-0.055em] md:text-[clamp(44px,5vw,78px)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={mask} className="block">
                {t.title[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={mask} className="block bg-gradient-to-r from-white to-[var(--acc)] bg-clip-text text-transparent">
                {t.title[1]}
              </motion.span>
            </span>
          </h1>
          <motion.p variants={rise} className="mt-6 max-w-[520px] break-keep text-[15px] leading-[1.8] text-white/70 md:text-[17px]">
            {t.body}
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-wrap items-end gap-10">
            <a href="#request" className="inline-flex min-h-[52px] items-center gap-2 bg-[#f5f5f4] px-7 text-sm font-bold text-[#0b0d0f] transition hover:-translate-y-0.5 hover:bg-[var(--acc)]">
              {t.cta} <span aria-hidden>→</span>
            </a>
            <dl className="flex gap-8">
              {t.stats.map(([a, b]) => (
                <div key={a}>
                  <dt className="text-lg font-semibold text-white">{a}</dt>
                  <dd className="m-0 text-[12px] text-white/55">{b}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      </section>

      {/* topics */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-[1600px] px-[6%] py-16">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
          {TOPICS.map((tp, i) => (
            <motion.button
              key={tp.v}
              variants={rise}
              type="button"
              onClick={() => {
                setTopics((cur) => (cur.includes(tp.v) ? cur : [...cur, tp.v]));
                document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`dev-tile group relative overflow-hidden border p-5 text-left md:p-7 ${topics.includes(tp.v) ? "border-[var(--acc)] bg-[var(--acc)]/[.06]" : "border-white/[.08] bg-[#101316]"}`}
            >
              <span className="text-[10px] tabular-nums tracking-[0.18em] text-[var(--acc)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 mt-4 text-[16px] font-semibold tracking-[-0.03em] md:text-xl">{lang === "ko" ? tp.v : tp.en}</h3>
              <p className="m-0 mt-2 break-keep text-[12.5px] leading-[1.6] text-white/55 md:text-sm">{lang === "ko" ? tp.d : tp.den}</p>
              <span className="mt-4 inline-block text-[12px] font-semibold text-[var(--acc)] opacity-0 transition group-hover:opacity-100">{topics.includes(tp.v) ? "✓" : "+"} {lang === "ko" ? "신청서에 담기" : "Add to request"}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* form */}
      <section id="request" className="mx-auto max-w-[1600px] scroll-mt-20 px-[6%] pb-24 pt-6 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[var(--acc)]">{t.formLabel}</p>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-0.045em] md:text-[clamp(32px,3.2vw,48px)]">{t.formTitle}</h2>
            <p className="mt-4 max-w-[420px] break-keep text-[15px] leading-[1.75] text-white/60">{t.formBody}</p>
          </div>
          <div className="border border-white/10 bg-[#0f1215]">
            <span aria-hidden className="block h-[2px] bg-gradient-to-r from-[var(--acc)] to-[#7fe0c8]" />
            {state === "sent" ? (
              <Done title={t.doneTitle} body={t.doneBody} onReset={() => setState("idle")} resetLabel={t.again} />
            ) : (
              <form onSubmit={submit} className="grid gap-6 p-6 md:p-10">
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
                <div>
                  <Label required hint={lang === "ko" ? "여러 개 선택" : "Pick any"}>
                    {t.topics}
                  </Label>
                  <Chips multi options={TOPICS.map((tp) => ({ v: tp.v, l: lang === "ko" ? tp.v : tp.en }))} value={topics} onChange={(v) => setTopics(v as string[])} />
                </div>
                <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                  <div>
                    <Label>{t.level}</Label>
                    <Chips options={pick(LEVELS, LEVELS_EN)} value={level} onChange={(v) => setLevel(v as string)} />
                  </div>
                  <div>
                    <Label required>{t.headcount}</Label>
                    <div className="flex items-center border border-white/12 bg-white/[.03]">
                      <button type="button" aria-label="-" onClick={() => setHeadcount((n) => Math.max(1, n - 1))} className="h-12 w-12 text-xl text-white/70 hover:text-white">
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={headcount}
                        onChange={(e) => setHeadcount(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
                        className="h-12 w-full bg-transparent text-center text-lg font-semibold tabular-nums text-white outline-none"
                        aria-label={t.headcount}
                      />
                      <span className="pr-2 text-sm text-white/50">{lang === "ko" ? "명" : ""}</span>
                      <button type="button" aria-label="+" onClick={() => setHeadcount((n) => Math.min(10000, n + 1))} className="h-12 w-12 text-xl text-white/70 hover:text-white">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label required hint={t.datesHint}>
                    {t.dates}
                  </Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {dates.map((d, i) => (
                      <label key={i} className="relative block">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[var(--acc)]">{i + 1}</span>
                        <input
                          type="date"
                          min={minDate}
                          value={d}
                          onChange={(e) => setDates((cur) => cur.map((x, j) => (j === i ? e.target.value : x)))}
                          className={`${field} pl-8 [color-scheme:dark]`}
                          aria-label={`${t.dates} ${i + 1}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <Label>{t.time}</Label>
                    <Chips options={pick(TIMES, TIMES_EN)} value={time} onChange={(v) => setTime(v as string)} />
                  </div>
                  <div>
                    <Label>{t.duration}</Label>
                    <Chips options={pick(DURATIONS, DURATIONS_EN)} value={duration} onChange={(v) => setDuration(v as string)} />
                  </div>
                  <div>
                    <Label>{t.mode}</Label>
                    <Chips options={MODES.map((m) => ({ v: m.v, l: lang === "ko" ? m.ko : m.en }))} value={mode} onChange={(v) => setMode(v as string)} />
                  </div>
                </div>
                {mode !== "online" && (
                  <label className="block">
                    <Label>{t.location}</Label>
                    <input name="location" maxLength={200} placeholder={t.locationPh} className={field} />
                  </label>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <Label required>{t.company}</Label>
                    <input name="companyName" required maxLength={120} autoComplete="organization" className={field} />
                  </label>
                  <label className="block">
                    <Label required>{t.name}</Label>
                    <input name="contactName" required maxLength={80} autoComplete="name" className={field} />
                  </label>
                  <label className="block">
                    <Label required>{t.email}</Label>
                    <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
                  </label>
                  <label className="block">
                    <Label>{t.phone}</Label>
                    <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
                  </label>
                </div>
                <label className="block">
                  <Label>{t.message}</Label>
                  <textarea name="message" rows={4} maxLength={5000} placeholder={t.messagePh} className={`${field} resize-y`} />
                </label>
                <Consent checked={consent} onChange={setConsent} lang={lang} />
                {error && (
                  <p role="alert" className="m-0 text-[13px] text-[#ff8a7a]">
                    {error}
                  </p>
                )}
                <div className="flex justify-end">
                  <button type="submit" disabled={state === "sending" || !consent} className="inline-flex min-h-[52px] items-center gap-2 bg-[#f5f5f4] px-8 text-sm font-bold text-[#0b0d0f] transition hover:bg-[var(--acc)] disabled:opacity-50">
                    {state === "sending" ? t.sending : t.send} <span aria-hidden>↗</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
