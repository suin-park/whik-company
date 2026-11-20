"use client";

import type React from "react";
import { Glance, ManualHero, Note, Section, Shot, Topic } from "../ui";
import { shot, useM } from "../useM";

/** A guide's sections of numbered topics: `${p}.${id}` is a section's name, `.lead` its line, `.${n}.t/.c/.d` its topics. */
function TopicSections({ p, sections, after }: { p: string; sections: { id: string; topics: number }[]; after?: Record<string, React.ReactNode> }) {
  const { t } = useM();
  return (
    <>
      {sections.map((s, i) => (
        <Section key={s.id} id={s.id} kicker={String(i + 1).padStart(2, "0")} title={t(`${p}.${s.id}`)}>
          <p className="mt-0 text-[#a6adb4]">{t(`${p}.${s.id}.lead`)}</p>
          {s.topics > 0 ? (
            <div className="mt-2">
              {Array.from({ length: s.topics }, (_, k) => (
                <Topic key={k} n={k + 1} title={t(`${p}.${s.id}.${k + 1}.t`)} core={t(`${p}.${s.id}.${k + 1}.c`)} details={t(`${p}.${s.id}.${k + 1}.d`)} />
              ))}
            </div>
          ) : null}
          {after?.[s.id]}
        </Section>
      ))}
    </>
  );
}

/** The sections at a glance, linking to them. */
function GuideGlance({ p, sections }: { p: string; sections: { id: string }[] }) {
  const { t } = useM();
  return <Glance title={t("e2.glance")} items={sections.map((s) => ({ id: s.id, title: t(`${p}.${s.id}`), lead: t(`${p}.${s.id}.lead`) }))} />;
}

