"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";

const letterContent = [
  "To the most incredible Versha I know,",
  "",
  "Today, on your special day, I find myself thinking about how lucky I am to have you in my life. Words seem inadequate to capture what you mean to me, Versha, but I'll try anyway.",
  "",
  "You have a way of making everything better. Your smile can brighten the darkest days, and your presence brings a sense of peace and joy that I've never known before.",
  "",
  "Every moment with you, Versha, feels like a gift. The way you care, the way you laugh, the way you see the beauty in everything — it inspires me to be a better person.",
  "",
  "You are not just amazing, Versha. You are extraordinary. You are rare. You are magic.",
  "",
  "Happy Birthday, my love Versha. Here's to many more celebrations together.",
  "",
  "With all my love,",
  "Forever yours ✦",
];

export function LoveLetter() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const startTyping = useCallback(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      lineIndex++;
      setVisibleLines(lineIndex);
      if (lineIndex >= letterContent.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(startTyping, 500);
    return () => clearTimeout(timeout);
  }, [isOpen, startTyping]);

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
            From The Heart
          </span>
          <h2
            className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
          >
            <SplitText
              text="A Letter"
              className="gradient-text-pink inline-block"
              mode="chars"
              stagger={0.05}
              delay={0.1}
            />
            <br />
            <SplitText
              text="For Versha"
              className="text-white/80 inline-block"
              mode="chars"
              stagger={0.05}
              delay={0.4}
            />
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-[1px] md:rounded-3xl">
            <div className="relative rounded-2xl bg-[#0D0D0D] p-6 md:p-12 md:rounded-3xl">
              {!isOpen ? (
                <motion.div
                  className="flex flex-col items-center gap-8 py-12 md:py-16"
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
                      className="h-14 w-10 rounded border-2 border-white/15 bg-white/[0.03] md:h-16 md:w-12 md:rounded-md"
                      animate={{
                        y: [0, -4, 0],
                        borderColor: [
                          "rgba(255,255,255,0.15)",
                          "rgba(255,45,120,0.3)",
                          "rgba(255,255,255,0.15)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="mx-auto mt-3 h-3 w-5 rounded-full border border-white/10 md:mt-4 md:h-3 md:w-6" />
                    </motion.div>
                    <span className="font-heading text-xs tracking-widest text-white/30 uppercase md:text-sm">
                      Open Letter for Versha
                    </span>
                  </motion.div>

                  <p className="text-center font-body text-sm leading-relaxed text-white/20 md:text-base">
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
                  <div className="mb-6 flex items-center gap-4 md:mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="font-heading text-xs tracking-[0.3em] text-white/15 uppercase">
                      ✦
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  {letterContent.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i < visibleLines ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`leading-relaxed ${
                        line === ""
                          ? "h-3 md:h-4"
                          : line.startsWith("With") ||
                              line.startsWith("Forever")
                            ? "mt-6 text-white/30 md:mt-8"
                            : "text-white/60"
                      } ${
                        line.startsWith("To the")
                          ? "text-base text-white/85 md:text-lg"
                          : "text-sm md:text-base"
                      }`}
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {line}
                      {i < visibleLines &&
                        i < letterContent.length - 1 &&
                        i >= visibleLines - 1 &&
                        !isComplete && (
                          <span className="ml-[1px] inline-block h-4 w-[2px] bg-white/40 animate-pulse" />
                        )}
                    </motion.p>
                  ))}

                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 flex items-center gap-4 md:mt-8"
                    >
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <span className="font-heading text-xs tracking-[0.3em] text-white/15 uppercase">
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
