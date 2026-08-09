import { describe, it, expect } from 'vitest';
import {
  getThreadsByArticleSlug,
  getDiscussionCountForArticle,
  getThreadById,
  getRepliesByThreadId,
} from './discussions';

describe('getThreadsByArticleSlug', () => {
  it('returns only threads for the given article slug', () => {
    const threads = getThreadsByArticleSlug('css-grid-guia-pratico');
    expect(threads.length).toBeGreaterThan(0);
    expect(threads.every((t) => t.articleSlug === 'css-grid-guia-pratico')).toBe(true);
  });

  it('returns an empty array for an unknown slug', () => {
    expect(getThreadsByArticleSlug('unknown-slug')).toEqual([]);
  });

  it('sorts by most recent when sort=recent', () => {
    const threads = getThreadsByArticleSlug('css-grid-guia-pratico', 'recent');
    const dates = threads.map((t) => new Date(t.createdAt).getTime());
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it('sorts by votes when sort=top', () => {
    const threads = getThreadsByArticleSlug('css-grid-guia-pratico', 'top');
    const votes = threads.map((t) => t.votes);
    expect(votes).toEqual([...votes].sort((a, b) => b - a));
  });

  it('sorts by a relevance score (votes*2 + repliesCount) by default', () => {
    const threads = getThreadsByArticleSlug('css-grid-guia-pratico');
    const scores = threads.map((t) => t.votes * 2 + t.repliesCount);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });
});

describe('getDiscussionCountForArticle', () => {
  it('counts threads for a known article', () => {
    expect(getDiscussionCountForArticle('nextjs-performance-patterns')).toBe(2);
  });

  it('returns 0 for an article with no threads', () => {
    expect(getDiscussionCountForArticle('unknown-slug')).toBe(0);
  });
});

describe('getThreadById', () => {
  it('returns the matching thread', () => {
    const thread = getThreadById('thread-nextjs-rsc');
    expect(thread?.title).toContain('RSC boundaries');
  });

  it('returns null for an unknown id', () => {
    expect(getThreadById('does-not-exist')).toBeNull();
  });
});

describe('getRepliesByThreadId', () => {
  it('returns replies for a thread, best answer first', () => {
    const replies = getRepliesByThreadId('thread-nextjs-rsc');
    expect(replies[0].isBestAnswer).toBe(true);
  });

  it('returns an empty array when there are no replies', () => {
    expect(getRepliesByThreadId('thread-css-grid-nested')).toEqual([]);
  });
});
