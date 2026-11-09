import type { Lang } from "@/lib/messages";

type T = Record<Lang, string>;

/** Section headings: [plain part, highlighted part]. */
export const headings: Record<string, { label: string; title: Record<Lang, [string, string]>; body: T }> = {
  showcase: {
    label: "INSIDE WHIK STUDIO",
    title: { ko: ["장면을 만드는", "새로운 흐름."], en: ["A new way", "to build your scene."], ja: ["シーンをつくる", "新しい流れ。"], zh: ["打造画面的", "全新流程。"] },
    body: {
      ko: "촬영 소스, 3D 공간, AI 노드를 한 그래프에 연결해 최종 장면까지 완성합니다.",
      en: "Footage, 3D spaces and AI nodes in one graph, all the way to the final frame.", ja: "撮影素材、3D空間、AIノードをひとつのグラフでつなぎ、最終カットまで仕上げます。", zh: "将拍摄素材、3D空间与AI节点连接在同一张图中，一路完成到最终画面。",
    },
  },
  features: {
    label: "WHAT'S INSIDE",
    title: { ko: ["하나의 그래프로,", "끝까지."], en: ["One graph.", "All the way."], ja: ["ひとつのグラフで、", "最後まで。"], zh: ["一张节点图，", "一路到底。"] },
    body: {
      ko: "합성, 트래킹, 3D, AI까지. 필요한 도구가 노드 하나로 준비되어 있습니다.",
      en: "Compositing, tracking, 3D and AI, each one a node away.", ja: "合成、トラッキング、3D、AIまで。必要なツールがノードひとつで揃います。", zh: "合成、跟踪、3D与AI，所需工具都只差一个节点。",
    },
  },
  tools: {
    label: "TOOLS IN ACTION",
    title: { ko: ["필요한 순간,", "필요한 도구."], en: ["The right tool", "for your next shot."], ja: ["必要な瞬間に、", "必要なツールを。"], zh: ["需要的时刻，", "需要的工具。"] },
    body: {
      ko: "없는 효과는 AI에게 만들어 달라고 하고, 지울 것은 AI에게 맡기세요.",
      en: "Ask AI for the effect you need, and let it clean up the shot.", ja: "ない効果はAIに作ってもらい、消したいものはAIに任せましょう。", zh: "缺少的效果交给AI来做，要擦除的内容也交给AI。",
    },
  },
  shorts: {
    label: "QUICK NODE DEMOS",
    title: { ko: ["노드별", "짧은 데모."], en: ["Quick", "node demos."], ja: ["ノード別", "ショートデモ。"], zh: ["按节点看的", "简短演示。"] },
    body: { ko: "1분 안에 보는 노드 하나의 쓰임.", en: "One node at a time, in under a minute.", ja: "1分で分かる、ノードひとつの使い方。", zh: "一分钟看懂一个节点的用法。" },
  },
  workspace: {
    label: "YOUR WORKSPACE",
    title: { ko: ["익숙한 작업,", "더 넓은 가능성."], en: ["Familiar workflows.", "New possibilities."], ja: ["慣れた作業で、", "もっと広い可能性を。"], zh: ["熟悉的工作方式，", "更广的可能。"] },
    body: {
      ko: "영상과 3D를 하나의 노드 그래프에서 다룹니다.",
      en: "Bring footage and 3D together in one node graph.", ja: "映像と3Dを、ひとつのノードグラフで扱います。", zh: "在同一个节点图中处理视频与3D。",
    },
  },
};

