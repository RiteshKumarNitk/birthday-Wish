"use client";
import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TrailDot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const dotsRef = useRef<TrailDot[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);
  const hueRef = useRef(330);

  const addDot = useCallback(() => {
    dotsRef.current.push({
      x: mouseRef.current.x,
      y: mouseRef.current.y,
      size: Math.random() * 6 + 3,
      opacity: 0.4,
      hue: hueRef.current,
      life: 1,
    });
    hueRef.current += 2;
    if (dotsRef.current.length > 40) dotsRef.current.shift();
  }, []);

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

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      addDot();
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current = dotsRef.current.filter((d) => d.life > 0);
      dotsRef.current.forEach((d) => {
        d.life -= 0.025;
        d.opacity = d.life * 0.4;
        d.size *= 0.97;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 80%, 65%, ${d.opacity})`;
        ctx.fill();

        if (d.size > 2) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${d.hue}, 80%, 65%, ${d.opacity * 0.2})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [prefersReducedMotion, addDot]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    />
  );
}
