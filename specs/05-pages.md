# 5. Rotas de página (`app/[locale]/**`, com alias em `/` via middleware)

| Rota | Tipo | Descrição |
|---|---|---|
| `/` (`app/page.tsx` → `[locale]/page.tsx`) | Server | Home: hero + feed de artigos aprovados (`getPublishedArticles`), filtros `recent/trending/most-read` (ordenação client-side sem persistência real de "reads", calculada deterministicamente a partir de `readTime`/`tags`/index — não é métrica real de analytics), sidebar de CTA para "Submit article". Renderiza via `HomeFeed` (client component). |
| `/articles` | Server | Listagem de artigos aprovados, com `AdBanner` a cada 2 artigos. |
| `/articles/[slug]` | Server | Artigo completo (Markdown via `react-markdown`), JSON-LD, artigos relacionados, abas "Article"/"Discussions" (discussões via dados mockados de `lib/discussions.ts`, com sort `relevant/recent/top` por query string). |
| `/t/[threadId]` | Server | Página de thread individual + respostas (dados mockados), votos são apenas botões visuais sem mutação real. |
| `/submit` | Client | Formulário de submissão de artigo (rich text via Quill), pré-preenche nome/email se usuário logado, chama `POST /api/submissions`. |
| `/auth` | Client | Login/Cadastro (abas), botão "Continuar com Google", tratamento de erros de OAuth via querystring. |
| `/account` | Client | Hub com 2 atalhos: dados pessoais e artigos. Exige sessão local. |
| `/account/personal` | Client | Editar perfil (nome, profissão, email, estado, país, newsletter, avatar via data URL), trocar senha, excluir conta. |
| `/account/articles` | Client | Lista artigos do usuário (via `GET /api/account/articles`), permite excluir artigo. |
| `/account/connected` | Client | Hoje é apenas um redirecionador: sempre manda para `/account` (ou `/auth` se deslogado) — página de "contas conectadas" não está implementada de fato. |
| `/tools`, `/tools/box-shadow`, `/tools/gradient`, `/tools/px-rem` | Server | Todas em estado **"Coming soon"** — são placeholders estáticos; as ferramentas (geradores) não estão funcionais no momento, apesar de existirem no README/instructions como feature histórica. |
| `/design-system` | Server/Client | Vitrine interna dos componentes/tokens do design system (não é uma página de produto para usuário final). |

Layouts: `app/layout.tsx` (root, fonte Inter, `<html lang="en">`), `app/[locale]/layout.tsx` (Header + Footer + metadata padrão do site).
