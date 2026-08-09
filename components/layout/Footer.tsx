import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import AdBanner from '../ads/AdBanner';

/**
 * Footer Component
 * Footer with links, copyright and ad space.
 */
interface FooterProps {
  locale?: string;
}

export default function Footer({ locale: _locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-light mt-24">
      <div className="container-grid py-8">
        <AdBanner slot="footer" />
      </div>

      <div className="container-grid py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Frontmakers</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Complete platform with articles and resources for modern frontend developers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Submit Article
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light text-center">
          <p className="text-secondary text-sm">
            © {currentYear} Frontmakers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
