"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const dotXSpring = useSpring(dotX, { stiffness: 500, damping: 28, mass: 0.05 });
  const dotYSpring = useSpring(dotY, { stiffness: 500, damping: 28, mass: 0.05 });

  const isHovering = useRef(false);
  const isVisible = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    dotX.set(e.clientX);
    dotY.set(e.clientY);
    if (!isVisible.current) {
      isVisible.current = true;
    }
  }, [cursorX, cursorY, dotX, dotY]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [prefersReducedMotion, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`h-8 w-8 rounded-full border border-white/20 transition-all duration-300 ${
            isHovering.current ? "scale-150 border-white/40 bg-white/5" : ""
          }`}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full bg-white/70 transition-all duration-300 ${
            isHovering.current ? "scale-0" : ""
          }`}
        />
      </motion.div>
    </>
  );
}
