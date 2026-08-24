'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Eyebrow from './Eyebrow';

/**
 * The app's today screen in a framed phone, upright, with a gentle
 * fade-and-rise entrance as the section scrolls into view.
 */
export default function PhoneShowcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} className="section-padding-large relative">
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
          <div className="flex justify-center">
            <motion.div style={reduced ? undefined : { y, opacity }} className="relative">
              <Image
                src="/media/phone-today-4.png"
                alt="Elevatia today screen with the Daily Sow"
                width={1800}
                height={3620}
                quality={90}
                sizes="(max-width: 640px) 600px, 800px"
                className="h-auto w-[300px] drop-shadow-[0_45px_80px_rgba(0,0,0,0.6)] sm:w-[400px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
