import Image from 'next/image';

export default function AppStoreBadge({ large = false }: { large?: boolean }) {
  return (
    <a
      href="https://apps.apple.com/us/app/elevatia/id6747624957"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform duration-300 hover:scale-105"
    >
      <Image
        src="/app-store-badge-official.svg"
        alt="Download on the App Store"
        width={large ? 200 : 180}
        height={large ? 67 : 60}
        className={`${large ? 'h-16' : 'h-14'} w-auto drop-shadow-lg`}
        priority={!large}
      />
    </a>
  );
}
