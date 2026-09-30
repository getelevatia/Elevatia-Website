'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { connectEightSleep, disconnectEightSleep, disconnectProvider, getConnectionStatus, ConnectionStatus } from '@/lib/account-api';
import { authorizeUrl, providerName, OAuthProviderId } from '@/lib/wearables';
import AppStoreBadge from '@/components/marketing/AppStoreBadge';

const LABEL: Record<string, string> = {
  whoop: 'WHOOP',
  oura: 'Oura',
  garmin: 'Garmin',
  eightSleep: 'Eight Sleep',
  appleHealth: 'Apple Health',
  googleFit: 'Google Fit',
};

export default function DevicesPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<ConnectionStatus[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [eight, setEight] = useState({ email: '', password: '' });
  const [showEight, setShowEight] = useState(false);

  const load = useCallback(() => {
    getConnectionStatus().then(setRows).catch(() => setRows([]));
  }, []);
  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const connect = (p: OAuthProviderId) => {
    if (!user) return;
    const url = authorizeUrl(p, user.uid);
    if (!url) return setError(`${providerName(p)} is not available on the web yet.`);
    window.location.href = url;
  };

  const disconnect = async (p: string) => {
    if (!confirm(`Disconnect ${LABEL[p] ?? p}?`)) return;
    setBusy(p);
    try {
      if (p === 'eightSleep') await disconnectEightSleep();
      else await disconnectProvider(p);
      load();
    } catch {
      setError('Could not disconnect. Try again.');
    } finally {
      setBusy(null);
    }
  };

  const submitEight = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy('eightSleep');
    setError('');
    try {
      const r = await connectEightSleep(eight.email, eight.password);
      if (r.error) setError(r.error);
      else {
        setShowEight(false);
        setEight({ email: '', password: '' });
        load();
      }
    } catch {
      setError('Eight Sleep did not accept those details.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Devices</h1>
        <p className="mt-2 text-night-text-secondary">What Elevatia reads each morning. Connect a wearable here and it lands in the app too.</p>
      </div>
      {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

      {rows === null ? (
        <p className="text-night-text-secondary">Checking</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.provider} className="card-night flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white">{LABEL[r.provider] ?? r.provider}</div>
                <div className="text-sm text-night-text-secondary">
                  {r.method === 'app'
                    ? 'Connects in the app'
                    : r.needsReauth
                      ? `Needs reconnecting${r.lastFailureReason ? `: ${r.lastFailureReason}` : ''}`
                      : r.connected
                        ? `Connected${r.lastLandedDay ? `, last night landed ${r.lastLandedDay}` : ''}`
                        : 'Not connected'}
                </div>
              </div>
              {r.method === 'oauth' && (!r.connected || r.needsReauth) && (
                <button type="button" onClick={() => connect(r.provider as OAuthProviderId)} className="rounded-full bg-bronze px-4 py-2 text-sm font-semibold text-night hover:bg-bronze-bright">
                  {r.needsReauth ? 'Reconnect' : 'Connect'}
                </button>
              )}
              {r.method === 'credentials' && !r.connected && (
                <button type="button" onClick={() => setShowEight((v) => !v)} className="rounded-full bg-bronze px-4 py-2 text-sm font-semibold text-night hover:bg-bronze-bright">Connect</button>
              )}
              {r.method !== 'app' && r.connected && (
                <button type="button" disabled={busy === r.provider} onClick={() => disconnect(r.provider)} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-50">
                  {busy === r.provider ? 'Working' : 'Disconnect'}
                </button>
              )}
              {r.method === 'app' && <AppStoreBadge />}
            </div>
          ))}
        </div>
      )}

      {showEight && (
        <form onSubmit={submitEight} className="card-night space-y-3 p-5">
          <p className="text-sm text-night-text-secondary">Eight Sleep has no sign-in button, so it needs the email and password for your Eight Sleep account. They are stored encrypted on our server and used only to read your sleep.</p>
          <input type="email" required value={eight.email} onChange={(e) => setEight({ ...eight, email: e.target.value })} placeholder="Eight Sleep email" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-bronze" />
          <input type="password" required value={eight.password} onChange={(e) => setEight({ ...eight, password: e.target.value })} placeholder="Eight Sleep password" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-bronze" />
          <button type="submit" disabled={busy === 'eightSleep'} className="rounded-full bg-bronze px-5 py-2.5 text-sm font-semibold text-night hover:bg-bronze-bright disabled:opacity-50">
            {busy === 'eightSleep' ? 'Connecting' : 'Connect Eight Sleep'}
          </button>
        </form>
      )}
    </div>
  );
}
