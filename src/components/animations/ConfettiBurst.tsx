"use client";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiBurstProps {
  trigger: boolean;
  type?: "celebrate" | "fireworks" | "emoji";
  delay?: number;
}

export function ConfettiBurst({ trigger, type = "celebrate", delay = 0 }: ConfettiBurstProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (!trigger || hasFired.current) return;
    hasFired.current = true;

    const timeout = setTimeout(() => {
      switch (type) {
        case "celebrate":
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6, x: 0.5 },
            colors: ["#ff2d78", "#7c3aed", "#f59e0b", "#ec4899", "#8b5cf6"],
            shapes: ["circle", "square"],
            ticks: 200,
          });
          break;

        case "fireworks":
          const end = Date.now() + 2000;
          const frame = () => {
            confetti({
              particleCount: 4,
              angle: 60,
              spread: 55,
              origin: { x: Math.random(), y: Math.random() * 0.5 },
              colors: ["#ff2d78", "#7c3aed", "#f59e0b"],
            });
            confetti({
              particleCount: 4,
              angle: 120,
              spread: 55,
              origin: { x: Math.random(), y: Math.random() * 0.5 },
              colors: ["#ec4899", "#8b5cf6", "#f43f5e"],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          frame();
          break;

        case "emoji":
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#ff2d78", "#f59e0b"],
            shapes: ["circle"],
            scalar: 1.5,
          });
          break;
      }
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [trigger, type, delay]);

  return null;
}
