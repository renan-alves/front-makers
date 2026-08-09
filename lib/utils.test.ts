import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  cn,
  formatDate,
  getReadingTime,
  slugify,
  truncate,
  hexToRgba,
  storage,
  isClient,
  debounce,
  copyToClipboard,
} from './utils';

describe('cn', () => {
  it('merges class names, skipping falsy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });
});

describe('formatDate', () => {
  it('formats a Date instance using pt-BR long format', () => {
    const result = formatDate(new Date('2026-03-15T00:00:00.000Z'));
    expect(result).toContain('2026');
    expect(result).toContain('março');
  });

  it('formats a date string the same way', () => {
    const result = formatDate('2026-03-15T00:00:00.000Z');
    expect(result).toContain('2026');
  });
});

describe('getReadingTime', () => {
  it('rounds up to the nearest minute at 200 words/minute', () => {
    const text = new Array(201).fill('word').join(' ');
    expect(getReadingTime(text)).toBe('2 min');
  });

  it('returns at least 1 min for short text', () => {
    expect(getReadingTime('short text')).toBe('1 min');
  });
});

describe('slugify', () => {
  it('lowercases, strips diacritics and replaces spaces with dashes', () => {
    expect(slugify('Título com Acentuação!')).toBe('titulo-com-acentuacao');
  });

  it('collapses duplicate dashes', () => {
    expect(slugify('a   b---c')).toBe('a-b-c');
  });
});

describe('truncate', () => {
  it('returns the original string when shorter than the limit', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates and appends an ellipsis when longer than the limit', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });
});

describe('hexToRgba', () => {
  it('converts a hex color to an rgba() string', () => {
    expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });
});

describe('storage (server/no-window environment)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('get() returns null when window is not available', () => {
    expect(storage.get('any-key')).toBeNull();
  });

  it('set()/remove() are no-ops when window is not available', () => {
    expect(() => storage.set('key', 'value')).not.toThrow();
    expect(() => storage.remove('key')).not.toThrow();
  });
});

describe('isClient', () => {
  it('is false in a Node (server) test environment', () => {
    expect(isClient).toBe(false);
  });
});

describe('debounce', () => {
  it('only invokes the wrapped function once after the wait elapses', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    debounced('b');
    debounced('c');
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
    vi.useRealTimers();
  });
});

describe('copyToClipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true when the Clipboard API succeeds', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    expect(await copyToClipboard('hello')).toBe(true);
  });

  it('returns false when the Clipboard API rejects', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    });
    expect(await copyToClipboard('hello')).toBe(false);
  });
});
