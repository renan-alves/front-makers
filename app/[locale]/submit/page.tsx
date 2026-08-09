'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { QuillEditor } from '@/components/ui/QuillEditor';

/**
 * Submit Article Page
 * 
 * Allows community members to submit articles for review
 */
interface Props {
  params: Promise<{ locale: string }>;
}

export default function SubmitPage({ params }: Props) {
  const { locale } = use(params);
  const t =
    locale === 'pt-br'
      ? {
          successTitle: 'Artigo enviado com sucesso!',
          successBody:
            'Obrigado pelo envio. Nossa equipe vai revisar seu artigo e retornar por email em 3 a 5 dias uteis.',
          successHome: 'Ir para a Home',
          successAnother: 'Enviar outro artigo',
          breadcrumbHome: 'Inicio',
          breadcrumbSubmit: 'Enviar artigo',
          title: 'Envie seu artigo',
          subtitle:
            'Compartilhe conhecimento com a comunidade Frontmakers. Envie seu artigo para revisao e ajude devs a aprender novas habilidades.',
          guidelinesTitle: 'Diretrizes de envio',
          guidelines: [
            'Artigos devem ter pelo menos 500 palavras',
            'O conteudo deve ser original e nao publicado em outro lugar',
            'Use Markdown para melhor legibilidade',
            'Inclua exemplos de codigo quando relevante',
            'O tempo de revisao costuma ser de 3 a 5 dias uteis',
          ],
          authorTitle: 'Informacoes do autor',
          yourName: 'Seu nome *',
          yourEmail: 'Seu email *',
          detailsTitle: 'Detalhes do artigo',
          articleTitle: 'Titulo do artigo *',
          category: 'Categoria',
          selectCategory: 'Selecione uma categoria',
          tags: 'Tags (separadas por virgula)',
          content: 'Conteudo do artigo (Texto rico) *',
          minChars: 'Minimo de 100 caracteres. Use o editor para formatar.',
          editorTitle: 'Modo de escrita',
          editorHint: 'Use o editor visual para estruturar seu texto e o conteudo sera salvo com formatação.',
          submit: 'Enviar artigo',
          submitting: 'Enviando...',
          cancel: 'Cancelar',
          placeholders: {
            name: 'Joao Silva',
            email: 'joao@exemplo.com',
            title: 'ex: Tecnicas avancadas de CSS Grid para 2026',
            tags: 'css, grid, layout',
          },
          sample: 'Comece escrevendo seu artigo aqui. Adicione títulos, listas, destaque e blocos de código para deixar o conteúdo mais claro.',
          errors: {
            submit: 'Falha ao enviar artigo',
            generic: 'Ocorreu um erro',
            duplicateTags: 'Não é possível usar tags duplicadas.',
          },
        }
      : {
          successTitle: 'Article Submitted Successfully!',
          successBody:
            'Thank you for your submission. Our team will review your article and get back to you via email within 3-5 business days.',
          successHome: 'Go to Homepage',
          successAnother: 'Submit Another Article',
          breadcrumbHome: 'Home',
          breadcrumbSubmit: 'Submit Article',
          title: 'Submit Your Article',
          subtitle:
            'Share your knowledge with the Frontmakers community. Submit your article for review and help developers learn new skills.',
          guidelinesTitle: 'Submission Guidelines',
          guidelines: [
            'Articles should be at least 500 words',
            'Content must be original and not published elsewhere',
            'Use Markdown formatting for better readability',
            'Include code examples when relevant',
            'Review time is typically 3-5 business days',
          ],
          authorTitle: 'Author Information',
          yourName: 'Your Name *',
          yourEmail: 'Your Email *',
          detailsTitle: 'Article Details',
          articleTitle: 'Article Title *',
          category: 'Category',
          selectCategory: 'Select a category',
          tags: 'Tags (comma-separated)',
          content: 'Article Content *',
          minChars: 'Minimum 100 characters. Use the editor to format your content.',
          editorTitle: 'Writing mode',
          editorHint: 'Use the rich editor to structure your writing and save your content with formatting.',
          submit: 'Submit Article',
          submitting: 'Submitting...',
          cancel: 'Cancel',
          placeholders: {
            name: 'John Doe',
            email: 'john@example.com',
            title: 'e.g., Advanced CSS Grid Techniques for 2026',
            tags: 'css, grid, layout',
          },
          sample: 'Start writing your article here. Add headings, lists, emphasis, and code snippets to make the content clearer.',
          errors: {
            submit: 'Failed to submit article',
            generic: 'An error occurred',
            duplicateTags: 'Duplicate tags are not allowed.',
          },
        };
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    category: '',
    tags: '',
  });
  const [prefilledAuthor, setPrefilledAuthor] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedUser = window.localStorage.getItem('frontmakersUser');
    if (!storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as { name?: string; email?: string };
      const hasNameOrEmail = Boolean(parsedUser.name || parsedUser.email);
      if (hasNameOrEmail) {
        setPrefilledAuthor(true);
      }
      setFormData((current) => ({
        ...current,
        authorName: current.authorName || parsedUser.name || '',
        authorEmail: current.authorEmail || parsedUser.email || '',
      }));
    } catch {
      // Ignore malformed user data and keep the form empty.
    }
  }, []);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [tagsError, setTagsError] = useState('');
  const contentLength = formData.content.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim().length;

  const tagsPreview = formData.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'tags') {
      const normalizedTags = value
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
      const hasDuplicateTags = new Set(normalizedTags).size !== normalizedTags.length;
      setTagsError(hasDuplicateTags ? t.errors.duplicateTags : '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const normalizedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    if (!formData.category) {
      setStatus('error');
      setErrorMessage(t.errors.generic);
      return;
    }

    const hasDuplicateTags = new Set(normalizedTags).size !== normalizedTags.length;

    if (hasDuplicateTags) {
      setStatus('error');
      setTagsError(t.errors.duplicateTags);
      setErrorMessage(t.errors.duplicateTags);
      return;
    }

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: normalizedTags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.errors.submit);
      }

      setStatus('success');
      setFormData({
        title: '',
        content: '',
        authorName: '',
        authorEmail: '',
        category: '',
        tags: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t.errors.generic);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center py-20">
        <div className="container-grid">
          <div className="max-w-2xl mx-auto bg-primary p-12 rounded-2xl border-2 border-[var(--color-border)] text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold mb-4">{t.successTitle}</h1>
            <p className="text-lg text-secondary mb-8">
              {t.successBody}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn-primary">
                {t.successHome}
              </Link>
              <button
                onClick={() => setStatus('idle')}
                className="btn-secondary"
              >
                {t.successAnother}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-secondary">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li>→</li>
                <li className="text-primary font-semibold">{t.breadcrumbSubmit}</li>
              </ol>
            </nav>

            <h1 className="mb-4">{t.title}</h1>
            <p className="text-xl text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-grid py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Error Message */}
            {status === 'error' && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="p-6 bg-neutral-50 border-2 border-[var(--color-border)] rounded-xl">
              <h3 className="font-bold text-lg mb-2">{t.guidelinesTitle}</h3>
              <ul className="text-secondary space-y-2 text-sm">
                {t.guidelines.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Author Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">{t.authorTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="authorName" className="block text-sm font-semibold mb-2">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder={t.placeholders.name}
                    disabled={prefilledAuthor}
                  />
                </div>
                <div>
                  <label htmlFor="authorEmail" className="block text-sm font-semibold mb-2">
                    {t.yourEmail}
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder={t.placeholders.email}
                    disabled={prefilledAuthor}
                  />
                </div>
              </div>
            </div>

            {/* Article Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">{t.detailsTitle}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2">
                    {t.articleTitle}
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder={t.placeholders.title}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold mb-2">
                      {t.category}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    >
                      <option value="">{t.selectCategory}</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Design">Design</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Career">Career</option>
                      <option value="Opinion">Opinion</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-semibold mb-2">
                      {t.tags}
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className={`input w-full ${tagsError ? 'border-red-500' : ''}`}
                      placeholder={t.placeholders.tags}
                      aria-invalid={Boolean(tagsError)}
                      aria-describedby="tags-error"
                    />
                    {tagsError && (
                      <p id="tags-error" className="mt-2 text-sm text-red-600">
                        {tagsError}
                      </p>
                    )}
                    {tagsPreview.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tagsPreview.map((tag) => (
                          <span key={tag} className="rounded-full border border-[var(--color-border)] bg-secondary px-3 py-1 text-sm text-primary">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold mb-2">
                    {t.content}
                  </label>
                  <div className="mb-3 rounded-xl border border-light bg-primary p-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-secondary font-medium">{t.editorTitle}</span>
                    </div>
                    <p className="mt-2 text-sm text-secondary">{t.editorHint}</p>
                  </div>
                  <div className="rounded-xl border border-light bg-primary p-3">
                    <QuillEditor
                      value={formData.content}
                      onChange={(value: string) => setFormData({ ...formData, content: value })}
                      placeholder={t.sample}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <p className="text-secondary">
                      {t.minChars}
                    </p>
                    <span className={`font-semibold ${contentLength >= 100 ? 'text-[var(--color-primary)]' : 'text-[var(--color-error)]'}`}>
                      {contentLength} characters
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-secondary">
                    O texto será formatado diretamente no editor enquanto você digita.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
              >
                {status === 'submitting' ? t.submitting : t.submit}
              </button>
              <Link
                href="/"
                className="text-secondary hover:text-primary transition-colors"
              >
                {t.cancel}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
