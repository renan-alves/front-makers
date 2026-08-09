import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug, getRelatedArticles, getPublishedArticles } from '@/lib/articles';
import {
  getDiscussionCountForArticle,
  getThreadsByArticleSlug,
} from '@/lib/discussions';
import type { DiscussionSort } from '@/types';
import AdBanner from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{ tab?: string; sort?: string }>;
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles('en');
  return articles.map((article) => ({
    slug: article.slug,
    locale: 'en',
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: locale === 'pt-br' ? 'Artigo nao encontrado' : 'Article not found',
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

export default async function ArticlePage({ params, searchParams }: Props) {
  const { slug, locale } = await params;
  const { tab, sort } = await searchParams;
  const t =
    locale === 'pt-br'
      ? {
          home: 'Inicio',
          articles: 'Artigos',
          minRead: 'min de leitura',
          discussions: 'Discussoes',
          articleTab: 'Artigo',
          discussionsTab: 'Discussoes',
          readingMode:
            'Voce esta no modo leitura. Abra a aba de discussoes para explorar threads sobre este artigo.',
          newDiscussion: 'Iniciar nova discussao',
          sortBy: 'Ordenar por:',
          sortRelevant: 'Relevancia',
          sortRecent: 'Mais recentes',
          sortTop: 'Mais votadas',
          noThreads: 'Ainda nao existem threads para este artigo.',
          replies: 'respostas',
          votes: 'votos',
          related: 'Artigos relacionados',
        }
      : {
          home: 'Home',
          articles: 'Articles',
          minRead: 'min read',
          discussions: 'Discussions',
          articleTab: 'Article',
          discussionsTab: 'Discussions',
          readingMode:
            'You are in reading mode. Open the discussions tab to explore threads about this article.',
          newDiscussion: 'Start new discussion',
          sortBy: 'Sort by:',
          sortRelevant: 'Relevance',
          sortRecent: 'Most recent',
          sortTop: 'Top voted',
          noThreads: 'There are no threads for this article yet.',
          replies: 'replies',
          votes: 'votes',
          related: 'Related Articles',
        };

  const selectedTab = tab === 'discussions' ? 'discussions' : 'article';
  const selectedSort: DiscussionSort =
    sort === 'recent' || sort === 'top' ? sort : 'relevant';

  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, article.category, locale, 3);
  const discussionsCount = getDiscussionCountForArticle(article.slug);
  const threads = getThreadsByArticleSlug(article.slug, selectedSort);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-primary">
        <header className="bg-secondary border-b border-light section-padding">
          <div className="container-grid">
            <div className="max-w-[720px] mx-auto">
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-secondary flex-wrap">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      {t.home}
                    </Link>
                  </li>
                  <li>→</li>
                  <li>
                    <Link
                      href="/articles"
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      {t.articles}
                    </Link>
                  </li>
                  <li>→</li>
                  <li className="text-primary">{article.category}</li>
                </ol>
              </nav>

              <div className="flex items-center gap-4 text-sm text-secondary mb-6 flex-wrap">
                <span className="px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
                  {article.category}
                </span>
                {article.publishedAt && (
                  <>
                    <time dateTime={article.publishedAt.toISOString()}>
                      {article.publishedAt.toLocaleDateString(
                        locale === 'pt-br' ? 'pt-BR' : 'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </time>
                    <span>•</span>
                  </>
                )}
                <span>
                  {article.readTime} {t.minRead}
                </span>
              </div>

              <h1 className="mb-6">{article.title}</h1>

              <p className="text-xl text-secondary leading-relaxed">{article.excerpt}</p>

              <div className="flex items-center gap-3 mt-8 pt-8 border-t border-light">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                  {article.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-primary">{article.author.name}</div>
                  <div className="text-sm text-secondary">{article.author.email}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="section-padding">
          <div className="container-grid">
            <div className="max-w-[720px] mx-auto">
              <div className="prose prose-sm md:prose-base">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                    code: ({ children }) => <code className="bg-neutral-100 px-2 py-1 rounded text-sm">{children}</code>,
                    pre: ({ children }) => (
                      <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              <div className="my-12">
                <AdBanner slot="article-content" />
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-light">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/articles?tag=${tag}`}
                        className="px-3 py-1 bg-neutral-100 text-primary rounded-full text-sm hover:bg-neutral-200 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <section className="mt-20 pt-10 border-t border-light" aria-labelledby="discussions-title">
                <div className="space-y-6">
                  <h2 id="discussions-title" className="text-3xl font-bold">
                    {t.discussions}
                  </h2>

                  <nav className="flex items-center gap-2 border-b border-light pb-3" aria-label="Article tabs">
                    <Link
                      href={`/articles/${article.slug}?tab=article`}
                      className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                        selectedTab === 'article'
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'border-light text-secondary hover:text-primary'
                      }`}
                    >
                      {t.articleTab}
                    </Link>
                    <Link
                      href={`/articles/${article.slug}?tab=discussions&sort=${selectedSort}`}
                      className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                        selectedTab === 'discussions'
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                          : 'border-light text-secondary hover:text-primary'
                      }`}
                    >
                      {t.discussionsTab} ({discussionsCount})
                    </Link>
                  </nav>

                  {selectedTab === 'article' ? (
                    <div className="card">
                      <p className="text-secondary">
                        {t.readingMode}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <Link
                          href={`/articles/${article.slug}?tab=discussions&new=1`}
                          className="btn-primary text-center"
                        >
                          {t.newDiscussion}
                        </Link>

                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="text-secondary mr-1">{t.sortBy}</span>
                          <Link
                            href={`/articles/${article.slug}?tab=discussions&sort=relevant`}
                            className={`px-3 py-1.5 rounded-full border ${
                              selectedSort === 'relevant'
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'border-light text-secondary'
                            }`}
                          >
                            {t.sortRelevant}
                          </Link>
                          <Link
                            href={`/articles/${article.slug}?tab=discussions&sort=recent`}
                            className={`px-3 py-1.5 rounded-full border ${
                              selectedSort === 'recent'
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'border-light text-secondary'
                            }`}
                          >
                            {t.sortRecent}
                          </Link>
                          <Link
                            href={`/articles/${article.slug}?tab=discussions&sort=top`}
                            className={`px-3 py-1.5 rounded-full border ${
                              selectedSort === 'top'
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'border-light text-secondary'
                            }`}
                          >
                            {t.sortTop}
                          </Link>
                        </div>
                      </div>

                      {threads.length === 0 ? (
                        <div className="card text-center">
                          <p className="text-secondary">{t.noThreads}</p>
                        </div>
                      ) : (
                        <ol className="space-y-4">
                          {threads.map((thread) => (
                            <li key={thread.id}>
                              <Link
                                href={`/t/${thread.id}`}
                                className="card block hover:border-[var(--color-primary)]"
                              >
                                <div className="space-y-3">
                                  <h3 className="text-xl font-bold">{thread.title}</h3>

                                  <div className="flex flex-wrap items-center gap-2 text-sm text-secondary">
                                    <span>{thread.author.name}</span>
                                    <span>•</span>
                                    <time dateTime={thread.createdAt}>
                                      {new Date(thread.createdAt).toLocaleDateString(
                                        locale === 'pt-br' ? 'pt-BR' : 'en-US',
                                        {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        }
                                      )}
                                    </time>
                                    <span>•</span>
                                    <span>{thread.repliesCount} {t.replies}</span>
                                    <span>•</span>
                                    <span>{thread.votes} {t.votes}</span>
                                  </div>

                                  <p className="text-secondary">
                                    {thread.body.length > 160
                                      ? `${thread.body.slice(0, 160)}...`
                                      : thread.body}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {relatedArticles.length > 0 && (
                <div className="mt-16 pt-16 border-t border-light">
                  <h2 className="text-2xl font-bold mb-8">{t.related}</h2>
                  <div className="grid gap-6">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/articles/${related.slug}`}
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
                            <p className="text-secondary text-sm mt-2">{related.excerpt}</p>
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
        </div>

        <div className="container-grid py-12">
          <AdBanner slot="article-bottom" />
        </div>
      </article>
    </>
  );
}
