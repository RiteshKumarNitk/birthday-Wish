"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const marqueeText = "✦ Happy Birthday Varsha ✦ Celebrate ✦ Love ✦ Joy ✦";

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[200px] w-full overflow-hidden bg-[#050505] md:h-[280px]">
      <motion.div style={{ opacity }} className="flex h-full items-center">
        <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-heading font-semibold leading-none tracking-tight text-white/5"
              style={{ fontSize: "clamp(4rem, 15vw, 10rem)" }}
            >
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent md:w-32" />
    </section>
  );
}
