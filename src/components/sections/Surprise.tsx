"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ConfettiExplosion() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 600,
    rotation: Math.random() * 720,
    color: ["#ff2d78", "#7c3aed", "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899"][
      Math.floor(Math.random() * 6)
    ],
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

function FloatingBalloon({ index, color }: { index: number; color: string }) {
  return (
    <motion.div
      className="absolute text-4xl"
      initial={{
        x: Math.random() * 300 - 150,
        y: 200,
        opacity: 0,
        scale: 0,
      }}
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
  "You light up my world! ✨",
  "You are my sunshine! ☀️",
  "Absolutely extraordinary! 🌟",
  "The world is better with you! 🌍",
  "Pure magic! ✨",
  "One in a million! 💫",
];

const balloonColors = ["#ff2d78", "#7c3aed", "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899"];

export function Surprise() {
  const [isOpened, setIsOpened] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    setIsExploding(true);

    setTimeout(() => setIsExploding(false), 2500);
    setTimeout(() => {
      setShowMessages(true);
      setShowBalloons(true);
    }, 500);
    setTimeout(() => setShowFireworks(true), 1000);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-32 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
            One More Thing
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="gradient-text-gold">A Surprise</span>
            <br />
            <span className="text-white/80">Awaits</span>
          </h2>
        </motion.div>

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
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-[#ff2d78]/30 to-[#7c3aed]/30 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0D0D0D]">
                      <span className="text-5xl">🎁</span>
                    </div>
                  </div>
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                    style={{ originY: "bottom" }}
                  >
                    <div className="h-6 w-[2px] bg-gradient-to-t from-[#ff2d78] to-transparent" />
                  </motion.div>
                </motion.div>

                <span className="font-heading text-sm tracking-widest text-white/40 uppercase">
                  Tap to open
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center">
              {isExploding && <ConfettiExplosion />}

              {showFireworks && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pointer-events-none absolute inset-0"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + Math.random() * 30}%`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {showBalloons && (
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <FloatingBalloon
                      key={i}
                      index={i}
                      color={balloonColors[i]}
                    />
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
                      className="mb-8 text-6xl"
                    >
                      🎉
                    </motion.div>
                    <div className="space-y-4">
                      {surpriseMessages.map((msg, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + i * 0.15,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="font-heading text-2xl tracking-tight md:text-3xl"
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
