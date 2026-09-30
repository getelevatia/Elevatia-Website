import type { Metadata } from 'next';
import TextElevatiaButton from '@/components/marketing/TextElevatiaButton';
import AppStoreBadge from '@/components/marketing/AppStoreBadge';
import Eyebrow from '@/components/marketing/Eyebrow';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Text Elevatia',
  description: 'Elevatia, your coach, in your Messages. Text the number and start today.',
};

/**
 * The website's sign-up: one button that opens Messages with the first text
 * ready. No form. The account is created from the phone number when the
 * text arrives, and Elevatia asks the four things it needs over the next few
 * bubbles. Someone on a laptop or an Android phone sees the number instead.
 */
export default function TextPage() {
  const number = process.env.NEXT_PUBLIC_ELEVATIA_TEXT_NUMBER ?? '';
  return (
    <div className="relative min-h-screen bg-night text-night-text">
      <section className="section-padding-large">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow pill>Elevatia in your Messages</Eyebrow>
            <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Text your coach.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              No app to install and nothing to fill in. Send one text, and Elevatia
              writes back with what to do today, then checks in when it counts.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <TextElevatiaButton number={number} />
            </div>

            <div className="card-night mx-auto mt-14 max-w-xl p-6 text-left sm:p-8">
              <h2 className="text-lg font-semibold text-white">What happens next</h2>
              <ol className="mt-4 space-y-3 text-night-text-secondary">
                <li><span className="font-semibold text-bronze">1.</span> Messages opens with your first text ready. Send it.</li>
                <li><span className="font-semibold text-bronze">2.</span> Elevatia introduces itself and asks your name, what you want to work on, your age and where you are.</li>
                <li><span className="font-semibold text-bronze">3.</span> Your first day arrives in the thread. Text her whenever: food, training, sleep, stress.</li>
              </ol>
              <p className="mt-6 text-sm text-night-text-secondary">
                Free includes five messages to Elevatia a day and one plan each morning.
                Pro is unlimited, with a plan that changes as your day does.
              </p>
              <p className="mt-3 text-sm text-night-text-secondary">
                Reply STOP at any time and Elevatia goes quiet. Standard message rates apply.
                Your texts are carried by a messaging provider on our behalf; see our{' '}
                <a href="/privacy" className="text-bronze underline-offset-2 hover:underline">privacy policy</a>.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-sm text-white/70">Prefer the full app?</p>
              <AppStoreBadge />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
