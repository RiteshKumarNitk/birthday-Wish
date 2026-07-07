"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9997] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #ff2d78, #7c3aed, #f59e0b, #ff2d78)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
