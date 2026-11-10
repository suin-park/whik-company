"use client";

import { ManualHero, Note, Section, Shot } from "../ui";
import { shot, useM } from "../useM";

const PANELS: { name: string; where: string; what: string; tips: string[] }[] = [
  { name: "m.viewer", where: "w.top", what: "w.viewer.d", tips: ["w.viewer.1", "w.viewer.2", "w.viewer.3"] },
  { name: "m.timeline", where: "w.underviewer", what: "w.timeline.d", tips: ["w.timeline.1", "w.timeline.2"] },
  { name: "m.graph", where: "w.bottom", what: "w.graph.d", tips: ["w.graph.1", "w.graph.2", "w.graph.3"] },
  { name: "m.props", where: "w.right", what: "w.props.d", tips: ["w.props.1", "w.props.2", "w.props.3"] },
  { name: "m.side", where: "w.righttabs", what: "w.side.d", tips: ["w.side.1", "w.side.2"] },
  { name: "m.tools", where: "w.left", what: "w.tools.d", tips: [] },
];

export default function Screen() {
  const { t, r, lang } = useM();
  return (
    <div>
      <ManualHero index="02" label={t("w.label")} title={t("w.title")} hi={t("w.hi")} lead={t("w.lead")} />
      <Shot
        src={shot(lang, "02_first_comp")}
        alt="WHIK Studio"
        marks={[
          { n: 1, x: 36, y: 30, label: t("m.viewer") },
          { n: 2, x: 60, y: 58.5, label: t("m.timeline") },
          { n: 3, x: 22, y: 86, label: t("m.graph") },
          { n: 4, x: 84, y: 22, label: t("m.props") },
          { n: 5, x: 74, y: 4.6, label: t("m.side") },
          { n: 6, x: 1.3, y: 22, label: t("m.tools") },
        ]}
      />
      {PANELS.map((p, i) => (
        <Section key={p.name} kicker={`${String(i + 1).padStart(2, "0")}  ${t(p.where)}`} title={t(p.name)}>
          <p>{t(p.what)}</p>
          {p.tips.length ? (
            <ul>
              {p.tips.map((k) => (
                <li key={k}>{r(k)}</li>
              ))}
            </ul>
          ) : null}
        </Section>
      ))}
      <Section title={t("w.layout")}>
        <ul>
          <li>{r("w.layout.1")}</li>
          <li>{r("w.layout.2")}</li>
          <li>{r("w.layout.3")}</li>
        </ul>
        <Note>
          <p>{r("w.layout.tip")}</p>
        </Note>
      </Section>
    </div>
  );
}
