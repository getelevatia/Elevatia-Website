'use client';

import { Suspense, useEffect } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import SignInForm from './SignInForm';

/**
 * Sign in without leaving the page: a white card over a darkened site, the
 * way the reference does it. Escape and the backdrop both close it. The
 * provider mounts here, so the marketing pages carry no auth until asked.
 */
export default function AuthModal({
  open,
  mode,
  onClose,
}: {
  open: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 text-gray-900 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <h2 id="auth-modal-title" className="text-4xl font-bold tracking-tight">
          {mode === 'signup' ? 'Sign up' : 'Sign in'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {mode === 'signup'
            ? 'Your phone number is your account. A code confirms it is yours.'
            : 'Use the number, Apple ID, Google account or email you signed up with.'}
        </p>
        <div className="mt-6">
          <AuthProvider scope="consumer">
            <Suspense fallback={null}>
              <SignInForm tone="light" />
            </Suspense>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}
