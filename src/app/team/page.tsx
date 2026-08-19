'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

function LinkedInLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
      LinkedIn
    </a>
  );
}

const FOUNDERS = [
  {
    name: 'Zackhary Francois',
    role: 'Co-founder & CEO',
    photo: '/team-zackhary-francois.png',
    bio: 'Zackhary studied Neuroscience and Computer Science at Georgia Tech, where he published genomics research through NASA’s PCE3 Consortium. A data strategist with experience at Wayflyer, Bank of America, and Capital One, and a former multi-sport athlete, he started Elevatia to solve the hardest problem in self improvement: consistency.',
    linkedin: 'https://www.linkedin.com/in/zackhary-francois-78050116a/',
  },
  {
    name: 'Heldana Afework',
    role: 'Co-founder & CTO',
    photo: '/team-heldana-afework.png',
    bio: 'Heldana studied Computer Science at Georgia Tech and is a Senior Technical Program Manager in AI and product development. As CTO, she leads engineering and turns the science behind the Sky Model into a product that feels effortless.',
    linkedin: 'https://www.linkedin.com/in/heldana-afework/',
  },
  {
    name: 'Lama Rita El Shammas',
    role: 'Co-founder & CPO',
    photo: '/team-lama-el-shammas.png',
    bio: 'Lama studied Biomedical Engineering at Georgia Tech and works as a clinical specialist in cardiac electrophysiology and biotechnology. As CPO, she shapes the product and keeps its guidance clinically grounded.',
    linkedin: 'https://www.linkedin.com/in/lama-rita-el-shammas-947b96200/',
  },
];

const ADVISORS = [
  {
    name: 'Gina Fratarcangeli',
    role: 'Advisory Board',
    initials: 'GF',
    bio: 'Managing Director of AI at Google and board member at the Colorado Technology Association. Previously held leadership roles at Accenture and IBM. Gina brings decades of experience scaling technology for Fortune 500 companies.',
    linkedin: 'https://www.linkedin.com/in/gina-fratarcangeli/',
  },
];

export default function TeamPage() {
  const foundersAnimation = useStaggeredAnimation(FOUNDERS.length, { threshold: 0.15 });
  const advisorsAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen relative bg-[#FDFAF6] overflow-hidden pt-16">

      {/* Hero */}
      <section className="section-padding-large relative">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title mb-8 gradient-text-enhanced">
              The Team
            </h1>
            <p className="section-subtitle text-gray-600 max-w-3xl mx-auto">
              A small team with a simple conviction: wellness guidance should be
              personal, grounded in science, and built for real life.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding relative bg-gradient-to-br from-gray-50/50 to-white/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title mb-12 gradient-text-enhanced text-center">
              Founders
            </h2>
            <div
              ref={foundersAnimation.ref}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {FOUNDERS.map((founder, index) => (
                <div
                  key={founder.name}
                  className={`card-enhanced text-center flex flex-col ${foundersAnimation.visibleItems[index] ? 'fade-in-up visible' : 'fade-in-up'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200">
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 gradient-text-enhanced">
                    {founder.name}
                  </h3>
                  <p className="text-orange-600 font-semibold mb-4">{founder.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {founder.bio}
                  </p>
                  <div>
                    <LinkedInLink href={founder.linkedin} name={founder.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="section-padding relative">
        <div className="container">
          <div
            ref={advisorsAnimation.ref}
            className={`max-w-3xl mx-auto ${advisorsAnimation.isVisible ? 'scroll-reveal visible' : 'scroll-reveal'}`}
          >
            <h2 className="section-title mb-4 gradient-text-enhanced text-center">
              Advisory Board
            </h2>
            <p className="section-subtitle text-gray-600 text-center mb-12">
              Experienced operators who keep us sharp.
            </p>
            {ADVISORS.map((advisor) => (
              <div key={advisor.name} className="card-enhanced text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-orange-700 text-2xl font-bold">
                  {advisor.initials}
                </div>
                <h3 className="text-2xl font-bold mb-2 gradient-text-enhanced">
                  {advisor.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-4">{advisor.role}</p>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
                  {advisor.bio}
                </p>
                <LinkedInLink href={advisor.linkedin} name={advisor.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative bg-gradient-to-br from-orange-50/30 to-yellow-50/30">
        <div className="container">
          <div
            ref={ctaAnimation.ref}
            className={`max-w-3xl mx-auto text-center ${ctaAnimation.isVisible ? 'scroll-reveal visible' : 'scroll-reveal'}`}
          >
            <h2 className="section-title mb-6 gradient-text-enhanced">
              Want to build with us?
            </h2>
            <p className="section-subtitle text-gray-600 mb-10">
              We partner with people who care about doing wellness right.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors interactive-lift"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
