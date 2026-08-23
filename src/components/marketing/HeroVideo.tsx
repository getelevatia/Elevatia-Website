'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Full-bleed looping cloud footage behind the hero. Renders the poster
 * first and only mounts the video on the client when the visitor has not
 * asked for reduced motion, so autoplay policies and hydration stay happy.
 */
export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) setShowVideo(true);
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
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-clouds-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
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
