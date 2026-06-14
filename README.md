# ISO 27001 Lab

ISO 27001 Lab is a bilingual learning platform for ISO/IEC 27001 with English, French, and dual-language display modes. It is built for students, junior cybersecurity and GRC candidates, and working professionals in France who need practical ISO 27001 fluency for projects, interviews, customer conversations, implementation work, and audits.

The app combines guided learning, clause exploration, control discovery, risk treatment practice, SoA simulation, audit drills, nonconformity classification, and learner progress tracking in one product surface.

## Recruiter snapshot
- Bilingual ISO 27001 product built for real learner workflows, not generic documentation browsing
- Strong full-stack evidence: Next.js 16, React 19, TypeScript, Tailwind, Supabase, and structured course data
- Demonstrates product thinking across learning design, compliance workflows, practice labs, and admin/content architecture

## Top-level information architecture

- Home
- Learn
- Practice
- Risk Lab
- Audit Lab
- Control Library
- Glossary
- Compare
- Dashboard
- Admin / Content Studio

## Product features

- Three language modes:
  - English only
  - French only
  - Dual side-by-side mode
- Twelve guided learning modules from foundations through capstone simulation
- Clause Explorer for clauses 4 to 10
- Annex A control library with the full 93-control catalog in typed application seed data
- Risk Lab with educational risk scoring and treatment mapping
- SoA Builder that teaches applicability, justification, and implementation status
- Audit Lab for internal and external audit thinking
- Nonconformity Lab for major, minor, and observation classification
- Compare page for ISO 27001, ISO 27002, ISO 19011, SOC 2, GDPR, and HIPAA
- Glossary with bilingual terminology and audio-placeholder architecture
- Dashboard with progress, strengths, weak areas, scenario completions, and readiness signals
- Admin / Content Studio for local draft-based bilingual content editing

## Routes

- `/` home and guided entry point
- `/learn` full learning path
- `/learn/[slug]` module detail pages
- `/learn/clauses` clause explorer index
- `/learn/clauses/[clause]` clause detail pages for clauses 4 to 10
- `/practice` practice hub
- `/practice/soa-builder` Statement of Applicability simulator
- `/practice/nonconformity-lab` nonconformity classification lab
- `/risk-lab` scenario-driven risk analysis lab
- `/audit-lab` internal/external audit workbench
- `/control-library` Annex A control library
- `/compare` standards and framework comparison
- `/glossary` glossary and bilingual terminology explorer
- `/dashboard` learner dashboard
- `/admin` content studio
- `/content-studio` alias for `/admin`
- `/annex-a` compatibility redirect to `/control-library`

## Stack

- Next.js `16.2.1` with the App Router
- React `19.2.4`
- TypeScript `5.9.3`
- Tailwind CSS `4.2.2`
- shadcn/ui primitives
- Framer Motion `12.38.0`
- Lucide React `1.7.0`
- Supabase SSR `0.9.0`
- Supabase JS `2.100.1`

## Architecture summary

- `src/app`
  Next.js App Router pages, route handlers, auth callback, and product routes.
- `src/components/app`
  Product-facing UI for language mode, lessons, practice engine, clause explorer, control explorer, risk lab, audit lab, dashboard, and content studio.
- `src/components/ui`
  Reusable shadcn/ui building blocks.
- `src/lib/course-data.ts`
  Base typed bilingual course data and the full 93-control Annex A seed catalog.
- `src/lib/platform-data.ts`
  Product IA content model for modules, glossary entries, comparisons, scenarios, nonconformity cases, and practice questions.
- `src/lib/learning-insights.ts`
  Local learner analytics and dashboard snapshot generation.
- `src/lib/storage.ts`
  Browser persistence helpers and same-tab storage subscriptions.
- `src/lib/supabase`
  Browser, server, proxy, and typed database helpers.
- `supabase/migrations`
  PostgreSQL schema and RLS policies for content tables and learner state.
- `supabase/seed.sql`
  Relational starter content for modules, clauses, controls, glossary, scenarios, comparisons, quizzes, and nonconformity cases.

## Content model

The app uses a bilingual content-first design. Core records are modeled for English and French rather than treating French as a shallow label translation.

Current content entities:

- learning modules
- clause summaries
- Annex A controls
- glossary terms
- scenario templates
- quiz sets
- framework comparisons
- nonconformity cases
- user module progress
- quiz attempts
- saved simulation states

In the current implementation, the canonical runtime content lives in typed TypeScript seed data for immediate app performance and maintainability, while Supabase provides a relational content foundation for future migration and editor workflows.

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The app works in guest mode without Supabase credentials. Language mode, progress, practice attempts, and lab state will still work locally in the browser.

## Environment variables

Set these in `.env.local` when enabling Supabase:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is supported as a compatibility alias.

## Supabase setup

1. Create a Supabase project.
2. Apply `supabase/migrations/20260329181500_initial_schema.sql`.
3. Apply `supabase/seed.sql`.
4. Configure email or magic-link auth if you want authenticated progress sync.
5. Add your local and production callback URLs in Supabase Auth for `/auth/callback`.

Supabase currently covers:

- authentication
- module progress persistence
- quiz attempt persistence
- simulation state persistence
- starter relational content tables for future content migration

## Validation

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

The app is ready for deployment on Vercel or any Node-compatible host.

Recommended production steps:

1. Deploy the Next.js app.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
3. Configure the public Supabase credentials.
4. Add the production auth callback URL in Supabase.

## Fully implemented

- App shell, navigation, and responsive bilingual UX
- Home page with hero, CTA paths, module preview, and product positioning
- Twelve guided learning modules
- Clause Explorer for clauses 4 to 10
- Control Library UI backed by the full 93-control typed catalog
- Risk Lab
- SoA Builder
- Audit Lab
- Nonconformity Lab
- Compare page
- Glossary explorer
- Practice engine
- Dashboard
- Local-first Content Studio
- Guest-mode persistence
- Supabase-backed auth and learner-state sync for supported flows

## Scaffolded / next layer

- Content Studio publishing workflow into Supabase content tables
- Supabase read path for all product content instead of typed seed data
- Audio pronunciation assets for glossary terms
- Rich export formats for SoA and learner reports
- More adaptive practice recommendations and server-side mastery analytics

## Future improvements

- Replace local-only content drafting with authenticated admin publishing
- Add richer analytics by topic, clause, and control category
- Sync practice-engine attempts to Supabase in addition to local storage
- Add scenario authoring workflows and moderation states
- Add downloadable audit packs, SoA summaries, and revision sheets
