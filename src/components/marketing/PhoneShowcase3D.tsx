'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import Eyebrow from './Eyebrow';

/**
 * The app's today screen in a framed phone that reclines into an
 * Oura-style laid-back angle as you scroll. A tall section with a sticky
 * viewport drives the tilt from scroll progress; reduced motion renders
 * the phone at its resting angle.
 */
export default function PhoneShowcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // From near-flat to a reclined resting pose, rotated off to the left.
  const rotateX = useTransform(progress, [0.05, 0.5], [70, 36]);
  const rotateZ = useTransform(progress, [0.05, 0.5], [-36, -22]);
  const y = useTransform(progress, [0.05, 0.5], [80, 0]);
  const opacity = useTransform(progress, [0.03, 0.18], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[170vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <Eyebrow>The Daily Sow</Eyebrow>
              <h2 className="mt-4 text-4xl font-bold leading-[1.15] sm:text-5xl">
                We guide you through every moment of your day
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-night-text-secondary lg:mx-0">
                Each morning the Sky Model understands you and where your body
                is at, then hands you one right move for the day.
              </p>
            </div>
            <div
              className="flex justify-center lg:justify-start"
              style={{ perspective: 1400 }}
            >
              <motion.div
                style={
                  reduced
                    ? { transform: 'rotateX(36deg) rotateZ(-22deg)' }
                    : { rotateX, rotateZ, y, opacity, transformStyle: 'preserve-3d' }
                }
                className="relative"
              >
                <Image
                  src="/media/phone-today-2.png"
                  alt="Elevatia today screen with the Daily Sow"
                  width={900}
                  height={1810}
                  sizes="(max-width: 640px) 260px, 360px"
                  className="h-auto w-[260px] drop-shadow-[0_60px_90px_rgba(0,0,0,0.65)] sm:w-[360px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
