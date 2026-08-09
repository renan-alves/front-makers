// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders children inside a div with the default (lg) size class', () => {
    const { container, getByText } = render(<Container>Hello</Container>);

    expect(getByText('Hello')).toBeInTheDocument();
    expect(container.firstElementChild?.className).toContain('max-w-6xl');
    expect(container.firstElementChild?.className).toContain('mx-auto');
  });

  it.each([
    ['sm', 'max-w-2xl'],
    ['md', 'max-w-4xl'],
    ['lg', 'max-w-6xl'],
    ['full', 'max-w-container'],
  ] as const)('maps size=%s to %s', (size, expectedClass) => {
    const { container } = render(<Container size={size}>content</Container>);
    expect(container.firstElementChild?.className).toContain(expectedClass);
  });

  it('appends a custom className', () => {
    const { container } = render(<Container className="extra-class">x</Container>);
    expect(container.firstElementChild?.className).toContain('extra-class');
  });
});
