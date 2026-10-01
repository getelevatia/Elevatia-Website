import type { Metadata } from 'next';
import OpenInApp from '@/components/marketing/OpenInApp';

export const metadata: Metadata = { title: 'Open in Elevatia' };

/**
 * Where a text's app link lands when the app is not installed, or on a
 * laptop. With the app installed, iOS opens it here without showing this
 * page (public/.well-known/apple-app-site-association). The path names the
 * screen the app would open; this page only says so and offers the store.
 */
const WHERE: Record<string, string> = {
  today: "today's plan",
  workout: "today's workout",
  coach: 'your coach',
  devices: 'your devices',
  text: 'texting with Elevatia',
  account: 'your account',
  fitness: 'Fitness',
  nutrition: 'Nutrition',
  sleep: 'Sleep',
  mental: 'Mind',
  cycle: 'Cycle',
  maternal: 'Pregnancy',
};

export default async function AppLinkPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = (path?.[0] ?? 'today').toLowerCase();
  const where = WHERE[key] ?? 'the app';
  return (
    <div className="min-h-screen bg-night text-night-text">
      <section className="section-padding-large">
        <div className="container">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-bold text-white">Open {where} in Elevatia</h1>
            <p className="mt-4 text-night-text-secondary">
              This link opens the app. If it did not, the app is not on this device yet.
            </p>
            <OpenInApp path={path?.join('/') ?? 'today'} />
          </div>
        </div>
      </section>
    </div>
  );
}
