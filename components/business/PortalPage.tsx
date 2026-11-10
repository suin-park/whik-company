"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { ContractDocument, DOC_CSS, QuoteDocument, SignaturePad, type ClientInfo, type ContractDoc, type Provider, type QuoteDoc } from "./docs";
import { AiUsage, type AiData } from "./AiUsage";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

type Quote = QuoteDoc & { id: string; status: string; respondedAt: string | null; respondedName: string | null; demoUrl?: string | null };
type Contract = ContractDoc & { id: string; status: string; quoteNumber: string | null };
type TaxInfo = {
  companyName: string;
  bizRegNo: string;
  ceoName: string;
  address: string;
  bizType: string;
  bizItem: string;
  email: string;
  managerName: string;
  managerPhone: string;
  amount?: number | null;
};
type Progress = {
  milestones: { title: string; start: string; end: string; status: "todo" | "doing" | "done" }[];
  updates: { id: string; date: string; title: string; body: string; link: string }[];
};
type CompanyFile = { key: string; label: string; filename: string };
type Data = {
  client: ClientInfo;
  provider: Provider;
  quotes: Quote[];
  contracts: Contract[];
  /** One entry per business that receives a tax invoice (e.g. two stores splitting the amount). */
  taxInfo: TaxInfo[];
  taxComplete?: boolean;
  taxInfoAt: string | null;
  /** Portal tab for handwriting samples (turned on per client by WHIK). */
  scanSamples?: boolean;
  /** Development progress written by WHIK (tab shown when present). */
  progress?: Progress | null;
  companyFiles?: CompanyFile[];
  /** AI ticket reading top-ups and usage (tab shown when WHIK linked the client's CRM). */
  ai?: AiData | null;
};

