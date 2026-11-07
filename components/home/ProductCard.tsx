"use client";
import { useRef, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  index: string;
  tag: string;
  logo: ReactNode;
  desc: string;
  cta: string;
  image: string;
  accent: string;
  muted?: boolean;
  href?: string;
  onClick?: () => void;
  variants: Variants;
};

/**
 * Product card on the first screen: product imagery sits dark behind the logo,
 * wakes up on hover, and a soft light follows the cursor.
 */
export default function ProductCard({ index, tag, logo, desc, cta, image, accent, muted, href, onClick, variants }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const body = (
    <>
      {/* imagery */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className="pc-image pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <span aria-hidden className="pc-shade pointer-events-none absolute inset-0" />
      <span aria-hidden className="pc-glow pointer-events-none absolute inset-0" />
      <span aria-hidden className="pc-line pointer-events-none absolute inset-x-0 top-0 h-px" />

      {/* content */}
      <span className="relative z-[1] flex h-full flex-col">
        <span className="flex items-center justify-between text-[10px] tracking-[0.18em] text-white/55">
          <span className="tabular-nums">{index}</span>
          <span className="pc-tag border px-2 py-1 tracking-[0.06em]">{tag}</span>
        </span>
        <span className="mt-auto block">
          <span className="block">{logo}</span>
          <span className="mt-2.5 block text-[15px] leading-snug tracking-[-0.02em] text-[#d1d2d3] md:text-[clamp(15px,1.25vw,18px)]">{desc}</span>
          <span className={`mt-4 flex items-center justify-between text-sm font-semibold md:text-[15px] ${muted ? "text-[#a3a8ad]" : ""}`}>
            {cta}
            <span aria-hidden className="pc-arrow grid h-9 w-9 place-items-center rounded-full border border-white/25 text-base">
              {muted ? "↓" : "↗"}
            </span>
          </span>
        </span>
      </span>
    </>
  );

  const cls =
    "product-card group relative block h-[210px] w-full overflow-hidden border border-white/10 bg-[#111417] p-5 text-left md:h-[clamp(186px,21.5vh,240px)] md:p-6";
  const style = { "--accent": accent } as React.CSSProperties;

  return (
    <motion.div variants={variants} className="min-w-0">
      {href ? (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" onPointerMove={onMove} className={cls} style={style}>
          {body}
        </a>
      ) : (
        <button ref={ref as React.Ref<HTMLButtonElement>} type="button" onClick={onClick} onPointerMove={onMove} className={cls} style={style}>
          {body}
        </button>
      )}
    </motion.div>
  );
}
