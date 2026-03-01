'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Props {
  params: Promise<{ locale: string }>;
}

type AccountArticle = {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  category: string;
  updatedAt: string;
  publishedAt: string | null;
};

export default function AccountArticlesPage({ params }: Props) {
  const { locale } = use(params);
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [articles, setArticles] = useState<AccountArticle[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const t =
    locale === 'pt-br'
      ? {
          breadcrumb: 'Conta',
          title: 'Seus artigos',
          subtitle:
            'Revise seus artigos, envie edicoes ou remova o que nao quiser mais compartilhar.',
          sectionTitle: 'Gestao de artigos',
          sectionSubtitle: 'Mantenha seu conteudo atualizado.',
          create: 'Criar novo artigo',
          loading: 'Carregando artigos...',
          empty:
            'Voce ainda nao tem artigos. Use o botao acima para enviar um novo.',
          view: 'Ver',
          submitChange: 'Enviar alteracao',
          delete: 'Excluir',
          updated: 'Atualizado',
          deleteConfirm: 'Excluir este artigo? Esta acao nao pode ser desfeita.',
          deleteFailed: 'Falha ao excluir artigo.',
          loadFailed: 'Falha ao carregar artigos.',
          status: { draft: 'Rascunho', published: 'Publicado' },
        }
      : {
          breadcrumb: 'Account',
          title: 'Your articles',
          subtitle:
            'Review your articles, submit edits, or remove what you no longer want to share.',
          sectionTitle: 'Article management',
          sectionSubtitle: 'Keep your content up to date.',
          create: 'Create new article',
          loading: 'Loading articles...',
          empty: 'You do not have any articles yet. Use the button above to submit a new one.',
          view: 'View',
          submitChange: 'Submit change',
          delete: 'Delete',
          updated: 'Updated',
          deleteConfirm: 'Delete this article? This action cannot be undone.',
          deleteFailed: 'Failed to delete article.',
          loadFailed: 'Failed to load articles.',
          status: { draft: 'Draft', published: 'Published' },
        };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('frontmakersUser');
    if (!stored) {
      window.localStorage.setItem('frontmakersRedirect', `/${locale}/account/articles`);
      router.replace(`/${locale}/auth`);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { id: string };
      setUserId(parsed.id);
    } catch {
      window.localStorage.removeItem('frontmakersUser');
      window.localStorage.setItem('frontmakersRedirect', `/${locale}/account/articles`);
      router.replace(`/${locale}/auth`);
      return;
    }
  }, [locale, router]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const controller = new AbortController();
    const loadArticles = async () => {
      setStatus('loading');
      try {
        const response = await fetch(`/api/account/articles?userId=${userId}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load articles.');
        }
        setArticles(Array.isArray(data) ? data : []);
        setStatus('idle');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : t.loadFailed);
      }
    };

    loadArticles();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const handleDeleteArticle = async (articleId: string) => {
    if (!userId) {
      return;
    }

    const confirmed = window.confirm(t.deleteConfirm);
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/account/articles/${articleId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete article.');
      }
      setArticles((previous) => previous.filter((article) => article.id !== articleId));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t.deleteFailed);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light section-padding">
        <div className="container-grid">
          <div className="max-w-4xl space-y-3">
            <div className="text-sm text-secondary">
              <Link href={`/${locale}/account`} className="hover:text-primary">
                {t.breadcrumb}
              </Link>{' '}
              / {t.title}
            </div>
            <h1>{t.title}</h1>
            <p className="text-lg text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="card card-static space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{t.sectionTitle}</h2>
                <p className="text-sm text-secondary">{t.sectionSubtitle}</p>
              </div>
              <Button type="button" onClick={() => router.push(`/${locale}/submit`)}>
                {t.create}
              </Button>
            </div>

            {status === 'loading' && (
              <p className="text-sm text-secondary">{t.loading}</p>
            )}

            {status === 'error' && (
              <p className="text-sm text-[var(--color-error)]">{errorMessage}</p>
            )}

            {status === 'idle' && articles.length === 0 && (
              <div className="rounded-lg border border-dashed border-light p-4 text-sm text-secondary">
                {t.empty}
              </div>
            )}

            {status === 'idle' && articles.length > 0 && (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="rounded-lg border border-light p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <div className="text-xs text-secondary flex flex-wrap items-center gap-2 mt-1">
                          <span className="px-2 py-1 rounded-full bg-[var(--color-accent-blue-soft)] text-accent-blue font-semibold">
                            {article.status === 'PUBLISHED'
                              ? t.status.published
                              : t.status.draft}
                          </span>
                          <span>{article.category}</span>
                          <span>
                            {t.updated}{' '}
                            {new Date(article.updatedAt).toLocaleDateString(
                              locale === 'pt-br' ? 'pt-BR' : 'en-US'
                            )}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/articles/${article.slug}`}
                        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                      >
                        {t.view}
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/submit?articleId=${article.id}`}
                        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                      >
                        {t.submitChange}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-sm font-semibold text-[var(--color-error)] hover:underline"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
