"use client";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export function ScrollConfetti() {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      const sections = [
        { id: "hero-pass", threshold: windowH * 0.9 },
        { id: "photo-pass", threshold: windowH * 2.5 },
        { id: "surprise-pass", threshold: docH - windowH * 2.5 },
      ];

      sections.forEach((s) => {
        if (scrollY > s.threshold && !firedRef.current.has(s.id)) {
          firedRef.current.add(s.id);

          if (s.id === "surprise-pass") {
            const end = Date.now() + 1500;
            const frame = () => {
              confetti({
                particleCount: 3,
                angle: 60 + Math.random() * 60,
                spread: 60,
                origin: { x: Math.random(), y: Math.random() * 0.4 },
                colors: ["#ff2d78", "#7c3aed", "#f59e0b", "#ec4899", "#8b5cf6"],
              });
              if (Date.now() < end) requestAnimationFrame(frame);
            };
            frame();
          } else {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.5, x: 0.5 },
              colors: ["#ff2d78", "#7c3aed", "#f59e0b"],
              shapes: ["circle"],
              ticks: 150,
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
