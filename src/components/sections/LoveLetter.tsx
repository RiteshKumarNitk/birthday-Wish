"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const letterContent = [
  "To the most incredible person I know,",
  "",
  "Today, on your special day, I find myself thinking about how lucky I am to have you in my life. Words seem inadequate to capture what you mean to me, but I'll try anyway.",
  "",
  "You have a way of making everything better. Your smile can brighten the darkest days, and your presence brings a sense of peace and joy that I've never known before.",
  "",
  "Every moment with you feels like a gift. The way you care, the way you laugh, the way you see the beauty in everything — it inspires me to be a better person.",
  "",
  "You are not just amazing. You are extraordinary. You are rare. You are magic.",
  "",
  "Happy Birthday, my love. Here's to many more celebrations together.",
  "",
  "With all my love,",
  "Forever yours ✦",
];

export function LoveLetter() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const startTyping = useCallback(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      lineIndex++;
      setVisibleLines(lineIndex);
      if (lineIndex >= letterContent.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(startTyping, 500);
    return () => clearTimeout(timeout);
  }, [isOpen, startTyping]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] px-4 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
            From The Heart
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="gradient-text-pink">A Letter</span>
            <br />
            <span className="text-white/80">For You</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-[1px]">
            <div className="relative rounded-3xl bg-[#0D0D0D] p-8 md:p-16">
              {!isOpen ? (
                <motion.div
                  className="flex flex-col items-center gap-8 py-16"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="flex cursor-pointer flex-col items-center gap-4"
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    data-cursor-hover
                  >
                    <motion.div
                      className="h-16 w-12 rounded-md border-2 border-white/20 bg-white/5"
                      animate={{
                        y: [0, -4, 0],
                        borderColor: [
                          "rgba(255,255,255,0.2)",
                          "rgba(255,45,120,0.4)",
                          "rgba(255,255,255,0.2)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="mx-auto mt-4 h-3 w-6 rounded-full border border-white/10" />
                    </motion.div>
                    <span className="font-heading text-sm tracking-widest text-white/40 uppercase">
                      Open Letter
                    </span>
                  </motion.div>

                  <p className="text-center font-body text-base leading-relaxed text-white/30">
                    Click to open a message written from the heart
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="font-heading text-xs tracking-[0.3em] text-white/20 uppercase">
                      ✦
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  {letterContent.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: i < visibleLines ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`font-body leading-relaxed ${
                        line === ""
                          ? "h-4"
                          : line.startsWith("With") || line.startsWith("Forever")
                            ? "mt-8 text-white/40"
                            : "text-white/70"
                      } ${line.startsWith("To the") ? "text-lg text-white/90" : ""}`}
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: line.startsWith("To the") || line.startsWith("Happy") || line.startsWith("With") || line.startsWith("Forever") ? "1.1rem" : "1rem",
                      }}
                    >
                      {line}
                      {i < visibleLines && i < letterContent.length - 1 && i >= visibleLines - 1 && !isComplete && (
                        <span className="ml-[1px] inline-block h-4 w-[2px] bg-white/60 animate-pulse" />
                      )}
                    </motion.p>
                  ))}

                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex items-center gap-4"
                    >
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <span className="font-heading text-xs tracking-[0.3em] text-white/20 uppercase">
                        ✦
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
