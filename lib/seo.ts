import { Metadata } from 'next';

/**
 * SEO Utilities
 * Funções auxiliares para SEO e metadata
 */

interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
}

/**
 * Generate metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  authors,
}: PageSEO): Metadata {
  const siteName = 'Frontmakers';
  const siteUrl = 'https://frontmakers.com';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: [...keywords, 'frontend', 'web development', 'tools'],
    openGraph: {
      title: fullTitle,
      description,
      type,
      url: siteUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@frontmakers',
    },
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
  };
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  date: string;
  author: { name: string };
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Frontmakers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://frontmakers.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://frontmakers.com/articles/${article.slug}`,
    },
  };
}

/**
 * Generate JSON-LD for website
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Frontmakers',
    description:
      'Platform with tools and articles for frontend developers',
    url: 'https://frontmakers.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://frontmakers.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD for organization
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Frontmakers',
    url: 'https://frontmakers.com',
    logo: 'https://frontmakers.com/logo.png',
    sameAs: [
      'https://twitter.com/frontmakers',
      'https://github.com/frontmakers',
    ],
  };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
