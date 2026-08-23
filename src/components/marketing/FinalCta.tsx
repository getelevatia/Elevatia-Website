import Image from 'next/image';
import AppStoreBadge from './AppStoreBadge';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <Image
        src="/media/hero-clouds-poster.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ready to transform your wellness journey?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
            Your healthiest, happiest self is one download away.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <AppStoreBadge large />
            <p className="text-sm text-white/70">
              Free to start &middot; Available on iOS &middot; Your data stays private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
