'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function MainNav() {
  const pathname = usePathname();

  // Hide nav on partner and admin routes (they have their own layouts)
  if (pathname?.startsWith('/partners') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-night/70 py-1.5 pl-4 pr-1.5 shadow-lg backdrop-blur-md sm:gap-4">
        <Logo />
        <div className="mx-1 h-5 w-px bg-white/10" aria-hidden="true" />
        <Link
          href="/team"
          className="px-2 text-sm font-medium text-night-text-secondary transition-colors hover:text-night-text"
        >
          Team
        </Link>
        <Link
          href="/about"
          className="px-2 text-sm font-medium text-night-text-secondary transition-colors hover:text-night-text"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-full bg-bronze px-4 py-2 text-sm font-semibold text-night transition-colors hover:bg-bronze-bright"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
