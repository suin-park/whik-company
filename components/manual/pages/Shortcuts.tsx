"use client";

import { Kbd, ManualHero, Note, Section } from "../ui";
import { useM } from "../useM";

type Row = [keys: string[][], what: string];

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "k.g.graph",
    rows: [
      [[["Tab"]], "k.tab"],
      [[["R"]], "k.r"],
      [[["G"], ["C"]], "k.gc"],
      [[["B"], ["T"], ["M"]], "k.btm"],
      [[["O"], ["P"]], "k.op"],
      [[["W"]], "k.w"],
      [[["1"], ["2"]], "k.12"],
      [[["F"]], "k.f"],
      [[["L"]], "k.l"],
      [[["Delete"]], "k.del"],
      [[["Ctrl", "D"]], "k.ctrld"],
      [[["Ctrl", "C"], ["Ctrl", "V"]], "k.copy"],
      [[["Alt", "C"]], "k.altc"],
      [[["Ctrl", "G"]], "k.ctrlg"],
      [[["Ctrl", "↑"], ["Ctrl", "↓"]], "k.updown"],
      [[["Shift", "X"]], "k.shiftx"],
    ],
  },
  {
    title: "k.g.edit",
    rows: [
      [[["Ctrl", "Z"]], "k.undo"],
      [[["Ctrl", "Y"]], "k.redo"],
      [[["Ctrl", "S"]], "k.save"],
      [[["S"]], "k.s"],
      [[["Ctrl", "Alt", "K"]], "k.keys"],
    ],
  },
  {
    title: "k.g.time",
    rows: [
      [[["←"], ["→"]], "k.lr"],
      [[["Ctrl", "←"], ["Ctrl", "→"]], "k.ctrllr"],
      [[["Home"], ["End"]], "k.homeend"],
      [[["J"], ["K"], ["L"]], "k.jkl"],
    ],
  },
  {
    title: "k.g.view",
    rows: [
      [[["Space"]], "k.space"],
      [[["Tab"]], "k.tab3d"],
      [[["H"]], "k.h"],
    ],
  },
];

function Keys({ keys }: { keys: string[][] }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {keys.map((chord, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {chord.map((k, j) => (
            <span key={k} className="inline-flex items-center gap-1">
              {j > 0 ? <span className="text-white/35">+</span> : null}
              <Kbd>{k}</Kbd>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Shortcuts() {
  const { t, r } = useM();
  return (
    <div>
      <ManualHero index="03" label={t("k.label")} title={t("k.title")} hi={t("k.hi")} lead={t("k.lead")} />
      {GROUPS.map((g) => (
        <Section key={g.title} title={t(g.title)}>
          <table className="manual-table">
            <tbody>
              {g.rows.map(([keys, what]) => (
                <tr key={what}>
                  <td className="w-[44%] md:w-[38%]">
                    <Keys keys={keys} />
                  </td>
                  <td>{t(what)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}
      <Note title={t("k.custom.t")}>
        <p>{r("k.custom.d")}</p>
      </Note>
    </div>
  );
}
