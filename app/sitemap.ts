import { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import { locales, defaultLocale } from '@/lib/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://frontmakers.com';

  // Generate routes for each locale
  const localeRoutes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    const routes = [
      '',
      '/articles',
      '/tools',
      '/tools/box-shadow',
      '/tools/gradient',
      '/tools/px-rem',
      '/submit',
    ].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }));

    localeRoutes.push(...routes);

    // Article pages
    const articles = await getPublishedArticles(locale);
    const articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/${locale}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    localeRoutes.push(...articleRoutes);
  }

  // Add root redirect
  localeRoutes.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  });

  return localeRoutes;
}
