"use client";
import { useEffect, useRef } from "react";
import { AudioEngine } from "@/lib/audioEngine";

export function FirstInteractionMusic() {
  const startedRef = useRef(false);
  const engineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    const engine = new AudioEngine();
    engineRef.current = engine;
    engine.init().catch(() => {});

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      engine.setVolume(0.1);
      engine.start();
      document.removeEventListener("click", start);
      document.removeEventListener("touchstart", start);
    };

    document.addEventListener("click", start, { once: true });
    document.addEventListener("touchstart", start, { once: true });

    return () => {
      engine.destroy();
      document.removeEventListener("click", start);
      document.removeEventListener("touchstart", start);
    };
  }, []);

  return null;
}
