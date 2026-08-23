'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract Firebase auth parameters from URL
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');
    const apiKey = searchParams.get('apiKey');
    const continueUrl = searchParams.get('continueUrl');
    const lang = searchParams.get('lang');

    // Build the deep link with all available parameters
    const deepLinkParams = new URLSearchParams();
    
    if (mode) deepLinkParams.set('mode', mode);
    if (oobCode) deepLinkParams.set('oobCode', oobCode);
    if (apiKey) deepLinkParams.set('apiKey', apiKey);
    if (continueUrl) deepLinkParams.set('continueUrl', continueUrl);
    if (lang) deepLinkParams.set('lang', lang);

    const deepLink = `elevatia://verify-email?${deepLinkParams.toString()}`;

    // Attempt to redirect to the app
    window.location.href = deepLink;

    // Fallback: redirect to app store if deep link doesn't work
    setTimeout(() => {
      // If user is still on this page after 3 seconds, redirect to app store
      window.location.href = 'https://apps.apple.com/app/elevatia/id6670204991';
    }, 3000);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-night text-night-text flex items-center justify-center p-4">
      <div className="bg-night-card rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Image 
            src="/elevatia-logo.png" 
            alt="Elevatia Logo" 
            width={80}
            height={80}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-2xl font-bold text-night-text mb-2">
            Opening Elevatia...
          </h1>
          <p className="text-night-text-secondary">
            Redirecting you to the Elevatia app to verify your email.
          </p>
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bronze mr-2"></div>
            <span className="text-bronze font-medium">Loading...</span>
          </div>
        </div>

        <div className="text-sm text-night-text-muted space-y-2">
          <p>If the app doesn&apos;t open automatically:</p>
          <a 
            href="https://apps.apple.com/app/elevatia/id6670204991"
            className="inline-block bg-bronze text-night px-6 py-2 rounded-lg font-medium hover:bg-bronze-bright transition-colors"
          >
            Download from App Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-night text-night-text flex items-center justify-center p-4">
        <div className="bg-night-card rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bronze mr-2"></div>
            <span className="text-bronze font-medium">Loading...</span>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

