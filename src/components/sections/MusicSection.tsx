"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioEngine } from "@/lib/audioEngine";

export function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const engineRef = useRef<AudioEngine | null>(null);
  const [heights, setHeights] = useState<number[]>([10, 15, 8, 20, 12, 16, 10, 14]);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const engine = new AudioEngine();
    engineRef.current = engine;
    engine.init().catch(() => {});

    return () => {
      engine.destroy();
      if (animRef.current) clearInterval(animRef.current);
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
      if (animRef.current) {
        clearInterval(animRef.current);
        animRef.current = null;
      }
    } else {
      engine.start();
      setIsPlaying(true);
      animRef.current = setInterval(() => {
        setHeights(
          Array.from({ length: 8 }, () => Math.floor(Math.random() * 35 + 8))
        );
      }, 200);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
            Music
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="text-white/80">Our</span>
            <br />
            <span className="gradient-text">Soundtrack</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-12"
        >
          <div className="group relative">
            <motion.div
              className="relative flex h-64 w-64 cursor-pointer items-center justify-center md:h-80 md:w-80"
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
            className="flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-white/70 transition-colors hover:border-white/30 hover:text-white"
            data-cursor-hover
          >
            <span className="font-heading text-sm tracking-widest uppercase">
              {isPlaying ? "Pause" : "Play Melody"}
            </span>
            <span className="text-lg">
              {isPlaying ? "⏸" : "▶"}
            </span>
          </motion.button>

          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-white/30">Vol</span>
            <div
              className="relative h-[2px] w-32 cursor-pointer bg-white/10"
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
                className="flex items-end gap-1"
              >
                {heights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[#ff2d78] to-[#7c3aed]"
                    animate={{ height: `${h}px` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
