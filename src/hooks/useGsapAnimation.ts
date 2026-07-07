"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  toggleActions?: string;
  once?: boolean;
}

export function useGsapReveal<T extends HTMLElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { autoAlpha: 0, y: 60 },
      to = { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" },
      start = "top 85%",
      once = true,
    } = options;

    const anim = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none none",
        ...(once ? { once: true } : {}),
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [options]);

  return ref;
}
