"use client";
import { type ReactNode } from "react";
import { useGsapReveal } from "@/hooks/useGsapAnimation";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p";
}

export function GsapReveal({
  children,
  className = "",
  from = { autoAlpha: 0, y: 60 },
  to = { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" },
  as: Tag = "div",
}: GsapRevealProps) {
  const ref = useGsapReveal<HTMLDivElement>({ from, to });
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
