"use client";

import { ManualHero, Note, Section, Shot, Step } from "../ui";
import { shot, useM } from "../useM";

export function ViewerGuide() {
  const { t, r } = useM();
  return (
    <div>
      <ManualHero index="G0" label={t("v.label")} title={t("v.title")} hi={t("v.hi")} lead={t("v.lead")} />
      <Section title={t("v.s1")}>
        <Step n={1} title={t("v.1.t")}>
          <p>{r("v.1.d")}</p>
        </Step>
        <Step n={2} title={t("v.2.t")}>
          <p>{r("v.2.d")}</p>
        </Step>
        <Step n={3} title={t("v.3.t")}>
          <p>{r("v.3.d")}</p>
        </Step>
        <Note>
          <p>{r("v.arrange")}</p>
        </Note>
      </Section>
      <Section title={t("v.s2")}>
        <ul>
          <li>{r("v.c1")}</li>
          <li>{r("v.c2")}</li>
          <li>{r("v.c3")}</li>
        </ul>
      </Section>
      <Section title={t("v.s3")}>
        <ul>
          <li>{r("v.q1")}</li>
          <li>{r("v.q2")}</li>
          <li>{r("v.q3")}</li>
          <li>{r("v.q4")}</li>
          <li>{r("v.q5")}</li>
        </ul>
        <Note>
          <p>{r("v.tip")}</p>
        </Note>
      </Section>
    </div>
  );
}

export function EditGuide() {
  const { t, r, lang } = useM();
  return (
    <div>
      <ManualHero index="G6" label={t("e.label")} title={t("e.title")} hi={t("e.hi")} lead={t("e.lead")} />
      <Shot
        src={shot(lang, "08_edit")}
        alt={t("nav.g.edit")}
        marks={[
            { n: 1, x: 6, y: 21, label: t("e.m1"), text: t("e.m1.d") },
            { n: 2, x: 45, y: 30, label: t("e.m2"), text: t("e.m2.d") },
            { n: 3, x: 17, y: 57, label: t("e.m3"), text: t("e.m3.d") },
            { n: 4, x: 15, y: 80, label: t("e.m4"), text: t("e.m4.d") },
            { n: 5, x: 45, y: 84, label: t("e.m5"), text: t("e.m5.d") },
            { n: 6, x: 88, y: 22, label: t("e.m6"), text: t("e.m6.d") },
            { n: 7, x: 85, y: 72, label: t("e.m7"), text: t("e.m7.d") }
        ]}
      />
      <Section title={t("e.s1")}>
        <Step n={1} title={t("e.1.t")}>
          <p>{r("e.1.d")}</p>
          <p>{r("e.1.close")}</p>
        </Step>
        <Step n={2} title={t("e.2.t")}>
          <p>{r("e.2.d")}</p>
          <p className="mb-1 mt-4 font-semibold">{t("e.folders")}</p>
          <ul>
            <li>{r("e.f1")}</li>
            <li>{r("e.f2")}</li>
            <li>{r("e.f3")}</li>
          </ul>
        </Step>
        <Step n={3} title={t("e.3.t")}>
          <p>{r("e.3.d")}</p>
        </Step>
        <Note>
          <p>{r("e.layered")}</p>
        </Note>
      </Section>
      <Section title={t("e.s2")}>
        <ul>
          <li>{r("e.t1")}</li>
          <li>{r("e.t2")}</li>
          <li>{r("e.t3")}</li>
          <li>{r("e.t4")}</li>
          <li>{r("e.t5")}</li>
          <li>{r("e.t6")}</li>
          <li>{r("e.t7")}</li>
          <li>{r("e.t8")}</li>
          <li>{r("e.t9")}</li>
          <li>{r("e.t10")}</li>
          <li>{r("e.t11")}</li>
        </ul>
      </Section>
      <Section title={t("e.s3")}>
        <ul>
          <li>{r("e.x1")}</li>
          <li>{r("e.x2")}</li>
          <li>{r("e.x3")}</li>
        </ul>
      </Section>
      <Section title={t("e.s4")}>
        <Step n={1} title={t("e.4.t")}>
          <p>{r("e.4.d")}</p>
        </Step>
        <Step n={2} title={t("e.5.t")}>
          <p>{r("e.5.d")}</p>
        </Step>
        <Step n={3} title={t("e.6.t")}>
          <p>{r("e.6.d")}</p>
        </Step>
        <Note>
          <p>{r("e.shots")}</p>
        </Note>
      </Section>
      <Section title={t("e.s5")}>
        <ul>
          <li>{r("e.v1")}</li>
          <li>{r("e.v2")}</li>
          <li>{r("e.v3")}</li>
          <li>{r("e.v4")}</li>
          <li>{r("e.v5")}</li>
          <li>{r("e.v6")}</li>
          <li>{r("e.v7")}</li>
        </ul>
      </Section>
      <Section title={t("e.s6")}>
        <ul>
          <li>{r("e.a1")}</li>
          <li>{r("e.a2")}</li>
        </ul>
      </Section>
      <Section title={t("e.s8")}>
        <ul>
          <li>{r("e.l1")}</li>
          <li>{r("e.l2")}</li>
          <li>{r("e.l3")}</li>
        </ul>
      </Section>
      <Section title={t("e.s7")}>
        <ul>
          <li>{r("e.o1")}</li>
          <li>{r("e.o2")}</li>
          <li>{r("e.o3")}</li>
          <li>{r("e.o4")}</li>
          <li>{r("e.o5")}</li>
        </ul>
        <Note>
          <p>{r("e.tip")}</p>
        </Note>
      </Section>
    </div>
  );
}

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
        <h3 className="mt-8 mb-3 text-[17px] font-semibold text-white">{t("g3.f.t")}</h3>
        <ul>
          <li>{r("g3.f1")}</li>
          <li>{r("g3.f2")}</li>
          <li>{r("g3.f3")}</li>
        </ul>
        <Note>
          <p>{r("g3.f4")}</p>
        </Note>
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
