'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import Eyebrow from './Eyebrow';

/**
 * The app's today screen in a framed phone that straightens up as you
 * scroll. A tall section with a sticky viewport drives the tilt from
 * scroll progress; reduced motion renders the phone upright and still.
 */
export default function PhoneShowcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const rotateX = useTransform(progress, [0.05, 0.45], [32, 0]);
  const rotateY = useTransform(progress, [0.05, 0.45], [-12, 0]);
  const scale = useTransform(progress, [0.05, 0.45], [0.9, 1]);
  const opacity = useTransform(progress, [0.02, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden px-4">
        <div className="max-w-2xl text-center">
          <Eyebrow>The Daily Sow</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Every morning, one right move.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-night-text-secondary">
            Each morning the Sky Model understands you and where your body is
            at, then hands you one right move for the day.
          </p>
        </div>
        <div style={{ perspective: 1200 }}>
          <motion.div
            style={
              reduced
                ? undefined
                : { rotateX, rotateY, scale, opacity, transformStyle: 'preserve-3d' }
            }
            className="relative"
          >
            <Image
              src="/media/phone-today.png"
              alt="Elevatia today screen with the Daily Sow"
              width={900}
              height={1810}
              sizes="(max-width: 640px) 280px, 380px"
              className="w-[280px] sm:w-[380px] h-auto drop-shadow-[0_45px_80px_rgba(179,131,92,0.18)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
