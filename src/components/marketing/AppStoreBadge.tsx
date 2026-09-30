import Image from 'next/image';

/**
 * `width` pins the badge to a pixel width and lets the height follow its
 * 3:1 ratio, so it can sit under a button of the same width. Apple's badge
 * must keep its proportions, so height is never set on its own.
 */
export default function AppStoreBadge({ large = false, width }: { large?: boolean; width?: number }) {
  const fixed = typeof width === 'number';
  return (
    <a
      href="https://apps.apple.com/us/app/elevatia/id6747624957"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform duration-300 hover:scale-105"
      style={fixed ? { width } : undefined}
    >
      <Image
        src="/app-store-badge-official.svg"
        alt="Download on the App Store"
        width={fixed ? width : large ? 200 : 180}
        height={fixed ? Math.round(width / 3) : large ? 67 : 60}
        className={`${fixed ? 'h-auto w-full' : large ? 'h-16 w-auto' : 'h-14 w-auto'} drop-shadow-lg`}
        priority={!large}
      />
    </a>
  );
}
