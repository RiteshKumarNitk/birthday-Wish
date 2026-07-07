"use client";
import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    YT?: {
      Player: new (id: string, config: YTConfig) => YT.Player;
      loaded?: boolean;
    };
    onYouTubeIframeAPIReady?: () => void;
    __ytPlayer?: YT.Player;
  }
}

interface YTConfig {
  videoId: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (e: { target: YT.Player }) => void;
    onStateChange?: (e: { data: number }) => void;
  };
}

namespace YT {
  export interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(v: number): void;
    getVolume(): number;
    getPlayerState(): number;
    destroy(): void;
  }
}

export function BackgroundMusic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const unmutedRef = useRef(false);

  const unmute = useCallback(() => {
    if (unmutedRef.current) return;
    const p = window.__ytPlayer;
    if (p) {
      p.unMute();
      p.setVolume(30);
      unmutedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (window.YT?.loaded) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const first = document.getElementsByTagName("script")[0];
      first?.parentNode?.insertBefore(tag, first);

      window.onYouTubeIframeAPIReady = () => {
        window.YT!.loaded = true;
        createPlayer();
      };
    }

    function createPlayer() {
      if (!containerRef.current || window.__ytPlayer) return;
      window.__ytPlayer = new window.YT!.Player(containerRef.current.id, {
        videoId: "wqXo7be-meI",
        playerVars: {
          autoplay: 1,
          mute: 0,
          start: 30,
          loop: 1,
          playlist: "wqXo7be-meI",
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(30);
            e.target.playVideo();
            setTimeout(() => {
              if (!unmutedRef.current) {
                try { e.target.unMute(); } catch {}
                unmutedRef.current = true;
              }
            }, 300);
          },
        },
      });
    }

    return () => {
      window.__ytPlayer?.destroy();
      window.__ytPlayer = undefined;
    };
  }, []);

  return (
    <div
      id="youtube-player"
      ref={containerRef}
      className="fixed bottom-0 left-0 z-[1] h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
    />
  );
}
