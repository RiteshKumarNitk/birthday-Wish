"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

interface SplitTextProps extends HTMLMotionProps<"div"> {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
  className?: string;
}

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function SplitText({
  text,
  as: Tag = "h1",
  mode = "chars",
  stagger = 0.04,
  delay = 0,
  className = "",
  ...props
}: SplitTextProps) {
  const items =
    mode === "chars"
      ? text.split("")
      : mode === "words"
        ? text.split(" ")
        : [text];

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={`overflow-hidden ${className}`}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {mode === "chars" ? (
        <span className="inline-flex flex-wrap">
          {items.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              className="inline-block"
              style={char === " " ? { width: "0.3em" } : undefined}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ) : (
        items.map((word, i) => (
          <span key={i} className="inline-block">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
            {i < items.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))
      )}
    </MotionTag>
  );
}
