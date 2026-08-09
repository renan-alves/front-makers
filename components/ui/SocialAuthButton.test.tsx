// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialAuthButton from './SocialAuthButton';

describe('SocialAuthButton', () => {
  it.each([
    ['google', 'Continue with Google'],
    ['linkedin', 'Continue with LinkedIn'],
    ['github', 'Continue with GitHub'],
  ] as const)('renders the correct label and aria-label for provider=%s', (provider, label) => {
    render(<SocialAuthButton provider={provider} />);
    const button = screen.getByRole('button', { name: label });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders exactly one inline svg icon per provider', () => {
    const { container } = render(<SocialAuthButton provider="google" />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<SocialAuthButton provider="github" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Continue with GitHub' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('merges a custom className', () => {
    render(<SocialAuthButton provider="linkedin" className="extra" />);
    expect(screen.getByRole('button', { name: 'Continue with LinkedIn' }).className).toContain('extra');
  });
});
