"use client";
import { useEffect, useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import gsap from "gsap";

const ThreeScene = lazy(() =>
  import("@/components/animations/ThreeScene").then((m) => ({ default: m.ThreeScene }))
);

const img = (path: string) => `/images/${encodeURIComponent(path)}`;

const floatingShapes = [
  { size: 60, color: "#ff2d78", x: "15%", y: "20%", delay: 0 },
  { size: 40, color: "#7c3aed", x: "80%", y: "30%", delay: 0.3 },
  { size: 30, color: "#f59e0b", x: "70%", y: "70%", delay: 0.6 },
  { size: 50, color: "#ec4899", x: "25%", y: "75%", delay: 0.2 },
];

function FloatingShape({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: -30,
      x: 20,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute hidden rounded-full opacity-20 blur-[2px] md:block"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}, transparent)`,
        boxShadow: `0 0 ${size * 2}px ${color}44`,
      }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }
      )
        .fromTo(
          ".hero-title-happy",
          { opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          "-=0.3"
        )
        .fromTo(
          ".hero-title-birthday",
          { opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
          },
          "-=0.6"
        )
        .fromTo(
          ".hero-title-tanu",
          { opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
          },
          "-=0.6"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#050505]"
    >
      {floatingShapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, opacity }}
      >
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          poster={img("image1_(1).jpeg")}
        >
          <source src="/images/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/20" />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.2), transparent 60%),
              radial-gradient(ellipse at 70% 20%, rgba(255,45,120,0.15), transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.1), transparent 50%)
            `,
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.25), rgba(255,45,120,0.1), transparent)",
            x: normalizedX * 40,
            y: normalizedY * 40,
          }}
        />

        <motion.div
          className="absolute left-1/3 top-2/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.15), transparent)",
            x: normalizedX * -30,
            y: normalizedY * -20,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center md:gap-6">
        <p className="hero-subtitle font-heading text-xs tracking-[0.35em] text-white/30 uppercase md:text-sm">
          Celebrating You
        </p>

        <div ref={textRef} className="relative">
          <div className="pointer-events-none absolute -inset-10 opacity-20 blur-[80px] md:-inset-20">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)",
              }}
            />
          </div>

          <h1
            className="font-heading leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 14vw, 11rem)" }}
          >
            <span className="hero-title-happy gradient-text block">
              Happy
            </span>
            <span className="hero-title-birthday gradient-text-pink block -mt-[0.04em]">
              Birthday
            </span>
            <span className="hero-title-tanu block -mt-[0.06em] text-white/95">
              Varsha
            </span>
          </h1>
        </div>

        <p
          ref={subtextRef}
          className="hero-description font-heading max-w-xs text-base font-light tracking-wide text-white/40 md:max-w-md md:text-2xl"
        >
          To someone who makes the world brighter just by being in it
        </p>

        <div ref={ctaRef} className="hero-cta mt-4 md:mt-6">
          <MagneticButton>
            <button
              data-cursor-hover
              className="group relative overflow-hidden rounded-full border border-white/15 px-8 py-3 text-xs tracking-widest text-white/60 uppercase transition-all duration-500 hover:border-white/40 md:px-12 md:py-4 md:text-sm"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white/70 transition-colors duration-500 group-hover:text-white">
                <ScrambleText>Begin the journey</ScrambleText>
                <span className="inline-block text-lg transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#ff2d78]/15 to-[#7c3aed]/15 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0" />
            </button>
          </MagneticButton>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12" style={{ opacity }}>
        <div className="flex animate-bounce flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent md:h-10" />
        </div>
      </motion.div>
    </section>
  );
}
