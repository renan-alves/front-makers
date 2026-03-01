/**
 * Prisma Seed Script
 * 
 * Seeds the database with initial data
 * Run with: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default user (Frontmakers Team)
  const defaultUser = await prisma.user.upsert({
    where: { email: 'team@frontmakers.com' },
    update: {},
    create: {
      email: 'team@frontmakers.com',
      name: 'Frontmakers Team',
      profession: 'Community Team',
      state: 'CA',
      country: 'US',
      newsletterOptIn: false,
      passwordHash: hashPassword('Frontmakers!123'),
    },
  });

  console.log('✅ Created default user:', defaultUser.email);

  // Create sample articles
  const articles = [
    {
      title: 'Complete CSS Grid Guide: From Basics to Advanced',
      slug: 'complete-css-grid-guide',
      excerpt:
        'Learn CSS Grid practically with real examples and use cases you can apply in your projects.',
      content: `# Complete CSS Grid Guide: From Basics to Advanced

CSS Grid revolutionized how we create layouts on the web. In this complete guide, you'll learn everything about Grid Layout, from basic concepts to advanced techniques.

## What is CSS Grid?

CSS Grid is a two-dimensional layout system that allows creating complex layouts in a simpler and more intuitive way.

## Basic Concepts

### Grid Container

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

This code creates a grid with 3 equal-sized columns and 20px spacing between items.

## Essential Properties

Learn about grid-template-columns, grid-template-rows, gap, and more...`,
      category: 'CSS',
      locale: 'en',
      readTime: 12,
      tags: ['CSS', 'Grid', 'Layout'],
      authorId: defaultUser.id,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-02-15'),
    },
    {
      title: 'Advanced TypeScript: Generics and Utility Types',
      slug: 'advanced-typescript-generics-utility-types',
      excerpt:
        'Master TypeScript generics and utility types to write more flexible and reusable code.',
      content: `# Advanced TypeScript: Generics and Utility Types

TypeScript's type system is one of the most powerful features. Learn how to use generics and utility types effectively.

## What are Generics?

Generics allow you to write flexible, reusable code that works with different types.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Utility Types

TypeScript provides built-in utility types like Partial, Required, Pick, and Omit.

Learn more about creating type-safe applications...`,
      category: 'TypeScript',
      locale: 'en',
      readTime: 15,
      tags: ['TypeScript', 'Generics', 'Types'],
      authorId: defaultUser.id,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-02-10'),
    },
    {
      title: 'Web Vitals: Optimizing Core Performance Metrics',
      slug: 'web-vitals-optimizing-core-performance-metrics',
      excerpt:
        'Learn how to measure and improve Core Web Vitals for better user experience and SEO.',
      content: `# Web Vitals: Optimizing Core Performance Metrics

Core Web Vitals are essential metrics for measuring user experience on your website.

## The Three Core Web Vitals

1. **LCP (Largest Contentful Paint)**: Loading performance
2. **FID (First Input Delay)**: Interactivity
3. **CLS (Cumulative Layout Shift)**: Visual stability

## Measuring Web Vitals

\`\`\`javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
\`\`\`

Learn optimization techniques for each metric...`,
      category: 'Performance',
      locale: 'en',
      readTime: 10,
      tags: ['Performance', 'Web Vitals', 'SEO'],
      authorId: defaultUser.id,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-02-05'),
    },
    {
      title: 'React Server Components: Complete Guide',
      slug: 'react-server-components-complete-guide',
      excerpt:
        'Understanding React Server Components and how they change the way we build React applications.',
      content: `# React Server Components: Complete Guide

React Server Components (RSC) represent a new paradigm in React development.

## What are Server Components?

Server Components are React components that run only on the server, reducing client-side JavaScript.

## Benefits

- Reduced bundle size
- Direct database access
- Improved performance
- Better SEO

## Example

\`\`\`tsx
// Server Component
async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await db.article.findUnique({
    where: { id: params.id }
  });
  
  return <ArticleContent article={article} />;
}
\`\`\`

Learn when to use Server vs Client Components...`,
      category: 'React',
      locale: 'en',
      readTime: 18,
      tags: ['React', 'Server Components', 'Next.js'],
      authorId: defaultUser.id,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-02-01'),
    },
  ];

  for (const article of articles) {
    const created = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
    console.log('✅ Created article:', created.title);
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
