import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/articles
 *
 * Fetch all published articles
 * Query params:
 * - locale: filter by locale (default: 'en')
 * - limit: number of articles to return
 * - category: filter by category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const category = searchParams.get('category') || undefined;

    const conditions: Prisma.Sql[] = [
      Prisma.sql`a.status = 'APPROVED'`,
      Prisma.sql`(a.locale = ${locale} OR a.locale = 'en')`,
      ...(category ? [Prisma.sql`a.category = ${category}`] : []),
    ];

    const articles = await prisma.$queryRaw<Array<{
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
    }>>(Prisma.sql`
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
      `);

    return NextResponse.json(
      articles.map((article: any) => ({
        ...article,
        author: {
          name: article.author_name ?? 'Unknown author',
          email: article.author_email ?? '',
        },
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
