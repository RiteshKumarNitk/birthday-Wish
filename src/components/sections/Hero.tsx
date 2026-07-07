"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050505]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: imageScale,
          y: imageY,
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='40%25' r='60%25'%3E%3Cstop offset='0%25' stop-color='rgba(124,58,237,0.15)'/%3E%3Cstop offset='50%25' stop-color='rgba(255,45,120,0.08)'/%3E%3Cstop offset='100%25' stop-color='rgba(5,5,5,0)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.2), rgba(255,45,120,0.1), transparent)",
            transform: `translate(calc(-50% + ${normalizedX * 20}px), calc(-50% + ${normalizedY * 20}px))`,
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
        >
          <span className="font-heading text-sm tracking-[0.4em] text-white/40 uppercase">
            Celebrating You
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
          className="font-heading leading-[0.9] tracking-tight"
          style={{
            fontSize: "clamp(3rem, 15vw, 10rem)",
          }}
        >
          <span className="block gradient-text">Happy</span>
          <span className="block -mt-[0.05em]">Birthday</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.77, 0, 0.175, 1] }}
          className="mt-4"
        >
          <p className="font-heading text-2xl font-light tracking-wide text-white/60 md:text-4xl">
            To Someone Extraordinary
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8"
        >
          <MagneticButton>
            <button
              data-cursor-hover
              className="group relative overflow-hidden rounded-full border border-white/20 px-10 py-4 text-sm tracking-wider text-white/80 uppercase transition-all duration-500 hover:border-white/40"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <span className="relative z-10 group-hover:text-white">
                Begin the journey
              </span>
              <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#ff2d78]/20 to-[#7c3aed]/20 transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest text-white/30 uppercase">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
