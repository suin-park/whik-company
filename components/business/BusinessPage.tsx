"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import type { Lang } from "@/lib/messages";
import { SUPPORT_EMAIL, copy, services, steps, type Service, type ServiceKey } from "./businessContent";
import RequestDialog from "./RequestDialog";

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const mask: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.95, ease: EASE } } };
const grow: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } };

function glowMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Card art: the tool card stacks two dashboards; the others use a photo. */
function CardArt({ s }: { s: Service }) {
  if (s.key === "tool") {
    return (
      <span className="biz-tool absolute inset-0 overflow-hidden bg-[radial-gradient(120%_90%_at_20%_0%,#1d4a42,#0d1715_70%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/business/tool-dashboard-2.jpg" alt="" aria-hidden loading="lazy" className="biz-dash biz-dash-back absolute w-[92%]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/business/tool-dashboard-1.jpg" alt="" aria-hidden loading="lazy" className="biz-dash biz-dash-front absolute w-[80%]" />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.key === "contract" ? "/images/business/contract.jpg" : "/images/business/training.jpg"}
      alt=""
      aria-hidden
      loading="lazy"
      className="biz-photo absolute inset-0 h-full w-full object-cover"
    />
  );
}

const CARD_LINK: Record<ServiceKey, { href: string; ko: string; en: string }> = {
  tool: { href: "/business/development", ko: "개발 문의하기", en: "Start a request" },
  contract: { href: "/business/portal", ko: "기업 관리 코드로 들어가기", en: "Enter with your code" },
  training: { href: "/business/training", ko: "교육 신청하기", en: "Request training" },
};

function ServiceCard({ s, i, lang }: { s: Service; i: number; lang: Lang }) {
  const link = CARD_LINK[s.key];
  return (
    <motion.article variants={rise} className="min-w-0">
      <Link
        href={link.href}
        onPointerMove={glowMove}
        style={{ "--accent": s.accent } as React.CSSProperties}
        className="biz-card group relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#101316] p-0 text-left"
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden md:aspect-[16/12]">
          <CardArt s={s} />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#101316] via-transparent to-black/20" />
          <span className="absolute left-4 top-4 z-[2] bg-black/60 px-2 py-1 text-[11px] tabular-nums tracking-[0.1em] text-white/85 backdrop-blur md:left-5 md:top-5">
            {String(i + 1).padStart(2, "0")}
          </span>
        </span>
        <span aria-hidden className="fx-glow pointer-events-none absolute inset-0" />
        <span aria-hidden className="fx-line pointer-events-none absolute inset-x-0 top-0 z-[3] h-px" />
        <span className="relative z-[1] flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6">
          <span className="flex items-start justify-between gap-4">
            <span className="break-keep text-[21px] font-semibold leading-snug tracking-[-0.04em] md:text-[clamp(20px,1.7vw,26px)]">{s.title[lang]}</span>
            <span aria-hidden className="biz-arrow mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25">
              ↗
            </span>
          </span>
          <span className="mt-2 block break-keep text-sm leading-[1.65] text-white/60">{s.desc[lang]}</span>
          <span className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-4">
            {s.points[lang].map((p) => (
              <span key={p} className="flex items-center gap-2 text-[12px] text-white/70">
                <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                {p}
              </span>
            ))}
          </span>
          <span className="biz-cta mt-5 text-[13px] font-semibold text-[var(--accent)]">{lang === "ko" ? link.ko : link.en} →</span>
        </span>
      </Link>
    </motion.article>
  );
}

