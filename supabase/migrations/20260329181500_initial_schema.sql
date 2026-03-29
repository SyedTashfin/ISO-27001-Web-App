create extension if not exists pgcrypto;

create table if not exists public.lesson_modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  level text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  module_order integer not null default 0,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clause_summaries (
  id uuid primary key default gen_random_uuid(),
  clause text not null unique,
  title_en text not null,
  title_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.annex_controls (
  code text primary key,
  category text not null,
  title_en text not null,
  title_fr text not null,
  focus_en text not null,
  focus_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.glossary_terms (
  slug text primary key,
  term_en text not null,
  term_fr text not null,
  definition_en text not null,
  definition_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.scenario_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  context_en text not null,
  context_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quiz_sets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.framework_comparisons (
  id text primary key,
  name text not null unique,
  title_en text not null,
  title_fr text not null,
  comparison_type_en text not null,
  comparison_type_fr text not null,
  purpose_en text not null,
  purpose_fr text not null,
  who_uses_it_en text not null,
  who_uses_it_fr text not null,
  legal_status_en text not null,
  legal_status_fr text not null,
  business_relevance_en text not null,
  business_relevance_fr text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.nonconformity_cases (
  id text primary key,
  title_en text not null,
  title_fr text not null,
  context_en text not null,
  context_fr text not null,
  classification text not null check (classification in ('major', 'minor', 'observation')),
  related_clause text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.module_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  completed boolean not null default false,
  last_activity_at timestamptz not null default timezone('utc', now()),
  source text not null default 'app',
  primary key (user_id, module_slug)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null,
  score integer not null check (score >= 0),
  max_score integer not null check (max_score > 0),
  answers jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.simulation_states (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  simulation_type text not null,
  simulation_key text not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, simulation_type, simulation_key)
);

create index if not exists lesson_modules_order_idx
  on public.lesson_modules (module_order);
create index if not exists clause_summaries_clause_idx
  on public.clause_summaries (clause);
create index if not exists annex_controls_category_idx
  on public.annex_controls (category);
create index if not exists glossary_terms_term_en_idx
  on public.glossary_terms (term_en);
create index if not exists framework_comparisons_name_idx
  on public.framework_comparisons (name);
create index if not exists nonconformity_cases_classification_idx
  on public.nonconformity_cases (classification, related_clause);
create index if not exists quiz_attempts_user_idx
  on public.quiz_attempts (user_id, module_slug, attempted_at desc);
create index if not exists simulation_states_user_idx
  on public.simulation_states (user_id, simulation_type);

alter table public.lesson_modules enable row level security;
alter table public.clause_summaries enable row level security;
alter table public.annex_controls enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.scenario_templates enable row level security;
alter table public.quiz_sets enable row level security;
alter table public.framework_comparisons enable row level security;
alter table public.nonconformity_cases enable row level security;
alter table public.module_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.simulation_states enable row level security;

create policy "Public read lesson modules"
on public.lesson_modules
for select
using (true);

create policy "Public read clause summaries"
on public.clause_summaries
for select
using (true);

create policy "Public read annex controls"
on public.annex_controls
for select
using (true);

create policy "Public read glossary terms"
on public.glossary_terms
for select
using (true);

create policy "Public read scenario templates"
on public.scenario_templates
for select
using (true);

create policy "Public read quiz sets"
on public.quiz_sets
for select
using (true);

create policy "Public read framework comparisons"
on public.framework_comparisons
for select
using (true);

create policy "Public read nonconformity cases"
on public.nonconformity_cases
for select
using (true);

create policy "Users manage their module progress"
on public.module_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage their quiz attempts"
on public.quiz_attempts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage their simulation states"
on public.simulation_states
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
