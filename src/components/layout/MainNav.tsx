'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
        {/* About and Contact live in the footer; the top row is the logo and the two doors. */}
        {/* Login and sign up, top right, in a modal over the page. */}
        <div className="flex items-center gap-3">
          {/* Glass: a blurred, barely-there white with a lit top edge, the same
              box as Sign up so the pair reads as one control. */}
          <button
            type="button"
            onClick={() => setAuth('signin')}
            className="inline-flex h-14 w-32 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-lg font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:bg-white/15"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuth('signup')}
            className="inline-flex h-14 w-32 items-center justify-center rounded-2xl bg-white text-lg font-medium text-night shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/90"
          >
            Sign up
          </button>
        </div>
      </div>
      <AuthModal open={auth !== null} mode={auth ?? 'signin'} onClose={() => setAuth(null)} />
    </nav>
  );
}
