import Link from 'next/link';

/**
 * ToolCard Component
 * Card para exibir ferramenta na listagem
 */

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon,
  category,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="card group h-full flex flex-col hover:shadow-xl"
    >
      {/* Icon */}
      <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
        {icon}
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="text-xs px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
          {category}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
        {title}
      </h3>
      <p className="text-secondary mb-4 flex-1">{description}</p>

      {/* Arrow indicator */}
      <div className="text-[var(--color-primary)] font-semibold flex items-center gap-2">
        Usar ferramenta
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
