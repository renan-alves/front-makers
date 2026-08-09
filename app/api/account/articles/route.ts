import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user id.' },
        { status: 400 }
      );
    }

    const articles = await prisma.$queryRaw<Array<{
      id: string;
      title: string;
      slug: string;
      status: string;
      category: string;
      updatedAt: Date;
      publishedAt: Date | null;
    }>>
      `
        SELECT
          id,
          title,
          slug,
          status,
          category,
          "updatedAt",
          "publishedAt"
        FROM "Article"
        WHERE "authorId" = ${userId}
        ORDER BY "updatedAt" DESC
      `;

    return NextResponse.json(
      articles.map((article) => ({
        ...article,
        status: article.status as 'PENDENT' | 'APPROVED' | 'REJECTED',
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error('Account articles error:', error);
    return NextResponse.json(
      { error: 'Failed to load articles.' },
      { status: 500 }
    );
  }
}
