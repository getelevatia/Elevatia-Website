'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createMessagingPairing, subscribeMessagingLink, unlinkMessaging, MessagingLink } from '@/lib/account-api';

/**
 * Link this account to a phone number by texting. The pairing code in the
 * first text is what tells the server which account the number belongs to;
 * on a phone the button opens Messages with it typed, elsewhere the code is
 * shown to type by hand.
 */
export default function AccountMessagingPage() {
  const { user } = useAuth();
  const [link, setLink] = useState<MessagingLink | null | undefined>(undefined);
  const [pairing, setPairing] = useState<{ number: string; body: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    return subscribeMessagingLink(user.uid, setLink);
  }, [user]);

  const start = async () => {
    setBusy(true);
    setError('');
    try {
      const p = await createMessagingPairing();
      setPairing({ number: p.number, body: p.body });
      const href = `sms:${p.number}&body=${encodeURIComponent(p.body)}`;
      if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) window.location.href = href;
    } catch {
      setError('Texting is not available right now. Try again later.');
    } finally {
      setBusy(false);
    }
  };

  const unlink = async () => {
    if (!confirm('Stop texting with Sky? Nudges go back to notifications.')) return;
    setBusy(true);
    try {
      await unlinkMessaging();
    } finally {
      setBusy(false);
    }
  };

  const linked = link?.state === 'active';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Text Sky</h1>
        <p className="mt-2 text-night-text-secondary">
          Sky in your Messages. Text her like a friend, and the day&apos;s nudges arrive as texts instead of notifications.
        </p>
      </div>

      {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

      {link === undefined ? (
        <p className="text-night-text-secondary">Checking</p>
      ) : linked ? (
        <div className="card-night space-y-3 p-6">
          <p className="font-semibold text-white">Linked to the number ending {link?.last4 ?? '····'}</p>
          <p className="text-sm text-night-text-secondary">Sky texts you her nudge, the midday adjustment and the evening line. Everything else stays a notification in the app.</p>
          <p className="text-sm text-night-text-secondary">Reply STOP in Messages to pause, START to resume.</p>
          <button type="button" onClick={unlink} disabled={busy} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-50">Unlink</button>
        </div>
      ) : (
        <div className="card-night space-y-4 p-6">
          {link?.state === 'opted_out' && <p className="text-sm text-night-text-secondary">You replied STOP. Text START to Elevatia, or link again here.</p>}
          <ol className="space-y-2 text-night-text-secondary">
            <li><span className="font-semibold text-bronze">1.</span> Tap the button. On a phone, Messages opens with your first text ready.</li>
            <li><span className="font-semibold text-bronze">2.</span> Send it. Sky replies and sends her contact card.</li>
          </ol>
          <button type="button" onClick={start} disabled={busy} className="rounded-full bg-bronze px-6 py-3 font-semibold text-night hover:bg-bronze-bright disabled:opacity-50">
            {busy ? 'One moment' : 'Text Elevatia'}
          </button>
          {pairing && (
            <div className="rounded-xl bg-white/5 p-4 text-sm text-night-text-secondary">
              On your iPhone, text <span className="font-semibold text-white">{pairing.number}</span> with:
              <div className="mt-2 rounded-lg bg-night px-3 py-2 font-mono text-white">{pairing.body}</div>
              <p className="mt-2 text-xs text-night-text-muted">The code works for ten minutes.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
