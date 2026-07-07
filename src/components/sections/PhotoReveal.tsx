"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { TiltImage } from "@/components/ui/TiltImage";

const img = (path: string) => `/images/${encodeURIComponent(path)}`;

const images = [
  { src: img("image1_(1).jpeg"), caption: "A moment frozen in time", span: "md:col-span-2 md:row-span-2" },
  { src: img("image1_(2).jpeg"), caption: "Radiant smile", span: "md:col-span-1 md:row-span-1" },
  { src: img("image1_(3).jpeg"), caption: "Beautiful soul", span: "md:col-span-1 md:row-span-1" },
  { src: img("image1_(4).jpeg"), caption: "Pure joy", span: "md:col-span-1 md:row-span-1" },
  { src: img("image1_(5).jpeg"), caption: "Golden moments", span: "md:col-span-2 md:row-span-1" },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Card({ item, i }: { item: (typeof images)[0]; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`${item.span} col-span-2 row-span-1 md:col-span-1`}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.1, delay: i * 0.12, ease }}
    >
      <TiltImage
        className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl md:rounded-2xl"
        tiltMax={4}
      >
        <motion.div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url("${item.src}")` }}
          initial={{ scale: 1.15 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, delay: i * 0.12 + 0.3, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.12 + 0.6, ease: "easeOut" }}
        >
          <span className="font-heading text-xs tracking-wider text-white/80 uppercase md:text-sm">{item.caption}</span>
        </motion.div>
      </TiltImage>
    </motion.div>
  );
}

export function PhotoReveal() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32" style={{ perspective: "1200px" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as const }}
          className="mb-16 md:mb-24"
        >
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">Photo Journal for Varsha</span>
          <h2 className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4" style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}>
            <SplitText as="span" text="Moments" className="gradient-text inline-block" mode="chars" stagger={0.04} delay={0.1} />
            <br />
            <span className="text-white/70">That Matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 auto-rows-[300px] md:auto-rows-[400px]">
          {images.map((item, i) => (
            <Card key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}