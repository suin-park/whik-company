"use client";

import { motion } from "framer-motion";
import { Atom, Box, BadgeCheck, Network } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { fadeUpSlow } from "@/components/motionPresets";
import React from "react";

export default function HomeEcosystemDiagram() {
  const { t } = useI18n();

  const size = 560;
  const radiusOuter = 200;
  const center = size / 2;
  const polar = (deg: number, r: number) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
  };

  // 카드 폭은 고정(디자인 유지), 높이는 내용에 따라 자동
  const CARD_W = 196; // 살짝 넓혀 여유 확보

  const NODES = [
    {
      key: "studio",
      title: t("home.ecosystem.nodes.studio.title"),
      desc: t("home.ecosystem.nodes.studio.desc"),
      href: "/products",
      icon: <Atom className="w-5 h-5" />,
      angle: -20,
    },
    {
      key: "conv3d",
      title: t("home.ecosystem.nodes.conv3d.title"),
      desc: t("home.ecosystem.nodes.conv3d.desc"),
      href: "https://www.3d-locker.com/",
      icon: <Box className="w-5 h-5" />,
      angle: 35,
    },
    {
      key: "works",
      title: t("home.ecosystem.nodes.works.title"),
      desc: t("home.ecosystem.nodes.works.desc"),
      href: "/products",
      icon: <BadgeCheck className="w-5 h-5" />,
      angle: 155,
    },
    {
      key: "lab",
      title: t("home.ecosystem.nodes.lab.title"),
      desc: t("home.ecosystem.nodes.lab.desc"),
      href: "http://ai.whik.co.kr",
      icon: <Network className="w-5 h-5" />,
      angle: 210,
    },
  ] as const;

  // 각 카드의 실제 높이를 추적
  const cardRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [sizes, setSizes] = React.useState<Record<string, number>>({});

  React.useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      const next: Record<string, number> = {};
      for (const n of NODES) {
        const el = cardRefs.current[n.key];
        if (el) next[n.key] = el.getBoundingClientRect().height;
      }
      setSizes((prev) => {
        // 크기가 바뀐 경우에만 업데이트 (불필요한 리렌더 방지)
        let changed = false;
        for (const k of Object.keys(next)) {
          if (prev[k] !== next[k]) { changed = true; break; }
        }
        return changed ? next : prev;
      });
    });

    for (const n of NODES) {
      const el = cardRefs.current[n.key];
      if (el) ro.observe(el);
    }
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 경계 클램핑 함수 (실측 높이 사용)
  const clampPos = (deg: number, h: number) => {
    const p = polar(deg, radiusOuter + 30);
    const padding = 8;
    let left = p.x - CARD_W / 2;
    let top = p.y - (h ?? 86) / 2; // 첫 렌더는 대략값으로

    left = Math.max(padding, Math.min(left, size - CARD_W - padding));
    top = Math.max(padding, Math.min(top, size - (h ?? 86) - padding));
    return { left, top };
  };

  return (
    <section id="ecosystem" className="mt-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {t("home.ecosystem.title")}
        </h2>
        <p className="mt-2 text-sm md:text-base text-neutral-300/80">
          {t("home.ecosystem.subtitle")}
        </p>

        <motion.div
          variants={fadeUpSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="hidden md:block mt-8 rounded-2xl bg-neutral-950/60 ring-1 ring-white/5 p-4"
        >
          <div className="relative mx-auto" style={{ width: size, height: size }}>
            {/* SVG (원/선/허브) */}
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute left-0 top-0">
              <circle cx={center} cy={center} r={radiusOuter} className="fill-none stroke-white/10" strokeWidth={1.2} />
              {NODES.map((n, i) => {
                const p = polar(n.angle, radiusOuter);
                return (
                  <motion.line
                    key={`line-${n.key}`}
                    x1={center}
                    y1={center}
                    x2={p.x}
                    y2={p.y}
                    stroke="currentColor"
                    className="text-white/15"
                    strokeWidth={1.5}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 * i }}
                  />
                );
              })}
              <motion.g
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <circle cx={center} cy={center} r={56} className="fill-neutral-900 stroke-white/15" strokeWidth={1.2} />
                <text x={center} y={center - 4} textAnchor="middle" className="fill-white text-[14px] font-semibold">
                  {t("home.ecosystem.hub")}
                </text>
                <text x={center} y={center + 16} textAnchor="middle" className="fill-white/60 text-[11px]">
                  {t("home.ecosystem.hubTagline")}
                </text>
              </motion.g>
              {NODES.map((n, i) => {
                const p = polar(n.angle, radiusOuter);
                return (
                  <motion.circle
                    key={`dot-${n.key}`}
                    cx={p.x}
                    cy={p.y}
                    r={8}
                    className="fill-orange-400/80"
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  />
                );
              })}
            </svg>

            {/* HTML 카드 (실측 기반 위치) */}
            {NODES.map((n, i) => {
              const h = sizes[n.key]; // 실측 높이
              const pos = clampPos(n.angle, h);
              const isExternal = n.href.startsWith("http");
              return (
                <motion.a
                  key={`card-${n.key}`}
                  ref={(el) => { cardRefs.current[n.key] = el; }}
                  href={n.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="absolute rounded-xl bg-neutral-900/70 ring-1 ring-white/7 hover:ring-white/15 hover:shadow-md transition-all"
                  style={{ left: pos.left, top: pos.top, width: CARD_W }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                >
                  <div className="flex items-start gap-2 p-3">
                    <span className="rounded-lg bg-neutral-800/80 p-1.5">{n.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium">{n.title}</div>
                      <div className="mt-0.5 text-[12px] text-neutral-300/75 line-clamp-2">{n.desc}</div>
                      {/* CTA는 폰트/마진을 조금 축소해 높이 급증 방지 */}
                      <div className="mt-1.5 text-[11px] text-orange-400/90">{t("common.cta.more")}</div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* 모바일 폴백은 그대로 */}
        <div className="md:hidden mt-6 grid grid-cols-1 xs:grid-cols-2 gap-3">
          {NODES.map((n) => {
            const isExternal = n.href.startsWith("http");
            return (
              <a
                key={`m-${n.key}`}
                href={n.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/5 p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="rounded-lg bg-neutral-800/80 p-1.5">{n.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="mt-1 text-xs text-neutral-300/75 line-clamp-2">{n.desc}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-orange-400/90">{t("common.cta.more")}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
