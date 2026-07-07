"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { ConfettiBurst } from "@/components/animations/ConfettiBurst";

function ConfettiExplosion() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 700,
    y: (Math.random() - 0.5) * 700,
    rotation: Math.random() * 720,
    color: [
      "#ff2d78",
      "#7c3aed",
      "#f59e0b",
      "#f43f5e",
      "#8b5cf6",
      "#ec4899",
    ][Math.floor(Math.random() * 6)],
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-2 w-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            scale: [0, p.scale, p.scale * 0.5],
            rotate: p.rotation,
          }}
          transition={{
            duration: 1.5 + Math.random(),
            ease: "easeOut",
            delay: Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function FloatingBalloon({ index }: { index: number }) {
  return (
    <motion.div
      className="absolute text-3xl md:text-4xl"
      initial={{ x: Math.random() * 300 - 150, y: 200, opacity: 0, scale: 0 }}
      animate={{
        y: -200,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: index * 0.3,
        ease: "easeOut",
      }}
    >
      🎈
    </motion.div>
  );
}

const surpriseMessages = [
  "Varsha lights up my world! ✨",
  "Varsha is my sunshine! ☀️",
  "Absolutely extraordinary Varsha! 🌟",
  "The world is better with Varsha! 🌍",
  "Pure magic Varsha! ✨",
  "One in a million Varsha! 💫",
];

export function Surprise() {
  const [isOpened, setIsOpened] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    setIsExploding(true);

    setTimeout(() => setIsExploding(false), 2500);
    setTimeout(() => {
      setShowMessages(true);
      setShowBalloons(true);
    }, 500);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">
            One More Thing
          </span>
          <h2
            className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
          >
            <SplitText
              text="A Surprise"
              className="gradient-text-gold inline-block"
              mode="chars"
              stagger={0.05}
              delay={0.1}
            />
            <br />
            <SplitText
              text="For Varsha"
              className="text-white/80 inline-block"
              mode="chars"
              stagger={0.05}
              delay={0.4}
            />
          </h2>
        </motion.div>

        <ConfettiBurst trigger={isOpened} type="fireworks" delay={0.3} />

      <div className="relative flex items-center justify-center">
          {!isOpened ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                className="relative flex cursor-pointer flex-col items-center gap-6"
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                <motion.div
                  className="relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-[#ff2d78]/30 to-[#7c3aed]/30 p-[2px] md:h-32 md:w-32">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0D0D0D]">
                      <span className="text-4xl md:text-5xl">🎁</span>
                    </div>
                  </div>
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                    style={{ originY: "bottom" }}
                  >
                    <div className="h-5 w-[2px] bg-gradient-to-t from-[#ff2d78] to-transparent md:h-6" />
                  </motion.div>
                </motion.div>
                <span className="font-heading text-xs tracking-widest text-white/30 uppercase md:text-sm">
                  Tap to open for Varsha
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <div className="relative flex min-h-[350px] w-full flex-col items-center justify-center md:min-h-[400px]">
              {isExploding && <ConfettiExplosion />}

              {showBalloons && (
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <FloatingBalloon key={i} index={i} />
                  ))}
                </div>
              )}

              <AnimatePresence>
                {showMessages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.3,
                      }}
                      className="mb-6 text-5xl md:mb-8 md:text-6xl"
                    >
                      🎉
                    </motion.div>
                    <div className="space-y-3 md:space-y-4">
                      {surpriseMessages.map((msg, i) => (
                        <motion.p
                          key={i}
                          initial={{
                            opacity: 0,
                            y: 20,
                            filter: "blur(10px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + i * 0.15,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="font-heading text-xl tracking-tight md:text-2xl"
                        >
                          <span className="gradient-text">{msg}</span>
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
