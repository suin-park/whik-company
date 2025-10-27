"use client";

import { Sparkles, Brain, Rocket, Shield, Globe } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSlow, hoverLift } from "@/components/motionPresets";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`container ${className}`}>{children}</section>;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="text-accent text-sm tracking-wide uppercase">{children}</div>;
}

function ValueBadge({ icon: Icon, title, desc }:{
  icon: any; title: string; desc: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="card p-5 flex gap-4 items-start"
      {...hoverLift}
    >
      <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent shrink-0">
        <Icon size={18}/>
      </div>
      <div>
        <div className="text-base">{title}</div>
        <div className="text-subtle text-sm mt-1">{desc}</div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <motion.div variants={fadeUp} className="relative pl-8">
      <div className="absolute left-[6px] top-1 h-3 w-3 rounded-full bg-accent shadow-soft"></div>
      <div className="text-sm text-subtle">{year}</div>
      <div className="text-base mt-1">{title}</div>
      <div className="text-subtle text-sm">{desc}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <div className="relative border-b border-border bg-hero-gradient">
        <Section className="py-20 md:py-28">
          <motion.div
            variants={staggerContainer(0.05, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.7 }}
          >
            <motion.div variants={fadeUp}>
              <Kicker>{t("about.kicker")}</Kicker>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-3 text-3xl md:text-5xl leading-tight">
              {t("about.hero.title")}
            </motion.h1>
            <motion.p variants={fadeUpSlow} className="text-subtle mt-4 max-w-2xl">
              {t("about.hero.desc")}
            </motion.p>
          </motion.div>
        </Section>
      </div>

      {/* Vision / Mission / Values */}
      <Section className="py-14">
        <motion.div
          variants={staggerContainer(0.05, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-2 gap-10"
        >
          <motion.div variants={fadeUp}>
            <Kicker>{t("about.vision")}</Kicker>
            <h2 className="text-xl mt-2">{t("about.vision.title")}</h2>
            <p className="text-subtle mt-3">{t("about.vision.desc")}</p>

            <div className="mt-8">
              <Kicker>{t("about.mission")}</Kicker>
              <p className="text-subtle mt-2">{t("about.mission.desc")}</p>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer(0.05, 0.07)} className="space-y-4" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.div variants={fadeUp}>
              <Kicker>{t("about.values")}</Kicker>
            </motion.div>
            <ValueBadge icon={Sparkles} title="Accessible"  desc={t("about.values.accessible")} />
            <ValueBadge icon={Brain}    title="Intelligent" desc={t("about.values.intelligent")} />
            <ValueBadge icon={Shield}   title="Integrated"  desc={t("about.values.integrated")} />
          </motion.div>
        </motion.div>
      </Section>

      {/* Milestones */}
      <Section className="py-6">
        <motion.div
          variants={fadeUpSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="card p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={18} className="text-accent"/>
            <div className="text-base">{t("about.milestones")}</div>
          </div>

          <motion.div
            variants={staggerContainer(0.05, 0.06)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
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
          </motion.div>
        </motion.div>
      </Section>

      {/* Global Ready */}
      <Section className="py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="card p-6 flex items-center justify-between flex-col md:flex-row gap-4"
        >
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-accent"/>
            <div>
              <div className="text-base">{t("about.globalReady.title")}</div>
              <div className="text-subtle text-sm">{t("about.globalReady.desc")}</div>
            </div>
          </div>
          <motion.a
            variants={fadeUp}
            {...hoverLift}
            href="/partnership"
            className="px-5 py-3 rounded-2xl bg-accent text-black"
          >
            {t("about.partnerCta")}
          </motion.a>
        </motion.div>
      </Section>
    </>
  );
}
