"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() * 12 + 6,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((h) => {
        h.y -= h.speed;
        h.x += h.drift + Math.sin(h.pulse) * 0.3;
        h.pulse += 0.01;

        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.globalAlpha = h.opacity * (0.8 + 0.2 * Math.sin(h.pulse));

        ctx.beginPath();
        ctx.moveTo(0, h.size * 0.3);
        ctx.bezierCurveTo(
          -h.size * 0.5, -h.size * 0.3,
          -h.size, h.size * 0.1,
          0, h.size * 0.8
        );
        ctx.bezierCurveTo(
          h.size, h.size * 0.1,
          h.size * 0.5, -h.size * 0.3,
          0, h.size * 0.3
        );
        ctx.fillStyle = "#ff2d78";
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08), rgba(255,45,120,0.05), transparent 70%)",
          }}
        />
      </motion.div>

      <HeartParticles />

      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
              Final Wish
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            className="font-heading leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)" }}
          >
            <span className="gradient-text">You make</span>
            <br />
            <span className="text-white/90">the world</span>
            <br />
            <span className="gradient-text-pink">brighter.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body max-w-lg text-lg leading-relaxed text-white/40"
          >
            Happy Birthday. You deserve all the joy this world has to offer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <button
              data-cursor-hover
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative overflow-hidden rounded-full border border-white/20 px-12 py-4 text-sm tracking-widest text-white/60 uppercase transition-all duration-500 hover:border-white/40 hover:text-white"
            >
              <span className="relative z-10">See Again</span>
              <div className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#ff2d78]/20 to-[#7c3aed]/20 transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
