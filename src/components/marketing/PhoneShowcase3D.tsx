'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Eyebrow from './Eyebrow';

/**
 * The app's today screen in a framed phone, upright, rising and fading in
 * once it is on screen. Keyed to visibility rather than scroll position: a
 * scroll-linked fade left a screen of black on phones, where the section
 * is tall and the image sits at its foot.
 */
export default function PhoneShowcase3D() {
  const reduced = useReducedMotion();

  return (
    <section className="section-padding-large relative">
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
            <motion.div
              className="relative"
              initial={reduced ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Image
                src="/media/phone-today-7.png"
                alt="Elevatia today screen with the Daily Sow"
                width={1480}
                height={3028}
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
