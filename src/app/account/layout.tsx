'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/lib/auth-context';

/**
 * The member area. One provider for every page under /account, in consumer
 * scope, and a gate that sends a signed-out visitor to the login page with
 * the page they wanted as `next`.
 */
function Gate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // The login page and the one-tap link page both run signed out.
  const isLogin = pathname === '/account/login' || pathname === '/account/link';

  useEffect(() => {
    if (!loading && !user && !isLogin) {
      router.replace(`/account/login?next=${encodeURIComponent(pathname || '/account')}`);
    }
    if (!loading && user && isLogin) {
      const next = new URLSearchParams(window.location.search).get('next') || '/account';
      router.replace(next);
    }
  }, [loading, user, isLogin, pathname, router]);

  if (loading || (!user && !isLogin)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-night-text-secondary">Loading your account</div>
    );
  }
  return <>{children}</>;
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider scope="consumer">
      <div className="min-h-screen bg-night text-night-text">
        <div className="container pb-16 pt-28">
          <AccountNav />
          <Gate>{children}</Gate>
        </div>
      </div>
    </AuthProvider>
  );
}

function AccountNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  if (!user || pathname === '/account/login' || pathname === '/account/link') return null;
  const items = [
    { href: '/account', label: 'Overview' },
    { href: '/account/imessage', label: 'Text Elevatia' },
    { href: '/account/upgrade', label: 'Pro' },
    { href: '/account/devices', label: 'Devices' },
  ];
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            pathname === i.href ? 'bg-white/10 text-white' : 'text-night-text-secondary hover:text-white'
          }`}
        >
          {i.label}
        </Link>
      ))}
      <button type="button" onClick={() => signOut()} className="ml-auto text-sm text-night-text-secondary hover:text-white">
        Sign out
      </button>
    </div>
  );
}
