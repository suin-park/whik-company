"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { Chips, Consent, Done, Label, errMsg, field } from "./formUi";
import { labelsFor, tx, type Tx } from "@/lib/messages";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.95, ease: EASE } } };

const VIDEO_ID = "c3sQKOsyMRI";
const VIDEO_START = 179;

const T = {
  ko: {
    crumb: "기업 맞춤형 관리 툴 개발",
    label: "CUSTOM WEB / APP TOOLS",
    title: ["우리 회사에 꼭 맞는", "관리 툴을 만듭니다."] as [string, string],
    body: "엑셀과 메신저로 흩어진 업무를 한 화면으로. 회사의 업무 흐름에 맞춘 웹, 앱 관리 도구를 설계부터 운영까지 함께 만듭니다.",
    cta: "개발 문의하기",
    watch: "실제 사례 영상 보기",
    videoLabel: "CASE FILM",
    videoTitle: "실제로 만든 관리 툴을 영상으로 확인하세요.",
    buildLabel: "WHAT WE BUILD",
    buildTitle: "업무에 맞춰 만드는 기능들.",
    processLabel: "PROCESS",
    formLabel: "REQUEST",
    formTitle: "개발 문의",
    formBody: "알려주신 내용을 바탕으로 담당자가 이메일로 연락드립니다. 정해지지 않은 항목은 비워두셔도 됩니다.",
    company: "회사명",
    name: "담당자 이름",
    email: "이메일",
    phone: "연락처",
    platform: "만들고 싶은 형태",
    features: "필요한 기능",
    budget: "예상 예산",
    timeline: "희망 일정",
    team: "사용할 인원",
    tools: "지금 쓰는 도구",
    toolsPh: "예: 엑셀, 카카오톡 단톡방, 구글 시트",
    message: "어떤 업무를 해결하고 싶으신가요?",
    messagePh: "현재 업무 방식과 불편한 점, 꼭 필요한 화면이나 기능을 자유롭게 적어주세요.",
    send: "문의 보내기",
    sending: "보내는 중…",
    doneTitle: "개발 문의가 접수되었습니다.",
    doneBody: "내용을 검토한 뒤 남겨주신 이메일로 연락드리겠습니다. 보통 영업일 기준 1~2일 안에 회신합니다.",
    again: "다른 문의 작성하기",
  },
  en: {
    crumb: "Custom management tools",
    label: "CUSTOM WEB / APP TOOLS",
    title: ["Management tools", "built for your company."] as [string, string],
    body: "From scattered spreadsheets and chats to one screen. We design, build and run web and app tools shaped around how your team works.",
    cta: "Start a request",
    watch: "Watch a case film",
    videoLabel: "CASE FILM",
    videoTitle: "See a tool we built, in action.",
    buildLabel: "WHAT WE BUILD",
    buildTitle: "Features shaped to your work.",
    processLabel: "PROCESS",
    formLabel: "REQUEST",
    formTitle: "Development request",
    formBody: "We'll reply by email based on what you share. Leave anything undecided blank.",
    company: "Company",
    name: "Your name",
    email: "Email",
    phone: "Phone",
    platform: "What to build",
    features: "Features you need",
    budget: "Budget",
    timeline: "Timeline",
    team: "Number of users",
    tools: "Tools you use now",
    toolsPh: "e.g. spreadsheets, group chats",
    message: "What do you want to solve?",
    messagePh: "How you work today, what hurts, and the screens or features you need.",
    send: "Send request",
    sending: "Sending…",
    doneTitle: "Request received.",
    doneBody: "We'll review it and reply to your email, usually within 1 to 2 business days.",
    again: "Write another request",
  },
  ja: {
    crumb: "企業向け管理ツール開発",
    label: "CUSTOM WEB / APP TOOLS",
    title: ["自社にぴったりの", "管理ツールをつくります。"] as [string, string],
    body: "Excelやチャットに散らばった業務を、ひとつの画面に。会社の業務フローに合わせたWeb、アプリの管理ツールを、設計から運用まで一緒につくります。",
    cta: "開発を相談する",
    watch: "実際の事例映像を見る",
    videoLabel: "CASE FILM",
    videoTitle: "実際につくった管理ツールを映像でご覧ください。",
    buildLabel: "WHAT WE BUILD",
    buildTitle: "業務に合わせてつくる機能。",
    processLabel: "PROCESS",
    formLabel: "REQUEST",
    formTitle: "開発のご相談",
    formBody: "いただいた内容をもとに、担当者がメールでご連絡します。決まっていない項目は空欄のままで構いません。",
    company: "会社名",
    name: "ご担当者名",
    email: "メールアドレス",
    phone: "電話番号",
    platform: "つくりたい形",
    features: "必要な機能",
    budget: "想定予算",
    timeline: "希望スケジュール",
    team: "利用人数",
    tools: "現在使っているツール",
    toolsPh: "例: Excel、グループチャット、Googleスプレッドシート",
    message: "どんな業務を解決したいですか？",
    messagePh: "現在の業務のやり方や不便な点、必ず必要な画面や機能を自由にご記入ください。",
    send: "相談を送る",
    sending: "送信中…",
    doneTitle: "開発のご相談を受け付けました。",
    doneBody: "内容を確認のうえ、いただいたメールアドレスにご連絡します。通常1〜2営業日以内にご返信します。",
    again: "別の相談を書く",
  },
  zh: {
    crumb: "企业定制管理工具开发",
    label: "CUSTOM WEB / APP TOOLS",
    title: ["为您的公司", "量身打造管理工具。"] as [string, string],
    body: "把散落在表格和聊天群里的工作汇集到一个界面。我们根据公司的业务流程，从设计到运营，一起打造网页与App管理工具。",
    cta: "咨询开发",
    watch: "观看真实案例视频",
    videoLabel: "CASE FILM",
    videoTitle: "通过视频看看我们做过的管理工具。",
    buildLabel: "WHAT WE BUILD",
    buildTitle: "贴合业务打造的功能。",
    processLabel: "PROCESS",
    formLabel: "REQUEST",
    formTitle: "开发咨询",
    formBody: "我们的负责人会根据您提供的信息通过邮件联系您。尚未确定的项目可以留空。",
    company: "公司名称",
    name: "负责人姓名",
    email: "邮箱",
    phone: "联系电话",
    platform: "想做的形式",
    features: "需要的功能",
    budget: "预计预算",
    timeline: "期望周期",
    team: "使用人数",
    tools: "目前使用的工具",
    toolsPh: "例如：Excel、聊天群、在线表格",
    message: "您想解决什么样的业务问题？",
    messagePh: "请随意填写目前的工作方式、不便之处，以及必需的界面或功能。",
    send: "发送咨询",
    sending: "发送中…",
    doneTitle: "开发咨询已提交。",
    doneBody: "我们审阅后会发送邮件到您留下的邮箱，通常在1到2个工作日内回复。",
    again: "填写新的咨询",
  },
};

