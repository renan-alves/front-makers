# Frontmakers Development Guide

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture Rules](#architecture-rules)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Design System](#design-system)
- [Component Guidelines](#component-guidelines)
- [Tools Implementation](#tools-implementation)
- [Articles System](#articles-system)
- [AdSense Integration](#adsense-integration)
- [SEO Requirements](#seo-requirements)
- [Performance Rules](#performance-rules)
- [Future Scalability](#future-scalability)
- [Code Quality Standards](#code-quality-standards)

---

## Project Overview

**Frontmakers** is a modern platform for frontend developers that provides:

- **Developer Tools** - CSS utility generators (Box Shadow, Gradients, Unit Converters)
- **Technical Articles** - Educational content for frontend development
- **Future SaaS** - Subscription features (not implemented yet)
- **Google AdSense** - Monetization infrastructure (already supported)

### Brand Personality

- **Bold** - Strong visual identity with red primary color
- **Technical** - Code-focused, precise, developer-centric
- **Clean** - Minimalist design with generous whitespace
- **Modern** - Latest tech stack and design patterns
- **Scalable** - Architecture ready for SaaS expansion

---

## Tech Stack

### Core Technologies

```json
{
  "framework": "Next.js 16 (App Router)",
  "language": "TypeScript 5.3+",
  "styling": "TailwindCSS 3.4+",
  "linting": "ESLint + Prettier",
  "runtime": "React 19"
}
```

### Key Principles

- **Server Components by default** - Use server rendering unless interactivity is required
- **Client Components only when necessary** - Mark with `"use client"` directive only for interactive features
- **TypeScript strict mode** - All code must be type-safe
- **No runtime errors** - Handle edge cases and validate inputs
- **SEO-first** - All pages must have proper metadata

---

## Architecture Rules

### App Router Only

**✅ DO:**
```tsx
// app/tools/box-shadow/page.tsx
export default function BoxShadowPage() {
  return <BoxShadowGenerator />;
}
```

**❌ DON'T:**
```tsx
// pages/tools/box-shadow.tsx (Pages Router - NEVER USE)
```

### Server vs Client Components

**Server Components (default):**
- Pages with static content
- Article rendering
- Layout components
- SEO metadata

**Client Components (explicit `"use client"`):**
- Interactive tools
- Forms with state
- Real-time previews
- Event handlers

**Example:**
```tsx
// components/tools/BoxShadowGenerator.tsx
'use client';

import { useState } from 'react';

export default function BoxShadowGenerator() {
  const [shadowX, setShadowX] = useState(0);
  // ... interactive logic
}
```

### Data Fetching

Prefer server-side data fetching:

```tsx
// app/articles/[slug]/page.tsx
import { articles } from '@/data/articles';

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = articles.find((a) => a.slug === params.slug);
  return <ArticleContent article={article} />;
}
```

---

## Folder Structure

### Required Structure

```
frontmakers/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── articles/               # Articles section
│   │   ├── page.tsx           # Articles listing
│   │   └── [slug]/
│   │       └── page.tsx       # Individual article
│   ├── tools/                  # Tools section
│   │   ├── page.tsx           # Tools listing
│   │   ├── box-shadow/
│   │   │   └── page.tsx
│   │   ├── gradient/
│   │   │   └── page.tsx
│   │   └── px-rem/
│   │       └── page.tsx
│   ├── globals.css            # Global styles + design tokens
│   └── sitemap.ts             # Dynamic sitemap
│
├── components/
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── ui/                    # Reusable UI components
│   │   └── Button.tsx
│   ├── ads/                   # AdSense components
│   │   └── AdBanner.tsx
│   ├── article/               # Article-specific components
│   │   └── ArticleCard.tsx
│   └── tools/                 # Tool-specific components
│       └── ToolCard.tsx
│
├── lib/
│   ├── utils.ts               # Utility functions
│   └── seo.ts                 # SEO helpers
│
├── data/
│   └── articles.ts            # Article data (temporary)
│
├── types/
│   └── index.ts               # TypeScript type definitions
│
├── public/
│   ├── robots.txt
│   └── ...
│
└── docs/
    ├── copilot-instructions.md
    └── VISUAL_IDENTITY.md
```

### Folder Naming Rules

- **Route folders**: lowercase with hyphens (`box-shadow`, `px-rem`)
- **Component folders**: lowercase (`layout`, `ui`, `tools`)
- **Utility folders**: lowercase (`lib`, `data`, `types`)

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `Button.tsx`, `ArticleCard.tsx` |
| Pages | PascalCase | `page.tsx`, `layout.tsx` |
| Utilities | camelCase | `utils.ts`, `seo.ts` |
| Data files | camelCase | `articles.ts` |
| Types | camelCase | `index.ts` (exports PascalCase types) |
| Hooks | camelCase with `use` prefix | `useCopyToClipboard.ts` |
| Config files | lowercase | `tailwind.config.ts` |

### Code Elements

```tsx
// Components: PascalCase
export default function BoxShadowGenerator() {}

// Interfaces/Types: PascalCase
interface Article {
  title: string;
  slug: string;
}

// Functions: camelCase
function formatDate(date: Date): string {}

// Variables: camelCase
const shadowValue = '0 4px 6px rgba(0, 0, 0, 0.1)';

// Constants: UPPER_SNAKE_CASE
const MAX_SHADOW_BLUR = 100;

// CSS Classes: kebab-case (via Tailwind)
className="box-shadow-preview"
```

### Language

**All code, comments, files, and folders MUST be in English.**

```tsx
// ✅ Good
const articleTitle = 'How to Use CSS Grid';

// ❌ Bad
const tituloArtigo = 'Como Usar CSS Grid';
```

---

## Design System

### Color Palette

Defined in `app/globals.css`:

```css
:root {
  /* Primary Colors */
  --color-primary: #E10600;
  --color-primary-dark: #B00000;
  --color-primary-light: #FF4136;

  /* Text Colors */
  --color-black: #111111;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;

  /* Background Colors */
  --color-background: #FFFFFF;
  --color-background-alt: #F8F8F8;
  --color-border: #E5E5E5;

  /* Accent Colors */
  --color-accent-blue: #00C2FF;
  --color-accent-blue-soft: #E6F9FF;

  /* Status Colors */
  --color-success: #16A34A;
  --color-error: #DC2626;
  --color-warning: #F59E0B;
}
```

### Color Usage Guidelines

#### Primary Red (`#E10600`)

**✅ USE FOR:**
- CTA buttons
- Active navigation states
- Important links
- Interactive element highlights
- Logo emphasis ("FRONT" in "FRONTMAKERS")

**❌ DO NOT USE FOR:**
- Large section backgrounds
- Body text
- Excessive decorative elements
- Low-contrast situations

```tsx
// ✅ Good
<Button className="bg-[var(--color-primary)]">Get Started</Button>

// ❌ Bad
<section className="bg-[var(--color-primary)] p-20">
  <p>Long paragraph of text...</p>
</section>
```

#### Accent Blue (`#00C2FF`)

**USE FOR:**
- Category badges
- Tool-specific highlights
- Secondary interactive states
- Informational accents

```tsx
<span className="bg-[var(--color-accent-blue-soft)] text-accent-blue">
  CSS Tools
</span>
```

### Typography

```css
/* Headings */
h1, h2, h3 {
  color: var(--color-text);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
}

/* Body */
p {
  line-height: 1.7;
  color: var(--color-text-muted);
}
```

### Layout Principles

1. **Max Width**: Content should be constrained to `1200px`
2. **Whitespace**: Generous spacing between sections (96px+)
3. **Responsive**: Mobile-first approach
4. **Grid System**: Use CSS Grid or Tailwind grid utilities
5. **Clean Hierarchy**: Clear visual separation between content types

---

## Component Guidelines

### Component Structure

```tsx
'use client'; // Only if client interactivity is needed

import { useState } from 'react';

// Types at the top
interface ComponentProps {
  title: string;
  description?: string;
}

/**
 * ComponentName
 * 
 * Brief description of what this component does.
 * 
 * @param title - Main heading text
 * @param description - Optional description
 */
export default function ComponentName({
  title,
  description,
}: ComponentProps) {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Render
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### Button Component Pattern

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) {
  const baseStyles = 'btn transition-all';
  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
    secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)]',
    ghost: 'text-[var(--color-text)] hover:bg-[var(--color-background-alt)]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Component Best Practices

- ✅ Use TypeScript interfaces for props
- ✅ Document component purpose with JSDoc
- ✅ Provide default values for optional props
- ✅ Handle loading and error states
- ✅ Make components reusable and flexible
- ❌ Don't create one-off components for simple markup
- ❌ Don't mix business logic with presentation
- ❌ Don't use inline styles (use Tailwind classes)

---

## Tools Implementation

### Tool Requirements

Every tool MUST:

1. **Be a Client Component** - Mark with `"use client"`
2. **Have Real-Time Preview** - Show results as user types
3. **Provide Copy Functionality** - One-click copy to clipboard
4. **Include Code Output** - Display generated CSS/code
5. **Be Fully Typed** - All state and props properly typed
6. **Have Clean UI** - Follow design system
7. **Be Accessible** - Proper labels and ARIA attributes

### Tool Template

```tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ToolName() {
  // State
  const [value, setValue] = useState(0);
  const [copied, setCopied] = useState(false);

  // Generated output
  const output = `/* Generated CSS */\n.element { property: ${value}px; }`;

  // Copy handler
  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-container">
      {/* Controls */}
      <div className="controls">
        <label htmlFor="value">Value</label>
        <input
          id="value"
          type="range"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      {/* Preview */}
      <div className="preview">
        <div style={{ property: `${value}px` }}>Preview</div>
      </div>

      {/* Output */}
      <div className="output">
        <pre>{output}</pre>
        <Button onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </div>
    </div>
  );
}
```

### Current Tools

1. **Box Shadow Generator** - Create CSS box-shadow values
2. **Gradient Generator** - Generate linear/radial gradients
3. **PX to REM Converter** - Convert pixel units to rem

### Future Tool Guidelines

When adding new tools:
- Follow the same interaction patterns
- Keep UI consistent
- Ensure mobile responsiveness
- Add to tools listing page
- Update sitemap
- Include SEO metadata

---

## Articles System

### Article Structure

```typescript
// data/articles.ts
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  content: string; // Markdown content
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: 'css-grid-complete-guide',
    title: 'CSS Grid: Complete Guide for 2026',
    description: 'Master CSS Grid with practical examples...',
    category: 'CSS',
    author: 'Frontmakers Team',
    publishedAt: '2026-01-15',
    readingTime: 12,
    content: `...markdown content...`,
    tags: ['CSS', 'Layout', 'Grid'],
  },
];
```

### Article Page Requirements

Every article page must:

1. **Generate metadata** - Title, description, Open Graph
2. **Include JSON-LD** - Structured data for SEO
3. **Have readable typography** - Line length, spacing, hierarchy
4. **Include breadcrumbs** - For navigation
5. **Show reading time** - Estimated time
6. **Display category badge** - Visual categorization
7. **Include ad slots** - Mid-content ad placement
8. **Suggest related articles** - At the end

```tsx
// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { articles } from '@/data/articles';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  
  return {
    title: `${article?.title} | Frontmakers`,
    description: article?.description,
    openGraph: {
      title: article?.title,
      description: article?.description,
      type: 'article',
    },
  };
}
```

---

## AdSense Integration

### Critical Rules

The project MUST remain AdSense-compatible at all times.

**Requirements:**
1. **Reserve space** - Prevent Cumulative Layout Shift (CLS)
2. **Clean backgrounds** - Avoid colored backgrounds behind ads
3. **Proper spacing** - Ad areas clearly separated from content
4. **Mobile-friendly** - Responsive ad units
5. **Reusable component** - Use `AdBanner` component

### AdBanner Component

```tsx
// components/ads/AdBanner.tsx
'use client';

interface AdBannerProps {
  slot: 'hero' | 'article-list' | 'article-content' | 'tool-end' | 'footer';
}

export default function AdBanner({ slot }: AdBannerProps) {
  return (
    <div className="ad-container" style={{ minHeight: '250px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXX"
        data-ad-slot="XXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### Ad Placement Strategy

```tsx
// Homepage
<AdBanner slot="hero" /> // After hero section

// Article Listing
<AdBanner slot="article-list" /> // Between articles

// Article Content
<AdBanner slot="article-content" /> // Mid-article

// Tool Pages
<AdBanner slot="tool-end" /> // After tool output

// Footer
<AdBanner slot="footer" /> // Global footer ad
```

---

## SEO Requirements

### Metadata

Every page must export metadata:

```tsx
// app/tools/box-shadow/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Box Shadow Generator | Frontmakers',
  description: 'Create beautiful CSS box-shadows with real-time preview...',
  keywords: ['box shadow', 'css', 'generator', 'tool'],
  openGraph: {
    title: 'Box Shadow Generator',
    description: 'Create beautiful CSS box-shadows...',
    type: 'website',
    images: ['/og-box-shadow.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Box Shadow Generator',
    description: 'Create beautiful CSS box-shadows...',
  },
};
```

### JSON-LD Structured Data

For articles:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Organization',
        name: 'Frontmakers',
      },
      datePublished: article.publishedAt,
      keywords: article.tags.join(', '),
    }),
  }}
/>
```

### Sitemap

Dynamic sitemap at `app/sitemap.ts`:

```tsx
import { MetadataRoute } from 'next';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = articles.map((article) => ({
    url: `https://frontmakers.com/articles/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://frontmakers.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ];
}
```

---

## Performance Rules

### Optimization Checklist

- ✅ Use `next/image` for all images
- ✅ Lazy load below-the-fold content
- ✅ Minimize client-side JavaScript
- ✅ Prefer Server Components
- ✅ Avoid unnecessary `useEffect` hooks
- ✅ Debounce user inputs in tools
- ✅ Code split heavy components
- ✅ Optimize font loading
- ✅ Reserve space for ads (prevent CLS)
- ✅ Use semantic HTML

### Image Optimization

```tsx
import Image from 'next/image';

// ✅ Good
<Image
  src="/hero-image.jpg"
  alt="Frontmakers homepage"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>

// ❌ Bad
<img src="/hero-image.jpg" alt="Frontmakers homepage" />
```

### Lighthouse Targets

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## Future Scalability

### Planned Features (Not Yet Implemented)

The architecture is prepared for:

1. **Authentication**
   - User accounts
   - OAuth providers
   - Protected routes

2. **Subscription Plans**
   - Tiered pricing
   - Stripe integration
   - Premium tools

3. **User Dashboard**
   - Saved tools
   - Favorite articles
   - Usage statistics

4. **Database Integration**
   - PostgreSQL/Prisma
   - Dynamic content
   - User data

5. **API Routes**
   - Tool generation API
   - Content management
   - User preferences

### Scalability Guidelines

When implementing future features:

1. **Keep current structure** - Don't break existing architecture
2. **Use feature flags** - Toggle features without deploying
3. **Maintain backwards compatibility** - Don't break free tier
4. **Keep ads compatible** - Don't disrupt monetization
5. **Preserve performance** - Monitor Lighthouse scores
6. **Follow naming conventions** - Stay consistent
7. **Document changes** - Update this file

---

## Code Quality Standards

### TypeScript

```tsx
// ✅ Properly typed
interface ToolProps {
  initialValue: number;
  onChange: (value: number) => void;
}

function Tool({ initialValue, onChange }: ToolProps) {
  // Implementation
}

// ❌ No implicit any
function Tool(props: any) {
  // Bad
}
```

### ESLint & Prettier

All code must pass:
- `npm run lint` - No errors
- `npm run format` - Consistent formatting

### Git Commit Messages

Follow conventional commits:

```bash
# Format
type(scope): description

# Examples
feat(tools): add color palette generator
fix(articles): correct metadata for SEO
docs(readme): update installation steps
style(button): adjust hover state colors
refactor(utils): simplify date formatting
perf(images): optimize hero image loading
```

### Code Review Checklist

Before committing:
- [ ] TypeScript types are correct
- [ ] Component is properly documented
- [ ] No console.log statements
- [ ] Follows naming conventions
- [ ] Responsive on mobile
- [ ] Accessible (ARIA labels, keyboard nav)
- [ ] SEO metadata included
- [ ] AdSense compatibility maintained
- [ ] Performance impact considered
- [ ] Design system colors used

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Folder Add Cheat Sheet

```bash
# New tool
app/tools/new-tool/page.tsx

# New component
components/ui/NewComponent.tsx

# New utility
lib/newUtility.ts

# New article (data)
data/articles.ts
```

### Color Reference

```tsx
// Primary actions
className="bg-[var(--color-primary)] text-white"

// Hover states
className="hover:text-[var(--color-primary-dark)]"

// Badges
className="bg-[var(--color-accent-blue-soft)] text-accent-blue"

// Text
className="text-[var(--color-text)]"
className="text-[var(--color-text-muted)]"

// Borders
className="border border-[var(--color-border)]"
```

---

## Conclusion

This document is the **single source of truth** for Frontmakers development.

All features, components, and code changes must:
- ✅ Follow the architecture
- ✅ Respect the design system
- ✅ Maintain SEO standards
- ✅ Preserve AdSense compatibility
- ✅ Meet performance targets
- ✅ Use proper naming conventions
- ✅ Be production-ready

When in doubt, refer to this guide or existing implementations.

---

**Document Version:** 1.0  
**Last Updated:** February 18, 2026  
**Maintained By:** Frontmakers Team

