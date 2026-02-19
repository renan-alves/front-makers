# 📚 Guia de Desenvolvimento - Frontmakers

Este documento contém informações técnicas sobre como estender e manter o projeto.

## 📝 Como Adicionar um Novo Artigo

### 1. Adicione os dados em `data/articles.ts`

\`\`\`typescript
{
  slug: 'seu-artigo-slug',
  title: 'Título do Seu Artigo',
  description: 'Descrição curta para SEO e preview',
  category: 'React', // CSS, JavaScript, TypeScript, React, etc
  date: '2026-02-18',
  readTime: '10 min',
  author: {
    name: 'Frontmakers Team',
    avatar: '👨‍💻',
  },
  content: \`
# Título Principal

Seu conteúdo em Markdown aqui...

## Subtítulo

\\\`\\\`\\\`javascript
// Código exemplo
const exemplo = 'valor';
\\\`\\\`\\\`
  \`,
}
\`\`\`

### 2. O artigo estará automaticamente disponível em:

- Listagem: `/artigos`
- Página individual: `/artigos/seu-artigo-slug`
- Sitemap (gerado automaticamente)

### 3. Dicas para escrever artigos:

- Use Markdown para formatação
- Inclua exemplos de código
- Mantenha parágrafos curtos e escaneaveis
- Use headings hierárquicos (h2, h3)
- Adicione links internos para outras ferramentas/artigos

## 🛠 Como Adicionar uma Nova Ferramenta

### 1. Crie a pasta da ferramenta

\`\`\`
app/ferramentas/nome-da-ferramenta/
└── page.tsx
\`\`\`

### 2. Template básico da ferramenta

\`\`\`typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';

export default function MinhaFerramenta() {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [copied, setCopied] = useState(false);

  const calcular = () => {
    // Sua lógica aqui
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(resultado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header com breadcrumb */}
      <section className="bg-primary border-b border-light py-12">
        <div className="container-grid">
          {/* Breadcrumb navigation */}
          <nav className="mb-6">...</nav>
          
          <div className="max-w-3xl">
            <div className="text-4xl mb-4">🎨</div>
            <h1>Nome da Ferramenta</h1>
            <p className="text-xl text-secondary">Descrição...</p>
          </div>
        </div>
      </section>

      {/* Tool interface */}
      <section className="container-grid py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="card">
              <h2>Controles</h2>
              {/* Seus inputs aqui */}
            </div>

            {/* Preview/Output */}
            <div className="space-y-6">
              <div className="card">
                <h2>Preview</h2>
                {/* Preview visual */}
              </div>

              <div className="card">
                <h2>Código</h2>
                <code>{resultado}</code>
                <button onClick={copiar}>
                  {copied ? '✓ Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 card bg-accent-soft">
            <h3>💡 Dicas</h3>
            <ul>...</ul>
          </div>

          {/* Ad */}
          <div className="mt-12">
            <AdBanner slot="tool-end" />
          </div>
        </div>
      </section>
    </div>
  );
}
\`\`\`

### 3. Adicione à listagem em `app/ferramentas/page.tsx`

\`\`\`typescript
{
  title: 'Nome da Ferramenta',
  description: 'Descrição completa...',
  href: '/ferramentas/nome-da-ferramenta',
  icon: '🎨',
  category: 'CSS',
}
\`\`\`

### 4. Adicione ao sitemap em `app/sitemap.ts`

\`\`\`typescript
'/ferramentas/nome-da-ferramenta'
\`\`\`

## 🎨 Componentes Disponíveis

### Componentes UI

- **Button** - \`components/ui/Button.tsx\`
  - Variantes: primary, secondary, outline, ghost
  - Tamanhos: sm, md, lg

- **Container** - \`components/ui/Container.tsx\`
  - Tamanhos: sm, md, lg, full

### Componentes Específicos

- **AdBanner** - \`components/ads/AdBanner.tsx\`
  - Slots: hero, article-list, article-content, tool-end, footer

- **ArticleCard** - \`components/article/ArticleCard.tsx\`
- **ToolCard** - \`components/tools/ToolCard.tsx\`

### Layout

- **Header** - \`components/layout/Header.tsx\`
- **Footer** - \`components/layout/Footer.tsx\`

## 🎨 Design System

### Classes CSS Customizadas

Definidas em \`globals.css\`:

\`\`\`css
/* Botões */
.btn-primary
.btn-secondary

/* Cards */
.card

/* Inputs */
.input
.label

/* Container */
.container-grid /* max-width 1200px com padding */

/* Tipografia */
.prose /* para conteúdo markdown */
\`\`\`

### Cores Tailwind

Usando o theme.extend em \`tailwind.config.ts\`:

\`\`\`tsx
<div className="bg-accent-primary text-inverse">...</div>
<div className="text-secondary">...</div>
<div className="border-light">...</div>
\`\`\`

## 🔧 Funções Utilitárias

Em \`lib/utils.ts\`:

- \`cn(...classes)\` - Merge class names
- \`formatDate(date)\` - Formata data em pt-BR
- \`getReadingTime(text)\` - Calcula tempo de leitura
- \`slugify(str)\` - Converte string para slug
- \`truncate(str, length)\` - Trunca texto
- \`copyToClipboard(text)\` - Copia para clipboard
- \`hexToRgba(hex, alpha)\` - Converte hex para rgba

Em \`lib/seo.ts\`:

- \`generatePageMetadata()\` - Gera metadata para páginas
- \`generateArticleJsonLd()\` - JSON-LD para artigos
- \`generateBreadcrumbJsonLd()\` - JSON-LD para breadcrumb

## 📊 SEO Checklist

Ao adicionar novas páginas:

- [ ] Metadata com title e description
- [ ] Open Graph tags
- [ ] Breadcrumb navigation
- [ ] JSON-LD structured data
- [ ] Adicionar ao sitemap
- [ ] URLs amigáveis (slugs)
- [ ] Alt text em imagens
- [ ] Headings hierárquicos (h1 → h2 → h3)

## 🚀 Performance

### Diretrizes

- Use \`'use client'\` apenas quando necessário
- Prefira Server Components
- Use \`next/image\` para imagens
- Lazy load componentes pesados
- Evite \`useEffect\` desnecessários
- Minimize bundle com code splitting

### Checklist

- [ ] Componentes são Server Components por padrão
- [ ] Client Components tem \`'use client'\` no topo
- [ ] Estados são isolados nos componentes corretos
- [ ] Não há re-renders desnecessários
- [ ] Imagens usam next/image

## 🐛 Debug

### Verificar erros

\`\`\`bash
npm run lint
\`\`\`

### Build local

\`\`\`bash
npm run build
npm run start
\`\`\`

### Logs úteis

- Build output mostra bundle sizes
- Lighthouse no Chrome DevTools
- React DevTools para componentes

## 📝 Convenções de Código

### TypeScript

- Use tipos explícitos para props
- Evite \`any\`
- Use interfaces para objetos complexos

### Componentes

- Um componente por arquivo
- Nome do arquivo = nome do componente
- Props interface acima do componente
- JSDoc comments para componentes principais

### Estilização

- Prefira classes Tailwind
- Use variáveis CSS para valores reutilizáveis
- Evite inline styles quando possível
- Mobile-first approach

### Git

Mensagens de commit:

- \`Add: nova feature\`
- \`Fix: correção de bug\`
- \`Update: atualização de feature\`
- \`Refactor: refatoração de código\`
- \`Docs: documentação\`

## 🔐 Segurança

- Nunca commitar .env files
- Use .env.local para desenvolvimento
- Sanitize user inputs em ferramentas
- HTTPS em produção
- CSP headers configurados

## 📈 Analytics

### Google Analytics 4

Adicione em \`app/layout.tsx\`:

\`\`\`jsx
<Script
  src={\`https://www.googletagmanager.com/gtag/js?id=\${process.env.NEXT_PUBLIC_GA_ID}\`}
  strategy="afterInteractive"
/>
\`\`\`

### Core Web Vitals

Use \`web-vitals\` library para monitorar:

\`\`\`javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
\`\`\`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (\`feature/nova-feature\`)
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### PR Guidelines

- Descreva o que foi alterado
- Inclua screenshots se visual
- Teste localmente antes
- Verifique lint/build

---

**Dúvidas?** Abra uma issue no GitHub!
