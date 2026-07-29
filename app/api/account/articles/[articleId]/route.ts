
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ articleId: string }> }
) {
  try {
    const body = await request.json();
    const { userId } = body ?? {};

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user id.' },
        { status: 400 }
      );
    }

    const { articleId } = await context.params;
    const article = await prisma.article.findUnique({
      where: { id: articleId },
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
        where: { thread: { articleId } },
      }),
      prisma.replyVote.deleteMany({
        where: { reply: { thread: { articleId } } },
      }),
      prisma.reply.deleteMany({
        where: { thread: { articleId } },
      }),
      prisma.thread.deleteMany({
        where: { articleId }
      }),
      prisma.article.delete({
        where: { id: articleId },
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
