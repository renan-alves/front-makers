import { describe, it, expect } from 'vitest';
import {
  generatePageMetadata,
  generateArticleJsonLd,
  generateWebsiteJsonLd,
  generateOrganizationJsonLd,
  generateBreadcrumbJsonLd,
} from './seo';

describe('generatePageMetadata', () => {
  it('builds a title, description and default OG/Twitter metadata', () => {
    const metadata = generatePageMetadata({ title: 'Articles', description: 'Some description' });

    expect(metadata.title).toBe('Articles');
    expect(metadata.description).toBe('Some description');
    expect(metadata.keywords).toEqual(['frontend', 'web development', 'tools']);
    expect(metadata.openGraph).toMatchObject({
      title: 'Articles | Frontmakers',
      type: 'website',
      siteName: 'Frontmakers',
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('includes publishedTime and authors for article type when provided', () => {
    const metadata = generatePageMetadata({
      title: 'My Article',
      description: 'desc',
      type: 'article',
      publishedTime: '2026-01-01T00:00:00.000Z',
      authors: ['Jane Doe'],
    });

    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-01-01T00:00:00.000Z',
      authors: ['Jane Doe'],
    });
  });
});

describe('generateArticleJsonLd', () => {
  it('produces schema.org Article structured data', () => {
    const jsonLd = generateArticleJsonLd({
      title: 'Title',
      description: 'Description',
      date: '2026-01-01T00:00:00.000Z',
      author: { name: 'Jane Doe' },
      slug: 'my-article',
    });

    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.author).toEqual({ '@type': 'Person', name: 'Jane Doe' });
    expect(jsonLd.mainEntityOfPage['@id']).toBe('https://frontmakers.com/articles/my-article');
  });
});

describe('generateWebsiteJsonLd / generateOrganizationJsonLd', () => {
  it('produces schema.org WebSite structured data', () => {
    expect(generateWebsiteJsonLd()['@type']).toBe('WebSite');
  });

  it('produces schema.org Organization structured data', () => {
    const jsonLd = generateOrganizationJsonLd();
    expect(jsonLd['@type']).toBe('Organization');
    expect(jsonLd.sameAs).toContain('https://github.com/frontmakers');
  });
});

describe('generateBreadcrumbJsonLd', () => {
  it('maps items into a positioned BreadcrumbList', () => {
    const jsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: 'https://frontmakers.com' },
      { name: 'Articles', url: 'https://frontmakers.com/articles' },
    ]);

    expect(jsonLd.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frontmakers.com' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://frontmakers.com/articles' },
    ]);
  });
});
