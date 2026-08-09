# 1. Visão geral

Frontmakers é uma plataforma editorial aberta para desenvolvedores frontend, construída em Next.js (App Router) com PostgreSQL (Neon) via Prisma. Hoje o produto é 100% gratuito: qualquer usuário pode publicar artigos, comentar e participar de discussões, sem lógica de planos/pagamento.

- Framework: Next.js 15 (App Router), React 19, TypeScript 5
- Estilo: TailwindCSS + CSS variables (design system próprio)
- Banco: PostgreSQL via Prisma ORM (Neon serverless Postgres)
- Autenticação: email/senha própria (scrypt) + OAuth Google
- Internacionalização: estrutura `[locale]` existe no código, mas hoje só `en` está ativo (`lib/i18n.ts` força `locales = ['en']`); todo o site aparece em inglês, com `middleware.ts` reescrevendo rotas "root" para `/en/...`.

Ver também: [10-security-findings.md](./10-security-findings.md) e [11-known-gaps.md](./11-known-gaps.md) para riscos e pendências identificados durante o levantamento.
