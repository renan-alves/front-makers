/**
 * Article Service
 * 
 * Database access layer for articles
 * Use these functions in Server Components
 */

import { prisma } from './prisma';
import type { Article, User } from '@prisma/client';

export type ArticleWithAuthor = Article & {
  author: Pick<User, 'name' | 'email'>;
};

/**
 * Get all published articles for a specific locale
 */
export async function getPublishedArticles(locale: string = 'en'): Promise<ArticleWithAuthor[]> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        locale,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return articles;
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
    const article = await prisma.article.findFirst({
      where: {
        slug,
        locale,
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return article;
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
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        locale,
        category,
        slug: {
          not: slug,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });

    return articles;
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
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        locale,
        category,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return articles;
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
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        locale,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            excerpt: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return articles;
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

/**
 * Get article count by status
 */
export async function getArticleCount(
  status?: 'DRAFT' | 'PUBLISHED',
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
