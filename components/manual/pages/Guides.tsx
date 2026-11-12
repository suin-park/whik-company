"use client";

import { ManualHero, Note, Section, Shot, Step } from "../ui";
import { shot, useM } from "../useM";

export function RenderGuide() {
  const { t, r, lang } = useM();
  return (
    <div>
      <ManualHero index="G1" label={t("r.label")} title={t("r.title")} hi={t("r.hi")} lead={t("r.lead")} />
      <Section title={t("r.basic")}>
        <Step n={1} title={t("r.1.t")}>
          <p>{r("r.1.d")}</p>
        </Step>
        <Step n={2} title={t("r.2.t")}>
          <p>{r("r.2.d")}</p>
          <ul>
            <li>{r("r.2.a")}</li>
            <li>{r("r.2.b")}</li>
            <li>{r("r.2.c")}</li>
          </ul>
          <p>{r("r.2.e")}</p>
        </Step>
        <Step n={3} title={t("r.3.t")}>
          <p>{r("r.3.d")}</p>
        </Step>
        <Shot
          src={shot(lang, "03_write")}
          alt="Write"
          marks={[
            { n: 1, x: 80, y: 23, label: t("m.file") },
            { n: 2, x: 75, y: 63, label: t("m.render") },
          ]}
        />
      </Section>
      <Section title={t("r.opts")}>
        <ul>
          <li>{r("r.o1")}</li>
          <li>{r("r.o2")}</li>
          <li>{r("r.o3")}</li>
          <li>{r("r.o4")}</li>
        </ul>
        <p>{r("r.queue")}</p>
      </Section>
      <Section title={t("r.miss")}>
        <ul>
          <li>{r("r.m1")}</li>
          <li>{r("r.m2")}</li>
          <li>{r("r.m3")}</li>
        </ul>
        <Note>
          <p>{r("r.tip")}</p>
        </Note>
      </Section>
    </div>
  );
}

export function AiPackGuide() {
  const { t, r } = useM();
  const parts = ["a.p1", "a.p2", "a.p3", "a.p4"];
  return (
    <div>
      <ManualHero index="G2" label={t("a.label")} title={t("a.title")} hi={t("a.hi")} lead={t("a.lead")} />
      <Section title={t("a.need")}>
        <ul>
          <li>{r("a.n1")}</li>
          <li>{r("a.n2")}</li>
          <li>{r("a.n3")}</li>
        </ul>
      </Section>
      <Section title={t("a.install")}>
        <Step n={1} title={t("a.1.t")}>
          <p>{r("a.1.d")}</p>
        </Step>
        <Step n={2} title={t("a.2.t")}>
          <p>{t("a.2.d")}</p>
          <div className="my-5 grid gap-3 sm:grid-cols-2">
            {parts.map((p) => (
              <div key={p} className="rounded-2xl border border-white/10 bg-[#121417] p-4">
                <span className="block text-[15px] font-semibold text-white">{t(`${p}.t`)}</span>
                <span className="mt-1 block text-[13px] leading-[1.7] text-[#a6adb4]">{t(`${p}.d`)}</span>
              </div>
            ))}
          </div>
        </Step>
        <Step n={3} title={t("a.3.t")}>
          <p>{t("a.3.d")}</p>
        </Step>
      </Section>
      <Section title={t("a.use")}>
        <p>{r("a.use.d")}</p>
        <Note kind="warn" title={t("a.changed.t")}>
          <p>{t("a.changed.d")}</p>
        </Note>
        <p>{r("a.example")}</p>
      </Section>
    </div>
  );
}

