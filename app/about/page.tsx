"use client";
import { Sparkles, Brain, Rocket, Shield, Globe } from "lucide-react"
import { useI18n } from "@/components/I18nProvider"

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`container ${className}`}>{children}</section>
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="text-accent text-sm tracking-wide uppercase">{children}</div>
}


function ValueBadge({ icon: Icon, title, desc }:{
  icon: any; title: string; desc: string
}) {
  return (
    <div className="card p-5 flex gap-4 items-start">
      <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent shrink-0">
        <Icon size={18}/>
      </div>
      <div>
        <div className="text-base">{title}</div>
        <div className="text-subtle text-sm mt-1">{desc}</div>
      </div>
    </div>
  )
}

function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[6px] top-1 h-3 w-3 rounded-full bg-accent shadow-soft"></div>
      <div className="text-sm text-subtle">{year}</div>
      <div className="text-base mt-1">{title}</div>
      <div className="text-subtle text-sm">{desc}</div>
    </div>
  )
}


export default function AboutPage() {
  const { t } = useI18n();
  
  return (
    <>
      {/* Hero */}
      <div className="relative border-b border-border bg-hero-gradient">
        <Section className="py-20 md:py-28">
          <Kicker>{t("about.kicker")}</Kicker>
          <h1 className="mt-3 text-3xl md:text-5xl leading-tight">{t("about.hero.title")}</h1>
          <p className="text-subtle mt-4 max-w-2xl">{t("about.hero.desc")}</p>
        </Section>
      </div>

      {/* Vision / Mission / Values */}
      <Section className="py-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Kicker>{t("about.vision")}</Kicker>
            <h2 className="text-xl mt-2">{t("about.vision.title")}</h2>
            <p className="text-subtle mt-3">{t("about.vision.desc")}</p>

            <div className="mt-8">
              <Kicker>{t("about.mission")}</Kicker>
              <p className="text-subtle mt-2">{t("about.mission.desc")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Kicker>{t("about.values")}</Kicker>
            <ValueBadge icon={Sparkles} title="Accessible"
              desc={t("about.values.accessible")} />
            <ValueBadge icon={Brain} title="Intelligent"
              desc={t("about.values.intelligent")} />
            <ValueBadge icon={Shield} title="Integrated"
              desc={t("about.values.integrated")} />
          </div>
        </div>
      </Section>

      {/* Milestones (수평 타임라인 스타일) */}
      <Section className="py-6">
        <div className="card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={18} className="text-accent"/><div className="text-base">{t("about.milestones")}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TimelineItem
              year={t("about.ms.1.year")}
              title={t("about.ms.1.title")}
              desc={t("about.ms.1.desc")}
            />
            <TimelineItem
              year={t("about.ms.2.year")}
              title={t("about.ms.2.title")}
              desc={t("about.ms.2.desc")}
            />
            <TimelineItem
              year={t("about.ms.3.year")}
              title={t("about.ms.3.title")}
              desc={t("about.ms.3.desc")}
            />
          </div>
        </div>
      </Section>

      {/* Global Ready */}
      <Section className="py-12">
        <div className="card p-6 flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-accent"/>
            <div>
              <div className="text-base">{t("about.globalReady.title")}</div>
              <div className="text-subtle text-sm">{t("about.globalReady.desc")}</div>
            </div>
          </div>
          <a href="/partnership" className="px-5 py-3 rounded-2xl bg-accent text-black">{t("about.partnerCta")}</a>
        </div>
      </Section>
    </>
  )
}