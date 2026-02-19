# 🚀 Frontmakers

Complete platform with practical tools, technical articles and resources for modern frontend developers.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 About the Project

**Frontmakers** is an MVP platform focused on providing:

- **Practical tools** to accelerate frontend development
- **In-depth technical articles** about CSS, JavaScript, TypeScript, React and Next.js
- **Clean and professional interface** focused on usability
- **SEO optimized** for maximum visibility
- **Ready for monetization** with Google AdSense

## ✨ Features

### 🛠 Tools

- **Box Shadow Generator** - Create perfect CSS shadows with real-time preview
- **Gradient Generator** - Create beautiful CSS gradients with full control
- **PX → REM Converter** - Convert pixels to REM easily

### 📰 Content

- Article system with markdown
- SEO optimized with dynamic metadata
- JSON-LD for rich snippets
- Related articles
- Category system

## 🏗 Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + CSS Variables
- **Markdown:** react-markdown
- **Lint/Format:** ESLint + Prettier
- **Font:** Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/seu-usuario/frontmakers.git
cd frontmakers
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open in browser**

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Folder Structure

\`\`\`
frontmakers/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── [locale]/            # Localized pages
│   │   ├── articles/        # Article pages
│   │   │   ├── page.tsx     # Listing
│   │   │   └── [slug]/      # Individual article
│   │   ├── tools/           # Tool pages
│   │   │   ├── page.tsx     # Listing
│   │   │   ├── box-shadow/  # Box Shadow Generator
│   │   │   ├── gradient/    # Gradient Generator
│   │   │   └── px-rem/      # PX-REM Converter
│   │   ├── submit/          # Article submission
│   │   ├── layout.tsx       # Locale layout
│   │   └── page.tsx         # Home
│   ├── api/                 # API routes
│   │   ├── articles/        # Articles API
│   │   └── submissions/     # Submissions API
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # UI components
│   └── ads/                 # Ad components
├── lib/
│   ├── i18n.ts             # Internationalization
│   ├── prisma.ts           # Prisma client
│   ├── articles.ts         # Article service
│   └── utils.ts            # Utilities
├── prisma/
│   └── schema.prisma       # Database schema
├── middleware.ts            # Locale routing
├── globals.css              # Global styles
└── tailwind.config.ts       # TailwindCSS config
\`\`\`

## 🎨 Design System

### Colors

- **Primary:** #E10600 (Red)
- **Accent:** #00C2FF (Blue)
- **Secondary:** #F5F5F5 (Light Gray)
- **Text:** #1A1A1A (Dark)

### Typography

- **Font:** Inter
- **Headings:** Bold, tight line-height
- **Body:** 1.7 line-height

## 🔗 Links

- **Home:** `/`
- **Tools:** `/tools`
  - Box Shadow: `/tools/box-shadow`
  - Gradient: `/tools/gradient`
  - PX→REM: `/tools/px-rem`
- **Articles:** `/articles`
- **Submit Article:** `/submit`

## 📊 SEO

- Automatic sitemap generation
- Meta tags for all pages
- JSON-LD structured data
- Open Graph tags
- Twitter Card support
- robots.txt
- Optimized for search engines

## 💰 Monetization

- Google AdSense integration
- Multiple ad slots
- Strategy: Hero, Article List, Article Content, Tool End, Footer

## 🚀 Deployment

### Recommended: Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Frontmakers Team** - Building tools and resources for frontend developers

---

**Frontmakers** - Tools and Articles for Frontend Developers
│   ├── ads/                 # AdSense components
│   └── ui/                  # Componentes UI reutilizáveis
├── data/
│   └── articles.ts          # Dados dos artigos
├── lib/
│   ├── utils.ts             # Funções utilitárias
│   └── seo.ts               # Helpers de SEO
├── public/                   # Assets estáticos
├── tailwind.config.ts       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
└── package.json             # Dependências
\`\`\`

## 🎨 Design System

### Paleta de Cores

O projeto usa um design system consistente definido em CSS variables:

- **Neutras:** Tons de cinza do 50 ao 900
- **Accent:** Azul primário (#2563EB) para CTA e destaques
- **Success/Warning/Error:** Estados de validação
- **Bordas:** Light e Dark para diferentes contextos

### Tipografia

- **Fonte:** Inter (Google Fonts)
- **Escala:** Tamanhos responsivos usando clamp()
- **Line Height:** 1.7 para texto corrido, 1.2 para headings

## 🔧 Scripts Disponíveis

\`\`\`bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Inicia servidor de produção
npm run lint     # Roda ESLint
npm run format   # Formata código com Prettier
\`\`\`

## 📊 SEO

O projeto está otimizado para SEO com:

- ✅ Metadata dinâmica por página
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Sitemap automático
- ✅ robots.txt configurado
- ✅ Semantic HTML
- ✅ Headers hierárquicos

## 💰 Google AdSense

O site está preparado para Google AdSense:

1. **Configure seu ID:** Edite \`app/layout.tsx\` e adicione seu ID do AdSense
2. **Crie os slots:** No painel do Google AdSense
3. **Atualize os slots:** Edite \`components/ads/AdBanner.tsx\` com seus IDs

### Posições dos Anúncios

- Hero da home (após CTA)
- Entre artigos na listagem
- Dentro do conteúdo dos artigos
- Final das ferramentas
- Footer

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push para GitHub
2. Conecte ao Vercel
3. Deploy automático configurado

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 🔐 Variáveis de Ambiente

Crie um arquivo \`.env.local\`:

\`\`\`bash
# Google AdSense (opcional)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

## 📈 Roadmap

### Fase 1 - MVP (Atual)
- [x] Landing page
- [x] Sistema de artigos
- [x] 3 ferramentas funcionais
- [x] SEO básico
- [x] Google AdSense preparado

### Fase 2 - Expansão
- [ ] Mais ferramentas (Color Picker, Typography Scale, etc)
- [ ] Sistema de busca
- [ ] Dark mode
- [ ] Newsletter
- [ ] Sistema de comentários

### Fase 3 - Monetização
- [ ] Plano Pro
- [ ] Ferramentas premium
- [ ] API para desenvolvedores
- [ ] Ebooks e cursos

## 🤝 Contribuindo

Contribuições são bem-vindas! Para mudanças importantes:

1. Fork o projeto
2. Crie uma branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add: nova feature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## 👥 Autor

**Frontmakers Team**

- Website: [frontmakers.com](https://frontmakers.com)
- Twitter: [@frontmakers](https://twitter.com/frontmakers)
- GitHub: [@frontmakers](https://github.com/frontmakers)

## 🙏 Agradecimentos

- Next.js team pela excelente framework
- Vercel pelo hosting
- Comunidade open source

---

**Feito com ❤️ para a comunidade frontend**
