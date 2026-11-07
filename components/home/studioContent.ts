import type { Lang } from "@/lib/messages";

type T = Record<Lang, string>;

/** Section headings: [plain part, highlighted part]. */
export const headings: Record<string, { label: string; title: Record<Lang, [string, string]>; body: T }> = {
  showcase: {
    label: "INSIDE WHIK STUDIO",
    title: { ko: ["장면을 만드는", "새로운 흐름."], en: ["A new way", "to build your scene."] },
    body: {
      ko: "촬영 소스, 3D 공간, AI 노드를 한 그래프에 연결해 최종 장면까지 완성합니다.",
      en: "Footage, 3D spaces and AI nodes in one graph, all the way to the final frame.",
    },
  },
  features: {
    label: "WHAT'S INSIDE",
    title: { ko: ["하나의 그래프로,", "끝까지."], en: ["One graph.", "All the way."] },
    body: {
      ko: "합성, 트래킹, 3D, AI까지. 필요한 도구가 노드 하나로 준비되어 있습니다.",
      en: "Compositing, tracking, 3D and AI, each one a node away.",
    },
  },
  tools: {
    label: "TOOLS IN ACTION",
    title: { ko: ["필요한 순간,", "필요한 도구."], en: ["The right tool", "for your next shot."] },
    body: {
      ko: "없는 효과는 AI에게 만들어 달라고 하고, 지울 것은 AI에게 맡기세요.",
      en: "Ask AI for the effect you need, and let it clean up the shot.",
    },
  },
  shorts: {
    label: "QUICK NODE DEMOS",
    title: { ko: ["노드별", "짧은 데모."], en: ["Quick", "node demos."] },
    body: { ko: "1분 안에 보는 노드 하나의 쓰임.", en: "One node at a time, in under a minute." },
  },
  workspace: {
    label: "YOUR WORKSPACE",
    title: { ko: ["익숙한 작업,", "더 넓은 가능성."], en: ["Familiar workflows.", "New possibilities."] },
    body: {
      ko: "영상과 3D를 하나의 노드 그래프에서 다룹니다.",
      en: "Bring footage and 3D together in one node graph.",
    },
  },
};

/** Ticker under the main film. */
export const capabilities: T[] = [
  { ko: "3DGS 공간 합성", en: "3DGS compositing" },
  { ko: "카메라 트래킹", en: "Camera tracking" },
  { ko: "AI 지우기", en: "AI removal" },
  { ko: "AI 매트", en: "AI mattes" },
  { ko: "AI 업스케일", en: "AI upscale" },
  { ko: "중간 프레임 생성", en: "Frame interpolation" },
  { ko: "깊이 초점", en: "Depth defocus" },
  { ko: "OCIO / ACES", en: "OCIO / ACES" },
  { ko: "EXR / Deep", en: "EXR / Deep" },
  { ko: "Cryptomatte", en: "Cryptomatte" },
  { ko: "파이썬 플러그인", en: "Python plugins" },
  { ko: "OFX 플러그인", en: "OFX plugins" },
  { ko: "MCP 연결", en: "MCP integration" },
  { ko: "백그라운드 렌더", en: "Background renders" },
];

export const stats: { value: string; label: T }[] = [
  { value: "200+", label: { ko: "기본 노드", en: "Built-in nodes" } },
  { value: "0원", label: { ko: "무료로 사용", en: "Free to use" } },
  { value: "AI", label: { ko: "노드와 어시스턴트", en: "Nodes and assistant" } },
];

export type KeyFeature = {
  icon: "splat" | "erase" | "matte" | "track" | "sparkle" | "light" | "shapes" | "bot";
  accent: string;
  title: T;
  desc: T;
  nodes: string;
};

