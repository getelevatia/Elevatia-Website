/**
 * The Messages app icon as iOS draws it: a green gradient tile with a white
 * bubble whose tail points down and left. Inline SVG, so it scales with the
 * button it sits in and needs no asset.
 */
export default function MessagesIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="messages-tile" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#67F37E" />
          <stop offset="1" stopColor="#0FB92B" />
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13.5" fill="url(#messages-tile)" />
      {/* The bubble: an ellipse with a tail drawn as one path. */}
      <path
        d="M30 12.5c-11.6 0-21 7.4-21 16.5 0 4.9 2.7 9.3 7 12.3-.2 2.7-1.4 5.6-3.6 7.7 3.9-.5 7.5-2.2 10-4.4 2.4.6 4.9.9 7.6.9 11.6 0 21-7.4 21-16.5S41.6 12.5 30 12.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
