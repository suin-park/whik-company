import type { Lang } from "@/lib/messages";

export const STUDIO_DOWNLOAD_URL = "https://github.com/suin-park/Whik";
export const STUDIO_RELEASES_URL = "https://github.com/suin-park/Whik/releases";
export const LOCKER_URL = "https://www.3d-locker.com/";
export const MAIN_FILM_ID = "aZgun--egao";

export type Video = {
  id: string;
  start?: number;
  short?: boolean;
  title: Record<Lang, string>;
  caption: Record<Lang, string>;
};

export const featureVideos: Video[] = [
  {
    id: "CzRonjprQaE",
    start: 175,
    title: {
      ko: "필요한 영상 효과가 없어서 AI에게 만들어달라고 했습니다",
      en: "I asked AI to build the video effect I needed", ja: "必要な映像効果がなかったので、AIに作ってもらいました", zh: "需要的视频效果没有现成的，于是让AI做了一个",
    },
    caption: { ko: "AI 플러그인 제작", en: "Create plugins with AI", ja: "AIでプラグイン制作", zh: "用AI制作插件" },
  },
  {
    id: "dpC9tPgqQ8s",
    start: 216,
    title: {
      ko: "영상 속 글자, AI에게 지워달라고 했습니다",
      en: "I asked AI to remove text from a video", ja: "映像の中の文字を、AIに消してもらいました", zh: "让AI擦除了视频里的文字",
    },
    caption: { ko: "AI에게 지시하는 합성 작업", en: "Direct your compositing work with AI", ja: "AIに指示して進める合成作業", zh: "用AI指挥合成工作" },
  },
];

export const nodeShorts: Video[] = [
  {
    id: "LwVQjVE0vSo",
    short: true,
    title: { ko: "LightFill", en: "LightFill", ja: "LightFill", zh: "LightFill" },
    caption: { ko: "영상 속 조명 만들기", en: "Add light to your scene", ja: "映像に光を加える", zh: "为画面添加光照" },
  },
  {
    id: "Xnyyily8ZJM",
    short: true,
    title: { ko: "AgeShift", en: "AgeShift", ja: "AgeShift", zh: "AgeShift" },
    caption: { ko: "간편한 나이 조절", en: "Adjust apparent age", ja: "見た目の年齢をかんたん調整", zh: "轻松调整外观年龄" },
  },
  {
    id: "RZUkHR-cIPU",
    short: true,
    title: { ko: "ShadowMaker", en: "ShadowMaker", ja: "ShadowMaker", zh: "ShadowMaker" },
    caption: { ko: "장면에 그림자 더하기", en: "Add shadows to your scene", ja: "シーンに影を加える", zh: "为场景添加阴影" },
  },
  {
    id: "KNg6rV9BwoQ",
    short: true,
    title: { ko: "Membrane", en: "Membrane", ja: "Membrane", zh: "Membrane" },
    caption: { ko: "영상을 천 질감으로 활용하기", en: "Use footage as a flexible surface", ja: "映像を布のような質感で使う", zh: "把视频当作柔性布面来用" },
  },
];

export const workspaceScreens = [
  {
    src: "/images/home/studio-3dgs.jpg",
    tab: { ko: "3DGS와 합성", en: "3DGS & compositing", ja: "3DGSと合成", zh: "3DGS与合成" },
    caption: {
      ko: "3D 장면을 확인하고 영상 합성으로 연결하는 작업 화면입니다.",
      en: "Inspect your 3D scene and bring it into a compositing workflow.", ja: "3Dシーンを確認し、映像合成へつなげる作業画面です。", zh: "查看3D场景并将其接入视频合成流程。",
    },
  },
  {
    src: "/images/home/studio-tracking.jpg",
    tab: { ko: "트래킹", en: "Tracking", ja: "トラッキング", zh: "跟踪" },
    caption: {
      ko: "움직이는 영상의 특징점을 추적하는 작업 화면입니다.",
      en: "Track features across moving footage.", ja: "動く映像の特徴点を追跡する作業画面です。", zh: "跟踪运动画面中的特征点。",
    },
  },
  {
    src: "/images/home/studio-projection.jpg",
    tab: { ko: "3D 프로젝션", en: "3D projection", ja: "3Dプロジェクション", zh: "3D投影" },
    caption: {
      ko: "카메라와 3D 지오메트리, 노드를 연결한 프로젝션 작업입니다.",
      en: "Connect cameras, 3D geometry and nodes for projection work.", ja: "カメラ、3Dジオメトリ、ノードをつないだプロジェクション作業です。", zh: "连接摄像机、3D几何体与节点完成投影工作。",
    },
  },
  {
    src: "/images/home/studio-segment.jpg",
    tab: { ko: "세그먼트", en: "Segmentation", ja: "セグメント", zh: "分割" },
    caption: {
      ko: "매트를 생성해 영상에서 필요한 영역을 분리하는 작업 화면입니다.",
      en: "Create mattes to isolate the regions you need.", ja: "マットを作成し、映像から必要な領域を切り出す作業画面です。", zh: "生成遮罩，从画面中分离出需要的区域。",
    },
  },
];

