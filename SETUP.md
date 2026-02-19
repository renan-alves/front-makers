# Frontmakers - Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a PostgreSQL database and update your `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 3. Initialize Prisma

Generate Prisma Client:

```bash
npm run db:generate
```

Push the schema to your database:

```bash
npm run db:push
```

### 4. Seed Initial Data

Populate the database with sample articles:

```bash
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to `/en`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with initial data

## Project Structure

```
frontmakers/
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── articles/       # Article pages
│   │   ├── tools/          # Tool pages
│   │   ├── submit/         # Article submission
│   │   ├── layout.tsx      # Locale-specific layout
│   │   └── page.tsx        # Home page
│   ├── api/                # API routes
│   │   ├── articles/       # Article API
│   │   └── submissions/    # Submission API
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Root redirect
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Layout components
│   ├── ui/                 # UI components
│   ├── ads/                # Ad components
│   ├── article/            # Article components
│   └── tools/              # Tool components
├── lib/
│   ├── i18n.ts             # Internationalization config
│   ├── prisma.ts           # Prisma client singleton
│   ├── articles.ts         # Article service layer
│   ├── seo.ts              # SEO utilities
│   └── utils.ts            # General utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── middleware.ts           # Locale routing middleware
└── docs/
    └── copilot-instructions.md  # Development guide
```

## Features

### Current Features

- ✅ International routing (English default, prepared for PT/ES)
- ✅ Database integration with Prisma ORM
- ✅ Community article submissions
- ✅ Published article management
- ✅ 3 CSS tools (Box Shadow, Gradient, PX→REM)
- ✅ SEO optimization
- ✅ Google AdSense ready
- ✅ Responsive design
- ✅ Dark mode support (prepared)

### Prepared for Future

- 🔜 Multi-language support (add `/pt`, `/es` routes)
- 🔜 Authentication (NextAuth.js ready)
- 🔜 Admin dashboard for moderation
- 🔜 SaaS subscription model (Stripe)
- 🔜 Email notifications
- 🔜 Premium tools
- 🔜 User profiles

## API Endpoints

### Get Published Articles

```bash
GET /api/articles?locale=en&limit=10&category=CSS
```

### Submit Article

```bash
POST /api/submissions
Content-Type: application/json

{
  "title": "Article Title",
  "content": "Article content in Markdown...",
  "authorName": "Your Name",
  "authorEmail": "your@email.com",
  "category": "CSS",
  "tags": ["css", "grid"],
  "locale": "en"
}
```

### Get Submissions (future: admin only)

```bash
GET /api/submissions?status=PENDING
```

## Database Models

### User

- Prepared for authentication
- Roles: ADMIN, AUTHOR, USER

### Article

- Published content
- Support for multiple locales
- Status: DRAFT, PUBLISHED

### ArticleSubmission

- Community submissions
- Status: PENDING, APPROVED, REJECTED

## Environment Variables

Required:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` - Application URL

Optional:

- `NEXT_PUBLIC_ADSENSE_ID` - Google AdSense ID
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_SITE_URL` - Production site URL

Future (not yet implemented):

- `NEXTAUTH_URL` - NextAuth URL
- `NEXTAUTH_SECRET` - NextAuth secret
- `SMTP_*` - Email configuration
- `STRIPE_*` - Stripe configuration

## Design System

### Colors

```css
Primary: #E10600 (red)
Accent: #00C2FF (blue)
Text: #1A1A1A
Background: #FFFFFF
```

### Typography

- Font: Inter (variable)
- Headings: Bold, tight line-height
- Body: 1.7 line-height

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build: `npm run build`
2. Start: `npm run start`
3. Ensure PostgreSQL is accessible
4. Set all environment variables

## Contributing

See `docs/copilot-instructions.md` for development guidelines.

## License

See LICENSE file for details.

---

**Frontmakers** - Tools and Articles for Frontend Developers
