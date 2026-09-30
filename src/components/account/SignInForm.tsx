'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import PhoneNumberInput from './PhoneNumberInput';

type Method = 'phone' | 'apple' | 'google' | 'email';

/**
 * The member sign-in. Phone first: the people who arrive from a text with
 * Sky have a phone number and nothing else. Apple, Google and email cover
 * everyone who signed up in the app.
 */
export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';
  const { signIn, signInWithApple, signInWithGoogle, sendPhoneCode, verifyPhoneCode } = useAuth();

  const [method, setMethod] = useState<Method>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [e164, setE164] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (method === 'phone' && recaptchaContainer.current && !recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, recaptchaContainer.current, { size: 'invisible' });
    }
    return () => {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    };
  }, [method]);

  const done = () => router.replace(next);
  const fail = (msg: string) => {
    setError(msg);
    setLoading(false);
  };

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaRef.current) return fail('Verification is still loading. Try again in a second.');
    if (e164.replace(/\D/g, '').length < 8) return fail('That number looks short.');
    setLoading(true);
    setError('');
    const r = await sendPhoneCode(e164, recaptchaRef.current);
    if (r.success && r.confirmationResult) {
      setConfirmation(r.confirmationResult);
      setCodeSent(true);
      setLoading(false);
    } else {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
      fail(r.error || 'Could not send the code.');
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmation) return fail('Ask for a new code.');
    setLoading(true);
    setError('');
    const r = await verifyPhoneCode(confirmation, code);
    if (r.success) done();
    else fail(r.error || 'That code did not match.');
  };

  const oauth = async (fn: () => Promise<{ success: boolean; error?: string }>) => {
    setLoading(true);
    setError('');
    const r = await fn();
    if (r.success) done();
    else fail(r.error || 'Sign-in did not complete.');
  };

  const emailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const r = await signIn(email, password);
    if (r.success) done();
    else fail(r.error || 'Could not sign in.');
  };

  const tab = (id: Method, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => {
        setMethod(id);
        setError('');
        setCodeSent(false);
        setCode('');
        setConfirmation(null);
      }}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        method === id ? 'bg-white/10 text-white' : 'text-night-text-secondary hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  const field = 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition-all focus:border-bronze focus:ring-2 focus:ring-bronze';
  const primary = 'w-full rounded-full bg-bronze px-4 py-3 font-semibold text-night transition-colors hover:bg-bronze-bright disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="space-y-6">
      <div className="flex rounded-xl bg-white/5 p-1">
        {tab('phone', 'Phone')}
        {tab('apple', 'Apple')}
        {tab('google', 'Google')}
        {tab('email', 'Email')}
      </div>

      {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

      {method === 'phone' && !codeSent && (
        <form onSubmit={sendCode} className="space-y-4">
          <p className="text-center text-sm text-night-text-secondary">The number you use with Elevatia, or the one you text Sky from.</p>
          <PhoneNumberInput onChange={setE164} />
          <button type="submit" disabled={loading} className={primary}>{loading ? 'Sending' : 'Send code'}</button>
        </form>
      )}

      {method === 'phone' && codeSent && (
        <form onSubmit={verify} className="space-y-4">
          <p className="text-center text-sm text-night-text-secondary">Enter the 6-digit code sent to {e164}</p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            required
            className={`${field} text-center font-mono text-2xl tracking-widest`}
            placeholder="000000"
          />
          <button type="submit" disabled={loading || code.length !== 6} className={primary}>{loading ? 'Checking' : 'Sign in'}</button>
          <button type="button" onClick={() => { setCodeSent(false); setCode(''); setConfirmation(null); }} className="w-full py-2 text-sm text-night-text-secondary hover:text-white">
            Use a different number
          </button>
        </form>
      )}

      {method === 'apple' && (
        <button type="button" disabled={loading} onClick={() => oauth(signInWithApple)} className="w-full rounded-full bg-white px-4 py-3 font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50">
          {loading ? 'Opening Apple' : 'Continue with Apple'}
        </button>
      )}

      {method === 'google' && (
        <button type="button" disabled={loading} onClick={() => oauth(signInWithGoogle)} className="w-full rounded-full bg-white px-4 py-3 font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50">
          {loading ? 'Opening Google' : 'Continue with Google'}
        </button>
      )}

      {method === 'email' && (
        <form onSubmit={emailSubmit} className="space-y-4">
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={field} placeholder="you@example.com" />
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className={field} placeholder="Password" />
          <button type="submit" disabled={loading} className={primary}>{loading ? 'Signing in' : 'Sign in'}</button>
        </form>
      )}

      <div ref={recaptchaContainer} />
    </div>
  );
}
