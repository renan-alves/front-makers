// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ChevronDown from './ChevronDown';

describe('ChevronDown', () => {
  it('renders an accessible, decorative svg icon', () => {
    const { container } = render(<ChevronDown />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('forwards extra props such as className', () => {
    const { container } = render(<ChevronDown className="h-4 w-4" />);
    expect(container.querySelector('svg')).toHaveClass('h-4', 'w-4');
  });
});
