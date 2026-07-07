"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const memories = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Where our story started. A moment that changed everything.",
    color: "#ff2d78",
  },
  {
    year: "2021",
    title: "Growing Closer",
    description: "Laughter echoed through every conversation we shared.",
    color: "#7c3aed",
  },
  {
    year: "2022",
    title: "Adventures",
    description: "Exploring the world together, one memory at a time.",
    color: "#f59e0b",
  },
  {
    year: "2023",
    title: "Unforgettable",
    description: "The year we created memories that will last a lifetime.",
    color: "#f43f5e",
  },
  {
    year: "2024",
    title: "Milestones",
    description: "Celebrating victories, big and small, side by side.",
    color: "#8b5cf6",
  },
  {
    year: "2025",
    title: "Forever",
    description: "Building dreams and painting our future together.",
    color: "#ec4899",
  },
];

export function MemoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] w-full bg-[#050505]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#050505] to-transparent" />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-16 pl-16"
        >
          {memories.map((memory, index) => (
            <motion.div
              key={memory.year}
              className="group relative flex w-[400px] flex-shrink-0 flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative mb-8 h-[350px] w-full overflow-hidden rounded-2xl bg-white/5">
                <div
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${memory.color}22, ${memory.color}44)`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500 group-hover:h-2"
                  style={{
                    width: "30%",
                    background: `linear-gradient(90deg, ${memory.color}, transparent)`,
                  }}
                />
              </div>

              <div className="space-y-3">
                <span
                  className="font-heading text-sm tracking-[0.2em] uppercase"
                  style={{ color: memory.color }}
                >
                  {memory.year}
                </span>
                <h3 className="font-heading text-3xl font-semibold tracking-tight text-white">
                  {memory.title}
                </h3>
                <p className="font-body text-base leading-relaxed text-white/50">
                  {memory.description}
                </p>
              </div>

              <div
                className="absolute -left-8 top-12 h-px w-8"
                style={{
                  background: `linear-gradient(90deg, transparent, ${memory.color}44)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