/** Ticker under the main film. */
export const capabilities: T[] = [
  { ko: "3DGS 공간 합성", en: "3DGS compositing", ja: "3DGS空間合成", zh: "3DGS空间合成" },
  { ko: "카메라 트래킹", en: "Camera tracking", ja: "カメラトラッキング", zh: "摄像机跟踪" },
  { ko: "AI 지우기", en: "AI removal", ja: "AI除去", zh: "AI移除" },
  { ko: "AI 매트", en: "AI mattes", ja: "AIマット", zh: "AI遮罩" },
  { ko: "AI 업스케일", en: "AI upscale", ja: "AIアップスケール", zh: "AI超分辨率" },
  { ko: "중간 프레임 생성", en: "Frame interpolation", ja: "中間フレーム生成", zh: "插帧" },
  { ko: "깊이 초점", en: "Depth defocus", ja: "深度フォーカス", zh: "景深虚化" },
  { ko: "OCIO / ACES", en: "OCIO / ACES", ja: "OCIO / ACES", zh: "OCIO / ACES" },
  { ko: "EXR / Deep", en: "EXR / Deep", ja: "EXR / Deep", zh: "EXR / Deep" },
  { ko: "Cryptomatte", en: "Cryptomatte", ja: "Cryptomatte", zh: "Cryptomatte" },
  { ko: "파이썬 플러그인", en: "Python plugins", ja: "Pythonプラグイン", zh: "Python插件" },
  { ko: "OFX 플러그인", en: "OFX plugins", ja: "OFXプラグイン", zh: "OFX插件" },
  { ko: "MCP 연결", en: "MCP integration", ja: "MCP連携", zh: "MCP连接" },
  { ko: "백그라운드 렌더", en: "Background renders", ja: "バックグラウンドレンダー", zh: "后台渲染" },
];

export const stats: { value: string | T; label: T }[] = [
  { value: "200+", label: { ko: "기본 노드", en: "Built-in nodes", ja: "標準ノード", zh: "内置节点" } },
  { value: { ko: "0원", en: "$0", ja: "0円", zh: "0元" }, label: { ko: "무료로 사용", en: "Free to use", ja: "無料で使える", zh: "免费使用" } },
  { value: "AI", label: { ko: "노드와 어시스턴트", en: "Nodes and assistant", ja: "ノードとアシスタント", zh: "节点与助手" } },
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
    title: { ko: "3DGS 공간 합성", en: "3DGS compositing", ja: "3DGS空間合成", zh: "3DGS空间合成" },
    desc: { ko: "가우시안 스플랫 공간을 불러와 카메라로 찍고 영상에 합성합니다.", en: "Load Gaussian splat spaces, shoot them with a camera, comp them in.", ja: "ガウシアンスプラットの空間を読み込み、カメラで撮って映像に合成します。", zh: "导入高斯泼溅空间，用摄像机拍摄并合成进视频。" },
    nodes: "GeoImport  SplatRender",
  },
  {
    icon: "erase",
    accent: "#ff9d7a",
    title: { ko: "AI 지우기", en: "AI removal", ja: "AI除去", zh: "AI移除" },
    desc: { ko: "글자, 와이어, 사물을 지우고 빈자리를 자연스럽게 채웁니다.", en: "Remove text, wires and objects, and fill what was behind.", ja: "文字、ワイヤー、物体を消し、空いた部分を自然に埋めます。", zh: "擦除文字、威亚和物体，并自然填补空出的部分。" },
    nodes: "ObjectRemoval  WireRemoval",
  },
  {
    icon: "matte",
    accent: "#9cf2c4",
    title: { ko: "AI 매트", en: "AI mattes", ja: "AIマット", zh: "AI遮罩" },
    desc: { ko: "몇 번의 클릭으로 사람과 사물을 영상에서 분리합니다.", en: "Isolate people and objects in a few clicks.", ja: "数回のクリックで人物や物体を映像から切り出します。", zh: "点几下就能把人物和物体从画面中分离出来。" },
    nodes: "Segment  Cryptomatte",
  },
  {
    icon: "track",
    accent: "#ffd36e",
    title: { ko: "카메라 트래킹", en: "Camera tracking", ja: "カメラトラッキング", zh: "摄像机跟踪" },
    desc: { ko: "촬영한 카메라의 움직임을 3D로 되살리고 평면을 따라갑니다.", en: "Solve the shot's camera in 3D and follow planes.", ja: "撮影したカメラの動きを3Dで再現し、平面を追従します。", zh: "以3D还原拍摄时的摄像机运动，并跟踪平面。" },
    nodes: "CameraTracker  PlanarTracker",
  },
  {
    icon: "sparkle",
    accent: "#c9a8ff",
    title: { ko: "AI 화질 개선", en: "AI enhance", ja: "AI画質向上", zh: "AI画质增强" },
    desc: { ko: "해상도를 키우고, 중간 프레임을 만들고, 노이즈를 걷어냅니다.", en: "Upscale, interpolate frames and clean up noise.", ja: "解像度を上げ、中間フレームを作り、ノイズを取り除きます。", zh: "提升分辨率、生成中间帧、去除噪点。" },
    nodes: "AIUpscale  FrameInterpolate",
  },
  {
    icon: "light",
    accent: "#ffb86b",
    title: { ko: "빛과 깊이", en: "Light and depth", ja: "光と深度", zh: "光照与景深" },
    desc: { ko: "깊이로 초점을 옮기고, 빛을 더하고, 그림자를 만듭니다.", en: "Rack focus with depth, add light, cast shadows.", ja: "深度でピントを移し、光を加え、影を作ります。", zh: "用深度移动焦点、添加光照、生成阴影。" },
    nodes: "DepthDefocus  LightSpill  ShadowMaker",
  },
  {
    icon: "shapes",
    accent: "#7fd8ff",
    title: { ko: "3D 제작", en: "3D creation", ja: "3D制作", zh: "3D制作" },
    desc: { ko: "모델링, 재질과 텍스처, UV 편집, GPU 렌더까지 앱 안에서.", en: "Modeling, materials, UV editing and GPU rendering inside the app.", ja: "モデリング、マテリアルとテクスチャ、UV編集、GPUレンダーまでアプリの中で。", zh: "建模、材质与贴图、UV编辑、GPU渲染，全部在应用内完成。" },
    nodes: "ModelingTools  UVEdit  Render3D",
  },
  {
    icon: "bot",
    accent: "#ff8fc1",
    title: { ko: "AI 어시스턴트 연결", en: "AI assistants", ja: "AIアシスタント連携", zh: "连接AI助手" },
    desc: { ko: "말로 플러그인을 만들고, AI가 노드를 직접 연결하고 렌더합니다.", en: "Describe a plugin in words; let AI wire nodes and render.", ja: "言葉でプラグインを作り、AIがノードをつないでレンダーまで行います。", zh: "用一句话做出插件，AI会直接连接节点并完成渲染。" },
    nodes: "Prompt Editor  MCP",
  },
];

