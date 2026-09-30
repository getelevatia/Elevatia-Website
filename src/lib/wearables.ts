/**
 * The OAuth doors the website can open. Client ids are public (they are in
 * the app bundle already); secrets stay in Cloud Functions, which does the
 * code exchange. The redirect must match one the function allows.
 */
export type OAuthProviderId = 'whoop' | 'oura' | 'garmin';

export const WEB_REDIRECT = (provider: OAuthProviderId) =>
  `${typeof window !== 'undefined' ? window.location.origin : 'https://getelevatia.com'}/account/devices/${provider}/callback`;

interface AuthorizeConfig {
  name: string;
  authEndpoint: string;
  clientId: string;
  scopes: string;
}

const CONFIG: Record<OAuthProviderId, AuthorizeConfig> = {
  whoop: {
    name: 'WHOOP',
    authEndpoint: 'https://api.prod.whoop.com/oauth/oauth2/auth',
    clientId: process.env.NEXT_PUBLIC_WHOOP_CLIENT_ID ?? 'b46f52b2-4989-406d-97b8-6cbff187064b',
    scopes: 'offline read:recovery read:cycles read:workout read:sleep read:profile read:body_measurement',
  },
  oura: {
    name: 'Oura',
    authEndpoint: 'https://cloud.ouraring.com/oauth/authorize',
    clientId: process.env.NEXT_PUBLIC_OURA_CLIENT_ID ?? 'Q7PHNYINO7UYWHQL',
    scopes: 'personal daily heartrate workout session tag spo2',
  },
  garmin: {
    name: 'Garmin',
    authEndpoint: 'https://connect.garmin.com/oauth2Confirm',
    clientId: process.env.NEXT_PUBLIC_GARMIN_CLIENT_ID ?? '',
    scopes: '',
  },
};

export const providerName = (p: string) => (CONFIG as Record<string, AuthorizeConfig>)[p]?.name ?? p;

/** Build the authorize URL, with a state that ties the callback to this user. */
export function authorizeUrl(provider: OAuthProviderId, uid: string): string | null {
  const c = CONFIG[provider];
  if (!c.clientId) return null;
  const state = `${uid}.${Math.random().toString(36).slice(2, 10)}`;
  try {
    sessionStorage.setItem(`oauth-state-${provider}`, state);
  } catch {
    // Private mode: the callback will still exchange; it just cannot verify state.
  }
  const params = new URLSearchParams({
    client_id: c.clientId,
    redirect_uri: WEB_REDIRECT(provider),
    response_type: 'code',
    state,
  });
  if (c.scopes) params.set('scope', c.scopes);
  return `${c.authEndpoint}?${params.toString()}`;
}

export function readExpectedState(provider: OAuthProviderId): string | null {
  try {
    return sessionStorage.getItem(`oauth-state-${provider}`);
  } catch {
    return null;
  }
}
