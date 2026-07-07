"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { normalizedX, normalizedY } = useMousePosition();
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(Math.floor(window.innerWidth * 0.08), 160);
    starsRef.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      size: Math.random() * 2.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseOffsetX = normalizedX * 15;
      const mouseOffsetY = normalizedY * 15;

      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const parallaxFactor = (1 - star.z) * 0.5;

        const screenX =
          canvas.width / 2 +
          star.x * canvas.width * 0.3 * (1 - star.z) +
          mouseOffsetX * parallaxFactor;
        const screenY =
          canvas.height / 2 +
          star.y * canvas.height * 0.3 * (1 - star.z) +
          mouseOffsetY * parallaxFactor;

        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(screenX, screenY, star.size * (1 - star.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

        if (star.size > 1.5) {
          ctx.shadowBlur = star.size * 4;
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.3})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion, normalizedX, normalizedY]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
