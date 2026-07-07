"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import gsap from "gsap";

function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const hearts = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 300,
      size: Math.random() * 16 + 4,
      speed: Math.random() * 0.5 + 0.08,
      opacity: Math.random() * 0.25 + 0.03,
      drift: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
      hue: Math.random() * 60 + 330,
    }));

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((h) => {
        h.y -= h.speed;
        h.x += h.drift + Math.sin(h.pulse) * 0.2;
        h.pulse += 0.008;

        if (h.y < -30) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.globalAlpha = h.opacity * (0.7 + 0.3 * Math.sin(h.pulse));
        ctx.rotate(Math.sin(h.pulse) * 0.1);

        ctx.beginPath();
        ctx.moveTo(0, h.size * 0.3);
        ctx.bezierCurveTo(
          -h.size * 0.5,
          -h.size * 0.3,
          -h.size,
          h.size * 0.1,
          0,
          h.size * 0.8
        );
        ctx.bezierCurveTo(
          h.size,
          h.size * 0.1,
          h.size * 0.5,
          -h.size * 0.3,
          0,
          h.size * 0.3
        );
        ctx.fillStyle = `hsla(${h.hue}, 80%, 60%, 0.6)`;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}

export function FinalWishes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    gsap.to(glow, {
      scale: 1.15,
      opacity: 0.3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.1), rgba(255,45,120,0.06), transparent 70%)",
          }}
        />

        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] md:h-[500px] md:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.12), transparent)",
          }}
        />
      </motion.div>

      <HeartParticles />

      <div className="relative z-10 flex h-dvh flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <p className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">
              For Varsha
            </p>
          </motion.div>

          <h2
            className="font-heading leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 10vw, 7.5rem)" }}
          >
            <SplitText
              text="You make"
              className="gradient-text inline-block"
              mode="chars"
              stagger={0.04}
              delay={0.1}
            />
            <br />
            <span className="text-white/85">
              <SplitText
                text="the world"
                mode="chars"
                stagger={0.04}
                delay={0.45}
              />
            </span>
            <br />
            <SplitText
              text="brighter Varsha"
              className="gradient-text-pink inline-block"
              mode="chars"
              stagger={0.04}
              delay={0.8}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.3 }}
            className="font-body max-w-xs text-sm leading-relaxed text-white/30 md:max-w-lg md:text-base"
          >
            Happy Birthday Varsha. You deserve all the joy this world has to
            offer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-6 md:mt-8"
          >
            <MagneticButton>
              <button
                data-cursor-hover
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="group relative overflow-hidden rounded-full border border-white/15 px-10 py-3 text-xs tracking-widest text-white/50 uppercase transition-all duration-500 hover:border-white/40 hover:text-white md:px-12 md:py-4 md:text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ScrambleText>See Again</ScrambleText>
                  <span className="inline-block">✦</span>
                </span>
                <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#ff2d78]/15 to-[#7c3aed]/15 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
