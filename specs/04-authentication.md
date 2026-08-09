# 4. Autenticação

Estratégia: sessão simples no client via `localStorage` (`frontmakersUser`, objeto JSON do usuário) + evento customizado `frontmakers-auth` para sincronizar componentes (ex.: `Header`). Não há cookie de sessão HttpOnly nem JWT — é um modelo client-side, sem middleware de proteção de rota no servidor.

## 4.1 Email/senha
- Hash: `scrypt` com salt aleatório (`lib/auth.ts` — `hashPassword`/`verifyPassword`, comparação `timingSafeEqual`).
- Regras de senha forte (`isStrongPassword`): mínimo 8 caracteres, minúscula, maiúscula, número e símbolo.
- `POST /api/auth/register`: cria usuário (valida email, senha forte, e-mail duplicado → 409).
- `POST /api/auth/login`: valida credenciais e retorna o objeto `user` (sem hash) para o client salvar em `localStorage`.

## 4.2 Google OAuth
Fluxo "authorization code", sem lib de terceiros (implementado à mão):
1. `GET /api/auth/google` — gera `state` CSRF aleatório, salva em cookie `google_oauth_state` (HttpOnly, 5 min) e redireciona para o consent do Google.
2. `GET /api/auth/google/callback` — valida `state` via `request.cookies`, troca `code` por `access_token`, busca perfil (`/oauth2/v2/userinfo`), faz upsert do `User` (cria com `passwordHash: 'oauth-provider:google'` se não existir).
3. Em vez de redirecionar para uma página intermediária, o callback **responde diretamente com uma página HTML mínima** contendo um `<script>` inline que: grava `frontmakersUser` no `localStorage`, dispara `frontmakers-auth`, lê/limpa `frontmakersRedirect` e faz `window.location.replace(...)`. Isso elimina round-trips extras de fetch e evita problemas de tamanho de header/cookie observados em iterações anteriores.
4. Endpoint auxiliar `GET /api/auth/google/session?userId=` ainda existe (retorna o `User` por id) mas não é mais usado no caminho feliz do login Google — está disponível como utilitário/legado.
5. Erros (`config`, `state inválido`, `token inválido`, `sem email`) redirecionam para `/auth?error=google&detail=...` ou `/auth?error=google_missing_config`.

## 4.3 Logout
`Header.handleSignOut` remove `frontmakersUser` do `localStorage`, dispara `frontmakers-auth` e navega para `/auth`.

## 4.4 Guardas de rota
Páginas de conta (`/account`, `/account/personal`, `/account/articles`) são Client Components que, em `useEffect`, checam `localStorage.frontmakersUser`; se ausente, salvam `frontmakersRedirect` e fazem `router.replace('/auth')`. **Não há proteção no servidor** (nem middleware, nem verificação de sessão em API routes sensíveis além de exigir `userId` no corpo/query — ou seja, qualquer client pode chamar essas APIs passando qualquer `userId` sem prova de posse da sessão). Ver [10-security-findings.md](./10-security-findings.md).
