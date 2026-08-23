export default function Eyebrow({
  children,
  pill = false,
}: {
  children: React.ReactNode;
  pill?: boolean;
}) {
  if (pill) {
    return (
      <span className="inline-block rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
        {children}
      </span>
    );
  }
  return <p className="eyebrow">{children}</p>;
}
