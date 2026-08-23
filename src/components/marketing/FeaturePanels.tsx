'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Eyebrow from './Eyebrow';

export interface FeaturePanel {
  screen: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
}

function PanelRow({ panel, flip }: { panel: FeaturePanel; flip: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <div className={flip ? 'lg:order-2' : ''}>
        <Eyebrow>{panel.eyebrow}</Eyebrow>
        <h3 className="mt-4 text-3xl font-bold sm:text-4xl">{panel.title}</h3>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-night-text-secondary">
          {panel.body}
        </p>
      </div>
      <div className={`flex justify-center ${flip ? 'lg:order-1' : ''}`}>
        <motion.div
          style={reduced ? undefined : { y }}
          className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] ring-1 ring-white/10 bg-night-card shadow-[0_40px_90px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={panel.screen}
            alt={panel.alt}
            width={1320}
            height={2868}
            quality={90}
            sizes="(max-width: 640px) 92vw, 420px"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function FeaturePanels({ panels }: { panels: FeaturePanel[] }) {
  return (
    <section className="section-padding relative">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-28 lg:space-y-40">
          {panels.map((panel, i) => (
            <PanelRow key={panel.eyebrow} panel={panel} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
