"use client";

import { ManualHero, Note, Section, Shot, Step } from "../ui";
import { Rich, shot, useM } from "../useM";
import { STUDIO_DOWNLOAD_URL } from "@/components/home/homeContent";

export default function Start() {
  const { t, r, lang } = useM();
  const flow: [string, string, string][] = [
    ["Read", "s.n1.t", "s.n1.d"],
    ["Grade", "s.n2.t", "s.n2.d"],
    ["Write", "s.n3.t", "s.n3.d"],
  ];
  return (
    <div>
      <ManualHero index="01" label={t("s.label")} title={t("s.title")} hi={t("s.hi")} lead={t("s.lead")} />

      <Section id="install" kicker="STEP 1" title={t("s.install")}>
        <Step n={1} title={t("s.i1.t")}>
          <p>
            <Rich text={t("s.i1.d", { dl: STUDIO_DOWNLOAD_URL })} />
          </p>
        </Step>
        <Step n={2} title={t("s.i2.t")}>
          <p>{t("s.i2.d")}</p>
          <p>{r("s.i2.d2")}</p>
        </Step>
        <Step n={3} title={t("s.i3.t")}>
          <p>{t("s.i3.d")}</p>
        </Step>
        <Note title={t("s.gpu.t")}>
          <p>{r("s.gpu.d")}</p>
        </Note>
      </Section>

      <Section id="idea" kicker="STEP 2" title={t("s.idea")}>
        <p>{r("s.idea.d")}</p>
        <div className="my-8 grid gap-3 sm:grid-cols-3">
          {flow.map(([cls, title, d], i) => (
            <div key={cls} className="relative rounded-2xl border border-white/10 bg-[#121417] p-5">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#a9d0ff]">
                {String(i + 1).padStart(2, "0")}  {cls}
              </span>
              <span className="mt-3 block text-[17px] font-semibold text-white">{t(title)}</span>
              <span className="mt-1 block text-[14px] text-[#a6adb4]">{t(d)}</span>
              {i < 2 ? (
                <span aria-hidden className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[#a9d0ff] sm:block">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p>{t("s.idea.d2")}</p>
      </Section>

      <Section id="first" kicker="STEP 3" title={t("s.first")}>
        <Step n={1} title={t("s.f1.t")}>
          <p>{r("s.f1.d")}</p>
        </Step>
        <Step n={2} title={t("s.f2.t")}>
          <p>{r("s.f2.d")}</p>
        </Step>
        <Step n={3} title={t("s.f3.t")}>
          <p>{r("s.f3.d")}</p>
        </Step>
        <Step n={4} title={t("s.f4.t")}>
          <p>{r("s.f4.d")}</p>
          <p>{r("s.f4.d2")}</p>
        </Step>
        <Shot
          src={shot(lang, "02_first_comp")}
          alt="WHIK Studio"
          marks={[
            { n: 1, x: 34, y: 2.5, label: t("m.menu"), text: t("m.menu.d") },
            { n: 2, x: 36, y: 30, label: t("m.viewer"), text: t("m.viewer.d") },
            { n: 3, x: 60, y: 58.5, label: t("m.timeline"), text: t("m.timeline.d") },
            { n: 4, x: 22, y: 86, label: t("m.graph"), text: t("m.graph.d") },
            { n: 5, x: 84, y: 22, label: t("m.props"), text: t("m.props.d") },
            { n: 6, x: 1.3, y: 22, label: t("m.tools"), text: t("m.tools.d") },
          ]}
        />
      </Section>

      <Section id="save" kicker="STEP 4" title={t("s.save")}>
        <Step n={1} title={t("s.w1.t")}>
          <p>{r("s.w1.d")}</p>
        </Step>
        <Step n={2} title={t("s.w2.t")}>
          <p>{r("s.w2.d")}</p>
        </Step>
        <Step n={3} title={t("s.w3.t")}>
          <p>{r("s.w3.d")}</p>
        </Step>
        <Shot
          src={shot(lang, "03_write")}
          alt="Write"
          marks={[
            { n: 1, x: 80, y: 23, label: t("m.file"), text: t("m.file.d") },
            { n: 2, x: 75, y: 63, label: t("m.render"), text: t("m.render.d") },
          ]}
        />
        <Note kind="warn" title={t("s.nofile.t")}>
          <ul>
            <li>{r("s.nofile.1")}</li>
            <li>{r("s.nofile.2")}</li>
            <li>{r("s.nofile.3")}</li>
          </ul>
        </Note>
      </Section>

      <Section id="project" kicker="STEP 5" title={t("s.project")}>
        <p>{r("s.p1")}</p>
        <p>{r("s.p2")}</p>
        <Note>
          <p>{r("s.p3")}</p>
        </Note>
      </Section>

      <Section title={t("c.next")}>
        <ul>
          <li>{r("s.next1")}</li>
          <li>{r("s.next2")}</li>
          <li>{r("s.next3")}</li>
        </ul>
      </Section>
    </div>
  );
}
