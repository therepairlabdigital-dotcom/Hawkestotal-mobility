"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed looping background video for the home hero.
 * Shows the poster photo first, never autoplays for people who prefer reduced motion,
 * and has a pause button so moving content can always be stopped.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    // Phones get the still photo (saves mobile data); nobody who prefers reduced motion gets autoplay.
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 639px)").matches) return;
    video.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true), () => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center] lg:object-center"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute top-[128px] right-5 z-10 hidden size-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20 sm:flex lg:right-8"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
