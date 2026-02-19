import Link from 'next/link';

/**
 * ArticleCard Component
 * Card para exibir preview de artigo
 */

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

export default function ArticleCard({
  slug,
  title,
  description,
  category,
  date,
  readTime,
  author,
}: ArticleCardProps) {
  return (
    <article className="card group">
      <div className="flex flex-col gap-4">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-secondary">
          <span className="px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
            {category}
          </span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{readTime} de leitura</span>
        </div>

        {/* Content */}
        <Link href={`/articles/${slug}`}>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
            {title}
          </h2>
        </Link>

        <p className="text-secondary text-lg leading-relaxed">{description}</p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2">
          <div className="text-2xl">{author.avatar}</div>
          <div className="text-sm text-secondary">{author.name}</div>
        </div>

        {/* Read More Link */}
        <Link
          href={`/articles/${slug}`}
          className="text-[var(--color-primary)] font-semibold flex items-center gap-2 hover:text-[var(--color-primary-dark)] transition-colors"
        >
          Ler artigo completo
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
