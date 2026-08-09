# 6. API routes (`app/api/**`)

| Rota | Método | Função |
|---|---|---|
| `/api/articles` | GET | Lista artigos `APPROVED` via SQL raw (`Prisma.$queryRaw`), filtros `locale`, `limit`, `category`. |
| `/api/submissions` | POST | Cria submissão de artigo (`status: PENDENT`), gera slug único, cria autor se não existir (senha temporária fixa `frontmakers-temp-password` hasheada). |
| `/api/submissions` | GET | Lista submissões por `status` (uso administrativo — **sem autenticação/autorização hoje**). |
| `/api/submissions` | PATCH | Atualiza `status`/`notes` de uma submissão; se `APPROVED`, seta `publishedAt = now()` (**sem autenticação/autorização hoje** — qualquer chamada pode aprovar/rejeitar artigos). |
| `/api/auth/register` | POST | Cria conta local (email/senha). |
| `/api/auth/login` | POST | Login local, retorna dados públicos do usuário. |
| `/api/auth/google` | GET | Inicia OAuth Google. |
| `/api/auth/google/callback` | GET | Finaliza OAuth Google (ver [04-authentication.md](./04-authentication.md)). |
| `/api/auth/google/session` | GET | Busca usuário por `userId` (fallback/legado do fluxo Google). |
| `/api/account/update` | PATCH | Atualiza perfil (nome, profissão, email, estado, país, newsletter, avatar). |
| `/api/account/password` | PATCH | Troca senha (valida senha atual + força da nova). |
| `/api/account/delete` | DELETE | Exclui conta e cascata manual (votos → replies → threads → articles → user) em transação. |
| `/api/account/articles` | GET | Lista artigos do usuário (`authorId`) via SQL raw. |
| `/api/account/articles/[articleId]` | DELETE | Exclui artigo do próprio usuário (valida `authorId === userId`) e cascata de threads/replies/votes relacionados. |

> Nenhuma dessas rotas usa cookies de sessão ou token para autenticar o "dono" da chamada — todas confiam no `userId` enviado pelo client (obtido do `localStorage`). Isso é um risco de autorização (IDOR), ver [10-security-findings.md](./10-security-findings.md).
