# 11. Gaps e observações conhecidas

1. Autorização por `userId` sem verificação de posse de sessão (IDOR) nas rotas `/api/account/*` e `/api/submissions` (GET/PATCH).
2. `/api/submissions` GET/PATCH não exige autenticação — qualquer pessoa com acesso à API pode listar submissões e aprovar/rejeitar artigos.
3. Página `/account/connected` não implementa de fato "contas conectadas" — apenas redireciona.
4. Ferramentas (`box-shadow`, `gradient`, `px-rem`) estão em "coming soon", apesar de citadas como feature ativa no `README.md`.
5. Discussões/threads/votos são mockados (não persistidos via Prisma), embora o schema já suporte o domínio completo.
6. Dois sistemas de tradução coexistindo: dicionário central (`locales/*.ts`) vs. objetos inline por página — sem uma fonte única.
7. `data/articles.ts` contém artigos mockados adicionais que não parecem ser usados pelo fluxo principal (que lê do Postgres via `lib/articles.ts`), sinalizando possível código legado a ser removido/consolidado.
