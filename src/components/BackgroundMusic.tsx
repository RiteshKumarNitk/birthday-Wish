"use client";

export function BackgroundMusic() {
  return (
    <div className="fixed bottom-0 left-0 z-[1] h-0 w-0 overflow-hidden opacity-0">
      <iframe
        src="https://www.youtube.com/embed/wqXo7be-meI?autoplay=1&start=30&loop=1&playlist=wqXo7be-meI&controls=0&showinfo=0&enablejsapi=1"
        allow="autoplay; encrypted-media"
        className="h-0 w-0"
        title="background music"
        tabIndex={-1}
      />
    </div>
  );
}
