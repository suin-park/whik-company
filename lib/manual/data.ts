import raw from "./nodes.json";

/** The node reference, exported from WHIK Studio (tools/manual_export.py in whik-studio). */
export type Choice = {
  en: string;
  ko: string | null;
  ja?: string | null;
  zh?: string | null;
  /** its line beside it in the app's menu (a Merge operation's formula), in each language */
  hint?: { en: string; ko: string | null; ja: string | null; zh: string | null };
};
export type Knob = {
  name: string;
  label: string;
  label_ko: string | null;
  label_ja?: string | null;
  label_zh?: string | null;
  kind: string;
  kind_ko: string;
  tooltip: string;
  tooltip_ko: string | null;
  tooltip_ja?: string | null;
  tooltip_zh?: string | null;
  default: unknown;
  range?: [number, number];
  choices?: Choice[];
};
export type Group = { title: string; title_ko: string | null; title_ja?: string | null; title_zh?: string | null; knobs: Knob[] };
export type ManualNode = {
  cls: string;
  category: string;
  category_ko: string;
  help: string;
  help_ko: string | null;
  help_ja?: string | null;
  help_zh?: string | null;
  inputs: { label: string }[];
  output: string;
  groups: Group[];
};
export type Category = { id: string; ko: string; count: number };

const data = raw as unknown as { version: string; generated: string; categories: Category[]; nodes: ManualNode[] };

export const categories = data.categories;
export const nodes = data.nodes;
export const generated = data.generated;

export const nodeBySlug = (slug: string) => nodes.find((n) => n.cls.toLowerCase() === slug.toLowerCase());
export const slugOf = (n: ManualNode) => n.cls.toLowerCase();

/** A category's line for the reference (what its nodes are for). */
export const categoryBlurb: Record<string, string> = {
  Image: "영상과 이미지를 불러오고 저장하고, 기본 그림을 만드는 노드",
  Color: "밝기, 색, 대비를 다루는 색보정 노드",
  Filter: "흐림, 선명하게, 노이즈 제거와 AI 효과",
  Keyer: "배경을 빼고 매트(알파)를 만드는 노드",
  Draw: "로토, 페인트, 글자, 모션 그래픽",
  Transform: "위치, 크기, 왜곡, 트래킹과 파노라마",
  Time: "속도, 프레임 범위, 리타임",
  Channel: "채널을 복사하고 섞고 바꾸기",
  Merge: "여러 그림을 합치기",
  Deep: "깊이 정보를 가진 딥 이미지 합성",
  "3D": "3D 모델, 카메라, 장면, 렌더",
  Light: "3D 장면의 조명",
  Field: "3D 공간의 영역을 골라 편집하기",
  Render: "3D 스캔 공간(가우시안 스플랫) 렌더",
  WHIK: "WHIK 3D Scanner 데이터 정리",
  Other: "그룹, 입출력, 정리용 노드",
};

/** The Korean text when there is one, else the English (and whether it fell back). */
export function ko(koText: string | null | undefined, en: string): { text: string; fallback: boolean } {
  return koText ? { text: koText, fallback: false } : { text: en, fallback: !!en };
}

/** A knob's default as it reads. */
export function shownDefault(k: Knob): string {
  const v = k.default;
  if (v === null || v === undefined || v === "") return "";
  if (k.kind === "bool") return v ? "켜짐" : "꺼짐";
  if (k.kind === "enum" && typeof v === "number" && k.choices?.[v]) {
    const c = k.choices[v];
    return c.ko ?? c.en;
  }
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