const copy = {
  ko: {
    tagline: "상상을 장면으로.",
    intro: "무료 영상 합성 및 3D 제작 도구",
    download: "무료 다운로드",
    watchFilm: "소개 영상 보기",
    ecoTitle1: "촬영에서",
    ecoTitle2: "완성까지.",
    studioDesc: "영상 합성과 보정",
    studioCta: "자세히 보기",
    lockerDesc: "3D 어셋 생성과 활용",
    lockerCta: "서비스 바로가기",
    scannerDesc: "촬영과 공간 기록",
    comingSoon: "출시 예정",
    showcaseTitle: "장면을 만드는 새로운 흐름.",
    showcaseBody: "WHIK Studio의 실제 작업 흐름을 영상으로 만나보세요.",
    filmCaption: "WHIK Studio 소개 영상",
    filmTitle: "WHIK Studio 소개",
    featureTitle: "필요한 순간, 필요한 도구.",
    featureBody: "AI와 함께 작업하고, 노드로 결과를 완성하세요.",
    from: "부터",
    shortsTitle: "노드별 짧은 데모.",
    shortsBody: "짧은 영상으로 노드 하나씩 살펴보세요.",
    workspaceTitle: "익숙한 작업, 더 넓은 가능성.",
    workspaceBody: "영상과 3D를 하나의 노드 그래프에서 다룹니다.",
    scannerTitle1: "당신의 공간을,",
    scannerTitle2: "다음 장면으로.",
    scannerBody:
      "스마트폰으로 공간과 사물을 기록하는 WHIK 3D Scanner를 준비하고 있습니다. 현실의 장면을 디지털 제작의 시작점으로 가져오세요.",
    play: "영상 재생",
    openYoutube: "YouTube에서 보기",
    playerHint: "재생되지 않으면 YouTube에서 열어주세요.",
    close: "닫기",
    studioDialogTitle: "생성 이후의 완성도까지.",
    studioDialogBody:
      "노드 기반으로 영상을 합성하고 보정하는 무료 제작 도구입니다. 생성한 이미지와 영상, 3D 어셋을 연결해 원하는 장면으로 완성하세요.",
    studioFeatures: ["노드 기반 합성", "3D 작업 흐름", "MCP 연결"],
    scrollHint: "아래로",
  },
  en: {
    tagline: "Bring your vision to life.",
    intro: "Free tools for compositing and 3D creation",
    download: "Download for free",
    watchFilm: "Watch the film",
    ecoTitle1: "From capture",
    ecoTitle2: "to final frame.",
    studioDesc: "Compositing and finishing",
    studioCta: "Explore Studio",
    lockerDesc: "Create and use 3D assets",
    lockerCta: "Visit 3D Locker",
    scannerDesc: "Capture scenes and spaces",
    comingSoon: "Coming soon",
    showcaseTitle: "A new way to build your scene.",
    showcaseBody: "See WHIK Studio in action, from node graph to final frame.",
    filmCaption: "Meet WHIK Studio",
    filmTitle: "Introducing WHIK Studio",
    featureTitle: "The right tool for your next shot.",
    featureBody: "Work with AI. Shape the result with nodes.",
    from: "start",
    shortsTitle: "Quick node demos.",
    shortsBody: "One node at a time, in under a minute.",
    workspaceTitle: "Familiar workflows. New possibilities.",
    workspaceBody: "Bring footage and 3D together in one node graph.",
    scannerTitle1: "Your space.",
    scannerTitle2: "Your next scene.",
    scannerBody:
      "WHIK 3D Scanner is coming soon. Capture spaces and objects with your smartphone and make the real world the starting point of your creative work.",
    play: "Play video",
    openYoutube: "Watch on YouTube",
    playerHint: "If playback is unavailable, open the video on YouTube.",
    close: "Close",
    studioDialogTitle: "Take your shot further.",
    studioDialogBody:
      "A free, node-based tool for compositing and finishing. Bring images, video and 3D assets together to build the scene you imagine.",
    studioFeatures: ["Node-based compositing", "3D workflow", "MCP integration"],
    scrollHint: "Scroll",
  },
  ja: {
    tagline: "想像を、シーンに。",
    intro: "無料の映像合成と3D制作ツール",
    download: "無料ダウンロード",
    watchFilm: "紹介映像を見る",
    ecoTitle1: "撮影から",
    ecoTitle2: "完成まで。",
    studioDesc: "映像合成と仕上げ",
    studioCta: "詳しく見る",
    lockerDesc: "3Dアセットの生成と活用",
    lockerCta: "サービスを見る",
    scannerDesc: "撮影と空間の記録",
    comingSoon: "近日公開",
    showcaseTitle: "シーンをつくる新しい流れ。",
    showcaseBody: "WHIK Studioの実際の作業の流れを映像でご覧ください。",
    filmCaption: "WHIK Studio 紹介映像",
    filmTitle: "WHIK Studio のご紹介",
    featureTitle: "必要な瞬間に、必要なツールを。",
    featureBody: "AIと一緒に作業し、ノードで仕上げましょう。",
    from: "から",
    shortsTitle: "ノード別ショートデモ。",
    shortsBody: "短い映像でノードをひとつずつご覧ください。",
    workspaceTitle: "慣れた作業で、もっと広い可能性を。",
    workspaceBody: "映像と3Dを、ひとつのノードグラフで扱います。",
    scannerTitle1: "あなたの空間を、",
    scannerTitle2: "次のシーンへ。",
    scannerBody:
      "スマートフォンで空間や物を記録する WHIK 3D Scanner を準備しています。現実の風景を、デジタル制作の出発点に。",
    play: "映像を再生",
    openYoutube: "YouTubeで見る",
    playerHint: "再生できない場合はYouTubeで開いてください。",
    close: "閉じる",
    studioDialogTitle: "生成したその先の、仕上がりまで。",
    studioDialogBody:
      "ノードベースで映像を合成し、仕上げる無料の制作ツールです。生成した画像や映像、3Dアセットをつないで、思い描くシーンに仕上げましょう。",
    studioFeatures: ["ノードベース合成", "3Dワークフロー", "MCP連携"],
    scrollHint: "スクロール",
  },
  zh: {
    tagline: "把想象变成画面。",
    intro: "免费的视频合成与3D制作工具",
    download: "免费下载",
    watchFilm: "观看介绍视频",
    ecoTitle1: "从拍摄",
    ecoTitle2: "到成片。",
    studioDesc: "视频合成与后期",
    studioCta: "了解详情",
    lockerDesc: "3D资产生成与应用",
    lockerCta: "前往服务",
    scannerDesc: "拍摄与空间记录",
    comingSoon: "即将推出",
    showcaseTitle: "打造画面的全新流程。",
    showcaseBody: "通过视频了解 WHIK Studio 的真实工作流程。",
    filmCaption: "WHIK Studio 介绍视频",
    filmTitle: "WHIK Studio 介绍",
    featureTitle: "需要的时刻，需要的工具。",
    featureBody: "与AI一起工作，用节点完成作品。",
    from: "起播放",
    shortsTitle: "按节点看的简短演示。",
    shortsBody: "用短视频逐个了解节点。",
    workspaceTitle: "熟悉的工作方式，更广的可能。",
    workspaceBody: "在同一个节点图中处理视频与3D。",
    scannerTitle1: "你的空间，",
    scannerTitle2: "化作下一个画面。",
    scannerBody:
      "我们正在打造用手机记录空间与物体的 WHIK 3D Scanner。让现实场景成为数字创作的起点。",
    play: "播放视频",
    openYoutube: "在 YouTube 观看",
    playerHint: "如无法播放，请在 YouTube 中打开。",
    close: "关闭",
    studioDialogTitle: "从生成到完成，一步到位。",
    studioDialogBody:
      "一款基于节点的免费视频合成与后期工具。把生成的图片、视频和3D资产连接起来，完成你想要的画面。",
    studioFeatures: ["节点式合成", "3D工作流", "MCP连接"],
    scrollHint: "向下",
  },
} as const;

export type HomeCopy = (typeof copy)[Lang];
export const homeCopy = (lang: Lang): HomeCopy => copy[lang] ?? copy.ko;

export const formatStart = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