const BUILDS: { name: Tx; desc: Tx }[] = [
  { name: { ko: "대시보드", en: "Dashboards", ja: "ダッシュボード", zh: "仪表盘" }, desc: { ko: "오늘 할 일과 핵심 지표를 한 화면에", en: "Today's work and key numbers on one screen", ja: "今日のタスクと重要指標をひとつの画面に", zh: "今日待办与核心指标尽在一屏" } },
  { name: { ko: "고객, 주문 관리", en: "Customers & orders", ja: "顧客、注文管理", zh: "客户与订单管理" }, desc: { ko: "상담부터 주문, AS까지 이어지는 기록", en: "From first contact to orders and after-sales", ja: "相談から注文、アフターサービスまでつながる記録", zh: "从咨询到下单、售后的完整记录" } },
  { name: { ko: "일정, 현장 관리", en: "Scheduling & field ops", ja: "スケジュール、現場管理", zh: "日程与现场管理" }, desc: { ko: "기사 배정, 방문 일정, 작업 사진", en: "Dispatch, visits and job photos", ja: "担当者の割り当て、訪問日程、作業写真", zh: "派工、上门日程、作业照片" } },
  { name: { ko: "정산, 결재", en: "Billing & approvals", ja: "精算、決裁", zh: "结算与审批" }, desc: { ko: "견적, 계약, 정산 흐름 자동화", en: "Quotes, contracts and settlement", ja: "見積もり、契約、精算フローの自動化", zh: "报价、合同、结算流程自动化" } },
  { name: { ko: "권한과 로그", en: "Roles & audit logs", ja: "権限とログ", zh: "权限与日志" }, desc: { ko: "팀별 권한, 변경 기록, 보안", en: "Team roles, change history, security", ja: "チーム別の権限、変更履歴、セキュリティ", zh: "团队权限、变更记录、安全" } },
  { name: { ko: "AI 기능", en: "AI features", ja: "AI機能", zh: "AI功能" }, desc: { ko: "문서 요약, 자동 분류, 상담 비서", en: "Summaries, auto-sorting, assistants", ja: "文書要約、自動分類、相談アシスタント", zh: "文档摘要、自动分类、咨询助手" } },
];

