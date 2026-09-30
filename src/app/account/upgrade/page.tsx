'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getSubscriptionSummary, startCheckout, SubscriptionSummary } from '@/lib/account-api';

const MONTHLY = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? '';
const ANNUAL = process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL ?? '';

/** What the code enforces, from CLAUDE.md's plan table. Nothing aspirational. */
const ROWS: Array<[string, string, string]> = [
  ['Focus areas', '2', 'All 6'],
  ['Daily guidance', 'Written once each morning', 'Rewritten as your day changes'],
  ['Messages to Sky a day', '5', 'Unlimited'],
  ['Check-ins a day', '2', '8'],
  ['Connected devices', '1', 'Unlimited'],
  ['Weekly plan', 'No', 'Yes'],
  ['Analytics', 'Yes', 'Yes'],
];

export default function UpgradePage() {
  const { user } = useAuth();
  const [sub, setSub] = useState<SubscriptionSummary | null>(null);
  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getSubscriptionSummary(user.uid).then(setSub).catch(() => setSub(null));
  }, [user]);

  const go = async () => {
    const priceId = plan === 'annual' ? ANNUAL : MONTHLY;
    if (!priceId) return setError('Web checkout is not switched on yet. Upgrade in the app for now.');
    setBusy(true);
    setError('');
    try {
      window.location.href = await startCheckout(priceId);
    } catch {
      setError('Could not start checkout. Try again in a moment.');
      setBusy(false);
    }
  };

  const already = sub?.tier === 'pro' || sub?.partnerAccess;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Elevatia Pro</h1>
        <p className="mt-3 text-night-text-secondary">A plan that changes as your day does, every area, and Sky without a cap.</p>
      </div>

      {already ? (
        <div className="card-night p-6 text-center text-white">
          {sub?.partnerAccess ? 'Pro is included with your programme.' : 'You are on Pro.'}
        </div>
      ) : (
        <div className="card-night p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {(['annual', 'monthly'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlan(p)}
                className={`rounded-xl border p-4 text-left transition-colors ${plan === p ? 'border-bronze bg-bronze/10' : 'border-white/10 hover:border-white/25'}`}
              >
                <div className="font-semibold text-white">{p === 'annual' ? 'Annual' : 'Monthly'}</div>
                <div className="mt-1 text-sm text-night-text-secondary">{p === 'annual' ? 'Best value, billed once a year' : 'Flexible, billed monthly'}</div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-night-text-secondary">Seven days free, then the plan you pick. Cancel any time from your account. Prices are shown at checkout.</p>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button type="button" onClick={go} disabled={busy} className="mt-6 w-full rounded-full bg-bronze px-6 py-3 font-semibold text-night hover:bg-bronze-bright disabled:opacity-50">
            {busy ? 'Opening checkout' : 'Start free trial'}
          </button>
        </div>
      )}

      <div className="card-night overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-night-text-secondary">
              <th className="p-4 font-medium"></th>
              <th className="p-4 font-medium">Free</th>
              <th className="p-4 font-medium text-bronze">Pro</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, free, pro]) => (
              <tr key={label} className="border-b border-white/5 last:border-0">
                <td className="p-4 text-white">{label}</td>
                <td className="p-4 text-night-text-secondary">{free}</td>
                <td className="p-4 text-white">{pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
