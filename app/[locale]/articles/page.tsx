import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import AdBanner from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'pt-br' ? 'Artigos' : 'Articles',
    description:
      locale === 'en'
        ? 'Technical articles about frontend development, CSS, JavaScript, TypeScript, React and Next.js.'
        : 'Artigos tecnicos sobre desenvolvimento frontend, CSS, JavaScript, TypeScript, React e Next.js.',
  };
}

/**
 * Articles Page - Article Listing
 */
export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  const articles = await getPublishedArticles(locale);

  const translations = {
    en: {
      title: 'Articles',
      subtitle: 'Practical and in-depth articles about modern frontend development. Learn CSS, JavaScript, TypeScript, React, Next.js and much more.',
      readMore: 'Read full article',
    },
    'pt-br': {
      title: 'Artigos',
      subtitle:
        'Artigos praticos e aprofundados sobre desenvolvimento frontend moderno. Aprenda CSS, JavaScript, TypeScript, React, Next.js e muito mais.',
      readMore: 'Ler artigo completo',
      empty: 'Nenhum artigo publicado ainda.',
      minRead: 'min de leitura',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl">
            <h1 className="mb-4">{t.title}</h1>
            <p className="text-xl text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container-grid py-12">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {articles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-secondary">
                {locale === 'pt-br' ? t.empty : 'No articles published yet.'}
              </p>
            </div>
          ) : (
            articles.map((article, index) => (
              <div key={article.slug}>
                {/* Article Card */}
                <article className="card group">
                  <div className="flex flex-col gap-4">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-secondary flex-wrap">
                      <span className="px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
                        {article.category}
                      </span>
                      {article.publishedAt && (
                        <>
                          <time dateTime={article.publishedAt.toISOString()}>
                            {article.publishedAt.toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {article.readTime}{' '}
                        {locale === 'en' ? 'min read' : t.minRead ?? 'de leitura'}
                      </span>
                    </div>

                    {/* Content */}
                    <Link href={`/${locale}/articles/${article.slug}`}>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-secondary text-lg leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold">
                        {article.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm text-secondary">
                        {article.author.name}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/${locale}/articles/${article.slug}`}
                      className="text-[var(--color-primary)] font-semibold flex items-center gap-2 hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      {t.readMore}
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>

                {/* Ad Banner every 2 articles */}
                {(index + 1) % 2 === 0 && index < articles.length - 1 && (
                  <div className="my-8">
                    <AdBanner slot="article-list" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
