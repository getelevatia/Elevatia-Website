/**
 * The account area's calls, all of them existing Cloud Functions or
 * owner-readable documents. Nothing here goes through a Next API route: a
 * callable carries the signed-in user's token itself.
 */
import { httpsCallable } from 'firebase/functions';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, functions } from './firebase';

const call = <Req, Res>(name: string) => httpsCallable<Req, Res>(functions, name);

// ── Elevatia in Messages ──

export interface MessagingLink {
  last4?: string;
  state?: 'active' | 'opted_out' | 'unlinked';
  onboarding?: unknown;
}

export function subscribeMessagingLink(uid: string, onChange: (link: MessagingLink | null) => void): () => void {
  return onSnapshot(
    doc(db, 'messagingLinks', uid),
    (snap) => onChange(snap.exists() ? (snap.data() as MessagingLink) : null),
    () => onChange(null)
  );
}

export async function createMessagingPairing(): Promise<{ code: string; number: string; body: string }> {
  const r = await call<Record<string, never>, { code: string; number: string; body: string }>('createMessagingPairing')({});
  return r.data;
}

export async function unlinkMessaging(): Promise<void> {
  await call<Record<string, never>, { ok: boolean }>('unlinkMessaging')({});
}

// ── Pro ──

export interface SubscriptionSummary {
  tier: 'free' | 'pro';
  status?: string;
  store?: 'app_store' | 'play_store' | 'stripe' | null;
  endDate?: string | null;
  trialEndDate?: string | null;
  /** Pro through a partner programme, from users/{uid}. */
  partnerAccess: boolean;
}

export async function getSubscriptionSummary(uid: string): Promise<SubscriptionSummary> {
  const [sub, user] = await Promise.all([getDoc(doc(db, 'userSubscriptions', uid)), getDoc(doc(db, 'users', uid))]);
  const s = (sub.exists() ? sub.data() : {}) as Record<string, unknown>;
  const u = (user.exists() ? user.data() : {}) as Record<string, unknown>;
  const partnerExpires = typeof u.partnerAccessExpires === 'string' ? Date.parse(u.partnerAccessExpires) : NaN;
  const partnerAccess = !!u.partnerId && Number.isFinite(partnerExpires) && partnerExpires > Date.now();
  return {
    tier: s.tier === 'pro' ? 'pro' : 'free',
    status: typeof s.status === 'string' ? s.status : undefined,
    store: (s.store as SubscriptionSummary['store']) ?? null,
    endDate: typeof s.endDate === 'string' ? s.endDate : null,
    trialEndDate: typeof s.trialEndDate === 'string' ? s.trialEndDate : null,
    partnerAccess,
  };
}

export async function startCheckout(priceId: string): Promise<string> {
  const origin = window.location.origin;
  const r = await call<{ priceId: string; successUrl: string; cancelUrl: string }, { url: string }>('createStripeCheckoutSession')({
    priceId,
    successUrl: `${origin}/account?upgraded=1`,
    cancelUrl: `${origin}/account/upgrade`,
  });
  return r.data.url;
}

export async function openBillingPortal(): Promise<string> {
  const r = await call<{ returnUrl: string }, { url: string }>('createStripeCustomerPortal')({
    returnUrl: `${window.location.origin}/account`,
  });
  return r.data.url;
}

// ── Devices ──

export interface ConnectionStatus {
  provider: string;
  connected: boolean;
  needsReauth: boolean;
  lastFailureReason?: string;
  lastLandedDay?: string;
  method: 'oauth' | 'credentials' | 'app';
}

export async function getConnectionStatus(): Promise<ConnectionStatus[]> {
  const r = await call<Record<string, never>, { connections: ConnectionStatus[] }>('getConnectionStatus')({});
  return r.data.connections;
}

export async function disconnectProvider(provider: string): Promise<void> {
  await call<{ provider: string }, { ok: boolean }>('disconnectProvider')({ provider });
}

export async function exchangeOAuthToken(args: { provider: string; authorizationCode: string; userId: string; redirectUri: string }) {
  const r = await call<typeof args, { success: boolean; error?: string }>('exchangeOAuthToken')(args);
  return r.data;
}

export async function connectEightSleep(email: string, password: string): Promise<{ success?: boolean; error?: string }> {
  const r = await call<{ action: 'connect'; email: string; password: string }, { success?: boolean; error?: string }>('connectEightSleep')({ action: 'connect', email, password });
  return r.data ?? {};
}

export async function disconnectEightSleep(): Promise<void> {
  await call<{ action: 'disconnect' }, unknown>('connectEightSleep')({ action: 'disconnect' });
}
