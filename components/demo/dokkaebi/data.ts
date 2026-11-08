// All people, numbers and messages here are invented for the sales demo. No real customer data.

export const STORE = {
  legal: "돗가비불쭈꾸미THE청주 본점",
  brand: "돗가비불쭈꾸미",
  short: "청주 본점",
  phone: "043-232-9110",
};

export const STORES = [
  { id: "cj", name: "THE청주 본점", city: "청주", open: "운영 중", customers: 3184, month: 1240, revisit: 41, coupon: 18.2, consent: 72, sample: false },
  { id: "pg", name: "판교점", city: "성남", open: "운영 중", customers: 1962, month: 870, revisit: 36, coupon: 15.4, consent: 68, sample: false },
  { id: "sj", name: "세종점 (예시)", city: "세종", open: "2027년 오픈 예정", customers: 0, month: 0, revisit: 0, coupon: 0, consent: 0, sample: true },
  { id: "dj", name: "대전 둔산점 (예시)", city: "대전", open: "2027년 오픈 예정", customers: 0, month: 0, revisit: 0, coupon: 0, consent: 0, sample: true },
] as const;

export type Source = "응모권" | "QR 응모" | "네이버 예약" | "카카오 채널" | "알리미 앱" | "매장 태블릿";
export const SOURCES: Source[] = ["응모권", "QR 응모", "네이버 예약", "카카오 채널", "알리미 앱", "매장 태블릿"];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  birthday: string | null; // MM-DD
  visits: number;
  lastVisitDays: number;
  sources: Source[];
  marketing: boolean;
  consentDate: string; // YYYY-MM-DD
  points: number;
  store: string;
  tags: string[];
};

// Deterministic pseudo random so the demo looks the same every time.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const FAMILY = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍"];
const GIVEN = ["민준", "서연", "도윤", "하은", "지호", "수아", "예준", "지우", "현우", "서윤", "준서", "하린", "건우", "채원", "우진", "다은", "선우", "유나", "정은", "영수", "순자", "광호", "미경", "상철", "은주", "태희", "보람", "성민"];

export const mask = (name: string) => (name.length <= 2 ? name[0] + "O" : name[0] + "O".repeat(name.length - 2) + name[name.length - 1]);
export const maskPhone = (p: string) => p.replace(/^(\d{3})-(\d{4})-(\d{4})$/, "$1-****-$3");

export const CUSTOMERS: Customer[] = (() => {
  const r = rng(20261107);
  const list: Customer[] = [];
  for (let i = 0; i < 64; i++) {
    const name = FAMILY[Math.floor(r() * FAMILY.length)] + GIVEN[Math.floor(r() * GIVEN.length)];
    const phone = `010-${String(1000 + Math.floor(r() * 8999))}-${String(1000 + Math.floor(r() * 8999))}`;
    const hasBday = r() > 0.25;
    const m = 1 + Math.floor(r() * 12);
    const d = 1 + Math.floor(r() * 28);
    const visits = 1 + Math.floor(Math.pow(r(), 2.2) * 24);
    const last = Math.floor(Math.pow(r(), 1.6) * 150);
    const srcCount = 1 + Math.floor(r() * 2.4);
    const sources = Array.from(new Set(Array.from({ length: srcCount }, () => SOURCES[Math.floor(r() * SOURCES.length)])));
    const marketing = r() > 0.28;
    const cy = r() > 0.8 ? 2024 : r() > 0.4 ? 2025 : 2026;
    const tags = [visits >= 10 ? "단골" : visits <= 1 ? "첫 방문" : "", last >= 60 ? "휴면 위험" : ""].filter(Boolean);
    list.push({
      id: `c${i}`,
      name,
      phone,
      birthday: hasBday ? `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : null,
      visits,
      lastVisitDays: last,
      sources,
      marketing,
      consentDate: `${cy}-${String(1 + Math.floor(r() * 12)).padStart(2, "0")}-${String(1 + Math.floor(r() * 28)).padStart(2, "0")}`,
      points: visits * 500 + Math.floor(r() * 5) * 100,
      store: r() > 0.3 ? "THE청주 본점" : "판교점",
      tags,
    });
  }
  // A few birthdays this week (demo "today" is 11-08) so the birthday segment is never empty.
  ["11-09", "11-10", "11-12", "11-13"].forEach((b, i) => {
    list[i * 7].birthday = b;
    list[i * 7].marketing = true;
  });
  return list;
})();

// Last 14 days of visits (THE청주 본점) for the overview chart.
export const VISITS_14 = [86, 74, 92, 118, 164, 201, 177, 81, 79, 95, 124, 171, 214, 188];
export const DAY_LABELS = ["10/26", "10/27", "10/28", "10/29", "10/30", "10/31", "11/1", "11/2", "11/3", "11/4", "11/5", "11/6", "11/7", "11/8"];

export const SOURCE_SHARE: { source: Source; count: number }[] = [
  { source: "응모권", count: 1812 },
  { source: "네이버 예약", count: 920 },
  { source: "QR 응모", count: 640 },
  { source: "카카오 채널", count: 452 },
  { source: "알리미 앱", count: 198 },
  { source: "매장 태블릿", count: 95 },
];

// Paper entry tickets used in the batch scan demo. `hard` marks a digit the model is unsure about.
export type Ticket = {
  name: string;
  phone: string;
  birth: string; // "11 / 12" or ""
  required: boolean;
  marketing: boolean;
  hard?: { field: "phone"; options: string[] };
  dupeOf?: string;
  tilt: number;
};

export const TICKETS: Ticket[] = [
  { name: "박정은", phone: "010-4821-7730", birth: "11 / 12", required: true, marketing: true, tilt: -2.5 },
  { name: "이도윤", phone: "010-9134-2208", birth: "", required: true, marketing: false, tilt: 1.8 },
  { name: "최순자", phone: "010-7710-3945", birth: "03 / 27", required: true, marketing: true, hard: { field: "phone", options: ["010-7710-3945", "010-7710-3946"] }, tilt: -1.2 },
  { name: "김하은", phone: "010-2287-6614", birth: "08 / 02", required: true, marketing: true, dupeOf: "방문 4회째 단골", tilt: 2.4 },
  { name: "한광호", phone: "010-5502-1187", birth: "01 / 19", required: true, marketing: true, tilt: -0.8 },
  { name: "정미경", phone: "010-3368-9021", birth: "", required: false, marketing: false, tilt: 1.1 },
];

export const MENU_SHOTS = [
  { id: "m1", name: "불쭈꾸미 철판", tag: "대표 메뉴", hue: "from-[#ff5a36] via-[#c2261b] to-[#3a0d08]" },
  { id: "m2", name: "치즈 폭포 볶음밥", tag: "신메뉴", hue: "from-[#ffcf5a] via-[#e2832b] to-[#4a1f08]" },
  { id: "m3", name: "주말 2인 세트", tag: "할인 행사", hue: "from-[#ff8a5c] via-[#a52a6b] to-[#250a24]" },
];

export const fmt = (n: number) => n.toLocaleString("ko-KR");
