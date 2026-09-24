'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Full-bleed looping cloud footage behind the hero. Renders the poster
 * first and only mounts the video on the client when the visitor has not
 * asked for reduced motion. Autoplay on iOS needs `muted` set on the DOM
 * node itself (React does not render the attribute) and an explicit
 * play() call; if playback is still refused (Low Power Mode), the video
 * unmounts so Safari's play glyph never shows over the poster.
 */
export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) setShowVideo(true);
  }, []);

  const attachVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    const tryPlay = () => {
      const p = el.play();
      if (p) p.catch(() => setShowVideo(false));
    };
    if (el.readyState >= 2) tryPlay();
    else el.addEventListener('canplay', tryPlay, { once: true });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/media/hero-clouds-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <video
          ref={attachVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="/media/hero-clouds-poster.jpg"
          className="hero-video absolute inset-0 h-full w-full object-cover"
        >
          <source src="/media/hero-clouds.mp4" type="video/mp4" />
          <source src="/media/hero-clouds.webm" type="video/webm" />
        </video>
      )}
      {/* Scrim for text legibility over the sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
      {/* Fade the sky into the dark page */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}
