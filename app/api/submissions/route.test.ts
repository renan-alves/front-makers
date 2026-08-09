import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  article: { findUnique: vi.fn(), create: vi.fn(), findMany: vi.fn(), update: vi.fn() },
  user: { findUnique: vi.fn(), create: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));
vi.mock('@/lib/auth', () => ({ hashPassword: vi.fn((pwd: string) => `hashed:${pwd}`) }));

import { GET, POST, PATCH } from './route';

function makeRequest(method: string, body?: unknown, query = '') {
  return new Request(`http://localhost/api/submissions${query}`, {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

const validSubmission = {
  title: 'Advanced CSS Grid Techniques',
  content: 'x'.repeat(120),
  authorName: 'Jane',
  authorEmail: 'jane@example.com',
  category: 'CSS',
  tags: ['css', 'grid'],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/submissions', () => {
  it('rejects a request missing required fields', async () => {
    const response = await POST(makeRequest('POST', { title: 'Only title' }));
    expect(response.status).toBe(400);
  });

  it('rejects an invalid author email', async () => {
    const response = await POST(
      makeRequest('POST', { ...validSubmission, authorEmail: 'not-an-email' })
    );
    expect(response.status).toBe(400);
  });

  it('rejects content shorter than 100 characters', async () => {
    const response = await POST(makeRequest('POST', { ...validSubmission, content: 'too short' }));
    expect(response.status).toBe(400);
  });

  it('creates the submission with status PENDENT, reusing an existing author', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce(null); // slug uniqueness check
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'existing-author' });
    prismaMock.article.create.mockResolvedValueOnce({ id: 'article-1' });

    const response = await POST(makeRequest('POST', validSubmission));
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(prismaMock.user.create).not.toHaveBeenCalled();
    expect(prismaMock.article.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDENT', publishedAt: null }),
      })
    );
  });

  it('creates a temporary author account when the email is unknown', async () => {
    prismaMock.article.findUnique.mockResolvedValueOnce(null);
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({ id: 'new-author' });
    prismaMock.article.create.mockResolvedValueOnce({ id: 'article-1' });

    const response = await POST(makeRequest('POST', validSubmission));

    expect(response.status).toBe(201);
    expect(prismaMock.user.create).toHaveBeenCalled();
  });

  it('appends an incrementing suffix when the slug already exists', async () => {
    prismaMock.article.findUnique
      .mockResolvedValueOnce({ id: 'taken' }) // base slug taken
      .mockResolvedValueOnce(null); // next candidate free
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'existing-author' });
    prismaMock.article.create.mockResolvedValueOnce({ id: 'article-1' });

    await POST(makeRequest('POST', validSubmission));

    expect(prismaMock.article.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ slug: expect.stringMatching(/-2$/) }),
      })
    );
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.article.findUnique.mockRejectedValueOnce(new Error('db down'));

    const response = await POST(makeRequest('POST', validSubmission));

    expect(response.status).toBe(500);
  });
});

describe('GET /api/submissions', () => {
  it('lists submissions filtered by status', async () => {
    prismaMock.article.findMany.mockResolvedValueOnce([]);

    const response = await GET(makeRequest('GET', undefined, '?status=PENDENT'));

    expect(response.status).toBe(200);
    expect(prismaMock.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'PENDENT' } })
    );
  });

  it('lists all submission statuses when no filter is provided', async () => {
    prismaMock.article.findMany.mockResolvedValueOnce([]);

    await GET(makeRequest('GET'));

    expect(prismaMock.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: { in: ['PENDENT', 'APPROVED', 'REJECTED'] } } })
    );
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.article.findMany.mockRejectedValueOnce(new Error('db down'));

    const response = await GET(makeRequest('GET'));

    expect(response.status).toBe(500);
  });
});

describe('PATCH /api/submissions', () => {
  it('rejects a request missing submissionId or status', async () => {
    const response = await PATCH(makeRequest('PATCH', {}));
    expect(response.status).toBe(400);
  });

  it('sets publishedAt when approving', async () => {
    prismaMock.article.update.mockResolvedValueOnce({ id: 'a1', status: 'APPROVED' });

    await PATCH(makeRequest('PATCH', { submissionId: 'a1', status: 'APPROVED' }));

    expect(prismaMock.article.update).toHaveBeenCalledWith({
      where: { id: 'a1' },
      data: expect.objectContaining({ status: 'APPROVED', publishedAt: expect.any(Date) }),
    });
  });

  it('clears publishedAt when rejecting', async () => {
    prismaMock.article.update.mockResolvedValueOnce({ id: 'a1', status: 'REJECTED' });

    await PATCH(makeRequest('PATCH', { submissionId: 'a1', status: 'REJECTED', notes: 'not a fit' }));

    expect(prismaMock.article.update).toHaveBeenCalledWith({
      where: { id: 'a1' },
      data: expect.objectContaining({ status: 'REJECTED', publishedAt: null, notes: 'not a fit' }),
    });
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.article.update.mockRejectedValueOnce(new Error('db down'));

    const response = await PATCH(makeRequest('PATCH', { submissionId: 'a1', status: 'APPROVED' }));

    expect(response.status).toBe(500);
  });
});