export default function BusinessPage() {
  const { lang } = useI18n();
  const c = copy[lang];
  const [dialog, setDialog] = useState<{ open: boolean; pick: ServiceKey | "other" }>({ open: false, pick: "tool" });
  const open = (pick: ServiceKey | "other") => setDialog({ open: true, pick });

  return (
    <div className="biz-page relative isolate -mt-16 overflow-hidden bg-[#0b0d0f] text-[#f5f5f4] [font-family:Arial,'Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      <span aria-hidden className="biz-aura pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />
      <span aria-hidden className="biz-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]" />

      {/* hero */}
      <motion.section variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-[1600px] px-[6%] pb-10 pt-28 md:pb-14 md:pt-36">
        <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-[11px] text-white/45 md:mb-14">
          <Link href="/" className="hover:text-white">
            {c.crumbHome}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-white/75">{c.crumb}</span>
        </motion.nav>

        <motion.div variants={rise} className="mb-5 flex items-center gap-4 text-[10px] font-semibold tracking-[0.22em] md:text-[11px]">
          <motion.span variants={grow} className="block h-px w-14 origin-left bg-[#7fe0c8] md:w-20" />
          <span className="text-white/55">{c.label}</span>
        </motion.div>
        <div className="gap-12 md:flex md:items-end md:justify-between">
          <h1 className="m-0 break-keep text-[40px] font-semibold leading-[1.1] tracking-[-0.055em] md:text-[clamp(44px,5.4vw,84px)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={mask} className="inline-block">
                {c.title[0]} <span className="biz-hi">{c.title[1]}</span>
              </motion.span>
            </span>
          </h1>
          <motion.p variants={rise} className="m-0 mt-5 max-w-[420px] break-keep text-[15px] leading-[1.75] text-white/60 md:mt-0 md:text-[17px]">
            {c.body}
          </motion.p>
        </div>
      </motion.section>

      {/* services */}
      <motion.section variants={stagger} initial="hidden" animate="show" aria-label={c.crumb} className="mx-auto max-w-[1600px] px-[6%]">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} lang={lang} />
          ))}
        </div>
      </motion.section>

      {/* process */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        aria-labelledby="biz-process"
        className="mx-auto max-w-[1600px] px-[6%] pt-24 md:pt-32"
      >
        <motion.div variants={rise} className="mb-4 text-[10px] font-semibold tracking-[0.22em] text-white/45 md:text-[11px]">
          {c.processLabel}
        </motion.div>
        <motion.h2 variants={rise} id="biz-process" className="m-0 mb-10 text-[30px] font-semibold tracking-[-0.045em] md:text-[clamp(30px,3vw,44px)]">
          {c.processTitle}
        </motion.h2>
        <ol className="relative m-0 grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 md:grid-cols-4 md:gap-8">
          <motion.span aria-hidden variants={grow} className="biz-rail absolute left-0 right-0 top-[19px] hidden h-px origin-left md:block" />
          {steps.map((st, i) => (
            <motion.li key={st.title.en} variants={rise} className="relative">
              <span className="biz-step relative z-[1] grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#0b0d0f] text-[12px] font-semibold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 mt-5 text-lg font-semibold tracking-[-0.03em] md:text-xl">{st.title[lang]}</h3>
              <p className="m-0 mt-2 break-keep text-[13px] leading-[1.65] text-white/55 md:text-sm">{st.desc[lang]}</p>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* undecided */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-[1600px] px-[6%] pb-20 pt-24 md:pb-28 md:pt-32"
      >
        <motion.div variants={rise} className="biz-band relative overflow-hidden border border-white/10 px-6 py-10 md:flex md:items-center md:justify-between md:gap-10 md:px-12 md:py-14">
          <span aria-hidden className="biz-band-glow pointer-events-none absolute inset-0 -z-10" />
          <div>
            <h2 className="m-0 break-keep text-[24px] font-semibold tracking-[-0.04em] md:text-[clamp(24px,2.3vw,34px)]">{c.undecided}</h2>
            <p className="m-0 mt-3 break-keep text-sm text-white/60 md:text-[15px]">{c.undecidedBody}</p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-5 md:mt-0 md:shrink-0">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              {SUPPORT_EMAIL}
              <span aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <button
              type="button"
              onClick={() => open("other")}
              className="inline-flex min-h-[50px] items-center gap-2 bg-[#f5f5f4] px-7 text-sm font-bold text-[#0b0d0f] transition hover:-translate-y-0.5 hover:bg-[#7fe0c8]"
            >
              {c.ask} <span aria-hidden>→</span>
            </button>
          </div>
        </motion.div>
      </motion.section>

      <RequestDialog open={dialog.open} initial={dialog.pick} lang={lang} onClose={() => setDialog((d) => ({ ...d, open: false }))} />
    </div>
  );
}
