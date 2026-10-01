'use client';

import AppStoreBadge from './AppStoreBadge';

/** Try the app's own scheme once; the store badge is the fallback. */
export default function OpenInApp({ path }: { path: string }) {
  const scheme = `elevatia://app/${path}`;
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <a
        href={scheme}
        className="inline-flex items-center rounded-full bg-bronze px-6 py-3 font-semibold text-night transition-colors hover:bg-bronze-bright"
      >
        Open in Elevatia
      </a>
      <p className="text-sm text-night-text-muted">Not installed yet?</p>
      <AppStoreBadge />
    </div>
  );
}
