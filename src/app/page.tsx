import Eyebrow from '@/components/marketing/Eyebrow';
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
          <div className="mx-auto max-w-4xl">
            <Eyebrow pill>One right move a day</Eyebrow>
            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              We tell you what to do next
              <span className="block">to better your life.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/90 sm:text-xl">
              Elevatia reads where your body is at and hands you one right move
              for the day. The Sky Model makes life improvement stick.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <AppStoreBadge />
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
