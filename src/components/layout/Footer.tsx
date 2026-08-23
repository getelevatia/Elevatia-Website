import Link from 'next/link';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-night py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-md text-sm text-night-text-muted">
              Trackers tell you what happened. We tell you what to do next.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-night-text-secondary transition-colors hover:text-night-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-sm text-night-text-muted">
              <a
                href="mailto:zackh@getelevatia.com"
                className="transition-colors hover:text-night-text-secondary"
              >
                zackh@getelevatia.com
              </a>
              <span className="mx-2" aria-hidden="true">&middot;</span>
              &copy; {new Date().getFullYear()} Elevatia, Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
