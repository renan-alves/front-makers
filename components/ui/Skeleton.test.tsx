// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders a div marked as decorative', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;

    expect(el.tagName).toBe('DIV');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.className).toBe('skeleton');
  });

  it('merges a custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);
    const el = container.firstElementChild as HTMLElement;

    expect(el.className).toBe('skeleton h-4 w-24');
  });
});
