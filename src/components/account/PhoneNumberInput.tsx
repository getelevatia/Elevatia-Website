'use client';

import { useEffect, useState } from 'react';
import { COUNTRIES, Country, defaultCountry, toE164 } from '@/lib/countries';

/**
 * A dial-code dropdown in front of the number, the way the app's phone
 * screen does it. Emits E.164 so the caller never formats a number itself.
 */
export default function PhoneNumberInput({
  onChange,
  tone = 'night',
  id = 'phone',
}: {
  onChange: (e164: string) => void;
  tone?: 'night' | 'light';
  id?: string;
}) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [national, setNational] = useState('');

  useEffect(() => {
    setCountry(defaultCountry());
  }, []);

  useEffect(() => {
    onChange(national ? toE164(country.code, national) : '');
    // onChange is a stable setter in every caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, national]);

  const field =
    tone === 'night'
      ? 'text-white placeholder:text-white/40'
      : 'text-gray-900 placeholder:text-gray-400';

  const shell =
    tone === 'night'
      ? 'border-white/15 bg-white/5 focus-within:border-bronze focus-within:ring-bronze'
      : 'border-gray-200 bg-white focus-within:border-transparent focus-within:ring-orange-500';

  return (
    <div className={`flex items-stretch rounded-xl border transition-all focus-within:ring-2 ${shell}`}>
      {/* The closed control shows only the flag; the native list underneath
          carries every name and dial code. A transparent select over a
          flag keeps the keyboard and screen-reader behaviour of a select. */}
      <div className={`relative flex shrink-0 items-center gap-1 border-r px-3 ${tone === 'night' ? 'border-white/15' : 'border-gray-200'}`}>
        <span aria-hidden="true" className="text-xl leading-none">{country.flag}</span>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" className={tone === 'night' ? 'text-white/60' : 'text-gray-500'}>
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <select
          aria-label="Country code"
          value={country.country}
          onChange={(e) => {
            const next = COUNTRIES.find((c) => c.country === e.target.value);
            if (next) setCountry(next);
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {COUNTRIES.map((c) => (
            <option key={c.country} value={c.country}>
              {c.flag} {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={national}
        onChange={(e) => setNational(e.target.value.replace(/[^\d\s()-]/g, ''))}
        required
        className={`w-full rounded-r-xl bg-transparent px-4 py-3 outline-none ${field}`}
        placeholder={country.code === '+1' ? '(123) 456-7890' : 'Phone number'}
      />
    </div>
  );
}
