// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolCard from './ToolCard';

const baseProps = {
  title: 'Box Shadow Generator',
  description: 'Generate CSS box shadows visually',
  href: '/tools/box-shadow',
  icon: '🎨',
  category: 'CSS',
};

describe('ToolCard', () => {
  it('renders the title, description, category and links to the tool', () => {
    render(<ToolCard {...baseProps} />);

    expect(screen.getByRole('heading', { name: baseProps.title })).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByText(baseProps.category)).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', baseProps.href);
  });

  it('renders the icon', () => {
    render(<ToolCard {...baseProps} />);
    expect(screen.getByText('🎨')).toBeInTheDocument();
  });
});
