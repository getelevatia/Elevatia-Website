import TextElevatiaButton from '@/components/marketing/TextElevatiaButton';
import AppStoreBadge from '@/components/marketing/AppStoreBadge';
import HeroVideo from '@/components/marketing/HeroVideo';
import PhoneShowcase3D from '@/components/marketing/PhoneShowcase3D';
import FeaturePanels, { type FeaturePanel } from '@/components/marketing/FeaturePanels';
import TestimonialMarquee from '@/components/marketing/TestimonialMarquee';
import StatsBand from '@/components/marketing/StatsBand';
import FinalCta from '@/components/marketing/FinalCta';
import Footer from '@/components/layout/Footer';

const PANELS: FeaturePanel[] = [
  {
    screen: '/screens/areas-4.png',
    alt: 'Elevatia Paths screen: nutrition, fitness, women\u2019s wellness, mental, maternal and sleep',
    eyebrow: 'Your Areas',
    title: 'Start where you are',
    body: 'Pick the parts of your life you want to grow: nutrition, fitness, sleep, mental, women\u2019s wellness, maternal. Change them any time. Every path meets you at your level.',
  },
  {
    screen: '/screens/sow-4.png',
    alt: 'Elevatia daily guidance across fitness, nutrition, sleep and women\u2019s wellness',
    eyebrow: 'Guidance',
    title: 'Deeply personal, by design',
    body: 'Guidance built from neuroscience, hormonal health, your biometrics, your geography, and your background. Dozens of signals become millions of possible daily states, filtered down to your one right move. Because one size fits one.',
  },
  {
    screen: '/screens/sky-4.png',
    alt: 'Sky conversation noting an allergy and an evening training window',
    eyebrow: 'Sky',
    title: 'Talk to it like a coach',
    body: 'Tell Sky your allergies, your hours, your goals in your own words. It remembers, and every plan from then on steers around what it knows about you.',
  },
  {
    screen: '/screens/connect-4.png',
    alt: 'Elevatia Devices screen linking Apple Health, Oura, Whoop, Garmin, RingConn and 8 Sleep',
    eyebrow: 'Your Signals',
    title: 'Beyond your tracker',
    body: 'Your watch and ring only tell you what happened. The Sky Model turns those signals into the one thing they never give you: what to do next, today, for you.',
  },
  {
    screen: '/screens/crucible-4.png',
    alt: 'Elevatia Crucible groups and competitions',
    eyebrow: 'Crucible',
    title: 'Better together',
    body: 'Compete with friends, share progress, and build accountability partnerships that keep you motivated. Your wellness journey becomes something you look forward to.',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-night text-night-text">

      {/* Hero: sky video fading into the dark page */}
      <section className="relative flex min-h-[100svh] items-center justify-center">
        <HeroVideo />
        <div className="container relative pb-24 pt-36 text-center">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-6xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Your Fully Personalized
              <span className="block">Life Coach</span>
            </h1>
            {/* Two doors, side by side: the app, or a text. */}
            <div className="mt-12 flex flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <AppStoreBadge />
                <TextElevatiaButton number={process.env.NEXT_PUBLIC_ELEVATIA_TEXT_NUMBER ?? ''} variant="light" />
              </div>
              <p className="text-sm text-white/75">
                5 stars on the App Store &middot; 1,700+ members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The today screen, in 3D */}
      <PhoneShowcase3D />

      {/* Prominent frameless screens */}
      <FeaturePanels panels={PANELS} />

      {/* Proof */}
      <StatsBand />

      {/* Member quotes (renders once real quotes are added) */}
      <TestimonialMarquee />

      {/* Closing CTA on the sky motif */}
      <FinalCta />

      <Footer />
    </div>
  );
}
