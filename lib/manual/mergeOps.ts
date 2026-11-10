import type { Lang } from "@/lib/messages";

/**
 * Merge and Comp operations for the manual: each one's formula as WHIK Studio computes it
 * (nodes/ImageNodes.cpp, Merge::apply: premultiplied values, A and B the inputs' colour or alpha,
 * a and b their alphas) and what it does in each language. A formula with cases has a line per case.
 */
export type MergeOp = { f: string[]; d: Record<Lang, string> };

export const MERGE_OPS: Record<string, MergeOp> = {
  over: {
    f: ["A + B(1 − a)"],
    d: { ko: "A를 B 위에 얹어요. 기본 합성이에요.", en: "A on top of B. The usual composite.", ja: "A を B の上に重ねます。標準の合成です。", zh: "把 A 叠在 B 上。最常用的合成方式。" },
  },
  under: {
    f: ["A(1 − b) + B"],
    d: { ko: "B를 A 위에 얹어요. over의 반대예요.", en: "B on top of A: over the other way round.", ja: "B を A の上に重ねます。over の逆です。", zh: "把 B 叠在 A 上，与 over 相反。" },
  },
  atop: {
    f: ["Ab + B(1 − a)"],
    d: { ko: "B가 있는 곳에만 A를 얹어요.", en: "A on top of B, only where B is.", ja: "B がある部分にだけ A を重ねます。", zh: "只在有 B 的地方叠上 A。" },
  },
  in: {
    f: ["Ab"],
    d: { ko: "B의 알파 안쪽에만 A를 남겨요.", en: "A, only inside B's alpha.", ja: "B のアルファの内側だけ A を残します。", zh: "只保留 B 的 Alpha 内部的 A。" },
  },
  out: {
    f: ["A(1 − b)"],
    d: { ko: "B의 알파 바깥에만 A를 남겨요.", en: "A, only outside B's alpha.", ja: "B のアルファの外側だけ A を残します。", zh: "只保留 B 的 Alpha 外部的 A。" },
  },
  mask: {
    f: ["Ba"],
    d: { ko: "A의 알파 안쪽에만 B를 남겨요.", en: "B, only inside A's alpha.", ja: "A のアルファの内側だけ B を残します。", zh: "只保留 A 的 Alpha 内部的 B。" },
  },
  stencil: {
    f: ["B(1 − a)"],
    d: { ko: "A의 알파 모양대로 B를 뚫어요.", en: "B with A's alpha cut out of it.", ja: "A のアルファの形で B をくり抜きます。", zh: "按 A 的 Alpha 形状从 B 中挖空。" },
  },
  xor: {
    f: ["A(1 − b) + B(1 − a)"],
    d: { ko: "겹치지 않는 부분만 남겨요.", en: "Only where A and B do not overlap.", ja: "重ならない部分だけを残します。", zh: "只保留 A 与 B 不重叠的部分。" },
  },
  matte: {
    f: ["Aa + B(1 − a)"],
    d: { ko: "프리멀트되지 않은 A를 B 위에 얹어요.", en: "An unpremultiplied A on top of B.", ja: "プリマルチプライされていない A を B に重ねます。", zh: "把未预乘的 A 叠在 B 上。" },
  },
  "conjoint-over": {
    f: ["a > b :  A", "a ≤ b :  A + B(1 − a / b)"],
    d: { ko: "겹친 부분에서 A가 B를 덮어요. 같은 물체를 나눠 그린 두 그림에 써요.", en: "A covers B where they overlap; for two pictures of one object split apart.", ja: "重なる部分で A が B を覆います。同じ物体を分けて描いた二枚に使います。", zh: "重叠处由 A 覆盖 B，适合同一物体分开绘制的两张图。" },
  },
  "disjoint-over": {
    f: ["a + b < 1 :  A + B", "a + b ≥ 1 :  A + B(1 − a) / b"],
    d: { ko: "서로 겹치지 않는다고 보고 얹어요. 맞닿은 경계의 틈을 없앨 때 써요.", en: "Composited as if A and B never overlap; closes seams between edges that touch.", ja: "互いに重ならないものとして重ねます。接する境界の隙間をなくすときに使います。", zh: "按 A 与 B 互不重叠来合成，可消除相接边缘的缝隙。" },
  },
  copy: {
    f: ["A"],
    d: { ko: "A만 보여요.", en: "Just A.", ja: "A だけを表示します。", zh: "只显示 A。" },
  },
  plus: {
    f: ["A + B"],
    d: { ko: "더해서 밝게 해요. 빛과 불꽃을 더할 때 써요.", en: "Adds them: brighter. For light, glows and fire.", ja: "足して明るくします。光や炎を足すときに使います。", zh: "相加变亮，适合叠加光效和火焰。" },
  },
  minus: {
    f: ["A − B"],
    d: { ko: "A에서 B를 빼요.", en: "B taken from A.", ja: "A から B を引きます。", zh: "从 A 中减去 B。" },
  },
  from: {
    f: ["B − A"],
    d: { ko: "B에서 A를 빼요.", en: "A taken from B.", ja: "B から A を引きます。", zh: "从 B 中减去 A。" },
  },
  multiply: {
    f: ["AB"],
    d: { ko: "곱해서 어둡게 해요. 그림자를 얹을 때 써요. 둘 다 음수면 A예요.", en: "Multiplies them: darker. For shadows. A where both are negative.", ja: "掛け合わせて暗くします。影を重ねるときに使います。両方が負なら A です。", zh: "相乘变暗，适合叠加阴影。两者都为负时取 A。" },
  },
  divide: {
    f: ["B > 0 :  A / B", "B ≤ 0 :  A"],
    d: { ko: "A를 B로 나눠요. multiply를 되돌릴 때 써요.", en: "A divided by B; undoes a multiply.", ja: "A を B で割ります。multiply を元に戻すときに使います。", zh: "用 B 除 A，可还原 multiply。" },
  },
  screen: {
    f: ["A + B − AB"],
    d: { ko: "밝게 겹쳐요. plus보다 부드럽게 밝아져요. 0~1 밖의 값은 더 큰 쪽을 써요.", en: "Lightens, softer than plus. Values outside 0 to 1 take the larger.", ja: "明るく重ねます。plus より穏やかです。0〜1 の外の値は大きい方を使います。", zh: "提亮叠加，比 plus 柔和。0~1 之外的值取较大者。" },
  },
  overlay: {
    f: ["B < 0.5 :  2AB", "B ≥ 0.5 :  1 − 2(1 − A)(1 − B)"],
    d: { ko: "B의 어두운 곳은 multiply, 밝은 곳은 screen처럼 대비를 높여요.", en: "Multiply in B's darks, screen in its lights: more contrast.", ja: "B の暗部は multiply、明部は screen のようにしてコントラストを上げます。", zh: "B 的暗部按 multiply、亮部按 screen，增强对比。" },
  },
  "hard-light": {
    f: ["A < 0.5 :  2AB", "A ≥ 0.5 :  1 − 2(1 − A)(1 − B)"],
    d: { ko: "overlay와 같지만 A를 기준으로 나눠요.", en: "Like overlay, split by A instead of B.", ja: "overlay と同じですが、A を基準に分けます。", zh: "与 overlay 相同，但以 A 为准划分。" },
  },
  "soft-light": {
    f: ["AB < 1 :  2AB + B(1 − AB)", "AB ≥ 1 :  2AB"],
    d: { ko: "hard-light보다 부드럽게 대비를 줘요.", en: "Softer contrast than hard-light.", ja: "hard-light より穏やかにコントラストをつけます。", zh: "比 hard-light 更柔和的对比。" },
  },
  "color-burn": {
    f: ["1 − (1 − B) / max(A, 1 − B)"],
    d: { ko: "A가 어두울수록 B를 진하게 태워요.", en: "Burns B darker where A is darker.", ja: "A が暗いほど B を焼き込みます。", zh: "A 越暗，B 被加深得越多。" },
  },
  "color-dodge": {
    f: ["B / max(1 − A, B)"],
    d: { ko: "A가 밝을수록 B를 밝게 띄워요.", en: "Dodges B brighter where A is brighter.", ja: "A が明るいほど B を明るくします。", zh: "A 越亮，B 被提亮得越多。" },
  },
  difference: {
    f: ["|A − B|"],
    d: { ko: "두 그림의 차이예요. 같은 곳은 검정이 돼요.", en: "How the two differ; the same is black.", ja: "二枚の差です。同じ部分は黒になります。", zh: "两图之差，相同处为黑色。" },
  },
  exclusion: {
    f: ["A + B − 2AB"],
    d: { ko: "difference와 비슷하지만 더 부드러워요.", en: "Like difference, softer.", ja: "difference に似ていますが、より穏やかです。", zh: "类似 difference，但更柔和。" },
  },
  average: {
    f: ["(A + B) / 2"],
    d: { ko: "두 그림의 평균이에요.", en: "The average of the two.", ja: "二枚の平均です。", zh: "两图的平均值。" },
  },
  geometric: {
    f: ["2AB / (A + B)"],
    d: { ko: "조화 평균이에요. 어느 한쪽이 0 이하면 0이에요.", en: "The harmonic mean; 0 where either is 0 or less.", ja: "調和平均です。どちらかが 0 以下なら 0 です。", zh: "调和平均，任一方 ≤ 0 时为 0。" },
  },
  hypot: {
    f: ["√(A² + B²)"],
    d: { ko: "두 값의 대각선 길이예요. plus보다 덜 밝아져요.", en: "The diagonal of the two; adds less than plus.", ja: "二つの値の対角線の長さです。plus ほど明るくなりません。", zh: "两值的对角线长度，比 plus 增亮更少。" },
  },
  max: {
    f: ["max(A, B)"],
    d: { ko: "더 밝은 쪽을 보여요.", en: "The brighter of the two.", ja: "明るい方を表示します。", zh: "取较亮者。" },
  },
  min: {
    f: ["min(A, B)"],
    d: { ko: "더 어두운 쪽을 보여요.", en: "The darker of the two.", ja: "暗い方を表示します。", zh: "取较暗者。" },
  },
  zmerge: {
    f: ["depth.Z"],
    d: { ko: "depth.Z 기준으로 카메라에 더 가까운 쪽을 보여요.", en: "Whichever is nearer the camera by depth.Z.", ja: "depth.Z でカメラに近い方を表示します。", zh: "按 depth.Z 显示离相机更近的一方。" },
  },
};

