"use client";
import { useEffect } from "react";

/**
 * Full-screen section jumps for the home page.
 *
 * A wheel/key step that reaches the edge of the current [data-snap] section
 * glides quickly to the next (or previous) one. Sections taller than the
 * viewport scroll normally until their edge is visible, so nothing is skipped.
 * Off on touch screens, with reduced motion, and while a dialog is open.
 */
export function useSectionSnap(duration = 720) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    let animating = false;
    let lastWheel = 0;
    let glideEnd = 0;
    let raf = 0;

    const sections = () => Array.from(document.querySelectorAll<HTMLElement>("[data-snap]"));
    const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const glide = (to: number) => {
      const from = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      to = Math.max(0, Math.min(max, Math.round(to)));
      if (Math.abs(to - from) < 2) return false;
      animating = true;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, from + (to - from) * ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else animating = false;
      };
      raf = requestAnimationFrame(step);
      return true;
    };

    /** Where to go for one step in `dir`, or null to let the browser scroll. */
    const target = (dir: 1 | -1): number | null => {
      const list = sections();
      if (!list.length) return null;
      const y = window.scrollY;
      const vh = window.innerHeight;
      let i = 0;
      list.forEach((s, k) => {
        if (top(s) <= y + 4) i = k;
      });
      const cur = list[i];
      const curTop = top(cur);
      const curBottom = curTop + cur.offsetHeight;

      if (dir > 0) {
        if (y < curTop - 4) return curTop; // above the first section
        if (y + vh < curBottom - 4) return null; // still content left in this section
        const next = list[i + 1];
        return next ? top(next) : null; // after the last one: footer scrolls normally
      }
      if (y > curTop + 4) {
        // inside a section: if it is taller than the screen, scroll normally until its top
        return cur.offsetHeight > vh + 4 ? null : curTop;
      }
      const prev = list[i - 1];
      if (!prev) return null;
      const prevTop = top(prev);
      return Math.max(prevTop, prevTop + prev.offsetHeight - vh);
    };

    const enabled = () =>
      !reduce.matches && fine.matches && !document.querySelector("dialog[open]") && !document.body.classList.contains("overflow-hidden");

    const onWheel = (e: WheelEvent) => {
      if (!enabled() || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      // swallow the rest of a gesture (trackpad momentum) during and right after a glide
      if (animating || (gap < 160 && now < glideEnd + 700)) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;
      const to = target(e.deltaY > 0 ? 1 : -1);
      if (to == null) return;
      e.preventDefault();
      if (glide(to)) glideEnd = now + duration;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!enabled() || e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      const down = ["PageDown", "ArrowDown"].includes(e.key) || (e.key === " " && !e.shiftKey);
      const up = ["PageUp", "ArrowUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (animating) {
        e.preventDefault();
        return;
      }
      const to = target(down ? 1 : -1);
      if (to == null) return;
      e.preventDefault();
      if (glide(to)) glideEnd = performance.now() + duration;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      html.style.scrollBehavior = prevBehavior;
    };
  }, [duration]);
}
