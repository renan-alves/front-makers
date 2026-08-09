# Testing Guide

## Stack

- **Unit / integration**: [Vitest](https://vitest.dev) + `@vitest/coverage-v8`, with `vite-tsconfig-paths` so `@/...` imports resolve the same way they do in the app.
- **Components**: `@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom`, running in a `jsdom` environment (`@vitest-environment jsdom` pragma per test file) with `@vitejs/plugin-react` handling JSX transform.
- **Prisma**: fully mocked in every test via `vi.mock('@/lib/prisma', ...)` (or `'./prisma'` for files inside `lib/`). **No test ever touches the real Neon database.**
- E2E tests (Playwright) are planned as a later stage — not implemented yet.

## Running tests

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # run once + generate an HTML/lcov/text coverage report
```

Coverage output is written to `coverage/` (open `coverage/index.html` for the interactive report). Coverage is scoped to `lib/**`, `app/api/**` and `components/**` (see `vitest.config.mts`).

You may see a few harmless warnings when running Vitest — they do not affect test results and can be ignored:
- "The plugin `vite-tsconfig-paths` is detected..."
- "Not implemented: navigation to another Document" (jsdom limitation triggered by clicking real `<a>`/`next/link` elements in component tests)

### Component test setup notes

- Vitest's config file is `vitest.config.mts` (explicit ESM extension — a plain `.ts` file caused the Vite/Rolldown config loader to silently ignore some options).
- `tsconfig.json` uses `jsx: "preserve"` (required by Next.js' own SWC compiler). Vitest's Vite pipeline needs its own JSX transform, provided by the `@vitejs/plugin-react` plugin in `vitest.config.mts` — without it, `.tsx` test files fail to parse.
- Each component test file starts with `// @vitest-environment jsdom` to opt into a DOM environment (the default stays `node` for `lib/`/`app/api` tests, which is faster and avoids DOM-only globals leaking into server-side tests).
- `vitest.setup.ts` registers `@testing-library/jest-dom` matchers and an `afterEach(() => cleanup())` — required so each test starts with a clean DOM (Testing Library normally auto-registers this cleanup only when it detects a global `afterEach`, which Vitest doesn't inject unless `test.globals: true`).
- Components using `next/navigation` (`Header`, `HomeFeed`) mock the module directly via `vi.mock('next/navigation', ...)`.
- `QuillEditor` mocks the `quill` package entirely (a lightweight in-memory fake) instead of exercising the real rich-text editor in jsdom.

## Current coverage snapshot

| Metric      | Coverage |
|-------------|----------|
| Statements  | 95.3%    |
| Branches    | 88.5%    |
| Functions   | 100%     |
| Lines       | 95.2%    |

193 tests across 31 test files, all passing, covering:
- `lib/auth.ts`, `lib/utils.ts`, `lib/i18n.ts`, `lib/discussions.ts`, `lib/seo.ts`, `lib/articles.ts`
- All route handlers under `app/api/auth/**`, `app/api/account/**`, `app/api/articles`, `app/api/submissions`
- Components: `Button`, `Container`, `Skeleton`, `ChevronDown`, `FlagBrazil`/`FlagUK`, `ArticleCard`, `ToolCard`, `SocialAuthButton`, `AdBanner`, `Footer`, `Header`, `HomeFeed`, `QuillEditor`

Every route's success path, validation/error responses, and (where practical) its `catch`/500 path are covered by forcing the mocked Prisma client (or `fetch`) to reject. Components are tested for rendering output, prop-driven variants, user interactions (clicks, filter changes, sign-in/out), and integration with mocked browser/Next.js APIs (`localStorage`, `next/navigation`).

## Known, accepted gaps

These were investigated and intentionally left uncovered — closing them would require either changing production code/data for test purposes only, or a disproportionate amount of test scaffolding for very low risk. Re-evaluate if these areas start causing real bugs.

- **`lib/prisma.ts` (0%)** — the module-level `DATABASE_URL` guard and Prisma Client singleton only really run at process/module load time. A `vi.resetModules()` + dynamic-`import()` test was attempted but caused stack overflows in the current Vitest/Vite setup; the guard's behavior (throws when `DATABASE_URL` is unset) was verified manually instead. Safe to revisit later with a dedicated isolated test process.
- **`lib/utils.ts` — `storage.set`/`storage.remove` catch blocks** — these only execute when `isClient` is `true` (browser) AND `localStorage` throws (e.g. private browsing / quota exceeded). Not exercised even with jsdom available, since forcing `localStorage.setItem` to throw needs an extra low-value mock; deferred.
- **`lib/i18n.ts` line 59** — `getLocalizedUrl`'s `if (locale === defaultLocale)` branch is effectively dead code: both branches return the same value because the `Locale` type currently only has one member (`'en'`). Not a real behavioral gap.
- **`lib/discussions.ts` lines 120/125** — the reply sort's "neither reply is the best answer, tie-break by votes" branch. The current mock dataset (`lib/discussions.ts` `replies` fixture) has no thread with 2+ non-best-answer replies, so exercising this needs new fixture data — deferred rather than adding fixture content purely for coverage.
- **Deep `a || b || c` fallback chains** (e.g. Google OAuth token/profile field fallbacks in `app/api/auth/google/callback/route.ts`, submission `excerpt`/`category`/`tags`/`locale` fallbacks in `app/api/submissions/route.ts`) — only some of the 2-3 fallback branches are exercised. These are low-risk default-value branches; full permutation coverage was judged not worth the added test volume.
- **`app/api/auth/google/route.ts` catch block** — would require forcing `crypto.randomBytes` (or similar) to throw; not attempted since it's an unreachable-in-practice defensive branch.
- **`Header.tsx` line 58 / `QuillEditor.tsx` lines 25, 32** — SSR guards (`typeof window === 'undefined'`) and a React-unmount race guard (`isMounted` flag inside an async dynamic `import('quill')` callback). Not realistically triggerable from a jsdom-based render test; would need a dedicated SSR test harness or a controllable/delayed module mock.

## Next stage (not started)

- **E2E tests** — Playwright, covering home/articles browsing, submission flow, register/login, and account management. Google OAuth E2E will need a mocking/boundary strategy since it depends on a real Google consent screen.

