'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { exchangeOAuthToken } from '@/lib/account-api';
import { readExpectedState, WEB_REDIRECT, OAuthProviderId } from '@/lib/wearables';

/**
 * Where WHOOP, Oura or Garmin send the person back. The code is exchanged
 * by the same Cloud Function the app uses, with this page's URL as the
 * redirect it must name. Nothing secret happens in the browser.
 */
function Callback() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const { provider } = useParams<{ provider: string }>();
  const [message, setMessage] = useState('Finishing the connection');

  useEffect(() => {
    if (!user) return;
    const p = provider as OAuthProviderId;
    const code = params.get('code');
    const state = params.get('state');
    const denied = params.get('error');
    if (denied) {
      setMessage('The connection was cancelled.');
      setTimeout(() => router.replace('/account/devices'), 1500);
      return;
    }
    if (!code) {
      setMessage('No authorization code came back.');
      return;
    }
    const expected = readExpectedState(p);
    if (expected && state && expected !== state) {
      setMessage('This link did not come from your session. Start again from Devices.');
      return;
    }
    exchangeOAuthToken({ provider: p, authorizationCode: code, userId: user.uid, redirectUri: WEB_REDIRECT(p) })
      .then((r) => {
        setMessage(r.success ? 'Connected.' : `Could not connect: ${r.error ?? 'unknown error'}`);
        if (r.success) setTimeout(() => router.replace('/account/devices'), 1000);
      })
      .catch(() => setMessage('Could not connect. Try again from Devices.'));
  }, [user, provider, params, router]);

  return <div className="flex min-h-[40vh] items-center justify-center text-night-text-secondary">{message}</div>;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={null}>
      <Callback />
    </Suspense>
  );
}