const T = {
  ko: {
    won: (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`,
    locale: "ko-KR",
    qs: { SENT: "확인 대기", ACCEPTED: "수락함", REJECTED: "거절함" } as Record<string, string>,
    cs: { SENT: "서명 필요", CLIENT_SIGNED: "서명 완료, WHIK 서명 대기", COMPLETED: "체결 완료" } as Record<string, string>,
    err: {
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
      TAX_INFO_REQUIRED: "서명 전에 ‘거래 정보’ 탭에서 세금계산서 발행 정보를 먼저 입력해 주세요.",
      INVALID_BIZ_REG_NO: "사업자등록번호 10자리를 확인해 주세요.",
      INVALID_EMAIL: "세금계산서 받을 이메일 주소를 확인해 주세요.",
      TOO_MANY_TAX_ENTRIES: "사업자는 5곳까지 입력할 수 있습니다.",
      INVALID_SEAL: "도장 이미지를 읽지 못했습니다. 다른 사진으로 다시 올려 주세요.",
      TOO_MANY_SEALS: "도장은 3개까지 올릴 수 있습니다.",
      INVALID_IMAGE: "사진을 읽지 못했습니다. JPG 또는 PNG 사진으로 다시 올려 주세요.",
      EXTRACT_FAILED: "글씨를 읽지 못했습니다. 잠시 후 다시 시도해 주세요.",
      TOO_MANY_SCANS: "오늘 읽을 수 있는 양을 다 썼습니다. 내일 다시 시도해 주세요.",
      TOO_MANY_SAMPLES: "샘플은 60장까지 올릴 수 있습니다.",
      SAMPLES_OFF: "샘플 올리기가 꺼져 있습니다. 담당자에게 문의해 주세요.",
    } as Record<string, string>,
    errDefault: "처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    tabInfo: "거래 정보",
    whikTitle: "WHIK 회사 정보",
    whikDesc: "계약과 대금 지급에 필요한 휙랩의 정보입니다.",
    pName: "상호",
    pCeo: "대표자",
    pBizNo: "사업자등록번호",
    pType: "업태 / 종목",
    pAddr: "사업장 주소",
    pContact: "연락처",
    pBank: "입금 계좌",
    files: "서류 내려받기",
    taxTitle: "세금계산서 발행 정보",
    taxDesc: "입력하신 정보로 대금 청구 시 전자세금계산서를 발행합니다. 계약서 서명 전에 입력해 주세요.",
    tCompany: "상호 (법인명) *",
    tBizNo: "사업자등록번호 *",
    tCeo: "대표자 성명 *",
    tAddr: "사업장 주소 *",
    tType: "업태",
    tItem: "종목",
    tEmail: "세금계산서 받을 이메일 *",
    tManager: "담당자 이름",
    tPhone: "담당자 연락처",
    taxSave: "저장하기",
    taxSaving: "저장 중…",
    taxSaved: "세금계산서 정보를 저장했습니다.",
    taxDone: (d: string) => `${d}에 입력됨`,
    taxNeed: "서명 전에 세금계산서 발행 정보를 입력해 주세요.",
    taxGo: "입력하러 가기",
    taxOk: "세금계산서 정보 입력 완료",
    taxEdit: "수정",
    tAmount: "발행 금액 (VAT 포함)",
    sealTitle: "회사 도장 (선택)",
    sealDesc: "도장 이미지를 올리시면 계약서의 갑 서명란에 함께 찍힙니다. 흰 배경은 자동으로 지워집니다. 서명하신 계약서에는 서명 당시의 도장이 고정됩니다.",
    sealPick: "도장 이미지 올리기",
    sealLabel: "구분 (예: 1호점)",
    sealRemove: "빼기",
    sealSave: "도장 저장",
    sealSaved: "도장을 저장했습니다.",
    sealEmpty: "아직 올린 도장이 없습니다.",
    tabSamples: "응모권 샘플",
    tabProgress: "개발 진행",
    pgTitle: "개발 진행 상황",
    pgDesc: "단계별 일정과 진행 소식을 휙랩이 직접 올립니다.",
    pgOverall: (n: number) => `전체 진행률 ${n}%`,
    pgStatus: { todo: "예정", doing: "진행 중", done: "완료" } as Record<string, string>,
    pgUpdates: "진행 소식",
    pgNoUpdates: "아직 올라온 소식이 없습니다.",
    pgOpen: "미리 보기",
    smTitle: "응모권 샘플 올리기",
    smDesc: "손글씨 인식 정확도를 매장 응모권에 맞추는 데 쓰입니다. 올린 사진은 휙랩만 볼 수 있고 30일 뒤 자동으로 지워집니다.",
    smHow: ["빈 응모권에 직원분들이 **가짜 이름과 번호**로 직접 써 주세요. 손님이 쓴 실제 응모권은 올리지 말아 주세요.", "여러 분이 나눠 쓰고, 흘려 쓰거나 작게 쓴 것도 섞어 주시면 좋습니다. 사진 1장에 응모권 1장씩 찍어 주세요.", "사진을 올리면 AI가 읽은 결과가 나옵니다. 종이와 다른 칸만 고친 뒤 ‘제출’을 눌러 주세요."],
    smGoal: (n: number) => `제출 ${n}장`,
    smPick: "응모권 사진 올리기",
    smReading: "읽는 중…",
    smFix: "종이와 다른 칸을 고쳐 주세요. 주황색은 AI가 헷갈린 칸입니다.",
    smName: "이름",
    smPhone: "연락처",
    smBirth: "생일 (월/일)",
    smReq: "[필수] 개인정보 동의",
    smMkt: "[선택] 광고 문자 동의",
    smSubmit: "제출",
    smDrop: "버리기",
    smDone: "제출한 샘플",
    smDelete: "삭제",
    smNone: "아직 제출한 샘플이 없습니다.",
    smFixed: (n: number) => (n ? `${n}칸 고침` : "AI가 모두 맞힘"),
    entry: (n: number) => `사업자 ${n}`,
    addEntry: "+ 사업자 추가 (매장별로 나누어 발행)",
    removeEntry: "이 사업자 빼기",
    multiHint: "여러 사업자로 나누어 발행하려면 사업자를 추가하고 각자의 발행 금액을 적어 주세요.",
    back: "뒤로 가기",
    gateTitle: "기업 관리 코드를 입력하세요.",
    gateDesc: ["담당자에게 받은 코드로 견적서를 확인하고,", "계약서에 전자서명할 수 있습니다."],
    codeLabel: "기업 관리 코드",
    checking: "확인 중…",
    enter: "들어가기",
    noCode: "코드가 없으신가요?",
    ask: "기업 지원 문의",
    signTitle: "계약서에 서명하기",
    readAll: "계약서 전문(제1조부터 마지막 조항까지)을 모두 읽고 내용을 확인했습니다.",
    signerName: "서명자 이름 *",
    signerTitle: "직책 (예: 대표이사)",
    authority: "회사를 대표해 계약할 권한이 있는 분이 서명해 주세요.",
    agree: "위 계약을 전자문서로 체결하며, 이 전자서명이 서면 서명과 같은 효력을 가지는 것에 동의합니다.",
    hash: "문서 해시",
    padHint: "여기에 서명해 주세요",
    padClear: "지우기",
    signing: "서명 중…",
    signDone: "전자서명 완료하기",
    signRecord: "서명 시각, 접속 IP, 문서 해시가 계약 증명서에 함께 기록됩니다.",
    needName: "확인자 이름을 입력해 주세요.",
    rejectConfirm: "이 견적서를 거절할까요?",
    answerTitle: "견적서 확인",
    answerDesc: "수락하시면 담당자가 계약서를 준비해 포털로 보내드립니다.",
    answerName: "확인자 이름 *",
    answerNote: "전달할 메모 (선택)",
    working: "처리 중…",
    accept: "견적 수락",
    reject: "거절",
    loading: "불러오는 중…",
    summary: (q: number, c: number) => (q > 0 || c > 0 ? `확인할 견적서 ${q}건, 서명할 계약서 ${c}건이 있습니다.` : "새로 확인할 문서가 없습니다."),
    leave: "나가기",
    tabQuotes: "견적 확인",
    tabContracts: "계약 진행",
    noQuotes: "아직 받은 견적서가 없습니다.",
    noContracts: "아직 받은 계약서가 없습니다.",
    printHint: "브라우저 인쇄에서 ‘PDF로 저장’을 고르면 파일로 보관할 수 있습니다.",
    print: "출력 / PDF 저장",
    jumpSign: "서명하러 가기",
    demoEyebrow: "PREVIEW",
    demoTitle: "이 견적으로 만들 화면을 미리 보세요",
    demoDesc: "견적에 담긴 기능을 실제처럼 눌러 볼 수 있는 시연 화면입니다.",
    demoBtn: "시연 화면 보기",
    jumpAnswer: "응답하러 가기",
    docLang: "",
    answered: "견적서 응답을 보냈습니다. 담당자가 확인 후 연락드립니다.",
    signed: "전자서명이 접수되었습니다. 계약서와 계약 증명서를 출력해 보관하실 수 있습니다.",
  },
  en: {
    won: (n: number) => `KRW ${Math.round(n).toLocaleString("en-US")}`,
    locale: "en-US",
    qs: { SENT: "Awaiting review", ACCEPTED: "Accepted", REJECTED: "Declined" } as Record<string, string>,
    cs: { SENT: "Signature needed", CLIENT_SIGNED: "Signed, awaiting WHIK", COMPLETED: "Completed" } as Record<string, string>,
    err: {
      INVALID_CODE: "This code is not valid or has been disabled. Please check the code your WHIK contact gave you.",
      TOO_MANY_ATTEMPTS: "Too many attempts. Please try again in 15 minutes.",
      NOT_CONFIGURED: "The portal is unavailable right now. Please contact support@whiklab.com.",
      UPSTREAM_UNREACHABLE: "Could not reach the server. Please try again shortly.",
      DOCUMENT_CHANGED: "The contract has changed and cannot be signed. Please refresh and review it again.",
      NOT_SIGNABLE: "This contract is already signed or cannot be signed.",
      ALREADY_RESPONDED: "You have already answered this quote.",
      EXPIRED: "This quote has expired. Please contact us.",
      INVALID_SIGNATURE: "Please draw your signature again.",
      MISSING_FIELDS: "Please fill in the required fields.",
      TAX_INFO_REQUIRED: "Please enter your tax invoice details in the ‘Billing’ tab before signing.",
      INVALID_BIZ_REG_NO: "Please check the 10-digit business registration number.",
      INVALID_EMAIL: "Please check the email address for tax invoices.",
      TOO_MANY_TAX_ENTRIES: "You can add up to 5 businesses.",
      INVALID_SEAL: "Could not read the seal image. Please try another photo.",
      TOO_MANY_SEALS: "You can upload up to 3 seals.",
      INVALID_IMAGE: "Could not read the photo. Please upload a JPG or PNG.",
      EXTRACT_FAILED: "Could not read the handwriting. Please try again shortly.",
      TOO_MANY_SCANS: "Today's reading limit is used up. Please try again tomorrow.",
      TOO_MANY_SAMPLES: "You can upload up to 60 samples.",
      SAMPLES_OFF: "Sample upload is turned off. Please contact us.",
    } as Record<string, string>,
    errDefault: "Something went wrong. Please try again shortly.",
    tabInfo: "Billing",
    whikTitle: "WHIK company details",
    whikDesc: "Our details for the contract and payment.",
    pName: "Company",
    pCeo: "Representative",
    pBizNo: "Business reg. no.",
    pType: "Business type / item",
    pAddr: "Address",
    pContact: "Contact",
    pBank: "Bank account",
    files: "Documents",
    taxTitle: "Tax invoice details",
    taxDesc: "We issue the electronic tax invoice with these details when we bill. Please enter them before signing.",
    tCompany: "Company name *",
    tBizNo: "Business registration no. *",
    tCeo: "Representative *",
    tAddr: "Business address *",
    tType: "Business type (업태)",
    tItem: "Business item (종목)",
    tEmail: "Email for tax invoices *",
    tManager: "Contact person",
    tPhone: "Contact phone",
    taxSave: "Save",
    taxSaving: "Saving…",
    taxSaved: "Your tax invoice details have been saved.",
    taxDone: (d: string) => `Saved on ${d}`,
    taxNeed: "Please enter your tax invoice details before signing.",
    taxGo: "Enter details",
    taxOk: "Tax invoice details saved",
    taxEdit: "Edit",
    tAmount: "Amount to invoice (VAT incl.)",
    sealTitle: "Company seal (optional)",
    sealDesc: "Upload your seal and it is stamped next to your signature on the contract. White backgrounds are removed automatically. A signed contract keeps the seal it was signed with.",
    sealPick: "Upload a seal image",
    sealLabel: "Label (e.g. Store 1)",
    sealRemove: "Remove",
    sealSave: "Save seal",
    sealSaved: "Your seal has been saved.",
    sealEmpty: "No seal uploaded yet.",
    tabSamples: "Samples",
    tabProgress: "Progress",
    pgTitle: "Development progress",
    pgDesc: "Milestones and updates, posted by WHIK.",
    pgOverall: (n: number) => `Overall ${n}%`,
    pgStatus: { todo: "Planned", doing: "In progress", done: "Done" } as Record<string, string>,
    pgUpdates: "Updates",
    pgNoUpdates: "No updates yet.",
    pgOpen: "Preview",
    smTitle: "Upload entry-ticket samples",
    smDesc: "Used to tune handwriting reading to your tickets. Only WHIK can see the photos, and they are deleted automatically after 30 days.",
    smHow: ["Have staff fill blank tickets with **made-up names and numbers**. Please do not upload real customer tickets.", "Several people writing, including fast or small handwriting, helps most. One ticket per photo, please.", "After you upload a photo the AI reading appears. Fix only the fields that differ from the paper, then press ‘Submit’."],
    smGoal: (n: number) => `Submitted ${n}`,
    smPick: "Upload ticket photos",
    smReading: "Reading…",
    smFix: "Fix the fields that differ from the paper. Orange fields were unclear to the AI.",
    smName: "Name",
    smPhone: "Phone",
    smBirth: "Birthday (MM/DD)",
    smReq: "[Required] privacy consent",
    smMkt: "[Optional] marketing SMS consent",
    smSubmit: "Submit",
    smDrop: "Discard",
    smDone: "Submitted samples",
    smDelete: "Delete",
    smNone: "No samples submitted yet.",
    smFixed: (n: number) => (n ? `${n} field(s) fixed` : "AI got all fields"),
    entry: (n: number) => `Business ${n}`,
    addEntry: "+ Add a business (split invoices)",
    removeEntry: "Remove this business",
    multiHint: "To split the invoice across businesses, add each one with its amount.",
    back: "Back",
    gateTitle: "Enter your company code.",
    gateDesc: ["Review quotes and sign contracts", "with the code from your WHIK contact."],
    codeLabel: "Company code",
    checking: "Checking…",
    enter: "Continue",
    noCode: "Don’t have a code?",
    ask: "Contact business support",
    signTitle: "Sign the contract",
    readAll: "I have read the entire contract, from Article 1 to the last article.",
    signerName: "Signer name *",
    signerTitle: "Title (e.g. CEO)",
    authority: "Please sign as a person authorized to contract on behalf of the company.",
    agree: "I agree to conclude this contract as an electronic document, and that this e-signature has the same effect as a handwritten signature.",
    hash: "Document hash",
    padHint: "Sign here",
    padClear: "Clear",
    signing: "Signing…",
    signDone: "Complete e-signature",
    signRecord: "The signing time, IP address and document hash are recorded on the contract certificate.",
    needName: "Please enter your name.",
    rejectConfirm: "Decline this quote?",
    answerTitle: "Review quote",
    answerDesc: "Once you accept, we will prepare the contract and send it to this portal.",
    answerName: "Your name *",
    answerNote: "Note to WHIK (optional)",
    working: "Sending…",
    accept: "Accept quote",
    reject: "Decline",
    loading: "Loading…",
    summary: (q: number, c: number) =>
      q > 0 || c > 0 ? `You have ${q} quote${q === 1 ? "" : "s"} to review and ${c} contract${c === 1 ? "" : "s"} to sign.` : "Nothing new to review.",
    leave: "Sign out",
    tabQuotes: "Quotes",
    tabContracts: "Contracts",
    noQuotes: "No quotes yet.",
    noContracts: "No contracts yet.",
    printHint: "Choose ‘Save as PDF’ in the print dialog to keep a file.",
    print: "Print / Save PDF",
    jumpSign: "Go to signing",
    demoEyebrow: "PREVIEW",
    demoTitle: "Preview what this quote builds",
    demoDesc: "A clickable demo of the features in this quote.",
    demoBtn: "Open the demo",
    jumpAnswer: "Go to answer",
    docLang: "Documents are issued in Korean, the governing language of the contract.",
    answered: "Your answer has been sent. We will be in touch shortly.",
    signed: "Your e-signature has been received. You can print the contract and its certificate for your records.",
  },
};
type Dict = (typeof T)["ko"];
// The portal is written in Korean and English only; Japanese and Chinese visitors read the English version.
const usePT = (): Dict => (useI18n().lang === "ko" ? T.ko : (T.en as unknown as Dict));
/**
 * The quote's demo page: its own demo link field (set in the admin, not printed), or a whik.co.kr/demo/... link in the notes.
 * Only /demo/... paths on this site, so neither can send clients elsewhere.
 */
const DEMO_RE = /^(?:https?:\/\/(?:www\.)?whik\.co\.kr)?(\/demo\/[a-z0-9\-/]+)/i;
const demoPath = (q: Quote) => (q.demoUrl?.match(DEMO_RE)?.[1] ?? q.notes?.match(/https?:\/\/(?:www\.)?whik\.co\.kr(\/demo\/[a-z0-9\-/]+)/i)?.[1]) ?? null;
const QC: Record<string, string> = { SENT: "#a9d0ff", ACCEPTED: "#7fe0c8", REJECTED: "#ff8a7a" };
const CC: Record<string, string> = { SENT: "#ffc27a", CLIENT_SIGNED: "#a9d0ff", COMPLETED: "#7fe0c8" };

async function post(url: string, body?: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new Error(json.error || "FAILED");
  return json;
}

function BackButton() {
  const t = usePT();
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
      aria-label={t.back}
      className="group relative inline-flex items-stretch overflow-hidden border border-white/12 bg-white/[.03] backdrop-blur-sm transition duration-300 hover:border-[#ffc27a]/60 hover:shadow-[0_0_28px_-6px_rgba(255,194,122,.45)]"
    >
      <span className="relative grid w-10 place-items-center overflow-hidden border-r border-white/12 transition duration-300 group-hover:border-[#ffc27a]/60 group-hover:bg-[#ffc27a]">
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/70 transition duration-300 group-hover:-translate-x-0.5 group-hover:text-[#0b0d0f]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16 10H4M9 5l-5 5 5 5" />
        </svg>
      </span>
      <span className="flex flex-col justify-center px-4 py-2 text-left leading-none">
        {t.back !== "Back" && <span className="font-mono text-[9px] font-semibold tracking-[0.24em] text-[#ffc27a]/70 transition group-hover:text-[#ffc27a]">BACK</span>}
        <span className={`${t.back === "Back" ? "" : "mt-1.5 "}text-[13px] font-semibold text-white/75 transition group-hover:text-white`}>{t.back}</span>
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
    </button>
  );
}

function CodeGate({ onIn }: { onIn: () => void }) {
  const t = usePT();
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
      setError(t.err[(x as Error).message] ?? t.errDefault);
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
        {t.gateTitle}
      </motion.h1>
      <motion.p variants={rise} className="mx-auto mt-5 break-keep text-center text-[16px] leading-relaxed text-white/65 md:text-[18px]">
        {t.gateDesc[0]}
        <br />
        {t.gateDesc[1]}
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
            aria-label={t.codeLabel}
            className="h-16 w-full bg-transparent pr-5 font-mono text-xl font-semibold tracking-[0.12em] text-white outline-none placeholder:text-white/20 md:text-2xl"
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 break-keep text-[13px] text-[#ff8a7a]">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy || code.replace("-", "").length !== 8} className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#f5f5f4] text-sm font-bold text-[#0b0d0f] transition hover:bg-[#ffc27a] disabled:opacity-40">
          {busy ? t.checking : t.enter} <span aria-hidden>→</span>
        </button>
      </motion.form>
      <motion.p variants={rise} className="mt-8 text-center text-[12px] text-white/40">
        {t.noCode}{" "}
        <Link href="/business" className="text-white/70 underline underline-offset-4 hover:text-white">
          {t.ask}
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

function SignPanel({ k, hasTax, onNeedTax, onSigned }: { k: Contract; hasTax: boolean; onNeedTax: () => void; onSigned: () => void }) {
  const t = usePT();
  const [read, setRead] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [sig, setSig] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ready = hasTax && read && name.trim() && sig && agree;

  const sign = async () => {
    if (!ready) return;
    setBusy(true);
    setError(null);
    try {
      await post(`/api/business/portal/contracts/${k.id}/sign`, { signerName: name, signerTitle: title, signature: sig, documentHash: k.documentHash, agree: true });
      onSigned();
    } catch (x) {
      setError(t.err[(x as Error).message] ?? t.errDefault);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-[#ffc27a]/40 bg-[#ffc27a]/[.04] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">E-SIGNATURE</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">{t.signTitle}</h3>
      <div className="mt-5 grid gap-5">
        <Step n={1} done={hasTax}>
          {hasTax ? (
            <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-white/85">
              {t.taxOk}
              <button type="button" onClick={onNeedTax} className="text-[12px] text-white/50 underline underline-offset-4 hover:text-white">
                {t.taxEdit}
              </button>
            </p>
          ) : (
            <div>
              <p className="m-0 text-sm text-white/85">{t.taxNeed}</p>
              <button type="button" onClick={onNeedTax} className="mt-2 inline-flex items-center gap-1.5 border border-[#ffc27a]/60 px-3 py-1.5 text-[13px] font-semibold text-[#ffc27a] hover:bg-[#ffc27a]/10">
                {t.taxGo} <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </Step>
        <Step n={2} done={read}>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-white/85">
            <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ffc27a]" />
            {t.readAll}
          </label>
        </Step>
        <Step n={3} done={!!name.trim()}>
          <div className="grid gap-2 sm:grid-cols-2">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder={t.signerName} className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#ffc27a]" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder={t.signerTitle} className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#ffc27a]" />
          </div>
          <p className="mt-1.5 text-[11.5px] text-white/45">{t.authority}</p>
        </Step>
        <Step n={4} done={!!sig}>
          <SignaturePad onChange={setSig} height={170} placeholder={t.padHint} clearLabel={t.padClear} />
        </Step>
        <Step n={5} done={agree}>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-white/85">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ffc27a]" />
            <span>
              {t.agree}
              <span className="mt-1 block break-all font-mono text-[10.5px] text-white/40">{t.hash} {k.documentHash}</span>
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
        {busy ? t.signing : t.signDone}
      </button>
      <p className="mt-3 text-center text-[11px] text-white/40">{t.signRecord}</p>
    </div>
  );
}

const fieldCls = "w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#ffc27a]";

function WhikInfo({ p, files }: { p: Provider; files: CompanyFile[] }) {
  const t = usePT();
  const rows: [string, string | undefined][] = [
    [t.pName, p.name],
    [t.pCeo, p.representative],
    [t.pBizNo, p.bizRegNo],
    [t.pType, p.bizType ? `${p.bizType} / ${p.bizItem ?? "-"}` : undefined],
    [t.pAddr, p.address],
    [t.pContact, `${p.phone} / ${p.email}`],
    [t.pBank, p.bankAccount],
  ];
  return (
    <section className="border border-white/10 bg-white/[.02] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">WHIK</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">{t.whikTitle}</h3>
      <p className="mt-1.5 text-[13px] text-white/55">{t.whikDesc}</p>
      <dl className="mt-5 grid grid-cols-[120px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-white/45">{k}</dt>
              <dd className={`m-0 break-keep ${k === t.pBank ? "font-semibold text-[#ffc27a]" : "text-white/90"}`}>{v}</dd>
            </div>
          ))}
      </dl>
      {files.length > 0 && (
        <div className="mt-6">
          <p className="m-0 text-[12px] font-semibold text-white/60">{t.files}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {files.map((f) => (
              <a key={f.key} href={`/api/business/portal/company-file?f=${encodeURIComponent(f.key)}`} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-[#a9d0ff] hover:text-[#cfe4ff]">
                <span aria-hidden>↓</span> {f.label} (PDF)
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

type Seal = { label: string; src: string };

const md = (d: string) => (d ? `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}` : "");

function ProgressView({ p }: { p: Progress }) {
  const t = usePT();
  const total = p.milestones.length;
  const pct = total ? Math.round((p.milestones.reduce((a, m) => a + (m.status === "done" ? 1 : m.status === "doing" ? 0.5 : 0), 0) / total) * 100) : 0;
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="border border-white/10 bg-white/[.02] p-5 md:p-6">
        <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">PROGRESS</p>
        <h3 className="m-0 mt-2 text-xl font-semibold">{t.pgTitle}</h3>
        <p className="mt-1.5 text-[13px] text-white/55">{t.pgDesc}</p>
        {total > 0 && (
          <>
            <div className="mt-5 flex items-center justify-between text-[13px]">
              <span className="font-semibold text-[#7fe0c8]">{t.pgOverall(pct)}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#7fe0c8,#a9d0ff)]" style={{ width: `${pct}%` }} />
            </div>
            <ol className="relative m-0 mt-6 list-none border-l border-white/12 p-0 pl-6">
              {p.milestones.map((m, i) => (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span
                    className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-[#0b0d0f] ${m.status === "done" ? "bg-[#7fe0c8]" : m.status === "doing" ? "animate-pulse bg-[#ffc27a]" : "bg-white/25"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className={`m-0 text-[15px] font-semibold ${m.status === "todo" ? "text-white/60" : "text-white"}`}>{m.title}</p>
                    <span className={`text-[12px] font-semibold ${m.status === "done" ? "text-[#7fe0c8]" : m.status === "doing" ? "text-[#ffc27a]" : "text-white/40"}`}>{t.pgStatus[m.status]}</span>
                  </div>
                  {(m.start || m.end) && <p className="m-0 mt-0.5 text-[12.5px] text-white/45">{m.start && m.end && m.start !== m.end ? `${md(m.start)} ~ ${md(m.end)}` : md(m.start || m.end)}</p>}
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
      <section className="border border-white/10 bg-white/[.02] p-5 md:p-6">
        <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">UPDATES</p>
        <h3 className="m-0 mt-2 text-xl font-semibold">{t.pgUpdates}</h3>
        {p.updates.length === 0 ? (
          <p className="mt-4 text-[13px] text-white/40">{t.pgNoUpdates}</p>
        ) : (
          <ul className="m-0 mt-4 grid list-none gap-3 p-0">
            {p.updates.map((u) => (
              <li key={u.id} className="border border-white/[.08] bg-black/20 p-4">
                <p className="m-0 font-mono text-[12px] text-white/45">{u.date}</p>
                {u.title && <p className="m-0 mt-1 text-[15px] font-semibold">{u.title}</p>}
                {u.body && <p className="m-0 mt-1.5 whitespace-pre-wrap break-keep text-[13.5px] leading-relaxed text-white/75">{u.body}</p>}
                {u.link && /^https?:\/\//i.test(u.link) && (
                  <a href={u.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 text-[13px] font-semibold hover:border-[#a9d0ff] hover:text-[#cfe4ff]">
                    {t.pgOpen} <span aria-hidden>↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/** Photo → base64 JPEG (no data: prefix), up to 3000 px so several tickets in one photo can each be read sharply. */
async function samplePhoto(file: File): Promise<{ b64: string; url: string }> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  try {
    for (const side of [3000, 2400, 1600]) {
      const k = Math.min(1, side / Math.max(bmp.width, bmp.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(bmp.width * k));
      c.height = Math.max(1, Math.round(bmp.height * k));
      c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
      const url = c.toDataURL("image/jpeg", 0.85);
      if (url.length <= 3_300_000 || side === 1600) return { b64: url.split(",")[1], url };
    }
    throw new Error("decode");
  } finally {
    bmp.close();
  }
}

type SampleCard = { key: number; url: string; b64: string; state: "reading" | "ready" | "saving" | "error"; ai: string[]; values: string[]; uncertain: number[]; error?: string };
type SavedSample = { id: string; values: string[]; aiValues: string[]; createdAt: string };
const yesNo = (v: string) => /^(동의|예|yes|o|v|✓)/i.test(v.trim());

function SampleUpload() {
  const t = usePT();
  const [cards, setCards] = useState<SampleCard[]>([]);
  const [saved, setSaved] = useState<SavedSample[]>([]);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);
  const refresh = useCallback(async () => {
    try {
      const j = await post("/api/business/portal/scan-samples", { op: "list" });
      setSaved(j.samples ?? []);
    } catch (x) {
      setError(t.err[(x as Error).message] ?? t.errDefault);
    }
  }, [t]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  const patch = (key: number, p: Partial<SampleCard>) => setCards((l) => l.map((c) => (c.key === key ? { ...c, ...p } : c)));
  const read = async (card: SampleCard) => {
    try {
      const j = await post("/api/business/portal/scan-samples", { op: "read", image: card.b64 });
      const row = j.rows?.[0] ?? { values: ["", "", "", "", ""], uncertain: [] };
      const ai = Array.from({ length: 5 }, (_, i) => String(row.values[i] ?? ""));
      const values = [ai[0], ai[1], ai[2], yesNo(ai[3]) ? "동의" : "미동의", yesNo(ai[4]) ? "동의" : "미동의"];
      patch(card.key, { state: "ready", ai, values, uncertain: row.uncertain ?? [] });
    } catch (x) {
      patch(card.key, { state: "error", error: t.err[(x as Error).message] ?? t.errDefault });
    }
  };
  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    const fresh: SampleCard[] = [];
    for (const f of Array.from(files).slice(0, 12)) {
      try {
        const { b64, url } = await samplePhoto(f);
        fresh.push({ key: ++seq.current, url, b64, state: "reading", ai: [], values: [], uncertain: [] });
      } catch {
        setError(t.err.INVALID_IMAGE);
      }
    }
    setCards((l) => [...fresh, ...l]);
    // two at a time
    const queue = [...fresh];
    await Promise.all([0, 1].map(async () => {
      while (queue.length) await read(queue.shift()!);
    }));
  };
  const submit = async (card: SampleCard) => {
    patch(card.key, { state: "saving" });
    try {
      await post("/api/business/portal/scan-samples", { op: "save", image: card.b64, aiValues: card.ai, values: card.values });
      setCards((l) => l.filter((c) => c.key !== card.key));
      refresh();
    } catch (x) {
      patch(card.key, { state: "ready", error: t.err[(x as Error).message] ?? t.errDefault });
    }
  };
  const remove = async (id: string) => {
    await post("/api/business/portal/scan-samples", { op: "delete", id }).catch(() => {});
    refresh();
  };
  const labels = [t.smName, t.smPhone, t.smBirth, t.smReq, t.smMkt];
  return (
    <section className="border border-white/10 bg-white/[.02] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">SAMPLES</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h3 className="m-0 text-xl font-semibold">{t.smTitle}</h3>
        <span className="text-sm font-semibold text-[#ffc27a]">{t.smGoal(saved.length)}</span>
      </div>
      <p className="mt-1.5 text-[13px] text-white/55">{t.smDesc}</p>
      <ol className="mt-4 grid gap-1.5 pl-5 text-[13.5px] text-white/80">
        {t.smHow.map((line, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<b class='text-[#ffc27a]'>$1</b>") }} />
        ))}
      </ol>
      <label className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a9d0ff] px-5 py-3 text-sm font-bold text-[#0b0d0f] hover:bg-[#cfe4ff]">
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
        {t.smPick}
      </label>
      {error && <p className="mt-3 text-[13px] text-[#ff8a7a]">{error}</p>}

      {cards.length > 0 && (
        <div className="mt-6 grid gap-4">
          {cards.map((c) => (
            <div key={c.key} className="grid gap-4 border border-white/10 bg-black/20 p-4 md:grid-cols-[220px_minmax(0,1fr)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.url} alt="" className="max-h-[260px] w-full bg-white object-contain" />
              <div className="min-w-0">
                {c.state === "reading" && <p className="m-0 text-sm text-white/60">{t.smReading}</p>}
                {c.state === "error" && <p className="m-0 text-sm text-[#ff8a7a]">{c.error}</p>}
                {(c.state === "ready" || c.state === "saving") && (
                  <>
                    <p className="m-0 mb-3 text-[12px] text-white/50">{t.smFix}</p>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {[0, 1, 2].map((i) => (
                        <label key={i} className="block">
                          <span className="mb-1 block text-[11.5px] text-white/50">{labels[i]}</span>
                          <input
                            value={c.values[i]}
                            onChange={(e) => patch(c.key, { values: c.values.map((v, j) => (j === i ? e.target.value : v)) })}
                            className={`${fieldCls} ${c.uncertain.includes(i) ? "!border-[#ff9b5a]" : ""}`}
                          />
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {[3, 4].map((i) => (
                        <label key={i} className={`flex cursor-pointer items-center gap-2 text-[13px] ${c.uncertain.includes(i) ? "text-[#ffb27a]" : "text-white/80"}`}>
                          <input
                            type="checkbox"
                            checked={c.values[i] === "동의"}
                            onChange={(e) => patch(c.key, { values: c.values.map((v, j) => (j === i ? (e.target.checked ? "동의" : "미동의") : v)) })}
                            className="h-4 w-4 accent-[#a9d0ff]"
                          />
                          {labels[i]}
                        </label>
                      ))}
                    </div>
                    {c.error && <p className="mt-2 text-[12.5px] text-[#ff8a7a]">{c.error}</p>}
                  </>
                )}
                <div className="mt-4 flex gap-2">
                  {(c.state === "ready" || c.state === "saving") && (
                    <button type="button" disabled={c.state === "saving"} onClick={() => submit(c)} className="min-h-[42px] bg-[#ffc27a] px-6 text-sm font-bold text-[#0b0d0f] hover:bg-[#ffd7a6] disabled:opacity-50">
                      {c.state === "saving" ? t.taxSaving : t.smSubmit}
                    </button>
                  )}
                  <button type="button" onClick={() => setCards((l) => l.filter((x) => x.key !== c.key))} className="min-h-[42px] border border-white/20 px-4 text-sm text-white/70 hover:border-white/50">
                    {t.smDrop}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-7">
        <p className="m-0 text-[12px] font-semibold text-white/60">{t.smDone}</p>
        {saved.length === 0 ? (
          <p className="mt-2 text-[13px] text-white/40">{t.smNone}</p>
        ) : (
          <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
            {saved.map((x) => {
              const fixed = x.values.filter((v, i) => (i < 3 ? v.replace(/\s/g, "") !== String(x.aiValues[i] ?? "").replace(/\s/g, "") : yesNo(v) !== yesNo(String(x.aiValues[i] ?? "")))).length;
              return (
                <li key={x.id} className="flex flex-wrap items-center justify-between gap-2 border border-white/[.07] px-3 py-2 text-[13px]">
                  <span className="min-w-0 break-all text-white/85">
                    {x.values.slice(0, 3).filter(Boolean).join(" | ")} <span className="ml-1 text-[12px] text-white/40">{t.smFixed(fixed)}</span>
                  </span>
                  <button type="button" onClick={() => remove(x.id)} className="text-[12px] text-white/45 underline underline-offset-4 hover:text-[#ff8a7a]">
                    {t.smDelete}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Seal photo → PNG data URL: at most 400 px, near-white background made transparent so it stamps cleanly. */
async function sealFromFile(file: File): Promise<string> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const make = (max: number) => {
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(bmp.width * k));
    c.height = Math.max(1, Math.round(bmp.height * k));
    const g = c.getContext("2d")!;
    g.drawImage(bmp, 0, 0, c.width, c.height);
    const img = g.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const light = Math.min(d[i], d[i + 1], d[i + 2]);
      if (light > 225) d[i + 3] = Math.round(d[i + 3] * Math.max(0, (245 - light) / 20));
    }
    g.putImageData(img, 0, 0);
    return c.toDataURL("image/png");
  };
  let out = make(400);
  if (out.length > 390_000) out = make(260);
  bmp.close();
  return out;
}

function SealUpload({ data, onSaved }: { data: Data; onSaved: () => void }) {
  const t = usePT();
  const [list, setList] = useState<Seal[]>(() => (data.client.seals ?? []).map((x) => ({ label: x.label ?? "", src: x.src })));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    try {
      const added: Seal[] = [];
      for (const f of Array.from(files).slice(0, 3 - list.length)) added.push({ label: "", src: await sealFromFile(f) });
      setList((l) => [...l, ...added].slice(0, 3));
    } catch {
      setError(t.err.INVALID_SEAL);
    }
  };
  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      await post("/api/business/portal/seals", { seals: list });
      onSaved();
    } catch (x) {
      setError(t.err[(x as Error).message] ?? t.errDefault);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="border border-white/10 bg-white/[.02] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">SEAL</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">{t.sealTitle}</h3>
      <p className="mt-1.5 text-[13px] text-white/55">{t.sealDesc}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {list.length === 0 && <p className="m-0 text-[13px] text-white/40">{t.sealEmpty}</p>}
        {list.map((sl, i) => (
          <div key={i} className="w-[150px]">
            <div className="h-[110px] overflow-hidden bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sl.src} alt={sl.label || "seal"} className="h-full w-full object-contain" />
            </div>
            <input
              value={sl.label}
              maxLength={40}
              onChange={(e) => setList((l) => l.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
              placeholder={t.sealLabel}
              className="mt-1.5 w-full border border-white/15 bg-black/30 px-2 py-1.5 text-[12px] text-white outline-none focus:border-[#a9d0ff]"
            />
            <button type="button" onClick={() => setList((l) => l.filter((_, j) => j !== i))} className="mt-1 text-[12px] text-white/45 underline underline-offset-4 hover:text-[#ff8a7a]">
              {t.sealRemove}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {list.length < 3 && (
          <label className="inline-flex cursor-pointer items-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-[#a9d0ff] hover:text-[#cfe4ff]">
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
            {t.sealPick}
          </label>
        )}
        <button type="button" onClick={save} disabled={busy} className="inline-flex min-h-[44px] items-center bg-[#a9d0ff] px-6 text-sm font-bold text-[#0b0d0f] hover:bg-[#cfe4ff] disabled:opacity-50">
          {busy ? t.taxSaving : t.sealSave}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-[13px] text-[#ff8a7a]">
          {error}
        </p>
      )}
    </section>
  );
}

const blankTax = (): TaxInfo => ({ companyName: "", bizRegNo: "", ceoName: "", address: "", bizType: "", bizItem: "", email: "", managerName: "", managerPhone: "", amount: null });

function TaxForm({ data, onSaved }: { data: Data; onSaved: () => void }) {
  const t = usePT();
  const c = data.client;
  const [list, setList] = useState<TaxInfo[]>(() =>
    data.taxInfo.length
      ? data.taxInfo.map((e) => ({ ...blankTax(), ...e }))
      : [
          {
            ...blankTax(),
            companyName: c.companyName ?? "",
            bizRegNo: c.bizRegNo ?? "",
            ceoName: c.ceoName ?? "",
            address: c.address ?? "",
            email: c.contactEmail ?? "",
            managerName: c.contactName ?? "",
            managerPhone: c.contactPhone ?? "",
          },
        ],
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (i: number, k: keyof TaxInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setList((l) => l.map((x, j) => (j === i ? { ...x, [k]: k === "amount" ? Number(e.target.value.replace(/[^\d]/g, "")) || null : e.target.value } : x)));
  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      await post("/api/business/portal/tax-info", { taxInfo: list });
      onSaved();
    } catch (x) {
      setError(t.err[(x as Error).message] ?? t.errDefault);
    } finally {
      setBusy(false);
    }
  };
  const field = (i: number, k: keyof TaxInfo, label: string, opts: { full?: boolean; type?: string; max?: number; inputMode?: "numeric" | "email" | "tel" } = {}) => {
    const v = list[i][k];
    return (
      <label className={`block ${opts.full ? "sm:col-span-2" : ""}`}>
        <span className="mb-1.5 block text-[12px] text-white/55">{label}</span>
        <input
          value={k === "amount" ? (v ? Number(v).toLocaleString(t.locale) : "") : String(v ?? "")}
          onChange={set(i, k)}
          type={opts.type ?? "text"}
          inputMode={opts.inputMode}
          maxLength={opts.max ?? 120}
          className={fieldCls}
        />
      </label>
    );
  };
  return (
    <section id="portal-tax" className="scroll-mt-24 border border-[#ffc27a]/40 bg-[#ffc27a]/[.04] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#ffc27a]">TAX INVOICE</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">{t.taxTitle}</h3>
      <p className="mt-1.5 text-[13px] text-white/55">{t.taxDesc}</p>
      {data.taxInfoAt && data.taxComplete && <p className="mt-1 text-[12px] text-[#7fe0c8]">{t.taxDone(new Date(data.taxInfoAt).toLocaleString(t.locale, { timeZone: "Asia/Seoul" }))}</p>}
      <div className="mt-5 grid gap-6">
        {list.map((_, i) => (
          <div key={i} className={list.length > 1 ? "border-t border-white/10 pt-5 first:border-t-0 first:pt-0" : ""}>
            {list.length > 1 && (
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="m-0 text-[13px] font-bold text-[#ffc27a]">{t.entry(i + 1)}</p>
                <button type="button" onClick={() => setList((l) => l.filter((_, j) => j !== i))} className="text-[12px] text-white/45 underline underline-offset-4 hover:text-[#ff8a7a]">
                  {t.removeEntry}
                </button>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {field(i, "companyName", t.tCompany)}
              {field(i, "bizRegNo", t.tBizNo, { max: 20, inputMode: "numeric" })}
              {field(i, "ceoName", t.tCeo, { max: 80 })}
              {field(i, "email", t.tEmail, { type: "email", max: 160, inputMode: "email" })}
              {field(i, "address", t.tAddr, { full: true, max: 200 })}
              {field(i, "bizType", t.tType)}
              {field(i, "bizItem", t.tItem)}
              {field(i, "managerName", t.tManager, { max: 80 })}
              {field(i, "managerPhone", t.tPhone, { max: 40, inputMode: "tel" })}
              {list.length > 1 && field(i, "amount", t.tAmount, { max: 16, inputMode: "numeric" })}
            </div>
          </div>
        ))}
      </div>
      {list.length < 5 && (
        <div className="mt-4">
          <button type="button" onClick={() => setList((l) => [...l, blankTax()])} className="text-[13px] font-semibold text-[#ffc27a] hover:underline">
            {t.addEntry}
          </button>
          {list.length === 1 && <p className="mt-1 text-[11.5px] text-white/40">{t.multiHint}</p>}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-4 text-[13px] text-[#ff8a7a]">
          {error}
        </p>
      )}
      <button type="button" onClick={save} disabled={busy} className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center bg-[#ffc27a] text-sm font-bold text-[#0b0d0f] hover:bg-[#ffd7a6] disabled:opacity-50 sm:w-auto sm:px-10">
        {busy ? t.taxSaving : t.taxSave}
      </button>
    </section>
  );
}

function QuoteAnswer({ q, onDone }: { q: Quote; onDone: () => void }) {
  const t = usePT();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<"" | "ACCEPTED" | "REJECTED">("");
  const [error, setError] = useState<string | null>(null);
  const answer = async (decision: "ACCEPTED" | "REJECTED") => {
    if (!name.trim()) return setError(t.needName);
    if (decision === "REJECTED" && !confirm(t.rejectConfirm)) return;
    setBusy(decision);
    setError(null);
    try {
      await post(`/api/business/portal/quotes/${q.id}/respond`, { decision, name, note });
      onDone();
    } catch (x) {
      setError(t.err[(x as Error).message] ?? t.errDefault);
    } finally {
      setBusy("");
    }
  };
  return (
    <div className="border border-[#a9d0ff]/35 bg-[#a9d0ff]/[.04] p-5 md:p-6">
      <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">YOUR ANSWER</p>
      <h3 className="m-0 mt-2 text-xl font-semibold">{t.answerTitle}</h3>
      <p className="mt-1.5 text-[13px] text-white/55">{t.answerDesc}</p>
      <div className="mt-4 grid gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder={t.answerName} className="w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#a9d0ff]" />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} rows={2} placeholder={t.answerNote} className="w-full resize-y border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#a9d0ff]" />
      </div>
      {error && <p className="mt-3 text-[13px] text-[#ff8a7a]">{error}</p>}
      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button type="button" disabled={!!busy} onClick={() => answer("ACCEPTED")} className="min-h-[48px] bg-[#a9d0ff] text-sm font-bold text-[#0b0d0f] hover:bg-[#cfe4ff] disabled:opacity-50">
          {busy === "ACCEPTED" ? t.working : t.accept}
        </button>
        <button type="button" disabled={!!busy} onClick={() => answer("REJECTED")} className="min-h-[48px] border border-white/20 px-5 text-sm text-white/75 hover:border-[#ff8a7a] hover:text-[#ff8a7a] disabled:opacity-50">
          {t.reject}
        </button>
      </div>
    </div>
  );
}

export default function PortalPage() {
  const t = usePT();
  const day = (d?: string | Date | null) => (d ? new Date(d).toLocaleDateString(t.locale, { timeZone: "Asia/Seoul" }) : "-");
  const [state, setState] = useState<"loading" | "gate" | "in">("loading");
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<"quotes" | "contracts" | "info" | "samples" | "progress" | "ai">("quotes");
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

  const items = useMemo(() => (data ? (tab === "quotes" ? data.quotes : tab === "contracts" ? data.contracts : []) : []), [data, tab]);
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

      {state === "loading" && <div className="grid min-h-[70vh] place-items-center text-sm text-white/40">{t.loading}</div>}
      {state === "gate" && <CodeGate onIn={() => load(false)} />}

      {state === "in" && data && (
        <div className="mx-auto max-w-[1920px] px-[4%] pb-24 pt-28 md:pt-32">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[#ffc27a]">CLIENT PORTAL</p>
              <h1 className="m-0 text-[30px] font-semibold tracking-[-0.045em] md:text-[40px]">{data.client.companyName}</h1>
              <p className="mt-1.5 text-sm text-white/50">
                {t.summary(pending, toSign)}
              </p>
            </div>
            <button type="button" onClick={logout} className="self-start text-sm text-white/50 underline underline-offset-4 hover:text-white md:self-auto">
              {t.leave}
            </button>
          </div>

          <div role="tablist" className="mb-6 flex gap-1 overflow-x-auto border-b border-white/10 sm:gap-2">
            {(
              [
                ["quotes", t.tabQuotes, data.quotes.length, pending],
                ["contracts", t.tabContracts, data.contracts.length, toSign],
                ["info", t.tabInfo, null, !data.taxComplete && data.contracts.length > 0 ? 1 : 0],
                ...(data.progress ? ([["progress", t.tabProgress, null, 0]] as const) : []),
                ...(data.ai ? ([["ai", "AI 사용", null, 0]] as const) : []),
                ...(data.scanSamples ? ([["samples", t.tabSamples, null, 0]] as const) : []),
              ] as const
            ).map(([k, l, n, badge]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                type="button"
                onClick={() => {
                  setTab(k);
                  const list = k === "quotes" ? data.quotes : k === "contracts" ? data.contracts : [];
                  setSel(list[0]?.id ?? null);
                }}
                className={`-mb-px flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 pb-3.5 pt-1 text-[14px] font-semibold transition sm:gap-2 sm:px-4 sm:text-[15px] ${tab === k ? "border-[#ffc27a] text-white" : "border-transparent text-white/45 hover:text-white/80"}`}
              >
                {l} {n !== null && <span className="text-white/35">{n}</span>}
                {badge > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ffc27a] px-1.5 text-[11px] font-bold text-[#0b0d0f]">{badge}</span>}
              </button>
            ))}
          </div>

          {notice && (
            <div role="status" className="mb-5 border border-[#7fe0c8]/40 bg-[#7fe0c8]/[.07] px-4 py-3 text-sm text-[#bff3e5]">
              {notice}
            </div>
          )}

          {tab === "ai" && data.ai ? (
            <AiUsage
              ai={data.ai}
              bankAccount={data.provider.bankAccount ?? ""}
              post={post}
              onChange={(next, message) => {
                setData((d) => (d ? { ...d, ai: next } : d));
                setNotice(message);
              }}
            />
          ) : tab === "progress" && data.progress ? (
            <ProgressView p={data.progress} />
          ) : tab === "samples" ? (
            <SampleUpload />
          ) : tab === "info" ? (
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="grid content-start gap-6">
                <WhikInfo p={data.provider} files={data.companyFiles ?? []} />
                <SealUpload
                  key={(data.client.seals ?? []).map((x) => x.src.length).join("-") || "none"}
                  data={data}
                  onSaved={async () => {
                    setNotice(t.sealSaved);
                    await load();
                  }}
                />
              </div>
              <TaxForm
                key={data.taxInfoAt ?? "new"}
                data={data}
                onSaved={async () => {
                  setNotice(t.taxSaved);
                  await load();
                }}
              />
            </div>
          ) : items.length === 0 ? (
            <div className="border border-dashed border-white/12 px-6 py-20 text-center text-sm text-white/45">
              {tab === "quotes" ? t.noQuotes : t.noContracts}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <ul className="m-0 grid list-none content-start gap-2 p-0">
                {items.map((it) => {
                  const label = tab === "quotes" ? t.qs[it.status] : t.cs[it.status];
                  const st = label ? [label, (tab === "quotes" ? QC : CC)[it.status]] : null;
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
                          {t.won(tab === "quotes" ? (it as Quote).totalAmount : (it as Contract).amount)} | {day(it.sentAt)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {current && (
                <div className="min-w-0">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[13px] text-white/50">
                      {t.printHint}
                      {t.docLang && <span className="block text-white/40">{t.docLang}</span>}
                    </p>
                    <span className="flex flex-wrap gap-2">
                    {current.status === "SENT" && (
                      <a href="#portal-action" className="inline-flex items-center gap-2 bg-[#ffc27a] px-4 py-2 text-sm font-bold text-[#0b0d0f] hover:bg-[#ffd7a6] min-[1700px]:hidden">
                        {tab === "contracts" ? t.jumpSign : t.jumpAnswer} <span aria-hidden>↓</span>
                      </a>
                    )}
                    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-semibold hover:border-white/50">
                      {t.print}
                    </button>
                    </span>
                  </div>
                  {tab === "quotes" && demoPath(current as Quote) && (
                    <Link
                      href={demoPath(current as Quote)!}
                      className="group mb-5 flex flex-col gap-3 rounded-2xl border border-[#ff5a36]/40 bg-[linear-gradient(110deg,rgba(255,90,54,.16),rgba(255,181,71,.06))] p-5 transition hover:border-[#ff5a36]/80 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span>
                        <span className="block text-[10.5px] font-semibold tracking-[0.22em] text-[#ffb547]">{t.demoEyebrow}</span>
                        <span className="mt-1 block text-[17px] font-bold">{t.demoTitle}</span>
                        <span className="mt-0.5 block text-[13px] text-white/55">{t.demoDesc}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#ff5a36] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-10px_rgba(255,90,54,.8)]">
                        {t.demoBtn} <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  )}
                  <div className={`grid gap-6 ${(tab === "quotes" && current.status === "SENT") || (tab === "contracts" && current.status === "SENT") ? "min-[1700px]:grid-cols-[minmax(0,1fr)_360px]" : ""}`}>
                    <div className="wb-print min-w-0 overflow-x-auto bg-white/[.03] p-3 md:p-6">
                      {tab === "quotes" ? <QuoteDocument q={current as Quote} client={data.client} provider={data.provider} /> : <ContractDocument k={current as Contract} client={data.client} provider={data.provider} />}
                    </div>
                    {tab === "quotes" && current.status === "SENT" && (
                      <div id="portal-action" className="scroll-mt-24 min-[1700px]:sticky min-[1700px]:top-28 min-[1700px]:self-start">
                        <QuoteAnswer
                          q={current as Quote}
                          onDone={async () => {
                            setNotice(t.answered);
                            await load();
                          }}
                        />
                      </div>
                    )}
                    {tab === "contracts" && current.status === "SENT" && (
                      <div id="portal-action" className="scroll-mt-24 min-[1700px]:sticky min-[1700px]:top-28 min-[1700px]:self-start">
                        <SignPanel
                          k={current as Contract}
                          hasTax={!!data.taxComplete}
                          onNeedTax={() => {
                            setTab("info");
                            setNotice(null);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          onSigned={async () => {
                            setNotice(t.signed);
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
