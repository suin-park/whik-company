"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { Chips, Consent, Done, Label, errMsg, field } from "./formUi";
import { labelsFor, tx, type Tx } from "@/lib/messages";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.95, ease: EASE } } };

/** `v` is the Korean value sent with the request; name/desc are shown in the visitor's language. */
const TOPICS: { v: string; name: Tx; desc: Tx }[] = [
  { v: "WHIK Studio 기초", name: { ko: "WHIK Studio 기초", en: "WHIK Studio basics", ja: "WHIK Studio 基礎", zh: "WHIK Studio 入门" }, desc: { ko: "노드 그래프, 뷰어, 렌더까지 처음부터", en: "Node graph, viewer and rendering from scratch", ja: "ノードグラフ、ビューアー、レンダーまで基礎から", zh: "从零学习节点图、查看器与渲染" } },
  { v: "영상 합성 실무", name: { ko: "영상 합성 실무", en: "Compositing in practice", ja: "映像合成の実務", zh: "视频合成实务" }, desc: { ko: "키잉, 로토, 트래킹, 색 보정", en: "Keying, roto, tracking, grading", ja: "キーイング、ロト、トラッキング、カラー補正", zh: "抠像、Roto、跟踪、调色" } },
  { v: "3DGS 공간 합성", name: { ko: "3DGS 공간 합성", en: "3DGS compositing", ja: "3DGS空間合成", zh: "3DGS空间合成" }, desc: { ko: "스캔한 공간을 영상에 합성하기", en: "Bring scanned spaces into footage", ja: "スキャンした空間を映像に合成する", zh: "把扫描的空间合成进视频" } },
  { v: "AI 노드 활용", name: { ko: "AI 노드 활용", en: "AI nodes", ja: "AIノードの活用", zh: "AI节点应用" }, desc: { ko: "지우기, 매트, 업스케일, 나이 조절", en: "Removal, mattes, upscale, age", ja: "除去、マット、アップスケール、年齢調整", zh: "移除、遮罩、超分辨率、年龄调整" } },
  { v: "AI 어시스턴트와 자동화", name: { ko: "AI 어시스턴트와 자동화", en: "AI assistants & automation", ja: "AIアシスタントと自動化", zh: "AI助手与自动化" }, desc: { ko: "플러그인 만들기, MCP 연결", en: "Plugins by prompt, MCP", ja: "プラグイン制作、MCP連携", zh: "制作插件、MCP连接" } },
  { v: "맞춤 커리큘럼", name: { ko: "맞춤 커리큘럼", en: "Custom curriculum", ja: "オーダーメイドカリキュラム", zh: "定制课程" }, desc: { ko: "팀 프로젝트에 맞춰 구성", en: "Built around your project", ja: "チームのプロジェクトに合わせて構成", zh: "根据团队项目定制" } },
];
const LEVELS = ["입문", "실무자", "숙련자", "섞여 있음"];
const LEVELS_EN = ["Beginner", "Working", "Advanced", "Mixed"];
const LEVELS_JA = ["入門", "実務者", "熟練者", "混在"];
const LEVELS_ZH = ["入门", "在职从业者", "资深", "混合"];
const TIMES = ["오전", "오후", "종일", "협의"];
const TIMES_EN = ["Morning", "Afternoon", "Full day", "Flexible"];
const TIMES_JA = ["午前", "午後", "終日", "相談"];
const TIMES_ZH = ["上午", "下午", "全天", "协商"];
const DURATIONS = ["2시간", "4시간", "1일 (8시간)", "2일 이상"];
const DURATIONS_EN = ["2 hours", "4 hours", "1 day", "2+ days"];
const DURATIONS_JA = ["2時間", "4時間", "1日（8時間）", "2日以上"];
const DURATIONS_ZH = ["2小时", "4小时", "1天（8小时）", "2天以上"];
const MODES: { v: string; l: Tx }[] = [
  { v: "onsite", l: { ko: "방문 교육", en: "On site", ja: "訪問研修", zh: "上门培训" } },
  { v: "online", l: { ko: "온라인", en: "Online", ja: "オンライン", zh: "线上" } },
  { v: "either", l: { ko: "상관없음", en: "Either", ja: "どちらでも", zh: "均可" } },
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
  ja: {
    crumb: "社内研修の依頼",
    label: "IN-HOUSE TRAINING",
    title: ["チームに合わせた", "実務研修。"] as [string, string],
    body: "チームの作業環境とレベルに合わせてカリキュラムを組み、実際のプロジェクト例ですぐに使える研修を行います。",
    cta: "研修を申し込む",
    stats: [
      ["チーム別", "カリキュラム"],
      ["実習", "中心の進行"],
      ["訪問", "またはオンライン"],
    ],
    formLabel: "REQUEST",
    formTitle: "研修のお申し込み",
    formBody: "希望日を最大3つまでお選びください。日程を確認したうえで、確定のご案内をメールでお送りします。",
    topics: "希望する研修",
    level: "参加者のレベル",
    headcount: "参加予定人数",
    dates: "希望日",
    datesHint: "最大3つ",
    time: "希望時間帯",
    duration: "研修時間",
    mode: "実施方法",
    location: "研修場所",
    locationPh: "訪問研修の場合の住所または地域",
    company: "会社名",
    name: "ご担当者名",
    email: "メールアドレス",
    phone: "電話番号",
    message: "その他お伝えいただきたい内容",
    messagePh: "使用している機材、扱っているプロジェクト、必ず扱いたいテーマなど",
    send: "研修を申し込む",
    sending: "送信中…",
    doneTitle: "研修のお申し込みを受け付けました。",
    doneBody: "希望日を確認したうえで、いただいたメールアドレスに日程確定のご案内をお送りします。",
    again: "別の申し込みを書く",
    needDate: "希望日を1つ以上お選びください。",
    needTopic: "希望する研修を1つ以上お選びください。",
  },
  zh: {
    crumb: "企业内训申请",
    label: "IN-HOUSE TRAINING",
    title: ["贴合团队的", "实务培训。"] as [string, string],
    body: "根据团队的工作环境与水平设计课程，用真实项目案例进行学完就能用的培训。",
    cta: "申请培训",
    stats: [
      ["团队定制", "课程"],
      ["以实操", "为主"],
      ["上门", "或线上"],
    ],
    formLabel: "REQUEST",
    formTitle: "培训申请",
    formBody: "请最多选择3个期望日期。确认日程后，我们会通过邮件发送确认通知。",
    topics: "想要的培训",
    level: "学员水平",
    headcount: "预计人数",
    dates: "期望日期",
    datesHint: "最多3个",
    time: "期望时段",
    duration: "培训时长",
    mode: "授课方式",
    location: "培训地点",
    locationPh: "上门培训时的地址或地区",
    company: "公司名称",
    name: "负责人姓名",
    email: "邮箱",
    phone: "联系电话",
    message: "其他补充信息",
    messagePh: "使用的设备、负责的项目、必须涵盖的主题等",
    send: "申请培训",
    sending: "发送中…",
    doneTitle: "培训申请已提交。",
    doneBody: "确认期望日期后，我们会发送日程确认邮件到您留下的邮箱。",
    again: "填写新的申请",
    needDate: "请至少选择一个期望日期。",
    needTopic: "请至少选择一项培训内容。",
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
    <div className="biz-page relative isolate -mt-16 overflow-hidden bg-[#0b0d0f] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif] site-font" style={{ "--acc": "#a9d0ff" } as React.CSSProperties}>
      {/* hero with photo */}
      <section className="relative isolate min-h-[640px] overflow-hidden md:min-h-[78vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/business/training.jpg" alt="" className="home-hero-image absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" style={{ animationDelay: "0s" }} />
        <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,13,15,.92)_0%,rgba(11,13,15,.6)_45%,rgba(11,13,15,.15)_80%),linear-gradient(0deg,#0b0d0f_0%,transparent_40%)]" />
        <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto flex min-h-[640px] max-w-[1600px] flex-col justify-end px-[6%] pb-16 pt-28 md:min-h-[78vh] md:pb-20">
          <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-auto flex items-center gap-3 pt-6 text-[11px] text-white/55">
            <Link href="/business" className="hover:text-white">
              {tx(lang, "기업 지원", "For business", "法人サポート", "企业支持")}
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
              <h3 className="m-0 mt-4 text-[16px] font-semibold tracking-[-0.03em] md:text-xl">{tp.name[lang]}</h3>
              <p className="m-0 mt-2 break-keep text-[12.5px] leading-[1.6] text-white/55 md:text-sm">{tp.desc[lang]}</p>
              <span className="mt-4 inline-block text-[12px] font-semibold text-[var(--acc)] opacity-0 transition group-hover:opacity-100">{topics.includes(tp.v) ? "✓" : "+"} {tx(lang, "신청서에 담기", "Add to request", "申込書に追加", "加入申请")}</span>
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
                  <Label required hint={tx(lang, "여러 개 선택", "Pick any", "複数選択可", "可多选")}>
                    {t.topics}
                  </Label>
                  <Chips multi options={TOPICS.map((tp) => ({ v: tp.v, l: tp.name[lang] }))} value={topics} onChange={(v) => setTopics(v as string[])} />
                </div>
                <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                  <div>
                    <Label>{t.level}</Label>
                    <Chips options={labelsFor(lang, LEVELS, LEVELS_EN, LEVELS_JA, LEVELS_ZH)} value={level} onChange={(v) => setLevel(v as string)} />
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
                      <span className="pr-2 text-sm text-white/50">{tx(lang, "명", "", "名", "人")}</span>
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
                    <Chips options={labelsFor(lang, TIMES, TIMES_EN, TIMES_JA, TIMES_ZH)} value={time} onChange={(v) => setTime(v as string)} />
                  </div>
                  <div>
                    <Label>{t.duration}</Label>
                    <Chips options={labelsFor(lang, DURATIONS, DURATIONS_EN, DURATIONS_JA, DURATIONS_ZH)} value={duration} onChange={(v) => setDuration(v as string)} />
                  </div>
                  <div>
                    <Label>{t.mode}</Label>
                    <Chips options={MODES.map((m) => ({ v: m.v, l: m.l[lang] }))} value={mode} onChange={(v) => setMode(v as string)} />
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
