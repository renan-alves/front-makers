import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import AdBanner from '../ads/AdBanner';

/**
 * Footer Component
 * Footer with links, copyright and ad space
 */
interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-light mt-24">
      {/* Ad area in footer */}
      <div className="container-grid py-8">
        <AdBanner slot="footer" />
      </div>

      <div className="container-grid py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              Frontmakers
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Complete platform with tools, articles and resources for modern
              frontend developers.
            </p>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/tools`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/submit`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Submit Article
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/tools/box-shadow`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Box Shadow Generator
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/tools/gradient`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Gradient Generator
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/tools/px-rem`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  PX → REM Converter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-light text-center">
          <p className="text-secondary text-sm">
            © {currentYear} Frontmakers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