const STEPS: { name: Tx; desc: Tx }[] = [
  { name: { ko: "업무 분석", en: "Discovery", ja: "業務分析", zh: "业务分析" }, desc: { ko: "지금의 업무 흐름과 불편을 함께 정리합니다.", en: "We map your current workflow and pain points.", ja: "今の業務フローと不便な点を一緒に整理します。", zh: "一起梳理现有业务流程与痛点。" } },
  { name: { ko: "화면 설계", en: "Design", ja: "画面設計", zh: "界面设计" }, desc: { ko: "필요한 화면과 기능을 설계서로 확정합니다.", en: "Screens and features agreed in a spec.", ja: "必要な画面と機能を設計書で確定します。", zh: "用设计文档确定所需的界面与功能。" } },
  { name: { ko: "개발", en: "Build", ja: "開発", zh: "开发" }, desc: { ko: "짧은 주기로 만들고 중간마다 확인합니다.", en: "Short cycles with regular check-ins.", ja: "短いサイクルでつくり、その都度確認します。", zh: "以短周期开发，阶段性确认。" } },
  { name: { ko: "운영", en: "Run", ja: "運用", zh: "运营" }, desc: { ko: "배포 후 교육과 유지보수까지 함께합니다.", en: "Launch, training and maintenance.", ja: "リリース後の研修と保守まで伴走します。", zh: "上线后的培训与维护也一路相伴。" } },
];

const PLATFORMS: { v: string; l: Tx }[] = [
  { v: "web", l: { ko: "웹", en: "Web", ja: "Web", zh: "网页" } },
  { v: "app", l: { ko: "앱", en: "App", ja: "アプリ", zh: "App" } },
  { v: "both", l: { ko: "웹 + 앱", en: "Web + App", ja: "Web + アプリ", zh: "网页 + App" } },
  { v: "unsure", l: { ko: "아직 모르겠어요", en: "Not sure", ja: "まだ分からない", zh: "还不确定" } },
];
const FEATURES = ["대시보드", "고객 관리", "주문/예약", "일정/배정", "재고", "정산/결제", "전자 계약", "권한 관리", "알림", "AI 기능"];
const FEATURES_EN = ["Dashboard", "Customers", "Orders/booking", "Scheduling", "Inventory", "Billing", "E-contracts", "Roles", "Notifications", "AI"];
const FEATURES_JA = ["ダッシュボード", "顧客管理", "注文/予約", "日程/割り当て", "在庫", "精算/決済", "電子契約", "権限管理", "通知", "AI機能"];
const FEATURES_ZH = ["仪表盘", "客户管理", "订单/预约", "日程/派工", "库存", "结算/支付", "电子合同", "权限管理", "通知", "AI功能"];
const BUDGETS = ["1천만원 미만", "1천~3천만원", "3천~5천만원", "5천만원 이상", "상담 후 결정"];
const BUDGETS_EN = ["Under ₩10M", "₩10M to 30M", "₩30M to 50M", "Over ₩50M", "Decide later"];
const BUDGETS_JA = ["1,000万ウォン未満", "1,000万〜3,000万ウォン", "3,000万〜5,000万ウォン", "5,000万ウォン以上", "相談して決める"];
const BUDGETS_ZH = ["1千万韩元以下", "1千万至3千万韩元", "3千万至5千万韩元", "5千万韩元以上", "沟通后决定"];
const TIMELINES = ["1개월 이내", "1~3개월", "3~6개월", "6개월 이상", "미정"];
const TIMELINES_EN = ["Within 1 month", "1 to 3 months", "3 to 6 months", "6+ months", "Undecided"];
const TIMELINES_JA = ["1か月以内", "1〜3か月", "3〜6か月", "6か月以上", "未定"];
const TIMELINES_ZH = ["1个月内", "1至3个月", "3至6个月", "6个月以上", "未定"];