/** What the formulas' letters stand for. */
export const MERGE_LEGEND: Record<Lang, string> = {
  ko: "A, B는 각 입력의 색(프리멀트), a, b는 각 입력의 알파예요.",
  en: "A and B are the inputs' colour (premultiplied); a and b their alpha.",
  ja: "A、B は各入力の色（プリマルチプライ済み）、a、b は各入力のアルファです。",
  zh: "A、B 为各输入的颜色（已预乘），a、b 为各输入的 Alpha。",
};

/** The way the operations are grouped in the manual's table (what they are for). */
export const MERGE_GROUPS: { key: string; title: Record<Lang, string>; ops: string[] }[] = [
  { key: "stack", title: { ko: "겹치기", en: "Layering", ja: "重ね合わせ", zh: "叠加" }, ops: ["over", "under", "atop", "matte", "conjoint-over", "disjoint-over", "copy"] },
  { key: "cut", title: { ko: "알파로 자르기", en: "Cutting by alpha", ja: "アルファで切り抜き", zh: "按 Alpha 裁切" }, ops: ["in", "out", "mask", "stencil", "xor"] },
  { key: "light", title: { ko: "밝게, 어둡게", en: "Lighter and darker", ja: "明るく、暗く", zh: "变亮与变暗" }, ops: ["plus", "screen", "color-dodge", "max", "hypot", "multiply", "color-burn", "min"] },
  { key: "contrast", title: { ko: "대비", en: "Contrast", ja: "コントラスト", zh: "对比" }, ops: ["overlay", "hard-light", "soft-light"] },
  { key: "math", title: { ko: "계산과 비교", en: "Arithmetic and comparison", ja: "計算と比較", zh: "运算与比较" }, ops: ["minus", "from", "divide", "difference", "exclusion", "average", "geometric", "zmerge"] },
];
