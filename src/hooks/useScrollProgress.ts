"use client";
import { useState, useEffect, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(Math.max(currentProgress, 0), 1));
  }, []);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setDirection(currentScroll > lastScroll ? "down" : "up");
      lastScroll = currentScroll;
      handleScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return { progress, direction };
}
