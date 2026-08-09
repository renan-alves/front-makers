# 7. Componentes principais

- `components/layout/Header.tsx` — nav sticky, menu mobile (Headless UI `Dialog`), estado de login via `localStorage` + listener de `storage`/`frontmakers-auth`; dropdown de conta; logo em `/frontmakers-logo@2x.webp`.
- `components/layout/Footer.tsx` — links + `AdBanner slot="footer"`.
- `components/home/HomeFeed.tsx` — client component que recebe `list`/`aside` como `ReactNode` (Server → Client boundary), aplica `Children.toArray` para normalizar keys, filtros com `useTransition` + `router.push` (querystring `?filter=`).
- `components/article/ArticleCard.tsx`, `components/tools/ToolCard.tsx` — cards de listagem.
- `components/ui/*` — `Button`, `Container`, `Skeleton`, `SocialAuthButton` (hoje só variante `google` é usada — GitHub/LinkedIn foram removidos da UI), `QuillEditor` (wrapper client do Quill para o formulário de submissão).
- `components/ads/AdBanner.tsx` — placeholder estrutural para Google AdSense por slot (`hero`, `article-list`, `article-content`, `article-bottom`, `tool-end`, `footer`); nenhum script do AdSense está de fato carregado ainda (comentado em `app/layout.tsx`).
