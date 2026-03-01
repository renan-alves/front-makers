import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { articleId: string };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { userId } = body ?? {};

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user id.' },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: params.articleId },
      select: { authorId: true },
    });

    if (!article || article.authorId !== userId) {
      return NextResponse.json(
        { error: 'Article not found.' },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.threadVote.deleteMany({
        where: { thread: { articleId: params.articleId } },
      }),
      prisma.replyVote.deleteMany({
        where: { reply: { thread: { articleId: params.articleId } } },
      }),
      prisma.reply.deleteMany({
        where: { thread: { articleId: params.articleId } },
      }),
      prisma.thread.deleteMany({
        where: { articleId: params.articleId } },
      }),
      prisma.article.delete({
        where: { id: params.articleId },
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Account article delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete article.' },
      { status: 500 }
    );
  }
}
