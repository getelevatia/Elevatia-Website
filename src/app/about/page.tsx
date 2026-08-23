'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const storyAnimation = useScrollAnimation({ threshold: 0.1 });
  const founderAnimation = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen relative bg-night text-night-text overflow-x-clip pt-16">

      {/* Hero */}
      <section className="section-padding-large relative">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title mb-8 text-night-text">
              About Elevatia
            </h1>
            <p className="section-subtitle text-night-text-secondary max-w-3xl mx-auto">
              We&apos;re building the future of wellness, powered by highly tailored insights,
              guided by science, demographic knowledge, and designed for real life.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding relative bg-night-elevated">
        <div className="container">
          <div
            ref={storyAnimation.ref}
            className={`max-w-3xl mx-auto ${storyAnimation.isVisible ? 'scroll-reveal visible' : 'scroll-reveal'}`}
          >
            <h2 className="section-title mb-8 text-night-text text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-night-text-secondary body-large leading-relaxed">
              <p>
                Elevatia started with a simple observation: the wellness industry is full of
                information, but short on guidance. There are countless apps that track your steps,
                log your meals, or monitor your sleep, but very few that actually help you figure
                out what to do next.
              </p>
              <p>
                For me, the mission is personal. I watched people close to me battle chronic
                illness, and ultimately lose battles that never had to begin. So much of that
                suffering grew from gaps in preventative health: signals nobody read in time,
                small corrections nobody made, guidance that never reached the people who
                needed it most.
              </p>
              <p>
                That&apos;s why I built Elevatia. Not another tracking app, but a companion that
                turns what your body is telling you into clear, daily action. Prevention should
                not be a luxury reserved for people who can afford a personal trainer or a
                nutritionist. It should reach everyone, early, while it can still change the story.
              </p>
              <p>
                Today, Elevatia helps members set meaningful goals, follow proven wellness paths,
                and stay accountable through features like the Daily Sow and Crucible. We&apos;re
                just getting started, but the mission has never changed: make wellness simpler,
                smarter, and more personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Leadership */}
      <section className="section-padding relative">
        <div className="container">
          <div
            ref={founderAnimation.ref}
            className={`max-w-3xl mx-auto text-center ${founderAnimation.isVisible ? 'scroll-reveal visible' : 'scroll-reveal'}`}
          >
            <h2 className="section-title mb-8 text-night-text">
              Leadership
            </h2>
            <div className="card-night p-8 sm:p-10">
              <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden">
                <Image
                  src="/team-zackhary-francois-2.png"
                  alt="Zackhary Francois"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-night-text">
                Zackhary Francois
              </h3>
              <p className="text-bronze font-semibold mb-4">Co-founder &amp; CEO</p>
              <p className="text-night-text-secondary leading-relaxed max-w-xl mx-auto">
                Zackh founded Elevatia with the belief that world-class wellness guidance
                shouldn&apos;t be a luxury. With a background in Neuroscience and a passion for health
                optimization, he set out to build the platform he wished existed - lasting wellness
                habits accessible to everyone.
              </p>
            </div>
            <p className="mt-8">
              <Link
                href="/team"
                className="text-bronze font-semibold hover:text-bronze-bright transition-colors"
              >
                Meet the full team →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
