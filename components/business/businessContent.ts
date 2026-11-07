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
    title: { ko: "기업 맞춤형 관리 툴 개발", en: "Custom management tools" },
    desc: { ko: "우리 회사의 업무 흐름에 맞는 관리 도구를 만듭니다.", en: "Management tools built around how your company works." },
    points: {
      ko: ["업무 흐름 분석", "대시보드와 관리 화면", "AI 기능 연동"],
      en: ["Workflow review", "Dashboards and admin", "AI features"],
    },
  },
  {
    key: "contract",
    accent: "#ffc27a",
    title: { ko: "계약 & 견적", en: "Contracts & quotes" },
    desc: { ko: "필요한 지원과 범위를 정리하고, 진행 방식을 상담합니다.", en: "Scope what you need and agree on how we work together." },
    points: {
      ko: ["지원 범위 정리", "일정과 비용 산정", "계약 진행"],
      en: ["Scope", "Schedule and cost", "Contract"],
    },
  },
  {
    key: "training",
    accent: "#a9d0ff",
    title: { ko: "사내 교육 요청", en: "In-house training" },
    desc: { ko: "팀의 작업 환경과 수준에 맞춘 실무 교육을 구성합니다.", en: "Hands-on training shaped to your team's setup and level." },
    points: {
      ko: ["WHIK Studio 실무", "팀 맞춤 커리큘럼", "방문 또는 온라인"],
      en: ["WHIK Studio in practice", "Tailored curriculum", "On site or online"],
    },
  },
];

export const steps: { title: T; desc: T }[] = [
  { title: { ko: "문의", en: "Reach out" }, desc: { ko: "필요한 지원을 골라 내용을 남겨주세요.", en: "Pick a service and tell us what you need." } },
  { title: { ko: "상담", en: "Talk" }, desc: { ko: "업무 환경과 목표를 함께 살펴봅니다.", en: "We look at your setup and goals together." } },
  { title: { ko: "제안과 견적", en: "Proposal" }, desc: { ko: "범위와 일정, 비용을 정리해 드립니다.", en: "Scope, schedule and cost, written down." } },
  { title: { ko: "진행", en: "Build" }, desc: { ko: "만들고, 교육하고, 끝까지 함께합니다.", en: "We build, train and stay with you." } },
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
};
