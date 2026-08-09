import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import HomeFeed from '@/components/home/HomeFeed';

type FeedFilter = 'recent' | 'trending' | 'most-read';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'pt-br' ? 'Artigos para desenvolvedores' : 'Articles for Developers',
    description:
      locale === 'pt-br'
        ? 'Plataforma aberta onde desenvolvedores compartilham artigos praticos e aprofundados sobre qualquer tema.'
        : 'Open publishing platform where developers share practical and in-depth articles on any topic.',
  };
}

/**
 * Home Page Component
 * Main landing page of Frontmakers
 */
export default async function Home({ params, searchParams }: Props) {
  const { locale } = await params;
  const { filter } = await searchParams;
  const t =
    locale === 'pt-br'
      ? {
          heroTitle: 'Artigos escritos por desenvolvedores, para desenvolvedores.',
          heroSubtitle:
            'Uma plataforma editorial aberta onde qualquer dev pode escrever sobre qualquer tema e construir discussoes estruturadas em torno de ideias.',
          filters: {
            recent: 'Recentes',
            trending: 'Em alta',
            mostRead: 'Mais lidos',
          },
          emptyTitle: 'Sem artigos ainda',
          emptySubtitle: 'As publicacoes comecam em breve.',
          meta: {
            draft: 'Rascunho',
            minRead: 'min de leitura',
            reads: 'leituras',
          },
          sidebarLabel: 'Contribua',
          sidebarTitle: 'Envie seu artigo',
          sidebarBody:
            'Compartilhe aprendizados praticos com a comunidade e ajude outros desenvolvedores a aprender mais rapido.',
          sidebarCta: 'Enviar artigo',
        }
      : {
          heroTitle: 'Articles written by developers, for developers.',
          heroSubtitle:
            'An open editorial platform where any dev can write about any topic and build structured discussions around ideas.',
          filters: {
            recent: 'Recent',
            trending: 'Trending',
            mostRead: 'Most read',
          },
          emptyTitle: 'No articles yet',
          emptySubtitle: 'Publishing starts soon.',
          meta: {
            draft: 'Draft',
            minRead: 'min read',
            reads: 'reads',
          },
          sidebarLabel: 'Contribute',
          sidebarTitle: 'Submit your article',
          sidebarBody:
            'Share practical insights with the community and help other developers learn faster.',
          sidebarCta: 'Submit Article',
        };
  const selectedFilter: FeedFilter =
    filter === 'trending' || filter === 'most-read' ? filter : 'recent';

  const articles = await getPublishedArticles(locale);

  const scoredArticles = articles.map((article, index) => {
    const baseScore = article.readTime * 3 + (article.tags?.length ?? 0) * 5;
    const deterministicBoost = (index + article.slug.length) % 17;
    const popularityScore = baseScore + deterministicBoost;
    const reads = 1000 + popularityScore * 42;

    return {
      ...article,
      popularityScore,
      reads,
    };
  });

  const sortedArticles = [...scoredArticles].sort((a, b) => {
    if (selectedFilter === 'most-read') {
      return b.reads - a.reads;
    }

    if (selectedFilter === 'trending') {
      return b.popularityScore - a.popularityScore;
    }

    return new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
  });

  return (
    <HomeFeed
      selectedFilter={selectedFilter}
      labels={{
        heroTitle: t.heroTitle,
        heroSubtitle: t.heroSubtitle,
        filters: t.filters,
      }}
      list={
        sortedArticles.length === 0 ? (
          <div key="home-feed-empty" className="card text-center">
            <h2 className="text-2xl mb-2">{t.emptyTitle}</h2>
            <p className="text-secondary">{t.emptySubtitle}</p>
          </div>
        ) : (
          sortedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="card group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-secondary">
                  <span>{article.author.name}</span>
                  <span>•</span>
                  <time dateTime={article.publishedAt?.toISOString() ?? ''}>
                    {article.publishedAt
                      ? article.publishedAt.toLocaleDateString(
                          locale === 'pt-br' ? 'pt-BR' : 'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )
                      : t.meta.draft}
                  </time>
                  <span>•</span>
                  <span>
                    {article.readTime} {t.meta.minRead}
                  </span>
                  <span>•</span>
                  <span>
                    {article.reads.toLocaleString()} {t.meta.reads}
                  </span>
                </div>

                <h2 className="text-2xl font-bold group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h2>

                <p className="text-secondary text-lg leading-relaxed">
                  {article.excerpt}
                </p>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span
                        key={`${article.id}-tag-${tag}-${tagIndex}`}
                        className="px-2.5 py-1 text-xs rounded-full bg-[var(--color-accent-blue-soft)] text-accent-blue border border-[var(--color-accent-blue)] border-opacity-30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))
        )
      }
      aside={
        <aside key="home-sidebar" className="lg:sticky lg:top-24">
          <div className="card space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                {t.sidebarLabel}
              </span>
              <h3 className="text-2xl font-bold mt-2">{t.sidebarTitle}</h3>
            </div>
            <p className="text-secondary">{t.sidebarBody}</p>
            <Link href="/submit" className="btn-primary text-center">
              {t.sidebarCta}
            </Link>
          </div>
        </aside>
      }
    />
  );
}
