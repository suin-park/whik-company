"use client";
import { Building2, Atom, Clapperboard, Handshake, Workflow, Layers3, Rocket, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

function Section({ className="", children}:{className?:string; children:React.ReactNode}) {
  return <section className={`container ${className}`}>{children}</section>;
}
function Kicker({children}:{children:React.ReactNode}) {
  return <div className="text-accent text-sm tracking-wide uppercase">{children}</div>;
}
function Pill({children}:{children:React.ReactNode}) {
  return <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">{children}</span>;
}
function Card({children, className=""}:{children:React.ReactNode; className?:string}) {
  return <div className={`card p-6 ${className}`}>{children}</div>;
}

export default function PartnershipPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-hero-gradient">
        <Section className="py-16 md:py-20">
          <Kicker>{t("p.kicker")}</Kicker>
          <h1 className="mt-3 text-3xl md:text-5xl leading-tight">{t("p.hero.title")}</h1>
          <p className="text-subtle mt-4 max-w-2xl">{t("p.hero.desc")}</p>
          <div className="flex gap-2 mt-6">
            <Pill>{t("p.pills.enterprise")}</Pill>
            <Pill>{t("p.pills.creator")}</Pill>
            <Pill>{t("p.pills.tech")}</Pill>
            <Pill>{t("p.pills.invest")}</Pill>
          </div>
        </Section>
      </div>

      {/* 3 types */}
      <Section className="py-12 grid md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Building2 size={18}/></div>
          <h3 className="text-lg">{t("p.enterprise.title")}</h3>
          <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
            <li>{t("p.enterprise.li1")}</li>
            <li>{t("p.enterprise.li2")}</li>
            <li>{t("p.enterprise.li3")}</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Clapperboard size={18}/></div>
          <h3 className="text-lg">{t("p.creator.title")}</h3>
          <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
            <li>{t("p.creator.li1")}</li>
            <li>{t("p.creator.li2")}</li>
            <li>{t("p.creator.li3")}</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Atom size={18}/></div>
          <h3 className="text-lg">{t("p.tech.title")}</h3>
          <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
            <li>{t("p.tech.li1")}</li>
            <li>{t("p.tech.li2")}</li>
            <li>{t("p.tech.li3")}</li>
          </ul>
        </Card>
      </Section>

      {/* Why & Effects */}
      <Section className="py-4 grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-3"><Handshake className="text-accent" size={18}/><h3 className="text-base">{t("p.why.title")}</h3></div>
          <ul className="text-subtle text-sm space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li1")}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li2")}</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li3")}</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3"><Workflow className="text-accent" size={18}/><h3 className="text-base">{t("p.effects.title")}</h3></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-4">
              <div className="text-2xl">{t("p.effects.speed.value")}</div>
              <div className="text-subtle text-xs mt-1">{t("p.effects.speed.label")}</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl">{t("p.effects.cost.value")}</div>
              <div className="text-subtle text-xs mt-1">{t("p.effects.cost.label")}</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl">{t("p.effects.acc.value")}</div>
              <div className="text-subtle text-xs mt-1">{t("p.effects.acc.label")}</div>
            </div>
            <div className="card p-4">
              <div className="text-2xl">{t("p.effects.prod.value")}</div>
              <div className="text-subtle text-xs mt-1">{t("p.effects.prod.label")}</div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Process */}
      <Section className="py-10">
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5"><Layers3 className="text-accent" size={18}/><h3 className="text-base">{t("p.process.title")}</h3></div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", t: t("p.process.01.title"), d: t("p.process.01.desc") },
              { n: "02", t: t("p.process.02.title"), d: t("p.process.02.desc") },
              { n: "03", t: t("p.process.03.title"), d: t("p.process.03.desc") },
              { n: "04", t: t("p.process.04.title"), d: t("p.process.04.desc") },
            ].map(s => (
              <div key={s.n} className="relative pl-8">
                <div className="absolute left-0 top-0 h-7 w-7 rounded-full bg-accent/15 text-accent grid place-items-center">{s.n}</div>
                <div className="text-base">{s.t}</div>
                <div className="text-subtle text-sm">{s.d}</div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Investment */}
      <Section className="py-4">
        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <Rocket className="text-accent" size={18}/>
            <div>
              <div className="text-base">{t("p.invest.title")}</div>
              <div className="text-subtle text-sm">{t("p.invest.desc")}</div>
            </div>
          </div>
          <Link href="/contact" className="px-5 py-3 rounded-2xl bg-accent text-black text-center mt-6 md:mt-0">{t("p.invest.cta")}</Link>
        </Card>
      </Section>

      {/* CTA Banner */}
      <Section className="py-10">
        <div className="card p-8 text-center">
          <h3 className="text-lg">{t("p.cta.title")}</h3>
          <p className="text-subtle mt-2">{t("p.cta.desc")}</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link href="/contact" className="px-5 py-3 rounded-2xl bg-accent text-black flex items-center gap-2">
              <Mail size={16}/> {t("p.cta.primary")}
            </Link>
            <a href="mailto:contact@whik.company" className="px-5 py-3 rounded-2xl border border-border">
              {t("p.cta.secondary")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}