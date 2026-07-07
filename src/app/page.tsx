"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { PhotoReveal } from "@/components/sections/PhotoReveal";
import { MemoryTimeline } from "@/components/sections/MemoryTimeline";
const ReasonsCards = lazy(() =>
  import("@/components/sections/ReasonsCards").then((m) => ({ default: m.ReasonsCards }))
);
const LoveLetter = lazy(() =>
  import("@/components/sections/LoveLetter").then((m) => ({ default: m.LoveLetter }))
);
const Gallery = lazy(() =>
  import("@/components/sections/Gallery").then((m) => ({ default: m.Gallery }))
);
const MusicSection = lazy(() =>
  import("@/components/sections/MusicSection").then((m) => ({ default: m.MusicSection }))
);
const Surprise = lazy(() =>
  import("@/components/sections/Surprise").then((m) => ({ default: m.Surprise }))
);
const FinalWishes = lazy(() =>
  import("@/components/sections/FinalWishes").then((m) => ({ default: m.FinalWishes }))
);

function SectionFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-white/5" />
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("preloader-shown");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("preloader-shown", "true");
  };

  return (
    <>
      {loading && <Preloader onComplete={() => { setLoading(false); handleComplete(); }} />}
      <Hero />
      <PhotoReveal />
      <MemoryTimeline />
      <Suspense fallback={<SectionFallback />}>
        <ReasonsCards />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LoveLetter />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MusicSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Surprise />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalWishes />
      </Suspense>
    </>
  );
}
