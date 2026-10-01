'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import AuthModal from '@/components/account/AuthModal';

export default function MainNav() {
  const pathname = usePathname();
  const [auth, setAuth] = useState<null | 'signin' | 'signup'>(null);

  // Hide nav on partner and admin routes (they have their own layouts)
  if (pathname?.startsWith('/partners') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-night/70 px-2 py-1.5 shadow-lg backdrop-blur-md sm:flex">
          {[
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1 text-sm font-medium text-night-text-secondary transition-colors hover:text-night-text"
            >
              {l.label}
            </Link>
          ))}
        </div>
        {/* Login and sign up, top right, in a modal over the page. */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAuth('signin')}
            className="rounded-2xl border border-white/10 bg-night/60 px-7 py-3.5 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-night/80 sm:px-8"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuth('signup')}
            className="rounded-2xl bg-white px-7 py-3.5 text-lg font-medium text-night transition-colors hover:bg-white/90 sm:px-8"
          >
            Sign up
          </button>
        </div>
      </div>
      <AuthModal open={auth !== null} mode={auth ?? 'signin'} onClose={() => setAuth(null)} />
    </nav>
  );
}
