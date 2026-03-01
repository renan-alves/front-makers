import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body ?? {};

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user id.' },
        { status: 400 }
      );
    }

    const articleIds = await prisma.article.findMany({
      where: { authorId: userId },
      select: { id: true },
    });

    const articleIdList = articleIds.map((article) => article.id);

    const threadIds = await prisma.thread.findMany({
      where: {
        OR: [
          { authorId: userId },
          articleIdList.length ? { articleId: { in: articleIdList } } : undefined,
        ].filter(Boolean) as Array<Record<string, unknown>>,
      },
      select: { id: true },
    });

    const threadIdList = threadIds.map((thread) => thread.id);

    const replyIds = await prisma.reply.findMany({
      where: {
        OR: [
          { authorId: userId },
          threadIdList.length ? { threadId: { in: threadIdList } } : undefined,
        ].filter(Boolean) as Array<Record<string, unknown>>,
      },
      select: { id: true },
    });

    const replyIdList = replyIds.map((reply) => reply.id);

    await prisma.$transaction([
      prisma.replyVote.deleteMany({
        where: {
          OR: [
            { userId },
            replyIdList.length ? { replyId: { in: replyIdList } } : undefined,
          ].filter(Boolean) as Array<Record<string, unknown>>,
        },
      }),
      prisma.threadVote.deleteMany({
        where: {
          OR: [
            { userId },
            threadIdList.length ? { threadId: { in: threadIdList } } : undefined,
          ].filter(Boolean) as Array<Record<string, unknown>>,
        },
      }),
      replyIdList.length
        ? prisma.reply.deleteMany({
            where: { id: { in: replyIdList } },
          })
        : prisma.reply.deleteMany({ where: { authorId: userId } }),
      threadIdList.length
        ? prisma.thread.deleteMany({
            where: { id: { in: threadIdList } },
          })
        : prisma.thread.deleteMany({ where: { authorId: userId } }),
      articleIdList.length
        ? prisma.article.deleteMany({ where: { id: { in: articleIdList } } })
        : prisma.article.deleteMany({ where: { authorId: userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Account delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account.' },
      { status: 500 }
    );
  }
}
