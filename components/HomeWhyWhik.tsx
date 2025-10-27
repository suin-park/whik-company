"use client";

import { motion } from "framer-motion";
import { Sparkles, Rotate3D, Link2 } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { staggerContainer, fadeUp, hoverLift } from "@/components/motionPresets";

export default function HomeWhyWhik() {
  const { t } = useI18n();

  const cards = [
    {
      k: "CREATE",
      title: t("home.why.create.title"),
      desc: t("home.why.create.desc"),
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      k: "CONVERT",
      title: t("home.why.convert.title"),
      desc: t("home.why.convert.desc"),
      icon: <Rotate3D className="w-6 h-6" />,
    },
    {
      k: "CONNECT",
      title: t("home.why.connect.title"),
      desc: t("home.why.connect.desc"),
      icon: <Link2 className="w-6 h-6" />,
    },
  ];

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mt-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold tracking-tight">
          {t("home.why.title")}
        </motion.h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <motion.div
              key={c.k}
              variants={fadeUp}
              {...hoverLift}
              className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/5 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-xl bg-neutral-800/80 p-2">{c.icon}</span>
                <span className="text-sm uppercase tracking-wide text-neutral-300/80">{c.k}</span>
              </div>
              <h3 className="mt-3 text-lg font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-300/75">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
