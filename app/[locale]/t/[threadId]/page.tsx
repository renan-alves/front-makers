import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getRepliesByThreadId, getThreadById } from '@/lib/discussions';

interface Props {
  params: Promise<{ locale: string; threadId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { threadId } = await params;
  const thread = getThreadById(threadId);

  if (!thread) {
    return {
      title: 'Thread not found',
    };
  }

  return {
    title: thread.title,
    description: thread.body,
  };
}

export default async function ThreadPage({ params }: Props) {
  const { locale, threadId } = await params;
  const thread = getThreadById(threadId);

  if (!thread) {
    notFound();
  }

  const replies = getRepliesByThreadId(threadId);

  return (
    <main className="min-h-screen bg-primary section-padding">
      <div className="container-grid">
        <div className="max-w-[720px] mx-auto space-y-10">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-secondary flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link
                  href={`/articles/${thread.articleSlug}?tab=discussions`}
                  className="hover:text-primary transition-colors"
                >
                  Discussões
                </Link>
              </li>
              <li>→</li>
              <li className="text-primary">Thread</li>
            </ol>
          </nav>

          <article className="card space-y-6">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-secondary flex-wrap">
                <span>{thread.author.name}</span>
                <span>•</span>
                <time dateTime={thread.createdAt}>
                  {new Date(thread.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{thread.votes} votos</span>
                <span>•</span>
                <span>{thread.repliesCount} respostas</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{thread.title}</h1>
            </header>

            <p className="text-lg text-secondary leading-relaxed">{thread.body}</p>

            <div className="flex items-center gap-2 pt-2">
              <button className="px-3 py-2 border border-light rounded-lg text-sm font-semibold hover:border-[var(--color-primary)] transition-colors">
                ▲ {thread.votes}
              </button>
              <button className="px-3 py-2 border border-light rounded-lg text-sm font-semibold hover:border-[var(--color-primary)] transition-colors">
                ▼
              </button>
            </div>
          </article>

          <section className="space-y-4" aria-labelledby="replies-title">
            <h2 id="replies-title" className="text-2xl font-bold">
              Respostas
            </h2>

            {replies.length === 0 ? (
              <div className="card">
                <p className="text-secondary">Ainda não há respostas para esta discussão.</p>
              </div>
            ) : (
              <ol className="space-y-4">
                {replies.map((reply) => (
                  <li key={reply.id}>
                    <article
                      className={`card space-y-4 ${
                        reply.isBestAnswer
                          ? 'border-[var(--color-success)] bg-[var(--color-success-soft)]'
                          : ''
                      }`}
                    >
                      <header className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-secondary flex-wrap">
                          <span>{reply.author.name}</span>
                          <span>•</span>
                          <time dateTime={reply.createdAt}>
                            {new Date(reply.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>

                        {reply.isBestAnswer && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-success)] text-white">
                            Melhor resposta
                          </span>
                        )}
                      </header>

                      <p className="text-secondary leading-relaxed">{reply.body}</p>

                      <div className="flex items-center gap-2">
                        <button className="px-3 py-2 border border-light rounded-lg text-sm font-semibold hover:border-[var(--color-primary)] transition-colors">
                          ▲ {reply.votes}
                        </button>
                        <button className="px-3 py-2 border border-light rounded-lg text-sm font-semibold hover:border-[var(--color-primary)] transition-colors">
                          ▼
                        </button>
                        {!reply.isBestAnswer && (
                          <button className="ml-auto px-3 py-2 border border-light rounded-lg text-sm font-semibold hover:border-[var(--color-success)] transition-colors">
                            Marcar melhor resposta
                          </button>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
