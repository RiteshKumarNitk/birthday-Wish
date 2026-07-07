"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";

interface Reason {
  title: string;
  icon: string;
  message: string;
  gradient: string;
}

const reasons: Reason[] = [
  {
    title: "Varsha's Smile",
    icon: "✦",
    message: "It lights up every room you walk into, Varsha. Like the sun breaking through clouds.",
    gradient: "from-[#ff2d78] to-[#f43f5e]",
  },
  {
    title: "Varsha's Kindness",
    icon: "♥",
    message: "You care deeply about everyone around you, Varsha. The world is better because of you.",
    gradient: "from-[#7c3aed] to-[#8b5cf6]",
  },
  {
    title: "Varsha's Strength",
    icon: "◆",
    message: "Through every challenge, you stand tall, Varsha. You inspire everyone who knows you.",
    gradient: "from-[#f59e0b] to-[#f97316]",
  },
  {
    title: "Varsha's Laughter",
    icon: "♫",
    message: "It's contagious and beautiful, Varsha. The sound of pure joy that makes life wonderful.",
    gradient: "from-[#ec4899] to-[#ff2d78]",
  },
  {
    title: "Varsha's Heart",
    icon: "☆",
    message: "So full of love and generosity, Varsha. You give without expecting anything in return.",
    gradient: "from-[#8b5cf6] to-[#7c3aed]",
  },
  {
    title: "Varsha's Magic",
    icon: "◈",
    message: "There's something special about you, Varsha, that words can't capture. Pure magic.",
    gradient: "from-[#ff2d78] to-[#f59e0b]",
  },
];

function TiltCard({ reason, index }: { reason: Reason; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isFlipped) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ rotateX, rotateY }}
        className="preserve-3d relative h-[340px] w-full cursor-pointer group"
        data-cursor-hover
      >
        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${reason.gradient.includes("ff2d78") ? "#ff2d78" : reason.gradient.includes("7c3aed") ? "#7c3aed" : reason.gradient.includes("f59e0b") ? "#f59e0b" : "#ec4899"}22, transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl glass p-8 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <motion.span
                className="inline-block text-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {reason.icon}
              </motion.span>
              <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-white">
                {reason.title}
              </h3>
            </div>
            <div>
              <span className="font-body text-sm tracking-wider text-white/20 uppercase">
                Click to reveal
              </span>
              <div className="mt-2 h-[2px] w-12" style={{
                background: `linear-gradient(90deg, ${reason.gradient.includes("ff2d78") ? "#ff2d78" : reason.gradient.includes("7c3aed") ? "#7c3aed" : reason.gradient.includes("f59e0b") ? "#f59e0b" : "#ec4899"}, transparent)`,
              }} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl p-8 backface-hidden bg-gradient-to-br ${reason.gradient}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          animate={{ rotateY: isFlipped ? 360 : 180 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-body text-center text-lg leading-relaxed text-white">
            {reason.message}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ReasonsCards() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">
            Why Varsha is Special
          </span>
          <h2
            className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
          >
            <span className="text-white/80">
              <SplitText text="Reasons I" mode="chars" stagger={0.04} delay={0.1} />
            </span>
            <br />
            <SplitText text="Adore Varsha" className="gradient-text inline-block" mode="chars" stagger={0.04} delay={0.4} />
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <TiltCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
