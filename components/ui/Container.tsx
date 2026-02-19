import { cn } from '@/lib/utils';

/**
 * Container Component
 * Wrapper com max-width e padding responsivo
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export default function Container({
  children,
  className,
  size = 'lg',
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-container',
  };

  return (
    <div className={cn('mx-auto px-6', sizes[size], className)}>{children}</div>
  );
}