export default function DevelopmentPage() {
  const { lang } = useI18n();
  const t = T[lang];
  const [playing, setPlaying] = useState(false);
  const [platform, setPlatform] = useState("web");
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);


  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/business/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "DEVELOPMENT",
          companyName: f.get("companyName"),
          contactName: f.get("contactName"),
          email: f.get("email"),
          phone: f.get("phone"),
          message: f.get("message"),
          website: f.get("website"),
          details: { platform, features, budget, timeline, teamSize: f.get("teamSize"), currentTools: f.get("currentTools") },
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
    <div className="biz-page relative isolate -mt-16 overflow-hidden bg-[#0b0d0f] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif] site-font" style={{ "--acc": "#7fe0c8" } as React.CSSProperties}>
      <span aria-hidden className="biz-aura pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />
      <span aria-hidden className="biz-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]" />

      {/* hero */}
      <motion.section variants={stagger} initial="hidden" animate="show" className="mx-auto grid max-w-[1600px] items-center gap-12 px-[6%] pb-16 pt-28 md:pt-36 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-[11px] text-white/45">
            <Link href="/business" className="hover:text-white">
              {tx(lang, "기업 지원", "For business", "法人サポート", "企业支持")}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/75">{t.crumb}</span>
          </motion.nav>
          <motion.p variants={rise} className="mb-5 text-[11px] font-semibold tracking-[0.22em] text-[var(--acc)]">
            {t.label}
          </motion.p>
          <h1 className="m-0 break-keep text-[38px] font-semibold leading-[1.12] tracking-[-0.055em] md:text-[clamp(42px,4.6vw,70px)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={mask} className="block">
                {t.title[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={mask} className="biz-hi block">
                {t.title[1]}
              </motion.span>
            </span>
          </h1>
          <motion.p variants={rise} className="mt-6 max-w-[520px] break-keep text-[15px] leading-[1.8] text-white/60 md:text-[17px]">
            {t.body}
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#request" className="inline-flex min-h-[52px] items-center gap-2 bg-[#f5f5f4] px-7 text-sm font-bold text-[#0b0d0f] transition hover:-translate-y-0.5 hover:bg-[var(--acc)]">
              {t.cta} <span aria-hidden>→</span>
            </a>
            <a href="#film" className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition group-hover:border-[var(--acc)] group-hover:bg-[var(--acc)] group-hover:text-[#0b0d0f]">▶</span>
              {t.watch}
            </a>
          </motion.div>
        </div>

        {/* stacked dashboards */}
        <motion.div variants={rise} className="dev-stack relative mx-auto aspect-[4/3] w-full max-w-[720px]">
          <span aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(127,224,200,.28),transparent_65%)] blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/business/tool-dashboard-2.jpg" alt={tx(lang, "관리 툴 대시보드 예시", "Example dashboard", "管理ツールのダッシュボード例", "管理工具仪表盘示例")} className="dev-shot dev-shot-back absolute right-0 top-0 w-[82%] rounded-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/business/tool-dashboard-1.jpg" alt={tx(lang, "운영 관리 화면 예시", "Example operations screen", "運用管理画面の例", "运营管理界面示例")} className="dev-shot dev-shot-front absolute bottom-0 left-0 w-[70%] rounded-lg" />
          <span className="dev-chip absolute left-[4%] top-[12%] rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur">● {tx(lang, "실시간 현황", "Live status", "リアルタイム状況", "实时状态")}</span>
          <span className="dev-chip absolute bottom-[8%] right-[2%] rounded-full border border-[var(--acc)]/40 bg-black/60 px-3 py-1.5 text-[11px] text-[var(--acc)] backdrop-blur">AI {tx(lang, "업무 비서", "assistant", "業務アシスタント", "工作助手")}</span>
        </motion.div>
      </motion.section>

      {/* film */}
      <motion.section id="film" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-[1600px] scroll-mt-24 px-[6%] py-16">
        <motion.p variants={rise} className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/45">
          {t.videoLabel}
        </motion.p>
        <motion.h2 variants={rise} className="m-0 mb-8 break-keep text-[28px] font-semibold tracking-[-0.045em] md:text-[clamp(28px,2.8vw,42px)]">
          {t.videoTitle}
        </motion.h2>
        <motion.div variants={rise} className="relative mx-auto aspect-video w-full max-w-[1200px] overflow-hidden border border-white/10 bg-black">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0&start=${VIDEO_START}`}
              title={t.videoTitle}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block h-full w-full" aria-label={t.watch}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" className="h-full w-full object-cover brightness-[.6] transition duration-700 group-hover:scale-[1.03] group-hover:brightness-75" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl text-[#0b0d0f] shadow-[0_0_0_14px_rgba(255,255,255,.1)] transition group-hover:scale-110 group-hover:bg-[var(--acc)]">▶</span>
              <span className="absolute bottom-5 left-6 text-[11px] tracking-[0.18em] text-white/70">2:59 {tx(lang, "부터 재생", "START", "から再生", "起播放")}</span>
            </button>
          )}
        </motion.div>
      </motion.section>

      {/* builds + process */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-[1600px] px-[6%] py-16">
        <motion.p variants={rise} className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/45">
          {t.buildLabel}
        </motion.p>
        <motion.h2 variants={rise} className="m-0 mb-9 text-[28px] font-semibold tracking-[-0.045em] md:text-[clamp(28px,2.8vw,42px)]">
          {t.buildTitle}
        </motion.h2>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
          {BUILDS.map((b, i) => (
            <motion.div key={b.name.en} variants={rise} className="dev-tile group relative overflow-hidden border border-white/[.08] bg-[#101316] p-5 md:p-7">
              <span className="text-[10px] tabular-nums tracking-[0.18em] text-[var(--acc)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 mt-4 text-[17px] font-semibold tracking-[-0.03em] md:text-xl">{b.name[lang]}</h3>
              <p className="m-0 mt-2 break-keep text-[12.5px] leading-[1.6] text-white/55 md:text-sm">{b.desc[lang]}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={rise} className="mb-6 mt-20 text-[11px] font-semibold tracking-[0.22em] text-white/45">
          {t.processLabel}
        </motion.p>
        <ol className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-8 p-0 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li key={s.name.en} variants={rise} className="border-t border-white/15 pt-5">
              <span className="text-[12px] font-semibold tabular-nums text-[var(--acc)]">STEP {i + 1}</span>
              <h3 className="m-0 mt-2 text-lg font-semibold">{s.name[lang]}</h3>
              <p className="m-0 mt-1.5 break-keep text-[13px] leading-[1.65] text-white/55">{s.desc[lang]}</p>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* request form */}
      <section id="request" className="mx-auto max-w-[1600px] scroll-mt-20 px-[6%] pb-24 pt-10 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[var(--acc)]">{t.formLabel}</p>
            <h2 className="m-0 text-[32px] font-semibold tracking-[-0.045em] md:text-[clamp(32px,3.2vw,48px)]">{t.formTitle}</h2>
            <p className="mt-4 max-w-[420px] break-keep text-[15px] leading-[1.75] text-white/60">{t.formBody}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/business/tool-dashboard-1.jpg" alt="" aria-hidden className="mt-10 hidden w-[80%] rotate-[-4deg] rounded-md opacity-70 shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:block" />
          </div>
          <div className="border border-white/10 bg-[#0f1215]">
            <span aria-hidden className="block h-[2px] bg-gradient-to-r from-[var(--acc)] to-[#a9d0ff]" />
            {state === "sent" ? (
              <Done title={t.doneTitle} body={t.doneBody} onReset={() => setState("idle")} resetLabel={t.again} />
            ) : (
              <form onSubmit={submit} className="grid gap-6 p-6 md:p-10">
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
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
                <div>
                  <Label>{t.platform}</Label>
                  <Chips options={PLATFORMS.map((p) => ({ v: p.v, l: p.l[lang] }))} value={platform} onChange={(v) => setPlatform(v as string)} />
                </div>
                <div>
                  <Label hint={tx(lang, "여러 개 선택", "Pick any", "複数選択可", "可多选")}>{t.features}</Label>
                  <Chips multi options={labelsFor(lang, FEATURES, FEATURES_EN, FEATURES_JA, FEATURES_ZH)} value={features} onChange={(v) => setFeatures(v as string[])} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label>{t.budget}</Label>
                    <Chips options={labelsFor(lang, BUDGETS, BUDGETS_EN, BUDGETS_JA, BUDGETS_ZH)} value={budget} onChange={(v) => setBudget(v as string)} />
                  </div>
                  <div>
                    <Label>{t.timeline}</Label>
                    <Chips options={labelsFor(lang, TIMELINES, TIMELINES_EN, TIMELINES_JA, TIMELINES_ZH)} value={timeline} onChange={(v) => setTimeline(v as string)} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <label className="block">
                    <Label>{t.team}</Label>
                    <input name="teamSize" maxLength={40} placeholder={tx(lang, "예: 15명", "e.g. 15", "例: 15名", "例如：15人")} className={field} />
                  </label>
                  <label className="block">
                    <Label>{t.tools}</Label>
                    <input name="currentTools" maxLength={500} placeholder={t.toolsPh} className={field} />
                  </label>
                </div>
                <label className="block">
                  <Label required>{t.message}</Label>
                  <textarea name="message" required rows={6} maxLength={5000} placeholder={t.messagePh} className={`${field} resize-y`} />
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
