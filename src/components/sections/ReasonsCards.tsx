"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Reason {
  title: string;
  icon: string;
  message: string;
  gradient: string;
}

const reasons: Reason[] = [
  {
    title: "Your Smile",
    icon: "✦",
    message: "It lights up every room you walk into. Like the sun breaking through clouds.",
    gradient: "from-[#ff2d78] to-[#f43f5e]",
  },
  {
    title: "Your Kindness",
    icon: "♥",
    message: "You care deeply about everyone around you. The world is better because of you.",
    gradient: "from-[#7c3aed] to-[#8b5cf6]",
  },
  {
    title: "Your Strength",
    icon: "◆",
    message: "Through every challenge, you stand tall. You inspire everyone who knows you.",
    gradient: "from-[#f59e0b] to-[#f97316]",
  },
  {
    title: "Your Laughter",
    icon: "♫",
    message: "It's contagious and beautiful. The sound of pure joy that makes life wonderful.",
    gradient: "from-[#ec4899] to-[#ff2d78]",
  },
  {
    title: "Your Heart",
    icon: "☆",
    message: "So full of love and generosity. You give without expecting anything in return.",
    gradient: "from-[#8b5cf6] to-[#7c3aed]",
  },
  {
    title: "Your Magic",
    icon: "◈",
    message: "There's something special about you that words can't capture. Pure magic.",
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
        className="preserve-3d relative h-[320px] w-full cursor-pointer"
        data-cursor-hover
      >
        <motion.div
          className="absolute inset-0 rounded-2xl glass p-8 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span className="inline-block text-3xl">{reason.icon}</span>
              <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight text-white">
                {reason.title}
              </h3>
            </div>
            <div>
              <span className="font-body text-sm tracking-wider text-white/30 uppercase">
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
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="mb-24"
        >
          <span className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
            Why You're Special
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="text-white/80">Reasons I</span>
            <br />
            <span className="gradient-text">Adore You</span>
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
