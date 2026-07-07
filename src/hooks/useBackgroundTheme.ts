"use client";
import { useEffect, useRef, useCallback } from "react";

interface ThemeStop {
  threshold: number;
  bg: string;
}

const themes: ThemeStop[] = [
  { threshold: 0, bg: "#050505" },
  { threshold: 0.15, bg: "#080510" },
  { threshold: 0.3, bg: "#0a0510" },
  { threshold: 0.45, bg: "#08060e" },
  { threshold: 0.6, bg: "#0a0508" },
  { threshold: 0.75, bg: "#08050a" },
  { threshold: 0.9, bg: "#050505" },
];

function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff;
  const br = (bh >> 16) & 0xff,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${((1 << 24) | (rr << 16) | (rg << 8) | rb).toString(16).slice(1)}`;
}

export function useBackgroundTheme() {
  const currentRef = useRef("#050505");

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? scrollY / docH : 0;

    let color = themes[0].bg;
    for (let i = 0; i < themes.length - 1; i++) {
      const a = themes[i];
      const b = themes[i + 1];
      if (progress >= a.threshold && progress < b.threshold) {
        const t = (progress - a.threshold) / (b.threshold - a.threshold);
        color = lerpColor(a.bg, b.bg, t);
        break;
      }
      if (progress >= b.threshold) color = b.bg;
    }

    if (color !== currentRef.current) {
      currentRef.current = color;
      document.documentElement.style.setProperty("--theme-bg", color);
    }
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);
}
