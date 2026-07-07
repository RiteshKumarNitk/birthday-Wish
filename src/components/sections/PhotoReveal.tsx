"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  {
    src: "/images/placeholder-1.svg",
    alt: "A moment frozen in time",
    size: "col-span-2 row-span-2",
    caption: "A moment frozen in time",
    offset: 0,
  },
  {
    src: "/images/placeholder-2.svg",
    alt: "Radiant smile",
    size: "col-span-1 row-span-1",
    caption: "Radiant smile",
    offset: 0.15,
  },
  {
    src: "/images/placeholder-3.svg",
    alt: "Beautiful soul",
    size: "col-span-1 row-span-2",
    caption: "Beautiful soul",
    offset: 0.3,
  },
  {
    src: "/images/placeholder-4.svg",
    alt: "Pure joy",
    size: "col-span-2 row-span-1",
    caption: "Pure joy",
    offset: 0.2,
  },
  {
    src: "/images/placeholder-5.svg",
    alt: "Golden moments",
    size: "col-span-1 row-span-1",
    caption: "Golden moments",
    offset: 0.35,
  },
];

function PhotoCard({
  src,
  alt,
  size,
  caption,
  index,
  offset,
}: {
  src: string;
  alt: string;
  size: string;
  caption: string;
  index: number;
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? 8 : -8, 0, index % 2 === 0 ? -5 : 5]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, rotate }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl ${size} bg-white/5`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
      <div
        className="h-full w-full bg-gradient-to-br from-[#7c3aed]/20 to-[#ff2d78]/20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(124,58,237,0.1), rgba(255,45,120,0.1)), url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
        <p className="font-heading text-sm tracking-wider text-white/80 uppercase">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

export function PhotoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050505] px-4 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="mb-24"
        >
          <span className="font-heading text-sm tracking-[0.3em] text-white/30 uppercase">
            Photo Journal
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="gradient-text">Moments</span>
            <br />
            <span className="text-white/80">That Matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {images.map((img, i) => (
            <PhotoCard key={i} {...img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
