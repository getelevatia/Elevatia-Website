'use client';

import { useEffect, useState } from 'react';

/**
 * The iMessage button.
 *
 * On an iPhone the href opens Messages with the first text typed. Anywhere
 * else a tap cannot open Messages, so the number is shown to type by hand;
 * the `#web` tag in the body is how the server knows the text came from
 * here rather than from the app.
 */
export default function TextElevatiaButton({ number }: { number: string }) {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const apple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    setIsIOS(apple);
  }, []);

  if (!number) {
    return <p className="text-sm text-white/70">Texting opens soon.</p>;
  }

  const body = encodeURIComponent('Hi Elevatia #web');
  const href = `sms:${number}&body=${body}`;
  const pretty = number.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, '+1 ($1) $2-$3');

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={href}
        className="inline-flex items-center gap-3 rounded-full bg-bronze px-7 py-4 text-base font-semibold text-night shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-bronze-bright"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3C6.48 3 2 6.94 2 11.8c0 2.62 1.3 4.97 3.38 6.58-.14 1.2-.58 2.5-1.38 3.62 2.05-.25 3.72-1.06 4.86-1.87 1 .28 2.06.43 3.14.43 5.52 0 10-3.94 10-8.76S17.52 3 12 3z"
            fill="currentColor"
          />
        </svg>
        Text Elevatia
      </a>
      {isIOS === false && (
        <p className="text-sm text-white/75">
          On your iPhone, text <span className="font-semibold text-white">{pretty}</span> and say hi.
        </p>
      )}
    </div>
  );
}
