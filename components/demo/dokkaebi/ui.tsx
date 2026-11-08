"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Source } from "./data";

export const FIRE = "#ff5a36";
export const GOLD = "#ffb547";

export function Panel({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[.08] bg-[linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015))] ${
        glow ? "shadow-[0_0_0_1px_rgba(255,90,54,.18),0_30px_80px_-30px_rgba(255,90,54,.35)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[10.5px] font-semibold tracking-[0.22em] text-[#ffb547]">{children}</p>;
}

const SOURCE_TINT: Record<Source, string> = {
  응모권: "bg-[#ff5a36]/12 text-[#ffb19c] ring-[#ff5a36]/30",
  "QR 응모": "bg-[#ffb547]/12 text-[#ffd79a] ring-[#ffb547]/30",
  "네이버 예약": "bg-[#2fd27a]/10 text-[#8ff0bb] ring-[#2fd27a]/30",
  "카카오 채널": "bg-[#ffe14d]/10 text-[#fff0a0] ring-[#ffe14d]/30",
  "알리미 앱": "bg-[#7aa8ff]/12 text-[#b9d0ff] ring-[#7aa8ff]/30",
  "매장 태블릿": "bg-[#c79bff]/12 text-[#e0c8ff] ring-[#c79bff]/30",
};

export function SourceBadge({ s }: { s: Source }) {
  return <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1 ring-inset ${SOURCE_TINT[s]}`}>{s}</span>;
}

export function Chip({ children, tone = "slate" }: { children: ReactNode; tone?: "fire" | "gold" | "mint" | "slate" | "rose" }) {
  const t = {
    fire: "bg-[#ff5a36]/15 text-[#ffb19c]",
    gold: "bg-[#ffb547]/15 text-[#ffd79a]",
    mint: "bg-[#3ee0a5]/12 text-[#9ff2d2]",
    slate: "bg-white/[.07] text-white/70",
    rose: "bg-[#ff4d6d]/15 text-[#ffa3b4]",
  }[tone];
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${t}`}>{children}</span>;
}

/** Counts up once when it first appears. */
export function CountUp({ to, duration = 1100, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        run();
        io.disconnect();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref}>
      {v.toLocaleString("ko-KR")}
      {suffix}
    </span>
  );
}

/** Types text out like a chat reply. */
export function useTypewriter(text: string, run: boolean, speed = 16) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, run, speed]);
  return out;
}

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[270px] rounded-[38px] border border-white/15 bg-[#0b0b0c] p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)] ${className}`}>
      <div className="absolute left-1/2 top-3.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-[540px] overflow-hidden rounded-[30px] bg-[#f4f1ec] text-[#111]">{children}</div>
    </div>
  );
}

/** Single-series bar chart with a hover tooltip. */
export function Bars({ values, labels, unit, highlightLast = true }: { values: number[]; labels: string[]; unit: string; highlightLast?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...values) * 1.12;
  const W = 560;
  const H = 180;
  const bw = W / values.length;
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`최근 ${values.length}일 방문 수`}>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={0} x2={W} y1={H - H * g} y2={H - H * g} stroke="rgba(255,255,255,.06)" strokeWidth={1} />
        ))}
        {values.map((v, i) => {
          const h = (v / max) * H;
          const x = i * bw + bw * 0.18;
          const w = bw * 0.64;
          const last = highlightLast && i === values.length - 1;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={i * bw} y={0} width={bw} height={H} fill="transparent" />
              <path
                d={`M${x},${H} V${H - h + 4} q0,-4 4,-4 h${w - 8} q4,0 4,4 V${H} Z`}
                fill={last ? FIRE : hover === i ? "rgba(255,181,71,.85)" : "rgba(255,181,71,.42)"}
              />
            </g>
          );
        })}
      </svg>
      <div className="mt-1.5 grid text-center text-[10px] text-white/40 sm:text-[11px]" style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))` }}>
        {labels.map((l, i) => (
          <span key={l} className="whitespace-nowrap">
            <span className={i % 3 === 1 ? "sm:hidden" : "hidden"}>{l}</span>
            <span className={i % 2 === 1 ? "hidden sm:inline" : "hidden"}>{l}</span>
          </span>
        ))}
      </div>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-white/10 bg-[#1b1714] px-2.5 py-1.5 text-[11px] text-white shadow-xl"
          style={{ left: `${((hover + 0.5) / values.length) * 100}%`, top: 0 }}
        >
          <b>{labels[hover]}</b> {values[hover].toLocaleString("ko-KR")}
          {unit}
        </div>
      )}
    </div>
  );
}

/** A decorative QR-like code (finder squares + seeded modules). Not scannable on purpose. */
export function FakeQR({ size = 168, seed = 7 }: { size?: number; seed?: number }) {
  const n = 25;
  let s = seed;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => x >= 0 && y >= 0 && ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9));
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && r() > 0.52) cells.push([x, y]);
  const c = size / n;
  const F = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x * c} y={y * c} width={7 * c} height={7 * c} rx={c * 1.4} fill="#111" />
      <rect x={(x + 1) * c} y={(y + 1) * c} width={5 * c} height={5 * c} rx={c} fill="#fff" />
      <rect x={(x + 2) * c} y={(y + 2) * c} width={3 * c} height={3 * c} rx={c * 0.6} fill="#111" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="QR 코드 예시">
      <rect width={size} height={size} fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x * c + 0.4} y={y * c + 0.4} width={c - 0.8} height={c - 0.8} rx={c * 0.3} fill="#111" />
      ))}
      <F x={0} y={0} />
      <F x={n - 7} y={0} />
      <F x={0} y={n - 7} />
    </svg>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (m: string) => {
    setMsg(m);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setMsg(null), 3200);
  };
  const node = msg ? (
    <div role="status" className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#ff5a36] px-5 py-2.5 text-sm font-bold text-white shadow-[0_20px_50px_-10px_rgba(255,90,54,.6)]">
      {msg}
    </div>
  ) : null;
  return { show, node };
}
