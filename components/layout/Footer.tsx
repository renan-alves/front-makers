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
  const t =
    locale === 'pt-br'
      ? {
          about:
            'Plataforma completa com artigos e recursos para desenvolvedores frontend modernos.',
          navigation: 'Navegacao',
          articles: 'Artigos',
          submit: 'Enviar artigo',
          home: 'Inicio',
          rights: 'Todos os direitos reservados.',
        }
      : {
          about:
            'Complete platform with articles and resources for modern frontend developers.',
          navigation: 'Navigation',
          articles: 'Articles',
          submit: 'Submit Article',
          home: 'Home',
          rights: 'All rights reserved.',
        };

  return (
    <footer className="bg-secondary border-t border-light mt-24">
      {/* Ad area in footer */}
      <div className="container-grid py-8">
        <AdBanner slot="footer" />
      </div>

      <div className="container-grid py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              Frontmakers
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              {t.about}
            </p>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              {t.navigation}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  {t.articles}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/submit`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  {t.submit}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-secondary hover:text-[var(--color-primary)] transition-colors text-sm"
                >
                  {t.home}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-light text-center">
          <p className="text-secondary text-sm">
            © {currentYear} Frontmakers. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
