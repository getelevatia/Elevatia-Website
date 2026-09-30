import { Suspense } from 'react';
import SignInForm from '@/components/account/SignInForm';

export const metadata = { title: 'Sign in' };

export default function AccountLoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="card-night p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white">Your Elevatia account</h1>
        <p className="mt-2 text-sm text-night-text-secondary">
          Manage Pro, your devices, and texting with Elevatia.
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
