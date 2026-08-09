# 9. Fluxos de negócio principais

## 9.1 Publicação de artigo
1. Usuário (logado ou não) preenche `/submit` → `POST /api/submissions`.
2. Cria/reaproveita `User` autor pelo email informado no formulário (não necessariamente o usuário logado da sessão).
3. Artigo entra como `PENDENT`.
4. Aprovação/rejeição hoje só é possível via `PATCH /api/submissions` (sem UI de administração visível no app — provavelmente operada manualmente/via ferramenta externa).
5. Quando `APPROVED`, `publishedAt` é setado e o artigo passa a aparecer em `/articles`, `/` e `/api/articles`.

## 9.2 Gestão de conta
- Usuário edita perfil/senha/avatar em `/account/personal`; pode excluir a conta (cascata completa de conteúdo relacionado).
- Usuário vê e apaga os próprios artigos em `/account/articles`.

## 9.3 Discussões (parcialmente mockado)
- Schema Prisma já suporta `Thread`/`Reply`/votos reais, mas a UI atual lê de `lib/discussions.ts` (array em memória, sem persistência) — qualquer ação de "criar thread"/"votar" não é funcional/persistente hoje.
