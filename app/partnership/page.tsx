"use client";

import { Building2, Atom, Clapperboard, Handshake, Workflow, Layers3, Rocket, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import {
  staggerContainer,
  fadeUp,
  fadeUpSlow,
  hoverLift,
} from "@/components/motionPresets";

function AnimatedNumber({ value, unit = "" }: { value: number; unit?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(Math.round(value));
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {display}
      {unit}
    </span>
  );
}

function Section({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <section className={`container ${className}`}>{children}</section>;
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="text-accent text-sm tracking-wide uppercase">{children}</div>;
}
function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">{children}</span>;
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card p-6 ${className}`}>{children}</div>;
}

export default function PartnershipPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-hero-gradient">
        <Section className="py-16 md:py-20">
          <motion.div
            variants={staggerContainer(0.05, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.7 }}
          >
            <motion.div variants={fadeUp}>
              <Kicker>{t("p.kicker")}</Kicker>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-3 text-3xl md:text-5xl leading-tight">
              {t("p.hero.title")}
            </motion.h1>
            <motion.p variants={fadeUpSlow} className="text-subtle mt-4 max-w-2xl">
              {t("p.hero.desc")}
            </motion.p>

            <motion.div
              variants={staggerContainer(0.2, 0.06)}
              className="flex gap-2 mt-6 flex-wrap"
            >
              <motion.span variants={fadeUp}><Pill>{t("p.pills.enterprise")}</Pill></motion.span>
              <motion.span variants={fadeUp}><Pill>{t("p.pills.creator")}</Pill></motion.span>
              <motion.span variants={fadeUp}><Pill>{t("p.pills.tech")}</Pill></motion.span>
              <motion.span variants={fadeUp}><Pill>{t("p.pills.invest")}</Pill></motion.span>
            </motion.div>
          </motion.div>
        </Section>
      </div>

      {/* 3 types */}
      <Section className="py-12">
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer(0.05, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={fadeUp} {...hoverLift}>
            <Card className="space-y-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Building2 size={18}/></div>
              <h3 className="text-lg">{t("p.enterprise.title")}</h3>
              <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
                <li>{t("p.enterprise.li1")}</li>
                <li>{t("p.enterprise.li2")}</li>
                <li>{t("p.enterprise.li3")}</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} {...hoverLift}>
            <Card className="space-y-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Clapperboard size={18}/></div>
              <h3 className="text-lg">{t("p.creator.title")}</h3>
              <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
                <li>{t("p.creator.li1")}</li>
                <li>{t("p.creator.li2")}</li>
                <li>{t("p.creator.li3")}</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} {...hoverLift}>
            <Card className="space-y-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center bg-accent/15 text-accent"><Atom size={18}/></div>
              <h3 className="text-lg">{t("p.tech.title")}</h3>
              <ul className="text-subtle text-sm space-y-1 list-disc list-inside">
                <li>{t("p.tech.li1")}</li>
                <li>{t("p.tech.li2")}</li>
                <li>{t("p.tech.li3")}</li>
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </Section>

      {/* Why & Effects */}
      <Section className="py-4">
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer(0.05, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={fadeUp} className="">
            <Card>
              <div className="flex items-center gap-2 mb-3"><Handshake className="text-accent" size={18}/><h3 className="text-base">{t("p.why.title")}</h3></div>
              <ul className="text-subtle text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li1")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li2")}</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="text-accent mt-0.5" size={16}/> {t("p.why.li3")}</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card>
              <div className="flex items-center gap-2 mb-3"><Workflow className="text-accent" size={18}/><h3 className="text-base">{t("p.effects.title")}</h3></div>
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={staggerContainer(0.05, 0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                {[
                  { v: 80, label: t("p.effects.speed.label"), unit: "%" },
                  { v: 40, label: t("p.effects.cost.label"), unit: "%" },
                  { v: 45, label: t("p.effects.approval.label"), unit: "%", note: t("p.effects.approval.note") },
                  { v: 70, label: t("p.effects.prod.label"), unit: "%" },
                ].map((x, i) => (
                  <motion.div key={i} variants={fadeUp} className="card p-4 text-center" {...hoverLift}>
                    <div className="text-3xl text-accent">
                      <AnimatedNumber value={x.v} unit={x.unit} />
                    </div>
                    <div className="text-subtle text-xs mt-1">{x.label}</div>
                    {x.note ? <div className="text-[11px] text-neutral-400 mt-1">{x.note}</div> : null}
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </Section>

      {/* Process */}
      <Section className="py-10">
        <motion.div
          variants={fadeUpSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5"><Layers3 className="text-accent" size={18}/><h3 className="text-base">{t("p.process.title")}</h3></div>
            <motion.div
              className="grid md:grid-cols-4 gap-6 relative"
              variants={staggerContainer(0.05, 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* 선 드로잉 애니메이션 */}
              <motion.div
                className="hidden md:block absolute top-[14px] left-[14px] right-[14px] h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
              />

              {[
                { n: "01", t: t("p.process.01.title"), d: t("p.process.01.desc") },
                { n: "02", t: t("p.process.02.title"), d: t("p.process.02.desc") },
                { n: "03", t: t("p.process.03.title"), d: t("p.process.03.desc") },
                { n: "04", t: t("p.process.04.title"), d: t("p.process.04.desc") },
              ].map((s) => (
                <motion.div key={s.n} variants={fadeUp} className="relative pl-8">
                  <div className="absolute left-0 top-0 h-7 w-7 rounded-full bg-accent/15 text-accent grid place-items-center font-medium">
                    {s.n}
                  </div>
                  <div className="text-base">{s.t}</div>
                  <div className="text-subtle text-sm">{s.d}</div>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.div>
      </Section>

      {/* Investment */}
      <Section className="py-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <Rocket className="text-accent" size={18}/>
              <div>
                <div className="text-base">{t("p.invest.title")}</div>
                <div className="text-subtle text-sm">{t("p.invest.desc")}</div>
              </div>
            </div>
            <motion.a
              variants={fadeUp}
              {...hoverLift}
              href="/contact"
              className="px-5 py-3 rounded-2xl bg-accent text-black text-center mt-8 md:mt-0 w-full md:w-auto"
            >
              {t("p.invest.cta")}
            </motion.a>
          </Card>
        </motion.div>
      </Section>

      {/* CTA Banner */}
      <Section className="py-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="card p-8 text-center"
        >
          <h3 className="text-lg">{t("p.cta.title")}</h3>
          <p className="text-subtle mt-2">{t("p.cta.desc")}</p>
          <motion.div
            variants={staggerContainer(0.05, 0.08)}
            className="mt-5 flex items-center justify-center gap-3 flex-wrap"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="px-5 py-3 rounded-2xl bg-accent text-black flex items-center gap-2">
                <Mail size={16}/> {t("p.cta.primary")}
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <a href="mailto:contact@whik.company" className="px-5 py-3 rounded-2xl border border-border">
                {t("p.cta.secondary")}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}
