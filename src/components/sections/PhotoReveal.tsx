"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/animations/SplitText";
import { TiltImage } from "@/components/ui/TiltImage";

gsap.registerPlugin(ScrollTrigger);

const img = (path: string) => `/images/${encodeURIComponent(path)}`;

const images = [
  { src: img("image1_(1).jpeg"), caption: "A moment frozen in time", className: "md:col-span-2 md:row-span-2", rotate: -2 },
  { src: img("image1_(2).jpeg"), caption: "Radiant smile", className: "md:col-span-1 md:row-span-1", rotate: 3 },
  { src: img("image1_(3).jpeg"), caption: "Beautiful soul", className: "md:col-span-1 md:row-span-2", rotate: -1 },
  { src: img("image1_(4).jpeg"), caption: "Pure joy", className: "md:col-span-2 md:row-span-1", rotate: 2 },
  { src: img("image1_(5).jpeg"), caption: "Golden moments", className: "md:col-span-1 md:row-span-1", rotate: -3 },
];

export function PhotoReveal() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".photo-card");
    if (!cards?.length) return;
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 80, rotate: i % 2 === 0 ? -8 : 8, scale: 0.9 },
          {
            autoAlpha: 1, y: 0, rotate: 0, scale: 1,
            duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none", once: true },
            delay: i * 0.1,
          }
        );
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-24 md:px-8 lg:px-16 xl:px-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/20 uppercase md:text-xs">Photo Journal for Versha</span>
          <h2 className="font-heading mt-3 leading-[0.95] tracking-tight md:mt-4" style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}>
            <SplitText as="span" text="Moments" className="gradient-text inline-block" mode="chars" stagger={0.04} delay={0.1} />
            <br />
            <span className="text-white/70">That Matter</span>
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:gap-6 auto-rows-[180px] md:auto-rows-[260px] lg:auto-rows-[300px]">
          {images.map((img, i) => (
            <div key={i} className={`photo-card ${img.className} col-span-2 row-span-1 md:col-span-1`}>
              <TiltImage className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl md:rounded-2xl" tiltMax={5}>
                <div className="h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${img.src}")` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
                  <span className="font-heading text-xs tracking-wider text-white/80 uppercase md:text-sm">{img.caption}</span>
                </div>
              </TiltImage>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
