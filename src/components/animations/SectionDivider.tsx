"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative flex h-32 items-center justify-center overflow-hidden">
      <motion.div
        style={{ scaleX, opacity }}
        className="h-px w-full max-w-3xl origin-center"
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}
