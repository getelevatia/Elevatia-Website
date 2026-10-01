'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * The landing for a one-tap link sent by text. The key in the URL is traded
 * once for a custom token; a used or expired key says so and sends the
 * person back to the thread for another.
 */
const REDEEM = `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'elevatia-5e20c'}.cloudfunctions.net/redeemMagicLink`;

function Redeem() {
  const params = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Signing you in');

  useEffect(() => {
    const k = params.get('k');
    if (!k) {
      setMessage('This link is missing its key. Text Elevatia for a new one.');
      return;
    }
    (async () => {
      try {
        const res = await fetch(REDEEM, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ k }) });
        const r = await res.json();
        if (!r.ok) {
          setMessage(
            r.reason === 'used'
              ? 'This link was already used. Text Elevatia for a new one.'
              : r.reason === 'expired'
                ? 'This link has expired. Text Elevatia for a new one.'
                : 'This link is not valid. Text Elevatia for a new one.'
          );
          return;
        }
        await signInWithCustomToken(auth, r.token);
        router.replace(r.to || '/account');
      } catch {
        setMessage('Could not sign you in. Text Elevatia for a new link.');
      }
    })();
  }, [params, router]);

  return <div className="flex min-h-[60vh] items-center justify-center text-night-text-secondary">{message}</div>;
}

export default function MagicLinkPage() {
  return (
    <div className="min-h-screen bg-night">
      <Suspense fallback={null}>
        <Redeem />
      </Suspense>
    </div>
  );
}
