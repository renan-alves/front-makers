import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { localeConfig } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Define the locale segment type explicitly for Next.js
type SegmentLocale = 'en' | 'pt-br';

// Generate static params for all supported locales
export function generateStaticParams(): Array<{ locale: SegmentLocale }> {
  return [{ locale: 'en' }, { locale: 'pt-br' }];
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as SegmentLocale;
  const config = localeConfig[typedLocale];
  const isPtBr = typedLocale === 'pt-br';

  if (!config) {
    notFound();
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://frontmakers.com'),
    title: {
      default: isPtBr
        ? 'Frontmakers - Artigos para desenvolvedores frontend'
        : 'Frontmakers - Articles for Frontend Developers',
      template: '%s | Frontmakers',
    },
    description:
      isPtBr
        ? 'Plataforma com artigos tecnicos e recursos para desenvolvedores frontend modernos.'
        : 'Complete platform with technical articles and resources for modern frontend developers.',
    keywords: [
      'frontend',
      'web development',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
    ],
    authors: [{ name: 'Frontmakers' }],
    creator: 'Frontmakers',
    publisher: 'Frontmakers',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: config.code,
      url: `https://frontmakers.com/${typedLocale}`,
      siteName: 'Frontmakers',
      title: isPtBr
        ? 'Frontmakers - Artigos para desenvolvedores frontend'
        : 'Frontmakers - Articles for Frontend Developers',
      description:
        isPtBr
          ? 'Plataforma com artigos tecnicos e recursos para desenvolvedores frontend modernos.'
          : 'Complete platform with technical articles and resources for modern frontend developers.',
    },
    twitter: {
      card: 'summary_large_image',
      title: isPtBr
        ? 'Frontmakers - Artigos para desenvolvedores frontend'
        : 'Frontmakers - Articles for Frontend Developers',
      description:
        isPtBr
          ? 'Plataforma com artigos tecnicos e recursos para desenvolvedores frontend modernos.'
          : 'Complete platform with technical articles and resources for modern frontend developers.',
      creator: '@frontmakers',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const typedLocale = locale as SegmentLocale;
  const config = localeConfig[typedLocale];

  if (!config) {
    notFound();
  }

  return (
    <>
      <Header locale={typedLocale} />
      <main className="min-h-screen" lang={config.code} dir={config.dir}>
        {children}
      </main>
      <Footer locale={typedLocale} />
    </>
  );
}
