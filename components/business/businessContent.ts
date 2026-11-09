import type { Lang } from "@/lib/messages";

type T = Record<Lang, string>;

export const SUPPORT_EMAIL = "support@whiklab.com";

export type ServiceKey = "tool" | "contract" | "training";

export type Service = {
  key: ServiceKey;
  accent: string;
  title: T;
  desc: T;
  points: Record<Lang, string[]>;
};

export const services: Service[] = [
  {
    key: "tool",
    accent: "#7fe0c8",
    title: { ko: "기업 맞춤형 관리 툴 개발", en: "Custom management tools", ja: "企業向け管理ツール開発", zh: "企业定制管理工具开发" },
    desc: { ko: "우리 회사의 업무 흐름에 맞는 관리 도구를 만듭니다.", en: "Management tools built around how your company works.", ja: "自社の業務フローに合った管理ツールを作ります。", zh: "打造贴合公司业务流程的管理工具。" },
    points: {
      ko: ["업무 흐름 분석", "대시보드와 관리 화면", "AI 기능 연동"],
      en: ["Workflow review", "Dashboards and admin", "AI features"], ja: ["業務フロー分析", "ダッシュボードと管理画面", "AI機能の連携"], zh: ["业务流程分析", "仪表盘与管理后台", "接入AI功能"],
    },
  },
  {
    key: "contract",
    accent: "#ffc27a",
    title: { ko: "계약 & 견적", en: "Contracts & quotes", ja: "契約と見積もり", zh: "合同与报价" },
    desc: { ko: "필요한 지원과 범위를 정리하고, 진행 방식을 상담합니다.", en: "Scope what you need and agree on how we work together.", ja: "必要なサポートと範囲を整理し、進め方をご相談します。", zh: "梳理所需支持与范围，商定合作方式。" },
    points: {
      ko: ["지원 범위 정리", "일정과 비용 산정", "계약 진행"],
      en: ["Scope", "Schedule and cost", "Contract"], ja: ["サポート範囲の整理", "スケジュールと費用の算出", "契約"], zh: ["梳理支持范围", "估算日程与费用", "签订合同"],
    },
  },
  {
    key: "training",
    accent: "#a9d0ff",
    title: { ko: "사내 교육 요청", en: "In-house training", ja: "社内研修の依頼", zh: "企业内训申请" },
    desc: { ko: "팀의 작업 환경과 수준에 맞춘 실무 교육을 구성합니다.", en: "Hands-on training shaped to your team's setup and level.", ja: "チームの作業環境とレベルに合わせた実務研修を組み立てます。", zh: "根据团队的工作环境与水平定制实务培训。" },
    points: {
      ko: ["WHIK Studio 실무", "팀 맞춤 커리큘럼", "방문 또는 온라인"],
      en: ["WHIK Studio in practice", "Tailored curriculum", "On site or online"], ja: ["WHIK Studio実務", "チーム別カリキュラム", "訪問またはオンライン"], zh: ["WHIK Studio实务", "团队定制课程", "上门或线上"],
    },
  },
];

export const steps: { title: T; desc: T }[] = [
  { title: { ko: "문의", en: "Reach out", ja: "お問い合わせ", zh: "咨询" }, desc: { ko: "필요한 지원을 골라 내용을 남겨주세요.", en: "Pick a service and tell us what you need.", ja: "必要なサポートを選んで内容をお知らせください。", zh: "选择所需的支持并留下需求。" } },
  { title: { ko: "상담", en: "Talk", ja: "ご相談", zh: "沟通" }, desc: { ko: "업무 환경과 목표를 함께 살펴봅니다.", en: "We look at your setup and goals together.", ja: "業務環境と目標を一緒に確認します。", zh: "一起梳理您的工作环境与目标。" } },
  { title: { ko: "제안과 견적", en: "Proposal", ja: "提案と見積もり", zh: "方案与报价" }, desc: { ko: "범위와 일정, 비용을 정리해 드립니다.", en: "Scope, schedule and cost, written down.", ja: "範囲、スケジュール、費用をまとめてお届けします。", zh: "整理好范围、日程与费用交给您。" } },
  { title: { ko: "진행", en: "Build", ja: "進行", zh: "推进" }, desc: { ko: "만들고, 교육하고, 끝까지 함께합니다.", en: "We build, train and stay with you.", ja: "制作し、研修し、最後まで伴走します。", zh: "开发、培训，全程陪伴。" } },
];