/** Workspace explorer: extra lines for each screen (same order as workspaceScreens). */
export const workspaceDetails: { title: T; nodes: string }[] = [
  { title: { ko: "3D 공간을 장면 속으로", en: "Bring 3D spaces into the shot", ja: "3D空間をシーンの中へ", zh: "把3D空间放进画面" }, nodes: "GeoImport  GeoScene  SplatRender  Grade" },
  { title: { ko: "움직임을 그대로 따라가기", en: "Follow every move", ja: "動きをそのまま追いかける", zh: "精准跟随每一个动作" }, nodes: "Tracker  CameraTracker  PlanarTracker" },
  { title: { ko: "카메라로 영상을 투사하기", en: "Project footage through cameras", ja: "カメラで映像を投影する", zh: "通过摄像机投射画面" }, nodes: "Camera  Projection  Render3D" },
  { title: { ko: "필요한 영역만 골라내기", en: "Pull out just what you need", ja: "必要な領域だけを切り出す", zh: "只取出需要的部分" }, nodes: "Segment  Roto  Cryptomatte" },
];

export const videoTags: Record<string, T> = {
  CzRonjprQaE: { ko: "AI 플러그인", en: "AI PLUGIN", ja: "AIプラグイン", zh: "AI插件" },
  dpC9tPgqQ8s: { ko: "AI 지우기", en: "AI REMOVAL", ja: "AI除去", zh: "AI移除" },
};

export const nodeAccents: Record<string, string> = {
  LwVQjVE0vSo: "#ffd36e",
  Xnyyily8ZJM: "#ff9fc4",
  "RZUkHR-cIPU": "#9fb0ff",
  KNg6rV9BwoQ: "#7ff0d2",
};
