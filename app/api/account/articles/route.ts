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

    const articles = await prisma.article.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        category: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Account articles error:', error);
    return NextResponse.json(
      { error: 'Failed to load articles.' },
      { status: 500 }
    );
  }
}