export const copy = {
  ko: {
    crumbHome: "WHIK",
    crumb: "기업 지원",
    label: "WHIK FOR BUSINESS",
    title: ["함께 만드는", "다음 단계."] as [string, string],
    body: "업무에 맞는 도구부터 팀의 실무 교육까지. 필요한 지원을 선택해 주세요.",
    request: "신청하기",
    processLabel: "HOW WE WORK",
    processTitle: "이렇게 진행됩니다.",
    undecided: "어떤 지원이 필요한지 아직 정하지 못하셨나요?",
    undecidedBody: "상황을 알려주시면 맞는 방법을 함께 찾아드립니다.",
    ask: "문의 남기기",
    formTitle: "지원 신청",
    formBody: "내용을 남겨주시면 확인 후 이메일로 연락드립니다.",
    type: "지원 유형",
    other: "기타 문의",
    name: "이름",
    email: "이메일",
    company: "회사명",
    message: "요청 내용",
    messagePh: "필요한 지원, 일정, 팀 규모 등을 자유롭게 적어주세요.",
    send: "보내기",
    sending: "보내는 중…",
    sent: "신청이 접수되었습니다.",
    sentBody: "확인 후 남겨주신 이메일로 연락드리겠습니다.",
    failed: "전송하지 못했습니다. 잠시 후 다시 시도하거나 이메일로 보내주세요.",
    close: "닫기",
    done: "확인",
  },
  en: {
    crumbHome: "WHIK",
    crumb: "For business",
    label: "WHIK FOR BUSINESS",
    title: ["The next step,", "built together."] as [string, string],
    body: "From tools that fit your work to hands-on training for your team. Choose the support you need.",
    request: "Request",
    processLabel: "HOW WE WORK",
    processTitle: "How it goes.",
    undecided: "Not sure what you need yet?",
    undecidedBody: "Tell us where you are and we'll find the right approach together.",
    ask: "Get in touch",
    formTitle: "Request support",
    formBody: "Leave the details and we'll reply by email.",
    type: "Service",
    other: "Something else",
    name: "Name",
    email: "Email",
    company: "Company",
    message: "Details",
    messagePh: "What you need, timing, team size, anything that helps.",
    send: "Send",
    sending: "Sending…",
    sent: "Request received.",
    sentBody: "We'll get back to you at the email you left.",
    failed: "Couldn't send. Try again shortly or email us.",
    close: "Close",
    done: "OK",
  },
  ja: {
    crumbHome: "WHIK",
    crumb: "法人サポート",
    label: "WHIK FOR BUSINESS",
    title: ["一緒につくる、", "次のステップ。"] as [string, string],
    body: "業務に合ったツールから、チームの実務研修まで。必要なサポートをお選びください。",
    request: "申し込む",
    processLabel: "HOW WE WORK",
    processTitle: "進め方。",
    undecided: "どのサポートが必要か、まだ決まっていませんか？",
    undecidedBody: "状況を教えていただければ、合う方法を一緒に探します。",
    ask: "問い合わせる",
    formTitle: "サポートのお申し込み",
    formBody: "内容をお送りいただければ、確認後メールでご連絡します。",
    type: "サポートの種類",
    other: "その他のお問い合わせ",
    name: "お名前",
    email: "メールアドレス",
    company: "会社名",
    message: "ご依頼内容",
    messagePh: "必要なサポート、スケジュール、チームの規模などを自由にご記入ください。",
    send: "送信",
    sending: "送信中…",
    sent: "お申し込みを受け付けました。",
    sentBody: "確認後、いただいたメールアドレスにご連絡します。",
    failed: "送信できませんでした。しばらくしてから再度お試しいただくか、メールでお送りください。",
    close: "閉じる",
    done: "OK",
  },
  zh: {
    crumbHome: "WHIK",
    crumb: "企业支持",
    label: "WHIK FOR BUSINESS",
    title: ["携手迈向", "下一步。"] as [string, string],
    body: "从贴合业务的工具，到团队的实务培训。请选择您需要的支持。",
    request: "立即申请",
    processLabel: "HOW WE WORK",
    processTitle: "合作流程。",
    undecided: "还没确定需要哪种支持？",
    undecidedBody: "告诉我们您的情况，我们一起找到合适的方式。",
    ask: "留言咨询",
    formTitle: "申请支持",
    formBody: "留下信息后，我们确认后会通过邮件与您联系。",
    type: "支持类型",
    other: "其他咨询",
    name: "姓名",
    email: "邮箱",
    company: "公司名称",
    message: "需求内容",
    messagePh: "请随意填写所需支持、时间安排、团队规模等。",
    send: "发送",
    sending: "发送中…",
    sent: "申请已提交。",
    sentBody: "确认后我们会发送邮件到您留下的邮箱。",
    failed: "发送失败。请稍后再试，或直接发送邮件给我们。",
    close: "关闭",
    done: "好的",
  },
};
