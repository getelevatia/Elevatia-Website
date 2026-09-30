'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getSubscriptionSummary, openBillingPortal, subscribeMessagingLink, MessagingLink, SubscriptionSummary } from '@/lib/account-api';

function AccountOverview() {
  const { user } = useAuth();
  const params = useSearchParams();
  const upgraded = params.get('upgraded') === '1';
  const [sub, setSub] = useState<SubscriptionSummary | null>(null);
  const [link, setLink] = useState<MessagingLink | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    getSubscriptionSummary(user.uid).then(setSub).catch(() => setSub(null));
    return subscribeMessagingLink(user.uid, setLink);
  }, [user]);

  const pro = sub?.tier === 'pro' || sub?.partnerAccess;
  const manage = async () => {
    setBusy(true);
    try {
      window.location.href = await openBillingPortal();
    } catch {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {upgraded && (
        <div className="md:col-span-2 rounded-xl border border-bronze/40 bg-bronze/10 px-4 py-3 text-sm text-white">
          Welcome to Pro. It can take a minute to show here and in the app.
        </div>
      )}

      <section className="card-night p-6">
        <h2 className="text-lg font-semibold text-white">Plan</h2>
        <p className="mt-2 text-night-text-secondary">
          {sub === null ? 'Checking' : sub.partnerAccess ? 'Pro, included with your programme' : pro ? 'Pro' : 'Free'}
          {sub?.status && sub.tier === 'pro' && !sub.partnerAccess ? ` (${sub.status})` : ''}
        </p>
        {sub?.endDate && sub.tier === 'pro' && (
          <p className="mt-1 text-sm text-night-text-muted">Renews or ends {new Date(sub.endDate).toLocaleDateString()}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {!pro && (
            <Link href="/account/upgrade" className="rounded-full bg-bronze px-5 py-2.5 text-sm font-semibold text-night hover:bg-bronze-bright">
              Go Pro
            </Link>
          )}
          {sub?.tier === 'pro' && sub.store === 'stripe' && (
            <button type="button" onClick={manage} disabled={busy} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-50">
              {busy ? 'Opening' : 'Manage billing'}
            </button>
          )}
          {sub?.tier === 'pro' && sub.store === 'app_store' && (
            <p className="text-sm text-night-text-muted">Managed through your Apple subscriptions.</p>
          )}
          {sub?.tier === 'pro' && sub.store === 'play_store' && (
            <p className="text-sm text-night-text-muted">Managed through Google Play.</p>
          )}
        </div>
      </section>

      <section className="card-night p-6">
        <h2 className="text-lg font-semibold text-white">Elevatia in Messages</h2>
        <p className="mt-2 text-night-text-secondary">
          {link?.state === 'active'
            ? `Linked to the number ending ${link.last4 ?? '····'}.`
            : link?.state === 'opted_out'
              ? 'Paused. Text START to Elevatia to resume.'
              : 'Not linked yet.'}
        </p>
        <Link href="/account/imessage" className="mt-4 inline-block text-sm font-medium text-bronze hover:underline">
          {link?.state === 'active' ? 'Manage' : 'Text Elevatia'}
        </Link>
      </section>

      <section className="card-night p-6 md:col-span-2">
        <h2 className="text-lg font-semibold text-white">Devices</h2>
        <p className="mt-2 text-night-text-secondary">Connect WHOOP, Oura, Garmin or Eight Sleep from here. Apple Health and Google Fit connect in the app.</p>
        <Link href="/account/devices" className="mt-4 inline-block text-sm font-medium text-bronze hover:underline">Manage devices</Link>
      </section>
    </div>
  );
}

/** useSearchParams needs a Suspense boundary for the static shell. */
export default function AccountOverviewPage() {
  return (
    <Suspense fallback={null}>
      <AccountOverview />
    </Suspense>
  );
}
