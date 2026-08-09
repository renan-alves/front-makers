# 3. Modelo de dados (Prisma — `prisma/schema.prisma`)

## User
Perfil de comunidade aberto (sem conceito de "role"/admin no schema).
- `id, name, profession?, email (unique), avatar?, bio?, state, country, newsletterOptIn, passwordHash`
- Relações: `articles[]`, `threads[]`, `replies[]`, `threadVotes[]`, `replyVotes[]`

## Article
- `id, title, slug (unique), content (rich HTML), excerpt, coverImage?, locale (default "en"), status (SubmissionStatus, default PENDENT), category, readTime (min), tags (string[]), authorName?, authorEmail?, notes?, authorId → User, publishedAt?, reviewedAt?`
- Índices: `slug, locale, status, authorId, publishedAt`

## SubmissionStatus (enum)
`PENDENT | APPROVED | REJECTED`
(Histórico de migrações mostra que o valor original era `PENDING`, renomeado para `PENDENT`; e que existiu uma coluna separada `submissionStatus`, unificada de volta em `status`.)

## Thread / Reply (discussões vinculadas a artigos)
- `Thread`: `title, body, articleId → Article, authorId → User, acceptedReplyId?, isLocked, replies[], votes[]`
- `Reply`: `body, threadId → Thread, authorId → User, isBestAnswer, votes[]`
- `ThreadVote` / `ReplyVote`: voto único por usuário (`@@unique([threadId/replyId, userId])`), campo `value: Int` (up/down)

> Observação importante: as telas de discussão (`/articles/[slug]` aba "Discussions" e `/t/[threadId]`) hoje **consomem dados mockados em memória** (`lib/discussions.ts`), não o banco via `Thread`/`Reply`/`*Vote`. Ou seja, o schema já modela discussões reais, mas a feature de UI ainda não está ligada ao Prisma para esse domínio — é um gap de implementação (ver [11-known-gaps.md](./11-known-gaps.md)).
