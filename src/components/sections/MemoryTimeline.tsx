"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const img = (path: string) => `/images/${encodeURIComponent(path)}`;

const memories = [
  { year: "2020", title: "The Beginning", description: "Where our story started. A moment that changed everything for Varsha and me.", color: "#ff2d78", image: img("image2_(1).jpeg") },
  { year: "2021", title: "Growing Closer", description: "Laughter echoed through every conversation we shared with Varsha.", color: "#7c3aed", image: img("image2_(2).jpeg") },
  { year: "2022", title: "Adventures", description: "Exploring the world together with Varsha, one memory at a time.", color: "#f59e0b", image: img("image2_(3).jpeg") },
  { year: "2023", title: "Unforgettable", description: "The year Varsha and I created memories that will last a lifetime.", color: "#f43f5e", image: img("image2_(4).jpeg") },
  { year: "2024", title: "Milestones", description: "Celebrating victories big and small, side by side with Varsha.", color: "#8b5cf6", image: img("image2_(5).jpeg") },
  { year: "2025", title: "Forever", description: "Building dreams and painting our future together, Varsha.", color: "#ec4899", image: img("image2_(6).jpeg") },
];

export function MemoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, pin: true, start: "top top",
          end: () => `+=${track.scrollWidth * 0.7}`,
          scrub: 1.5, invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 80), ease: "none" });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[250vh] w-full bg-[#050505] overflow-hidden">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent md:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent md:w-40" />
        <div className="pointer-events-none absolute left-0 top-0 z-20 px-6 pt-16 md:px-12 md:pt-20">
          <span className="font-heading text-[10px] tracking-[0.3em] text-white/15 uppercase md:text-xs">Timeline</span>
          <h2 className="font-heading mt-2 leading-[0.95] tracking-tight text-white/70" style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)" }}>Varsha &amp; Me</h2>
        </div>
        <div ref={trackRef} className="flex items-center gap-8 pl-6 md:gap-16 md:pl-16">
          {memories.map((memory) => (
            <div key={memory.year} className="group relative flex w-[300px] flex-shrink-0 flex-col md:w-[400px]">
              <div className="relative mb-5 h-[300px] w-full overflow-hidden rounded-xl md:mb-6 md:h-[360px] md:rounded-2xl bg-white/[0.02]">
                <div className="h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${memory.image}")` }} />
                <div className="absolute bottom-0 left-0 h-[2px]" style={{ width: "35%", background: `linear-gradient(90deg, ${memory.color}, transparent)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="space-y-2 px-1 md:space-y-3 md:px-2">
                <span className="font-heading text-xs tracking-[0.2em] uppercase md:text-sm" style={{ color: memory.color }}>{memory.year}</span>
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-white md:text-3xl">{memory.title}</h3>
                <p className="font-body text-sm leading-relaxed text-white/40 md:text-base">{memory.description}</p>
              </div>
            </div>
          ))}
          <div className="flex w-[180px] flex-shrink-0 flex-col items-center justify-center gap-4 pr-8 md:w-[250px] md:pr-16">
            <div className="h-12 w-px bg-gradient-to-b from-white/20 to-transparent md:h-16" />
            <span className="font-heading text-[10px] tracking-[0.3em] text-white/15 uppercase md:text-xs">The best is yet to come Varsha</span>
            <span className="font-heading text-2xl text-white/20 md:text-3xl">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
