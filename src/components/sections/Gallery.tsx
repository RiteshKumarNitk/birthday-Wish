"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  { id: 1, src: "/images/placeholder-1.svg", alt: "Golden hour glow", size: "small" },
  { id: 2, src: "/images/placeholder-2.svg", alt: "Midnight stars", size: "medium" },
  { id: 3, src: "/images/placeholder-3.svg", alt: "Amber dreams", size: "large" },
  { id: 4, src: "/images/placeholder-4.svg", alt: "Rose petals", size: "small" },
  { id: 5, src: "/images/placeholder-5.svg", alt: "Velvet sky", size: "medium" },
  { id: 6, src: "/images/placeholder-1.svg", alt: "Golden hour glow", size: "small" },
  { id: 7, src: "/images/placeholder-2.svg", alt: "Moonlit dance", size: "large" },
  { id: 8, src: "/images/placeholder-3.svg", alt: "Silk & shadow", size: "medium" },
  { id: 9, src: "/images/placeholder-4.svg", alt: "Crimson tide", size: "small" },
  { id: 10, src: "/images/placeholder-5.svg", alt: "Soft whisper", size: "small" },
  { id: 11, src: "/images/placeholder-1.svg", alt: "Warm embrace", size: "medium" },
  { id: 12, src: "/images/placeholder-2.svg", alt: "Starlight", size: "small" },
];

const sizeMap = {
  small: "h-48 md:h-56",
  medium: "h-56 md:h-72",
  large: "h-64 md:h-96",
};

function GalleryImage({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
              className={`group relative cursor-pointer overflow-hidden rounded-xl ${sizeMap[image.size as keyof typeof sizeMap]}`}
      onClick={onClick}
      data-cursor-hover
    >
      <div
        className="h-full w-full bg-gradient-to-br from-[#7c3aed]/20 to-[#ff2d78]/20 transition-all duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(124,58,237,0.1), rgba(255,45,120,0.1))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
        <p className="font-heading text-xs tracking-wider text-white/70 uppercase">
          {image.alt}
        </p>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const selected = selectedImage !== null
    ? galleryImages.find((img) => img.id === selectedImage)
    : null;

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
                Gallery
          </span>
          <h2 className="font-heading mt-4 leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="text-white/80">Picture</span>
            <br />
            <span className="gradient-text">Perfect</span>
          </h2>
        </motion.div>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>div]:break-inside-avoid [&>div]:mb-4">
          {galleryImages.map((image, i) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={i}
              onClick={() => setSelectedImage(image.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-[60vh] w-[80vw] rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#ff2d78]/20" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-heading text-lg text-white/80">
                  {selected.alt}
                </p>
              </div>
              <button
                className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
