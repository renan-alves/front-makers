import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import ArticleCard from '@/components/article/ArticleCard';
import ToolCard from '@/components/tools/ToolCard';
import AdBanner from '@/components/ads/AdBanner';
import SocialAuthButton from '@/components/ui/SocialAuthButton';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'pt-br' ? 'Sistema de Design' : 'Design System',
    description:
      locale === 'pt-br'
        ? 'Pagina de referencia visual para os componentes Frontmakers.'
        : 'Visual reference page for all Frontmakers components.',
  };
}

export default async function DesignSystemPage({ params }: Props) {
  const { locale } = await params;
  const t =
    locale === 'pt-br'
      ? {
          title: 'Sistema de Design',
          subtitle: 'Pagina de revisao visual com todos os componentes atuais do projeto.',
          inventory: 'Inventario de componentes',
          typography: 'Tipografia',
          headings: 'Titulo',
          body: 'Texto base padrao. Este paragrafo demonstra a altura de linha e cor usadas no projeto.',
          secondary: 'Texto secundario para informacoes de apoio ou menos destacadas.',
          muted: 'Texto atenuado para labels auxiliares e metadados.',
          small: 'Texto pequeno para contextos compactos.',
          proseTitle: 'Exemplo de prosa',
          proseBody:
            'Este exemplo usa os estilos de prosa do projeto para conteudo tipo artigo, incluindo espaco, ritmo e legibilidade.',
          proseList: [
            'Espacamento vertical consistente',
            'Altura de linha legivel',
            'Hierarquia de titulos equilibrada',
          ],
          proseQuote:
            'Uma boa tipografia ajuda as pessoas a ler, entender e confiar na interface mais rapido.',
          inlineCode: 'Exemplo de codigo inline:',
          spacing: 'Espacamento',
          borders: 'Bordas e raio',
          borderStyles: 'Estilos de borda',
          borderLight1: 'Borda 1px · clara',
          borderLight2: 'Borda 2px · clara',
          borderDark: 'Borda 1px · escura',
          radius: 'Escala de raio',
          shadows: 'Sombras',
          breadcrumb: 'Navegacao · Breadcrumb',
          home: 'Inicio',
          articles: 'Artigos',
          submit: 'Enviar artigo',
          feedback: 'Feedback · Badges e dicas',
          badgePrimary: 'Primario',
          badgeSuccess: 'Sucesso',
          badgeWarning: 'Alerta',
          badgeError: 'Erro',
          tipsTitle: 'Caixa de dicas',
          tipsList: [
            'Mantenha o espacamento consistente usando a escala do projeto',
            'Prefira utilitarios semanticos para estados',
            'Reaproveite cards e badges para montar UI rapidamente',
          ],
          infoTitle: 'Chamada informativa',
          infoBody: 'Use este padrao para orientacoes curtas, limites e ajuda contextual.',
          codeTitle: 'Codigo · Snippet e bloco',
          inlineSnippet: 'Exemplo de snippet inline:',
          formUtils: 'Utilitarios de formulario',
          input: 'Input',
          select: 'Select',
          textarea: 'Textarea',
          typeHere: 'Digite aqui...',
          textareaValue: 'Uma nota rapida sobre consistencia visual...',
          utilityPatterns: 'Padroes utilitarios · Links, divisor, elevacao',
          primaryLink: 'Link primario',
          secondaryLink: 'Link secundario',
          elevation1: 'Elevacao 1',
          elevation2: 'Elevacao 2',
          elevation3: 'Elevacao 3',
          container: 'UI · Container',
          containerSize: 'Tamanho do container',
          button: 'UI · Button',
          btnPrimarySm: 'Primario pequeno',
          btnPrimaryMd: 'Primario medio',
          btnPrimaryLg: 'Primario grande',
          btnSecondary: 'Secundario',
          btnOutline: 'Contorno',
          btnGhost: 'Ghost',
          btnDisabled: 'Desabilitado',
          social: 'UI · SocialAuthButton',
          toolCard: 'Conteudo · ToolCard',
          articleCard: 'Conteudo · ArticleCard',
          ads: 'Ads · AdBanner',
          layoutPreview: 'Layout · Preview de Header e Footer',
          toolCards: [
            {
              title: 'Biblioteca de estudos de caso',
              description: 'Explore artigos curados pela comunidade.',
              category: 'Conteudo',
            },
            {
              title: 'Resumo semanal',
              description: 'Acompanhe os insights frontend mais praticos.',
              category: 'Conteudo',
            },
            {
              title: 'Destaques da comunidade',
              description: 'Selecao dos artigos mais lidos.',
              category: 'Conteudo',
            },
          ],
          articleSamples: [
            {
              title: 'Guia pratico de CSS Grid',
              description:
                'Um passo a passo pratico para criar layouts robustos com CSS Grid.',
            },
            {
              title: 'Padroes de performance em Next.js',
              description:
                'Padroes simples para melhorar performance e percepcao de velocidade em apps Next.js.',
            },
          ],
        }
      : {
          title: 'Design System',
          subtitle: 'Visual review page with all current project components.',
          inventory: 'Component Inventory',
          typography: 'Typography',
          headings: 'Heading',
          body:
            'Body text default. This paragraph demonstrates the base line-height and text color used across the project.',
          secondary: 'Secondary text for supportive or less prominent information.',
          muted: 'Muted text utility for helper labels and metadata.',
          small: 'Small text for compact UI contexts.',
          proseTitle: 'Prose Sample',
          proseBody:
            'This sample uses the project prose styles for article-like content, including spacing, rhythm, and readability.',
          proseList: [
            'Consistent vertical spacing',
            'Readable line-height',
            'Balanced heading hierarchy',
          ],
          proseQuote:
            'Good typography helps users scan, understand and trust the interface faster.',
          inlineCode: 'Inline code style example:',
          spacing: 'Spacing',
          borders: 'Borders & Radius',
          borderStyles: 'Border Styles',
          borderLight1: 'Border 1px · light',
          borderLight2: 'Border 2px · light',
          borderDark: 'Border 1px · dark',
          radius: 'Radius Scale',
          shadows: 'Shadows',
          breadcrumb: 'Navigation · Breadcrumb',
          home: 'Home',
          articles: 'Articles',
          submit: 'Submit Article',
          feedback: 'Feedback · Badges & Tips',
          badgePrimary: 'Primary',
          badgeSuccess: 'Success',
          badgeWarning: 'Warning',
          badgeError: 'Error',
          tipsTitle: 'Tips Box',
          tipsList: [
            'Keep spacing consistent using the project scale',
            'Prefer semantic utilities for states',
            'Reuse cards and badges for fast UI composition',
          ],
          infoTitle: 'Info Callout',
          infoBody: 'Use this pattern for short guidance, constraints, and contextual help.',
          codeTitle: 'Code · Snippet & Block',
          inlineSnippet: 'Inline snippet example:',
          formUtils: 'Form Utilities',
          input: 'Input',
          select: 'Select',
          textarea: 'Textarea',
          typeHere: 'Type here...',
          textareaValue: 'A quick note about design consistency...',
          utilityPatterns: 'Utility Patterns · Links, Divider, Elevation',
          primaryLink: 'Primary link',
          secondaryLink: 'Secondary link',
          elevation1: 'Elevation 1',
          elevation2: 'Elevation 2',
          elevation3: 'Elevation 3',
          container: 'UI · Container',
          containerSize: 'Container size',
          button: 'UI · Button',
          btnPrimarySm: 'Primary Small',
          btnPrimaryMd: 'Primary Medium',
          btnPrimaryLg: 'Primary Large',
          btnSecondary: 'Secondary',
          btnOutline: 'Outline',
          btnGhost: 'Ghost',
          btnDisabled: 'Disabled',
          social: 'UI · SocialAuthButton',
          toolCard: 'Content · ToolCard',
          articleCard: 'Content · ArticleCard',
          ads: 'Ads · AdBanner',
          layoutPreview: 'Layout · Header & Footer Preview',
          toolCards: [
            {
              title: 'Case Study Library',
              description: 'Explore curated articles from the community.',
              category: 'Content',
            },
            {
              title: 'Weekly Digest',
              description: 'Follow the most practical frontend insights.',
              category: 'Content',
            },
            {
              title: 'Community Picks',
              description: 'Highlights from our most-read articles.',
              category: 'Content',
            },
          ],
          articleSamples: [
            {
              title: 'CSS Grid Practical Guide',
              description:
                'A practical walkthrough for building robust two-dimensional layouts with CSS Grid.',
            },
            {
              title: 'Next.js Performance Patterns',
              description:
                'Simple patterns to improve loading performance and perceived speed in Next.js apps.',
            },
          ],
        };

  const spacingScale = [
    { label: 'xs', token: '--spacing-xs', value: '4px' },
    { label: 'sm', token: '--spacing-sm', value: '8px' },
    { label: 'md', token: '--spacing-md', value: '12px' },
    { label: 'base', token: '--spacing-base', value: '16px' },
    { label: 'lg', token: '--spacing-lg', value: '24px' },
    { label: 'xl', token: '--spacing-xl', value: '32px' },
    { label: '2xl', token: '--spacing-2xl', value: '48px' },
    { label: '3xl', token: '--spacing-3xl', value: '64px' },
    { label: '4xl', token: '--spacing-4xl', value: '96px' },
    { label: '5xl', token: '--spacing-5xl', value: '128px' },
  ];

  const radiusScale = [
    { label: 'none', token: '--radius-none', value: '0px' },
    { label: 'sm', token: '--radius-sm', value: '4px' },
    { label: 'md', token: '--radius-md', value: '8px' },
    { label: 'lg', token: '--radius-lg', value: '12px' },
    { label: 'xl', token: '--radius-xl', value: '16px' },
    { label: 'full', token: '--radius-full', value: '9999px' },
  ];

  const shadowScale = [
    { label: 'shadow-sm', token: '--shadow-sm' },
    { label: 'shadow-md', token: '--shadow-md' },
    { label: 'shadow-lg', token: '--shadow-lg' },
    { label: 'shadow-glow-blue', token: '--shadow-glow-blue' },
    { label: 'shadow-glow-red', token: '--shadow-glow-red' },
    { label: 'shadow-glow-orange', token: '--shadow-glow-orange' },
  ];

  const componentType =
    locale === 'pt-br'
      ? {
          react: 'Componente React',
          foundation: 'Fundacao',
          page: 'Padrao de pagina',
          utility: 'Classe utilitaria',
          typography: 'Utilitario de tipografia',
        }
      : {
          react: 'React component',
          foundation: 'Foundation',
          page: 'Page pattern',
          utility: 'Utility class',
          typography: 'Typography utility',
        };

  const componentInventory = [
    { name: 'Header', type: componentType.react },
    { name: 'Footer', type: componentType.react },
    { name: 'Button', type: componentType.react },
    { name: 'Container', type: componentType.react },
    { name: 'ToolCard', type: componentType.react },
    { name: 'ArticleCard', type: componentType.react },
    { name: 'AdBanner', type: componentType.react },
    { name: 'SocialAuthButton', type: componentType.react },
    { name: 'Typography', type: componentType.foundation },
    { name: 'Spacing', type: componentType.foundation },
    { name: 'Borders & Radius', type: componentType.foundation },
    { name: 'Shadows', type: componentType.foundation },
    { name: 'Breadcrumb', type: componentType.page },
    { name: 'Badge / Tag', type: componentType.utility },
    { name: 'Tip / Info box', type: componentType.page },
    { name: 'Code snippet (inline)', type: componentType.typography },
    { name: 'Code block', type: componentType.page },
    { name: 'Input', type: componentType.utility },
    { name: 'Textarea', type: componentType.utility },
    { name: 'Select', type: componentType.utility },
    { name: 'Link primary / secondary', type: componentType.utility },
    { name: 'Divider', type: componentType.utility },
    { name: 'Elevation 1/2/3', type: componentType.utility },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light py-10 md:py-16">
        <div className="container-grid">
          <div className="max-w-3xl">
            <h1 className="mb-4">{t.title}</h1>
            <p className="text-base md:text-xl text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="container-grid py-8 md:py-12 space-y-10 md:space-y-16">
        <section className="space-y-6">
          <h2>{t.inventory}</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentInventory.map((component) => (
                <div key={component.name} className="p-4 border border-light rounded-lg bg-primary h-full">
                  <p className="font-semibold text-primary">{component.name}</p>
                  <p className="text-sm text-secondary">{component.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.typography}</h2>

          <div className="card space-y-6">
            <div className="space-y-4">
              <h1>{t.headings} 1 · Frontmakers</h1>
              <h2>{t.headings} 2 · Frontmakers</h2>
              <h3>{t.headings} 3 · Frontmakers</h3>
              <h4 className="text-2xl font-bold">{t.headings} 4 · Frontmakers</h4>
              <h5 className="text-xl font-bold">{t.headings} 5 · Frontmakers</h5>
              <h6 className="text-lg font-bold">{t.headings} 6 · Frontmakers</h6>
            </div>

            <div className="space-y-3 border-t border-light pt-6">
              <p>{t.body}</p>
              <p className="text-secondary">{t.secondary}</p>
              <p className="text-muted">{t.muted}</p>
              <p className="text-sm">{t.small}</p>
            </div>

            <div className="border-t border-light pt-6">
              <div className="prose max-w-none">
                <h3>{t.proseTitle}</h3>
                <p>{t.proseBody}</p>
                <ul>
                  {t.proseList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <blockquote>
                  {t.proseQuote}
                </blockquote>
                <p>
                  {t.inlineCode} <code>const isReady = true;</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.spacing}</h2>
          <div className="card space-y-4">
            {spacingScale.map((item) => (
              <div key={item.token} className="grid grid-cols-1 sm:grid-cols-[110px_1fr_80px] items-start sm:items-center gap-2 sm:gap-4">
                <p className="text-sm font-semibold text-secondary">{item.label}</p>
                <div className="h-3 bg-[var(--color-primary)] rounded-full" style={{ width: `min(100%, var(${item.token}))` }} />
                <p className="text-sm text-secondary sm:text-right">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.borders}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card space-y-4">
              <h3 className="text-2xl font-bold">{t.borderStyles}</h3>
              <div className="space-y-4">
                <div className="p-4 border border-light rounded-lg">{t.borderLight1}</div>
                <div className="p-4 border-2 border-light rounded-lg">{t.borderLight2}</div>
                <div className="p-4 border border-[var(--color-border-dark)] rounded-lg">
                  {t.borderDark}
                </div>
              </div>
            </div>

            <div className="card space-y-4">
              <h3 className="text-2xl font-bold">{t.radius}</h3>
              <div className="space-y-4">
                {radiusScale.map((item) => (
                  <div
                    key={item.token}
                    className="p-4 border border-light bg-primary"
                    style={{ borderRadius: `var(${item.token})` }}
                  >
                    <span className="text-sm text-secondary font-medium">
                      {item.label} · {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.shadows}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shadowScale.map((item) => (
              <div
                key={item.token}
                className="p-6 bg-primary border border-light rounded-xl min-h-[120px] flex items-end"
                style={{ boxShadow: `var(${item.token})` }}
              >
                <p className="text-sm font-semibold text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.breadcrumb}</h2>
          <div className="card space-y-8">
            <nav>
              <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
                <li>
                  <Link href={`/${locale}`} className="hover:text-[var(--color-primary)] transition-colors">
                    {t.home}
                  </Link>
                </li>
                <li>→</li>
                <li>
                  <Link
                    href={`/${locale}/articles`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {t.articles}
                  </Link>
                </li>
                <li>→</li>
                <li className="text-primary font-semibold">{t.title}</li>
              </ol>
            </nav>

            <nav>
              <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {t.home}
                  </Link>
                </li>
                <li>→</li>
                <li>
                  <Link
                    href={`/${locale}/submit`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {t.submit}
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.feedback}</h2>
          <div className="card space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge-primary">{t.badgePrimary}</span>
              <span className="badge badge-success">{t.badgeSuccess}</span>
              <span className="badge badge-warning">{t.badgeWarning}</span>
              <span className="badge badge-error">{t.badgeError}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-neutral-50 border-2 border-[var(--color-border)] rounded-xl">
                <h3 className="text-xl font-bold mb-3">💡 {t.tipsTitle}</h3>
                <ul className="space-y-2 text-secondary text-sm">
                  {t.tipsList.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-[var(--color-info-soft)] border-2 border-[var(--color-accent-blue)] rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-accent-blue">ℹ️ {t.infoTitle}</h3>
                <p className="text-secondary text-sm">
                  {t.infoBody}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.codeTitle}</h2>
          <div className="card space-y-6">
            <p>
              {t.inlineSnippet} <code>const isFrontend = true;</code>
            </p>

            <div className="bg-neutral-900 text-neutral-50 p-4 md:p-6 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
              <code>{`const buttonClass = 'btn-primary';\nconst spacing = 'var(--spacing-lg)';\n\nexport function Example() {\n  return <button className={buttonClass}>Run</button>;\n}`}</code>
            </div>

            <div className="font-mono text-sm bg-primary p-4 rounded-lg border border-light">
              rem = px ÷ base
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.formUtils}</h2>
          <div className="card space-y-5">
            <div>
              <label htmlFor="ds-input" className="label">
                {t.input}
              </label>
              <input id="ds-input" className="input" placeholder={t.typeHere} defaultValue="Frontmakers" />
            </div>

            <div>
              <label htmlFor="ds-select" className="label">
                {t.select}
              </label>
              <select id="ds-select" className="select" defaultValue="css">
                <option value="css">CSS</option>
                <option value="react">React</option>
                <option value="next">Next.js</option>
              </select>
            </div>

            <div>
              <label htmlFor="ds-textarea" className="label">
                {t.textarea}
              </label>
              <textarea
                id="ds-textarea"
                className="textarea"
                defaultValue={t.textareaValue}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.utilityPatterns}</h2>
          <div className="card space-y-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link href={`/${locale}/articles`} className="link-primary">
                {t.primaryLink}
              </Link>
              <Link href={`/${locale}/articles`} className="link-secondary">
                {t.secondaryLink}
              </Link>
            </div>

            <hr className="divider" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-primary rounded-lg elevation-1 border border-light">
                <p className="font-semibold">{t.elevation1}</p>
              </div>
              <div className="p-5 bg-primary rounded-lg elevation-2 border border-light">
                <p className="font-semibold">{t.elevation2}</p>
              </div>
              <div className="p-5 bg-primary rounded-lg elevation-3 border border-light">
                <p className="font-semibold">{t.elevation3}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.container}</h2>
          <div className="space-y-6">
            <Container size="sm" className="py-4 bg-primary border border-light rounded-lg">
              <p className="text-secondary">{t.containerSize}: sm</p>
            </Container>

            <Container size="md" className="py-4 bg-primary border border-light rounded-lg">
              <p className="text-secondary">{t.containerSize}: md</p>
            </Container>

            <Container size="lg" className="py-4 bg-primary border border-light rounded-lg">
              <p className="text-secondary">{t.containerSize}: lg</p>
            </Container>

            <Container size="full" className="py-4 bg-primary border border-light rounded-lg">
              <p className="text-secondary">{t.containerSize}: full</p>
            </Container>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.button}</h2>
          <div className="card flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              {t.btnPrimarySm}
            </Button>
            <Button variant="primary" size="md">
              {t.btnPrimaryMd}
            </Button>
            <Button variant="primary" size="lg">
              {t.btnPrimaryLg}
            </Button>
            <Button variant="secondary">{t.btnSecondary}</Button>
            <Button variant="outline">{t.btnOutline}</Button>
            <Button variant="ghost">{t.btnGhost}</Button>
            <Button disabled>{t.btnDisabled}</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.social}</h2>
          <div className="card space-y-3">
            <SocialAuthButton provider="google" />
            <SocialAuthButton provider="linkedin" />
            <SocialAuthButton provider="github" />
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.toolCard}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ToolCard
              title={t.toolCards[0].title}
              description={t.toolCards[0].description}
              href={`/${locale}/articles`}
              icon="📚"
              category={t.toolCards[0].category}
            />
            <ToolCard
              title={t.toolCards[1].title}
              description={t.toolCards[1].description}
              href={`/${locale}/articles`}
              icon="🗞️"
              category={t.toolCards[1].category}
            />
            <ToolCard
              title={t.toolCards[2].title}
              description={t.toolCards[2].description}
              href={`/${locale}/articles`}
              icon="✨"
              category={t.toolCards[2].category}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.articleCard}</h2>
          <div className="grid grid-cols-1 gap-8 max-w-4xl">
            <ArticleCard
              slug="css-grid-practical-guide"
              title={t.articleSamples[0].title}
              description={t.articleSamples[0].description}
              category="CSS"
              date="2026-02-10"
              readTime="8 min"
              locale={locale as 'en' | 'pt-br'}
              author={{ name: 'Frontmakers Team', avatar: '🧠' }}
            />
            <ArticleCard
              slug="nextjs-performance-patterns"
              title={t.articleSamples[1].title}
              description={t.articleSamples[1].description}
              category="Next.js"
              date="2026-01-18"
              readTime="10 min"
              locale={locale as 'en' | 'pt-br'}
              author={{ name: 'Frontmakers Team', avatar: '⚡' }}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.ads}</h2>
          <div className="space-y-8">
            <AdBanner slot="hero" />
            <AdBanner slot="article-list" />
            <AdBanner slot="article-content" />
            <AdBanner slot="article-bottom" />
            <AdBanner slot="tool-end" />
            <AdBanner slot="footer" />
          </div>
        </section>

        <section className="space-y-6">
          <h2>{t.layoutPreview}</h2>
          <div className="space-y-8">
            <div className="border border-light rounded-lg overflow-x-auto">
              <div className="min-w-[960px]">
                <Header locale={locale as 'en' | 'pt-br'} />
              </div>
            </div>
            <div className="border border-light rounded-lg overflow-x-auto">
              <div className="min-w-[960px]">
                <Footer locale={locale as 'en' | 'pt-br'} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
