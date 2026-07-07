"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { TiltImage } from "@/components/ui/TiltImage";

const enc = (s: string) => `/images/${encodeURIComponent(s)}`;

const image1 = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: enc(`image1_(${i + 1}).jpeg`),
  alt: `Memory ${i + 1}`,
  size: (["small", "medium", "large", "small", "medium", "small", "large", "medium"] as const)[i],
}));

const image2 = Array.from({ length: 14 }, (_, i) => ({
  id: i + 9,
  src: enc(`image2_(${i + 1}).jpeg`),
  alt: `Memory ${i + 9}`,
  size: (["small", "medium", "small", "large", "medium", "small", "medium", "large", "small", "medium", "small", "medium", "large", "small"] as const)[i],
}));

const galleryImages = [...image1, ...image2];

const sizeMap = {
  small: "h-48 md:h-56",
  medium: "h-56 md:h-72",
  large: "h-64 md:h-96",
};

function GalleryImage({ image, index, onClick }: { image: (typeof galleryImages)[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className={`${sizeMap[image.size]}`}
    >
      <TiltImage onClick={onClick} className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl" tiltMax={6}>
        <div className="h-full w-full transition-all duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${image.src}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-heading text-xs tracking-wider text-white/70 uppercase">{image.alt}</p>
        </div>
      </TiltImage>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const selected = selectedImage !== null ? galleryImages.find((img) => img.id === selectedImage) : null;

  return (
    <section className="relative min-h-screen w-full px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32" style={{ backgroundColor: "var(--theme-bg, #050505)" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }} className="mb-16 md:mb-24">
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">Versha's Gallery</span>
          <h2 className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4" style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}>
            <span className="text-white/80"><SplitText as="span" text="Picture" mode="chars" stagger={0.05} delay={0.1} /></span>
            <br />
            <SplitText as="span" text="Perfect" className="gradient-text inline-block" mode="chars" stagger={0.05} delay={0.4} />
          </h2>
        </motion.div>

        <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>div]:break-inside-avoid [&>div]:mb-3 md:[&>div]:mb-4">
          {galleryImages.map((image, i) => (
            <GalleryImage key={image.id} image={image} index={i} onClick={() => setSelectedImage(image.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/90 backdrop-blur-xl" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <div className="h-[50vh] w-[75vw] rounded-2xl bg-cover bg-center md:h-[60vh] md:w-[80vw]" style={{ backgroundImage: `url("${selected.src}")` }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-heading text-base text-white/80 md:text-lg">{selected.alt}</p>
              </div>
              <button className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white md:-right-4 md:-top-4 md:h-10 md:w-10" onClick={() => setSelectedImage(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
