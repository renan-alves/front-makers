// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FlagBrazil from './FlagBrazil';
import FlagUK from './FlagUK';

describe('FlagBrazil', () => {
  it('renders an svg with the default 32px size', () => {
    const { container } = render(<FlagBrazil />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts a custom size', () => {
    const { container } = render(<FlagBrazil size={16} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });
});

describe('FlagUK', () => {
  it('renders an svg with the default 32px size', () => {
    const { container } = render(<FlagUK />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('accepts a custom size', () => {
    const { container } = render(<FlagUK size={20} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '20');
  });
});
