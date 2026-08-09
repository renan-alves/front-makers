/**
 * Article Service
 *
 * Database access layer for articles
 * Use these functions in Server Components
 */

import { Prisma } from '@prisma/client';
import { prisma } from './prisma';
import type { Article, User } from '@prisma/client';

export type ArticleWithAuthor = Article & {
  author: Pick<User, 'name' | 'email'>;
};

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  locale: string;
  status: string;
  category: string;
  readTime: number;
  tags: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  author_name: string | null;
  author_email: string | null;
};

function mapArticleRow(row: ArticleRow): ArticleWithAuthor {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    locale: row.locale,
    status: row.status as Article['status'],
    category: row.category,
    readTime: row.readTime,
    tags: row.tags,
    authorName: null,
    authorEmail: null,
    notes: null,
    authorId: row.authorId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    publishedAt: row.publishedAt,
    reviewedAt: null,
    author: {
      name: row.author_name ?? 'Unknown author',
      email: row.author_email ?? '',
    },
  };
}

async function getApprovedPublishedArticleRows(
  locale: string = 'en',
  extraConditions: Prisma.Sql[] = [],
  limit?: number
): Promise<ArticleRow[]> {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`a.status = 'APPROVED'`,
    ...(locale ? [Prisma.sql`(a.locale = ${locale} OR a.locale = 'en')`] : []),
    ...extraConditions,
  ];

  const query = Prisma.sql`
    SELECT
      a.id,
      a.title,
      a.slug,
      a.content,
      a.excerpt,
      a."coverImage",
      a.locale,
      a.status,
      a.category,
      a."readTime",
      a.tags,
      a."authorId",
      a."createdAt",
      a."updatedAt",
      a."publishedAt",
      u.name AS author_name,
      u.email AS author_email
    FROM "Article" a
    LEFT JOIN "User" u ON a."authorId" = u.id
    WHERE ${Prisma.join(conditions, ' AND ')}
    ORDER BY a."publishedAt" DESC
    ${limit ? Prisma.sql`LIMIT ${limit}` : Prisma.empty}
  `;

  return prisma.$queryRaw<ArticleRow[]>(query);
}

/**
 * Get all published articles for a specific locale
 */
export async function getPublishedArticles(locale: string = 'en'): Promise<ArticleWithAuthor[]> {
  try {
    const rows = await getApprovedPublishedArticleRows(locale);
    return rows.map(mapArticleRow);
  } catch (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(
  slug: string,
  locale: string = 'en'
): Promise<ArticleWithAuthor | null> {
  try {
    const rows = await getApprovedPublishedArticleRows(locale, [Prisma.sql`a.slug = ${slug}`], 1);
    return rows[0] ? mapArticleRow(rows[0]) : null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

/**
 * Get related articles (same category, excluding current)
 */
export async function getRelatedArticles(
  slug: string,
  category: string,
  locale: string = 'en',
  limit: number = 3
): Promise<ArticleWithAuthor[]> {
  try {
    const rows = await getApprovedPublishedArticleRows(locale, [
      Prisma.sql`a.category = ${category}`,
      Prisma.sql`a.slug != ${slug}`,
    ], limit);

    return rows.map(mapArticleRow);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(
  category: string,
  locale: string = 'en'
): Promise<ArticleWithAuthor[]> {
  try {
    const rows = await getApprovedPublishedArticleRows(locale, [Prisma.sql`a.category = ${category}`]);
    return rows.map(mapArticleRow);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

/**
 * Search articles
 */
export async function searchArticles(
  query: string,
  locale: string = 'en'
): Promise<ArticleWithAuthor[]> {
  try {
    const searchPattern = `%${query}%`;
    const rows = await getApprovedPublishedArticleRows(locale, [
      Prisma.sql`(a.title ILIKE ${searchPattern} OR a.excerpt ILIKE ${searchPattern} OR a.content ILIKE ${searchPattern})`,
    ]);

    return rows.map(mapArticleRow);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

/**
 * Get article count by status
 */
export async function getArticleCount(
  status?: 'PENDENT' | 'APPROVED' | 'REJECTED',
  locale?: string
): Promise<number> {
  try {
    const count = await prisma.article.count({
      where: {
        ...(status && { status }),
        ...(locale && { locale }),
      },
    });

    return count;
  } catch (error) {
    console.error('Error counting articles:', error);
    return 0;
  }
}
