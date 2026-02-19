import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale, localeConfig } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const config = localeConfig[locale];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://frontmakers.com'),
    title: {
      default: 'Frontmakers - Tools and Articles for Frontend Developers',
      template: '%s | Frontmakers',
    },
    description:
      'Complete platform with practical tools, technical articles and resources for modern frontend developers.',
    keywords: [
      'frontend',
      'web development',
      'tools',
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
      url: `https://frontmakers.com/${locale}`,
      siteName: 'Frontmakers',
      title: 'Frontmakers - Tools and Articles for Frontend Developers',
      description:
        'Complete platform with practical tools, technical articles and resources for modern frontend developers.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Frontmakers - Tools and Articles for Frontend Developers',
      description:
        'Complete platform with practical tools, technical articles and resources for modern frontend developers.',
      creator: '@frontmakers',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  const config = localeConfig[locale];

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen" lang={config.code} dir={config.dir}>
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