export const keyFeatures: KeyFeature[] = [
  {
    icon: "splat",
    accent: "#a9d0ff",
    title: { ko: "3DGS 공간 합성", en: "3DGS compositing" },
    desc: { ko: "가우시안 스플랫 공간을 불러와 카메라로 찍고 영상에 합성합니다.", en: "Load Gaussian splat spaces, shoot them with a camera, comp them in." },
    nodes: "GeoImport  SplatRender",
  },
  {
    icon: "erase",
    accent: "#ff9d7a",
    title: { ko: "AI 지우기", en: "AI removal" },
    desc: { ko: "글자, 와이어, 사물을 지우고 빈자리를 자연스럽게 채웁니다.", en: "Remove text, wires and objects, and fill what was behind." },
    nodes: "ObjectRemoval  WireRemoval",
  },
  {
    icon: "matte",
    accent: "#9cf2c4",
    title: { ko: "AI 매트", en: "AI mattes" },
    desc: { ko: "몇 번의 클릭으로 사람과 사물을 영상에서 분리합니다.", en: "Isolate people and objects in a few clicks." },
    nodes: "Segment  Cryptomatte",
  },
  {
    icon: "track",
    accent: "#ffd36e",
    title: { ko: "카메라 트래킹", en: "Camera tracking" },
    desc: { ko: "촬영한 카메라의 움직임을 3D로 되살리고 평면을 따라갑니다.", en: "Solve the shot's camera in 3D and follow planes." },
    nodes: "CameraTracker  PlanarTracker",
  },
  {
    icon: "sparkle",
    accent: "#c9a8ff",
    title: { ko: "AI 화질 개선", en: "AI enhance" },
    desc: { ko: "해상도를 키우고, 중간 프레임을 만들고, 노이즈를 걷어냅니다.", en: "Upscale, interpolate frames and clean up noise." },
    nodes: "AIUpscale  FrameInterpolate",
  },
  {
    icon: "light",
    accent: "#ffb86b",
    title: { ko: "빛과 깊이", en: "Light and depth" },
    desc: { ko: "깊이로 초점을 옮기고, 빛을 더하고, 그림자를 만듭니다.", en: "Rack focus with depth, add light, cast shadows." },
    nodes: "DepthDefocus  LightSpill  ShadowMaker",
  },
  {
    icon: "shapes",
    accent: "#7fd8ff",
    title: { ko: "3D 제작", en: "3D creation" },
    desc: { ko: "모델링, 재질과 텍스처, UV 편집, GPU 렌더까지 앱 안에서.", en: "Modeling, materials, UV editing and GPU rendering inside the app." },
    nodes: "ModelingTools  UVEdit  Render3D",
  },
  {
    icon: "bot",
    accent: "#ff8fc1",
    title: { ko: "AI 어시스턴트 연결", en: "AI assistants" },
    desc: { ko: "말로 플러그인을 만들고, AI가 노드를 직접 연결하고 렌더합니다.", en: "Describe a plugin in words; let AI wire nodes and render." },
    nodes: "Prompt Editor  MCP",
  },
];

/** Workspace explorer: extra lines for each screen (same order as workspaceScreens). */
export const workspaceDetails: { title: T; nodes: string }[] = [
  { title: { ko: "3D 공간을 장면 속으로", en: "Bring 3D spaces into the shot" }, nodes: "GeoImport  GeoScene  SplatRender  Grade" },
  { title: { ko: "움직임을 그대로 따라가기", en: "Follow every move" }, nodes: "Tracker  CameraTracker  PlanarTracker" },
  { title: { ko: "카메라로 영상을 투사하기", en: "Project footage through cameras" }, nodes: "Camera  Projection  Render3D" },
  { title: { ko: "필요한 영역만 골라내기", en: "Pull out just what you need" }, nodes: "Segment  Roto  Cryptomatte" },
];

export const videoTags: Record<string, T> = {
  CzRonjprQaE: { ko: "AI 플러그인", en: "AI PLUGIN" },
  dpC9tPgqQ8s: { ko: "AI 지우기", en: "AI REMOVAL" },
};

export const nodeAccents: Record<string, string> = {
  LwVQjVE0vSo: "#ffd36e",
  Xnyyily8ZJM: "#ff9fc4",
  "RZUkHR-cIPU": "#9fb0ff",
  KNg6rV9BwoQ: "#7ff0d2",
};
