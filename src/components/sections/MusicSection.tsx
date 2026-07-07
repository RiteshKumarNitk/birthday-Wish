"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioEngine } from "@/lib/audioEngine";
import { SplitText } from "@/components/animations/SplitText";

export function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const engineRef = useRef<AudioEngine | null>(null);
  const [bars, setBars] = useState<number[]>(Array(16).fill(8));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const engine = new AudioEngine();
    engineRef.current = engine;
    engine.init().catch(() => {});

    return () => {
      engine.destroy();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setVolume(volume);
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    if (isPlaying) {
      engine.stop();
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } else {
      engine.start();
      setIsPlaying(true);

      const update = () => {
        const data = engine.getAnalyserData();
        if (data.length) {
          const sampled: number[] = [];
          const step = Math.floor(data.length / 16);
          for (let i = 0; i < 16; i++) {
            const val = data[i * step] || 0;
            sampled.push(Math.max(6, (val / 255) * 50 + 6));
          }
          setBars(sampled);
        }
        rafRef.current = requestAnimationFrame(update);
      };
      rafRef.current = requestAnimationFrame(update);
    }
  }, [isPlaying]);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">
            Music for Versha
          </span>
          <h2
            className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
          >
            <span className="text-white/80">
              <SplitText text="Our" mode="chars" stagger={0.05} delay={0.1} />
            </span>
            <br />
            <SplitText
              text="Soundtrack"
              className="gradient-text inline-block"
              mode="chars"
              stagger={0.05}
              delay={0.4}
            />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-10 md:gap-12"
        >
          <div className="group relative">
            <motion.div
              className="relative flex h-56 w-56 cursor-pointer items-center justify-center md:h-80 md:w-80"
              onClick={togglePlay}
              data-cursor-hover
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  ...(isPlaying ? {} : { duration: 0.6 }),
                },
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff2d78]/20 to-[#7c3aed]/20 p-1">
                <div className="h-full w-full rounded-full bg-[#0D0D0D]" />
              </div>
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/5" />
              <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-[#ff2d78] to-[#7c3aed] p-1">
                <div className="h-full w-full rounded-full bg-[#050505]" />
              </div>
              <div className="absolute inset-[38%] flex items-center justify-center">
                <span className="font-heading text-2xl text-white/60">
                  {isPlaying ? "♫" : "♪"}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            data-cursor-hover
          >
            <span className="font-heading text-xs tracking-widest uppercase md:text-sm">
              {isPlaying ? "Pause" : "Play Melody"}
            </span>
            <span className="text-lg">{isPlaying ? "⏸" : "▶"}</span>
          </motion.button>

          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-white/20">Vol</span>
            <div
              className="relative h-[2px] w-28 cursor-pointer bg-white/10 md:w-32"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setVolume(Math.min(Math.max(x / rect.width, 0), 1));
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff2d78] to-[#7c3aed]"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-end gap-[3px] md:gap-1"
              >
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[#ff2d78] to-[#7c3aed]"
                    animate={{ height: `${h}px` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
