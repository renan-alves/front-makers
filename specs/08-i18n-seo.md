# 8. i18n / Locales

- `lib/i18n.ts`: hoje só existe locale `en`, apesar da estrutura `[locale]` seguir presente.
- `locales/en.ts` e `locales/pt-BR.ts` existem e são exportados via `locales/index.ts`, mas a maior parte das páginas implementa traduções **manualmente inline** (objetos `t = locale === 'pt-br' ? {...} : {...}`) em vez de usar o dicionário central — ou seja, há duas fontes de tradução coexistindo (parcialmente redundante).
- `middleware.ts` reescreve (rewrite) rotas "root" (`/account`, `/articles`, `/auth`, `/submit`, `/tools`, `/design-system`, `/t`) para `/en/...` internamente, mantendo URLs "limpas" sem prefixo de idioma visível.

# SEO

- `lib/seo.ts`: helpers para `generatePageMetadata`, JSON-LD de `Article`, `WebSite`, `Organization`, `Breadcrumb`.
- `app/sitemap.ts`, `app/robots.ts`: geração dinâmica.
- Metadata por página via `generateMetadata` (Next.js App Router), incluindo Open Graph/Twitter card.
- Artigo individual injeta JSON-LD `Article` diretamente via `<script type="application/ld+json">`.
