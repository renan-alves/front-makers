# 2. Stack técnica (package.json)

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js ^15.1.3 (App Router) |
| UI runtime | React ^19 |
| Linguagem | TypeScript ^5.3 |
| Estilo | TailwindCSS ^3.4 |
| ORM | Prisma ^5.22 + `@prisma/client` |
| Editor de texto rico | `quill` ^2.0.3 |
| Markdown | `react-markdown` ^9 |
| UI headless | `@headlessui/react` ^2.2.9 (Dialog do menu mobile) |
| Utilitário de classes | `clsx` |
| Seed/scripts | `tsx` |

Scripts relevantes (`package.json`):
- `dev` / `build` (roda `prisma generate` antes) / `start` / `lint`
- `db:generate`, `db:push`, `db:migrate`, `db:studio`, `db:seed`
