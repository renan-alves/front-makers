import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug, getRelatedArticles, getPublishedArticles } from '@/lib/articles';
import AdBanner from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

/**
 * Generate Static Params for all articles
 */
export async function generateStaticParams() {
  const articles = await getPublishedArticles('en');
  return articles.map((article) => ({
    slug: article.slug,
    locale: 'en',
  }));
}

/**
 * Generate Metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article not found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [article.category, 'frontend', 'web development'],
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

/**
 * Article Page - Individual article page
 */
export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, article.category, locale, 3);

  // JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name,
      email: article.author.email,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Frontmakers',
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-primary">
        {/* Header */}
        <header className="bg-secondary border-b border-light py-16">
          <div className="container-grid">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-secondary">
                  <li>
                    <Link
                      href={`/${locale}`}
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>→</li>
                  <li>
                    <Link
                      href={`/${locale}/articles`}
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      Articles
                    </Link>
                  </li>
                  <li>→</li>
                  <li className="text-primary">{article.category}</li>
                </ol>
              </nav>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-secondary mb-6 flex-wrap">
                <span className="px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
                  {article.category}
                </span>
                {article.publishedAt && (
                  <>
                    <time dateTime={article.publishedAt.toISOString()}>
                      {article.publishedAt.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                  </>
                )}
                <span>{article.readTime} min read</span>
              </div>

              {/* Title */}
              <h1 className="mb-6">{article.title}</h1>

              {/* Description */}
              <p className="text-xl text-secondary leading-relaxed">
                {article.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-8 pt-8 border-t border-light">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                  {article.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-primary">
                    {article.author.name}
                  </div>
                  <div className="text-sm text-secondary">{article.author.email}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container-grid py-12">
          <div className="max-w-3xl mx-auto">
            {/* Markdown Content */}
            <div className="prose prose-sm md:prose-base">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                  code: ({ children }) => <code className="bg-neutral-100 px-2 py-1 rounded text-sm">{children}</code>,
                  pre: ({ children }) => <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Ad Banner in the middle of content */}
            <div className="my-12">
              <AdBanner slot="article-content" />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-light">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/${locale}/articles?tag=${tag}`}
                      className="px-3 py-1 bg-neutral-100 text-primary rounded-full text-sm hover:bg-neutral-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-neutral-50 border-2 border-[var(--color-border)] rounded-xl">
              <h3 className="text-2xl font-bold mb-3 text-primary">
                Liked this article?
              </h3>
              <p className="text-secondary mb-6">
                Check out our practical tools to speed up your frontend development.
              </p>
              <Link href={`/${locale}/tools`} className="btn-primary">
                View Tools
              </Link>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-16 border-t border-light">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${locale}/articles/${related.slug}`}
                      className="card group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full">
                              {related.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg group-hover:text-[var(--color-primary)] transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-secondary text-sm mt-2">
                            {related.excerpt}
                          </p>
                        </div>
                        <span className="text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="container-grid py-12">
          <AdBanner slot="article-bottom" />
        </div>
      </article>
    </>
  );
}
