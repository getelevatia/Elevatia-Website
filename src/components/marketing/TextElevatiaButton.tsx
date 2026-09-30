'use client';

import { useEffect, useState } from 'react';
import MessagesIcon from './MessagesIcon';

/**
 * The iMessage button.
 *
 * On an iPhone the href opens Messages with the first text typed. Anywhere
 * else a tap cannot open Messages, so the number is shown to type by hand;
 * the `#web` tag in the body is how the server knows the text came from
 * here rather than from the app.
 */
export default function TextElevatiaButton({
  number,
  variant = 'bronze',
}: {
  number: string;
  /** `light` is the hero's white pill beside the App Store badge. */
  variant?: 'bronze' | 'light';
}) {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const apple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    setIsIOS(apple);
  }, []);

  if (!number) {
    return variant === 'light' ? null : <p className="text-sm text-white/70">Texting opens soon.</p>;
  }

  const body = encodeURIComponent('Hi Elevatia #web');
  const href = `sms:${number}&body=${body}`;
  const pretty = number.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, '+1 ($1) $2-$3');

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={href}
        className={
          variant === 'light'
            ? 'inline-flex h-16 items-center gap-3 rounded-2xl bg-white px-7 text-xl font-medium text-night shadow-lg transition-transform duration-300 hover:scale-105'
            : 'inline-flex items-center gap-3 rounded-full bg-bronze px-7 py-4 text-base font-semibold text-night shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-bronze-bright'
        }
      >
        <MessagesIcon size={variant === 'light' ? 30 : 24} />
        Text Elevatia
      </a>
      {isIOS === false && variant !== 'light' && (
        <p className="text-sm text-white/75">
          On your iPhone, text <span className="font-semibold text-white">{pretty}</span> and say hi.
        </p>
      )}
    </div>
  );
}