/** Two pictures side by side, the second the result. */
function Pair({ a, b }: { a: { src: string; label: string }; b: { src: string; label: string } }) {
  return (
    <div className="mb-4 grid gap-4 md:grid-cols-2">
      {[a, b].map((x, i) => (
        <figure key={i} className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={x.src} alt={x.label} className="block w-full rounded-[16px] border border-white/10" />
          <figcaption className={`mt-2 text-[12px] tracking-[0.14em] ${i ? "text-[#a9d0ff]" : "text-white/45"}`}>{x.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ViewerGuide() {
  const { t, r } = useM();
  const S = [{ id: "show", topics: 4 }, { id: "display", topics: 3 }, { id: "sequence", topics: 5 }];
  return (
    <div>
      <ManualHero index="G0" label={t("v.label")} title={t("v.title")} hi={t("v.hi")} lead={t("v.lead")} />
      <GuideGlance p="gx.v" sections={S} />
      <TopicSections
        p="gx.v"
        sections={S}
        after={{
          sequence: (
            <Note>
              <p>{r("v.tip")}</p>
            </Note>
          ),
        }}
      />
    </div>
  );
}

export function EditGuide() {
  const { t, r } = useM();
  // each section: its topics (a title, the one line that matters, short details) and its pictures after them
  const sections: { id: string; topics: number }[] = [
    { id: "start", topics: 6 }, { id: "timeline", topics: 9 }, { id: "keys", topics: 5 }, { id: "text", topics: 4 }, { id: "shots", topics: 4 }, { id: "viewer", topics: 5 }, { id: "sound", topics: 5 }, { id: "library", topics: 3 }, { id: "export", topics: 5 }
  ];
  const shots: Record<string, React.ReactNode> = {
    start: (
      <>
        <Shot src={shot("en", "e_bin")} alt={t("e.m1")} caption={t("e.cap.bin")} maxWidth={360} />
        <Shot src={shot("en", "e_psd")} alt="PSD" caption={t("e.cap.psd")} maxWidth={420} />
      </>
    ),
    timeline: (
      <>
        <Shot
          src={shot("en", "e_timeline")}
          alt={t("e.m5")}
          marks={[
            { n: 1, x: 2.3, y: 33, label: t("e.tl.1") },
            { n: 2, x: 20, y: 6.5, label: t("e.tl.2") },
            { n: 3, x: 47.5, y: 44, label: t("e.tl.3") },
            { n: 4, x: 28.7, y: 72, label: t("e.tl.4") },
            { n: 5, x: 59, y: 6, label: t("e.tl.5") },
            { n: 6, x: 19.5, y: 49, label: t("e.tl.6") }
          ]}
        />
      </>
    ),
    keys: (
      <>
        <Shot src={shot("en", "e_props")} alt={t("e.m6")} caption={t("e.cap.props")} maxWidth={400} />
        <Shot src={shot("en", "e_keys")} alt={t("e.cap.keys")} caption={t("e.cap.keys")} />
      </>
    ),
    text: (
      <>
        <Shot src={shot("en", "e_title")} alt={t("e2.text")} caption={t("e.cap.title")} />
        <Shot src={shot("en", "e_captions")} alt={t("e2.text")} caption={t("e.cap.captions")} maxWidth={400} />
      </>
    ),
    viewer: (
      <>
        <Shot src={shot("en", "e_workspace")} alt={t("e2.viewer")} caption={t("e.cap.workspace")} maxWidth={300} />
      </>
    ),
    sound: (
      <>
        <Shot src={shot("en", "e_mixer")} alt={t("e2.sound")} caption={t("e.cap.mixer")} maxWidth={400} />
      </>
    ),
    export: (
      <>
        <Shot src={shot("en", "e_export")} alt={t("e2.export")} caption={t("e.cap.export")} />
      </>
    ),
  };
  return (
    <div>
      <ManualHero index="G6" label={t("e.label")} title={t("e.title")} hi={t("e.hi")} lead={t("e.lead")} />
      <Glance title={t("e2.glance")} items={sections.map((s) => ({ id: s.id, title: t(`e2.${s.id}`), lead: t(`e2.${s.id}.lead`) }))} />
      <Shot
        src={shot("en", "e_overview")}
        alt={t("nav.g.edit")}
        marks={[
          { n: 1, x: 10, y: 22, label: t("e.m1"), text: t("e.m1.d") },
          { n: 2, x: 48, y: 25, label: t("e.m2"), text: t("e.m2.d") },
          { n: 3, x: 30, y: 46.5, label: t("e.m3"), text: t("e.m3.d") },
          { n: 4, x: 22.9, y: 68, label: t("e.m4"), text: t("e.m4.d") },
          { n: 5, x: 62, y: 76, label: t("e.m5"), text: t("e.m5.d") },
          { n: 6, x: 88, y: 26, label: t("e.m6"), text: t("e.m6.d") },
          { n: 7, x: 88, y: 72, label: t("e.m7"), text: t("e.m7.d") }
        ]}
      />
      {sections.map((s, i) => (
        <Section key={s.id} id={s.id} kicker={String(i + 1).padStart(2, "0")} title={t(`e2.${s.id}`)}>
          <p className="mt-0 text-[#a6adb4]">{t(`e2.${s.id}.lead`)}</p>
          <div className="mt-2">
            {Array.from({ length: s.topics }, (_, k) => (
              <Topic key={k} n={k + 1} title={t(`e2.${s.id}.${k + 1}.t`)} core={t(`e2.${s.id}.${k + 1}.c`)} details={t(`e2.${s.id}.${k + 1}.d`)} />
            ))}
          </div>
          {shots[s.id]}
          {s.id === "export" ? (
            <Note>
              <p>{r("e2.shortcuts")}</p>
            </Note>
          ) : null}
        </Section>
      ))}
    </div>
  );
}

export function RenderGuide() {
  const { t, r, lang } = useM();
  const S = [{ id: "basic", topics: 3 }, { id: "window", topics: 5 }, { id: "missing", topics: 3 }];
  return (
    <div>
      <ManualHero index="G1" label={t("r.label")} title={t("r.title")} hi={t("r.hi")} lead={t("r.lead")} />
      <GuideGlance p="gx.r" sections={S} />
      <TopicSections
        p="gx.r"
        sections={S}
        after={{
          basic: (
            <Shot
              src={shot(lang, "03_write")}
              alt="Write"
              marks={[
                { n: 1, x: 80, y: 23, label: t("m.file") },
                { n: 2, x: 75, y: 63, label: t("m.render") },
              ]}
            />
          ),
          missing: (
            <Note>
              <p>{r("r.tip")}</p>
            </Note>
          ),
        }}
      />
    </div>
  );
}

export function AiPackGuide() {
  const { t, r } = useM();
  const S = [{ id: "need", topics: 3 }, { id: "install", topics: 3 }, { id: "use", topics: 3 }];
  return (
    <div>
      <ManualHero index="G2" label={t("a.label")} title={t("a.title")} hi={t("a.hi")} lead={t("a.lead")} />
      <GuideGlance p="gx.a" sections={S} />
      <TopicSections
        p="gx.a"
        sections={S}
        after={{
          use: (
            <Note>
              <p>{r("a.example")}</p>
            </Note>
          ),
        }}
      />
    </div>
  );
}

export function DayToNightGuide() {
  const { t, r, lang } = useM();
  const knobs = ["d.k1", "d.k2", "d.k3", "d.k4", "d.k5", "d.k6", "d.k7", "d.k8", "d.k9"];
  const S = [{ id: "follow", topics: 4 }, { id: "knobs", topics: 0 }, { id: "more", topics: 4 }];
  return (
    <div>
      <ManualHero index="G3" label={t("d.label")} title={t("d.title")} hi={t("d.hi")} lead={t("d.lead")} />
      <Pair a={{ src: shot(lang, "04_daynight_before"), label: `BEFORE  ${t("c.before")}` }} b={{ src: shot(lang, "05_daynight_after"), label: `AFTER  ${t("c.after")}` }} />
      <GuideGlance p="gx.d" sections={S} />
      <TopicSections
        p="gx.d"
        sections={S}
        after={{
          follow: (
            <Shot
              src={shot(lang, "05_daynight_after")}
              alt="DayToNight"
              marks={[
                { n: 1, x: 79.7, y: 26.7, label: t("d.m1"), text: t("d.m1.d") },
                { n: 2, x: 75, y: 50.7, label: t("d.m2"), text: t("d.m2.d") },
                { n: 3, x: 75, y: 72, label: t("d.m3"), text: t("d.m3.d") },
                { n: 4, x: 75, y: 89.5, label: t("d.m4"), text: t("d.m4.d") },
              ]}
            />
          ),
          knobs: (
            <>
              <table className="manual-table">
                <tbody>
                  {knobs.map((k, i) => (
                    <tr key={k}>
                      <td className="w-[34%] font-semibold text-white">
                        <span className="mr-2 text-[12px] tabular-nums text-[#a9d0ff]">{String(i + 1).padStart(2, "0")}</span>
                        {t(k)}
                      </td>
                      <td>{t(`${k}.d`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6">{r("d.all")}</p>
            </>
          ),
        }}
      />
    </div>
  );
}

export function Render3DGuide() {
  const { t, lang } = useM();
  const S = [
    { id: "which", topics: 3 },
    { id: "steps", topics: 4 },
    { id: "plate", topics: 3 },
    { id: "outputs", topics: 3 },
    { id: "camera", topics: 5 },
    { id: "speed", topics: 3 },
    { id: "live", topics: 3 },
  ];
  return (
    <div>
      <ManualHero index="G4" label={t("g3.label")} title={t("g3.title")} hi={t("g3.hi")} lead={t("g3.lead")} />
      <Pair a={{ src: shot(lang, "06_render3d_fast"), label: t("g3.c.fast") }} b={{ src: shot(lang, "07_render3d_traced"), label: t("g3.c.traced") }} />
      <GuideGlance p="gx.3" sections={S} />
      <TopicSections p="gx.3" sections={S} />
    </div>
  );
}
