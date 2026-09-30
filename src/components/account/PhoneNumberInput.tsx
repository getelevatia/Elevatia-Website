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
      ? 'border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-bronze focus:ring-bronze'
      : 'border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-orange-500';

  return (
    <div className="flex gap-2">
      <select
        aria-label="Country code"
        value={`${country.country}`}
        onChange={(e) => {
          const next = COUNTRIES.find((c) => c.country === e.target.value);
          if (next) setCountry(next);
        }}
        className={`w-[7.5rem] shrink-0 rounded-xl border px-2 py-3 text-sm outline-none transition-all focus:ring-2 ${field}`}
      >
        {COUNTRIES.map((c) => (
          <option key={c.country} value={c.country} className="text-gray-900">
            {c.flag} {c.code} {c.name}
          </option>
        ))}
      </select>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={national}
        onChange={(e) => setNational(e.target.value.replace(/[^\d\s()-]/g, ''))}
        required
        className={`w-full rounded-xl border px-4 py-3 outline-none transition-all focus:ring-2 ${field}`}
        placeholder={country.code === '+1' ? '(555) 123-4567' : 'Phone number'}
      />
    </div>
  );
}
