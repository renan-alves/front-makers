import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  article: { findUnique: vi.fn(), delete: vi.fn() },
  thread: { deleteMany: vi.fn() },
  threadVote: { deleteMany: vi.fn() },
  replyVote: { deleteMany: vi.fn() },
  reply: { deleteMany: vi.fn() },
  $transaction: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { DELETE } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/account/articles/article-1', {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}

function makeContext(articleId: string) {
  return { params: Promise.resolve({ articleId }) };
}

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.$transaction.mockResolvedValue(undefined);
});

describe('DELETE /api/account/articles/[articleId]', () => {
  it('rejects a request missing userId', async () => {
    const response = await DELETE(makeRequest({}), makeContext('article-1'));
    expect(response.status).toBe(400);
  });

  it('rejects a request with a null JSON body', async () => {
    const response = await DELETE(makeRequest(null), makeContext('article-1'));
    expect(response.status).toBe(400);
  });

  it('returns 404 when the article does not exist', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce(null);

    const response = await DELETE(makeRequest({ userId: 'u1' }), makeContext('missing'));

    expect(response.status).toBe(404);
  });

  it('returns 404 when the article belongs to a different user', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce({ authorId: 'someone-else' });

    const response = await DELETE(makeRequest({ userId: 'u1' }), makeContext('article-1'));

    expect(response.status).toBe(404);
  });

  it('deletes the article and its discussion cascade on success', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce({ authorId: 'u1' });

    const response = await DELETE(makeRequest({ userId: 'u1' }), makeContext('article-1'));

    expect(response.status).toBe(200);
    expect(prismaMock.article.delete).toHaveBeenCalledWith({ where: { id: 'article-1' } });
    expect(prismaMock.thread.deleteMany).toHaveBeenCalledWith({ where: { articleId: 'article-1' } });
  });

  it('returns 500 when the transaction fails', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce({ authorId: 'u1' });
    prismaMock.$transaction.mockRejectedValueOnce(new Error('db down'));

    const response = await DELETE(makeRequest({ userId: 'u1' }), makeContext('article-1'));

    expect(response.status).toBe(500);
  });
});
