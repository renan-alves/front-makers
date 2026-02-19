import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

/**
 * Header Component
 * Main site navigation with logo and links to main sections
 * Logo: "FRONT" in red, "MAKERS" in black/white
 */
interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-light backdrop-blur-sm bg-opacity-95">
      <nav className="container-grid">
        <div className="flex items-center justify-between h-16">
          {/* Logo - FRONT (red) + MAKERS (black/white) */}
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-[var(--color-primary)]">FRONT</span>
            <span className="text-[var(--color-text)]">MAKERS</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href={`/${locale}/tools`}
              className="text-secondary hover:text-primary transition-colors"
            >
              Tools
            </Link>
            <Link
              href={`/${locale}/articles`}
              className="text-secondary hover:text-primary transition-colors"
            >
              Articles
            </Link>
            <Link
              href={`/${locale}/submit`}
              className="text-secondary hover:text-primary font-medium transition-colors"
            >
              Submit Article
            </Link>

            {/* CTA Badge */}
            <div className="ml-4 px-4 py-2 bg-accent-blue-soft text-accent-blue text-sm font-semibold rounded-lg border border-accent-blue border-opacity-20">
              Coming Soon: Pro
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
