"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltImageProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  tiltMax?: number;
  onClick?: () => void;
}

export function TiltImage({
  children,
  className = "",
  perspective = 1000,
  tiltMax = 8,
  onClick,
}: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltMax, -tiltMax]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltMax, tiltMax]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={className}
      style={{ perspective, rotateX, rotateY }}
      data-cursor-hover
    >
      {children}
    </motion.div>
  );
}