export function DayToNightGuide() {
  const { t, r, lang } = useM();
  const knobs = ["d.k1", "d.k2", "d.k3", "d.k4", "d.k5", "d.k6", "d.k7", "d.k8", "d.k9"];
  return (
    <div>
      <ManualHero index="G3" label={t("d.label")} title={t("d.title")} hi={t("d.hi")} lead={t("d.lead")} />
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot(lang, "04_daynight_before")} alt={t("c.before")} className="block w-full rounded-[16px] border border-white/10" />
          <figcaption className="mt-2 text-[12px] tracking-[0.14em] text-white/45">BEFORE  {t("c.before")}</figcaption>
        </figure>
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot(lang, "05_daynight_after")} alt={t("c.after")} className="block w-full rounded-[16px] border border-white/10" />
          <figcaption className="mt-2 text-[12px] tracking-[0.14em] text-[#a9d0ff]">AFTER  {t("c.after")}</figcaption>
        </figure>
      </div>
      <Section title={t("d.follow")}>
        <Step n={1} title={t("d.1.t")}>
          <p>{r("d.1.d")}</p>
        </Step>
        <Step n={2} title={t("d.2.t")}>
          <p>{r("d.2.d")}</p>
        </Step>
        <Step n={3} title={t("d.3.t")}>
          <p>{r("d.3.d")}</p>
        </Step>
        <Step n={4} title={t("d.4.t")}>
          <p>{t("d.4.d")}</p>
        </Step>
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
      </Section>
      <Section title={t("d.knobs")}>
        <table className="manual-table">
          <tbody>
            {knobs.map((k) => (
              <tr key={k}>
                <td className="w-[34%] font-semibold text-white">{t(k)}</td>
                <td>{t(`${k}.d`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6">{r("d.all")}</p>
      </Section>
      <Section title={t("d.more")}>
        <ul>
          <li>{r("d.mo1")}</li>
          <li>{r("d.mo2")}</li>
          <li>{t("d.mo3")}</li>
        </ul>
        <Note kind="warn">
          <p>{r("d.again")}</p>
        </Note>
      </Section>
    </div>
  );
}

export function Render3DGuide() {
  const { t, r, lang } = useM();
  return (
    <div>
      <ManualHero index="G4" label={t("g3.label")} title={t("g3.title")} hi={t("g3.hi")} lead={t("g3.lead")} />
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot(lang, "06_render3d_fast")} alt={t("g3.c.fast")} className="block w-full rounded-[16px] border border-white/10" />
          <figcaption className="mt-2 text-[12px] tracking-[0.14em] text-white/45">{t("g3.c.fast")}</figcaption>
        </figure>
        <figure className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot(lang, "07_render3d_traced")} alt={t("g3.c.traced")} className="block w-full rounded-[16px] border border-white/10" />
          <figcaption className="mt-2 text-[12px] tracking-[0.14em] text-[#a9d0ff]">{t("g3.c.traced")}</figcaption>
        </figure>
      </div>
      <Section title={t("g3.which")}>
        <ul>
          <li>{r("g3.w1")}</li>
          <li>{r("g3.w2")}</li>
          <li>{r("g3.w3")}</li>
        </ul>
      </Section>
      <Section title={t("g3.steps")}>
        <Step n={1} title={t("g3.1.t")}>
          <p>{r("g3.1.d")}</p>
        </Step>
        <Step n={2} title={t("g3.2.t")}>
          <p>{r("g3.2.d")}</p>
        </Step>
        <Step n={3} title={t("g3.3.t")}>
          <p>{r("g3.3.d")}</p>
        </Step>
        <Step n={4} title={t("g3.4.t")}>
          <p>{r("g3.4.d")}</p>
        </Step>
      </Section>
      <Section title={t("g3.plate")}>
        <ul>
          <li>{r("g3.p1")}</li>
          <li>{r("g3.p2")}</li>
          <li>{r("g3.p3")}</li>
        </ul>
      </Section>
      <Section title={t("g3.outs")}>
        <ul>
          <li>{r("g3.o1")}</li>
          <li>{r("g3.o2")}</li>
          <li>{r("g3.o3")}</li>
        </ul>
      </Section>
      <Section title={t("g3.cam")}>
        <ul>
          <li>{r("g3.c1")}</li>
          <li>{r("g3.c2")}</li>
        </ul>
      </Section>
      <Section title={t("g3.speed")}>
        <p>{r("g3.s.d")}</p>
        <ul>
          <li>{r("g3.s.fast")}</li>
          <li>{r("g3.s.traced")}</li>
        </ul>
        <Note>
          <p>{r("g3.tip")}</p>
        </Note>
      </Section>
    </div>
  );
}
