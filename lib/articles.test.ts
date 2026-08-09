import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  article: { count: vi.fn() },
}));

vi.mock('./prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import {
  getPublishedArticles,
  getArticleBySlug,
  getRelatedArticles,
  getArticlesByCategory,
  searchArticles,
  getArticleCount,
} from './articles';

const row = {
  id: 'article-1',
  title: 'Great Article',
  slug: 'great-article',
  content: '<p>content</p>',
  excerpt: 'excerpt',
  coverImage: null,
  locale: 'en',
  status: 'APPROVED',
  category: 'CSS',
  readTime: 5,
  tags: ['css'],
  authorId: 'user-1',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-02'),
  publishedAt: new Date('2026-01-03'),
  author_name: 'Jane Doe',
  author_email: 'jane@example.com',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getPublishedArticles', () => {
  it('maps raw rows into ArticleWithAuthor objects', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const articles = await getPublishedArticles('en');

    expect(articles).toHaveLength(1);
    expect(articles[0]).toMatchObject({
      id: 'article-1',
      slug: 'great-article',
      author: { name: 'Jane Doe', email: 'jane@example.com' },
    });
  });

  it('falls back to "Unknown author" when author fields are null', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([{ ...row, author_name: null, author_email: null }]);

    const [article] = await getPublishedArticles('en');

    expect(article.author).toEqual({ name: 'Unknown author', email: '' });
  });

  it('returns an empty array and swallows errors on query failure', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    const articles = await getPublishedArticles('en');

    expect(articles).toEqual([]);
  });
});

describe('getArticleBySlug', () => {
  it('returns the mapped article when found', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const article = await getArticleBySlug('great-article', 'en');

    expect(article?.slug).toBe('great-article');
  });

  it('returns null when no rows are found', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([]);

    const article = await getArticleBySlug('missing-slug', 'en');

    expect(article).toBeNull();
  });

  it('returns null and swallows errors on query failure', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    const article = await getArticleBySlug('great-article', 'en');

    expect(article).toBeNull();
  });
});

describe('getRelatedArticles', () => {
  it('returns mapped related articles', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const articles = await getRelatedArticles('other-slug', 'CSS', 'en', 3);

    expect(articles).toHaveLength(1);
  });

  it('returns an empty array on failure', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    expect(await getRelatedArticles('other-slug', 'CSS', 'en')).toEqual([]);
  });
});

describe('getArticlesByCategory', () => {
  it('returns mapped articles for a category', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const articles = await getArticlesByCategory('CSS', 'en');

    expect(articles).toHaveLength(1);
    expect(articles[0].category).toBe('CSS');
  });

  it('returns an empty array on failure', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    expect(await getArticlesByCategory('CSS', 'en')).toEqual([]);
  });
});

describe('searchArticles', () => {
  it('returns mapped articles matching the search query', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const articles = await searchArticles('great', 'en');

    expect(articles).toHaveLength(1);
  });

  it('returns an empty array on failure', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    expect(await searchArticles('great', 'en')).toEqual([]);
  });
});

describe('getArticleCount', () => {
  it('returns the count from prisma', async () => {
    prismaMock.article.count.mockResolvedValueOnce(42);

    expect(await getArticleCount('APPROVED', 'en')).toBe(42);
    expect(prismaMock.article.count).toHaveBeenCalledWith({
      where: { status: 'APPROVED', locale: 'en' },
    });
  });

  it('returns 0 and swallows errors on failure', async () => {
    prismaMock.article.count.mockRejectedValueOnce(new Error('db down'));

    expect(await getArticleCount()).toBe(0);
  });
});
