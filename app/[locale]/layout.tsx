import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://frontmakers.com'),
    title: {
      default: 'Frontmakers - Articles for Frontend Developers',
      template: '%s | Frontmakers',
    },
    description: 'Complete platform with technical articles and resources for modern frontend developers.',
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
      locale: 'en',
      url: 'https://frontmakers.com',
      siteName: 'Frontmakers',
      title: 'Frontmakers - Articles for Frontend Developers',
      description: 'Complete platform with technical articles and resources for modern frontend developers.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Frontmakers - Articles for Frontend Developers',
      description: 'Complete platform with technical articles and resources for modern frontend developers.',
      creator: '@frontmakers',
    },
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen" lang="en" dir="ltr">
        {children}
      </main>
      <Footer />
    </>
  );
}
