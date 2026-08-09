import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  article: { findMany: vi.fn(), deleteMany: vi.fn() },
  thread: { findMany: vi.fn(), deleteMany: vi.fn() },
  reply: { findMany: vi.fn(), deleteMany: vi.fn() },
  replyVote: { deleteMany: vi.fn() },
  threadVote: { deleteMany: vi.fn() },
  user: { delete: vi.fn() },
  $transaction: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { DELETE } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/account/delete', {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.article.findMany.mockResolvedValue([]);
  prismaMock.thread.findMany.mockResolvedValue([]);
  prismaMock.reply.findMany.mockResolvedValue([]);
  prismaMock.$transaction.mockResolvedValue(undefined);
});

describe('DELETE /api/account/delete', () => {
  it('rejects a request missing userId', async () => {
    const response = await DELETE(makeRequest({}));
    expect(response.status).toBe(400);
  });

  it('rejects a request with a null JSON body', async () => {
    const response = await DELETE(makeRequest(null));
    expect(response.status).toBe(400);
  });

  it('deletes the account and its cascading content, falling back to authorId filters when there is no content', async () => {
    const response = await DELETE(makeRequest({ userId: 'u1' }));

    expect(response.status).toBe(200);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    expect(prismaMock.reply.deleteMany).toHaveBeenCalledWith({ where: { authorId: 'u1' } });
    expect(prismaMock.thread.deleteMany).toHaveBeenCalledWith({ where: { authorId: 'u1' } });
    expect(prismaMock.article.deleteMany).toHaveBeenCalledWith({ where: { authorId: 'u1' } });
    expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 'u1' } });
  });

  it('cascades by explicit ids when the user has articles/threads/replies', async () => {
    prismaMock.article.findMany.mockResolvedValueOnce([{ id: 'article-1' }]);
    prismaMock.thread.findMany.mockResolvedValueOnce([{ id: 'thread-1' }]);
    prismaMock.reply.findMany.mockResolvedValueOnce([{ id: 'reply-1' }]);

    await DELETE(makeRequest({ userId: 'u1' }));

    expect(prismaMock.reply.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['reply-1'] } } });
    expect(prismaMock.thread.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['thread-1'] } } });
    expect(prismaMock.article.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['article-1'] } } });
  });

  it('returns 500 when the transaction fails', async () => {
    prismaMock.$transaction.mockRejectedValueOnce(new Error('db down'));

    const response = await DELETE(makeRequest({ userId: 'u1' }));

    expect(response.status).toBe(500);
  });
});
