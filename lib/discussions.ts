import type { DiscussionSort, Reply, Thread } from '@/types';

const threads: Thread[] = [
  {
    id: 'thread-css-grid-performance',
    articleSlug: 'css-grid-guia-pratico',
    title: 'Grid areas vs utility classes in large layouts',
    body: 'For complex dashboards, what scales better in your experience: explicit grid-template-areas or utility-class composition? Looking for maintainability tradeoffs.',
    author: { name: 'Luna Pereira', avatar: '👩‍💻' },
    createdAt: '2026-02-10T12:00:00.000Z',
    votes: 38,
    repliesCount: 14,
    isResolved: true,
  },
  {
    id: 'thread-css-grid-nested',
    articleSlug: 'css-grid-guia-pratico',
    title: 'Nested grid gotchas on mobile breakpoints',
    body: 'I keep hitting overflow with nested grids at 360px. Any reliable pattern to avoid layout shift while preserving semantics?',
    author: { name: 'Bruno Costa', avatar: '🧠' },
    createdAt: '2026-02-12T09:30:00.000Z',
    votes: 22,
    repliesCount: 9,
  },
  {
    id: 'thread-nextjs-routing',
    articleSlug: 'nextjs-performance-patterns',
    title: 'How to balance cache revalidation and freshness?',
    body: 'In content-heavy apps, how do you define practical revalidate windows without stale UX?',
    author: { name: 'Camila Duarte', avatar: '⚡' },
    createdAt: '2026-02-15T16:10:00.000Z',
    votes: 29,
    repliesCount: 6,
  },
  {
    id: 'thread-nextjs-rsc',
    articleSlug: 'nextjs-performance-patterns',
    title: 'RSC boundaries: where to stop?',
    body: 'When building editorial platforms, where do you draw the line between Server and Client Components to avoid complexity?',
    author: { name: 'Rafael Lima', avatar: '🛠️' },
    createdAt: '2026-02-16T08:45:00.000Z',
    votes: 41,
    repliesCount: 11,
  },
];

const replies: Reply[] = [
  {
    id: 'reply-1',
    threadId: 'thread-css-grid-performance',
    body: 'I prefer explicit areas for page-level structures and utilities for internal component layout. This split keeps intent clear.',
    author: { name: 'Alice Rocha', avatar: '🧩' },
    createdAt: '2026-02-10T13:20:00.000Z',
    votes: 18,
    isBestAnswer: true,
  },
  {
    id: 'reply-2',
    threadId: 'thread-css-grid-performance',
    body: 'Utilities win for speed, but documentation gets critical. We add small diagrams in PR descriptions for big layouts.',
    author: { name: 'Diego Nunes', avatar: '📐' },
    createdAt: '2026-02-10T14:05:00.000Z',
    votes: 9,
  },
  {
    id: 'reply-3',
    threadId: 'thread-nextjs-rsc',
    body: 'A good heuristic: keep data-heavy and SEO-critical sections in Server Components. Only isolate interactive islands as client.',
    author: { name: 'Nina Farias', avatar: '🧭' },
    createdAt: '2026-02-16T10:00:00.000Z',
    votes: 24,
    isBestAnswer: true,
  },
  {
    id: 'reply-4',
    threadId: 'thread-nextjs-rsc',
    body: 'Agree. Also avoid passing huge objects across RSC boundaries. Keep payloads minimal and explicit.',
    author: { name: 'Pedro Alves', avatar: '📦' },
    createdAt: '2026-02-16T10:40:00.000Z',
    votes: 12,
  },
];

export function getThreadsByArticleSlug(
  articleSlug: string,
  sort: DiscussionSort = 'relevant'
): Thread[] {
  const filtered = threads.filter((thread) => thread.articleSlug === articleSlug);

  if (sort === 'recent') {
    return [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (sort === 'top') {
    return [...filtered].sort((a, b) => b.votes - a.votes);
  }

  return [...filtered].sort((a, b) => {
    const aScore = a.votes * 2 + a.repliesCount;
    const bScore = b.votes * 2 + b.repliesCount;
    return bScore - aScore;
  });
}

export function getDiscussionCountForArticle(articleSlug: string): number {
  return threads.filter((thread) => thread.articleSlug === articleSlug).length;
}

export function getThreadById(threadId: string): Thread | null {
  return threads.find((thread) => thread.id === threadId) ?? null;
}

export function getRepliesByThreadId(threadId: string): Reply[] {
  return replies
    .filter((reply) => reply.threadId === threadId)
    .sort((a, b) => {
      if (a.isBestAnswer && !b.isBestAnswer) {
        return -1;
      }
      if (!a.isBestAnswer && b.isBestAnswer) {
        return 1;
      }
      return b.votes - a.votes;
    });
}
