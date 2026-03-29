create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  locale text not null default 'en' check (locale in ('en', 'fr')),
  role text not null default 'learner',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  outcome_en text not null,
  outcome_fr text not null,
  duration text not null,
  difficulty text not null check (difficulty in ('starter', 'intermediate', 'advanced')),
  focus_areas text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.learning_steps (
  id uuid primary key default gen_random_uuid(),
  path_slug text not null references public.learning_paths (slug) on delete cascade,
  slug text not null,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  expected_output_en text not null,
  expected_output_fr text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (path_slug, slug)
);

create table if not exists public.control_domains (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  code text not null unique,
  title_en text not null,
  title_fr text not null,
  description_en text not null,
  description_fr text not null,
  control_count integer not null,
  theme text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.controls (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  code text not null unique,
  domain_slug text not null references public.control_domains (slug) on delete restrict,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  implementation_hint_en text not null,
  implementation_hint_fr text not null,
  clause_links text[] not null default '{}',
  tags text[] not null default '{}',
  evidence_slugs text[] not null default '{}',
  risk_slugs text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  owner text not null,
  classification text not null check (classification in ('public', 'internal', 'confidential', 'restricted')),
  lifecycle text not null check (lifecycle in ('planned', 'active', 'retired')),
  control_slugs text[] not null default '{}',
  risk_slugs text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.risks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  asset_slug text not null references public.assets (slug) on delete restrict,
  control_slug text not null references public.controls (slug) on delete restrict,
  likelihood integer not null check (likelihood between 1 and 5),
  impact integer not null check (impact between 1 and 5),
  owner text not null,
  treatment_status text not null check (treatment_status in ('planned', 'active', 'accepted', 'validated')),
  treatment_plan_en text not null,
  treatment_plan_fr text not null,
  evidence_gap_en text not null,
  evidence_gap_fr text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_fr text not null,
  summary_en text not null,
  summary_fr text not null,
  artifact_type text not null,
  source_system text not null,
  cadence text not null,
  readiness text not null check (readiness in ('ready', 'in-progress', 'missing')),
  control_slug text not null references public.controls (slug) on delete restrict,
  notes_en text not null,
  notes_fr text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  path_slug text not null,
  step_slug text not null,
  status text not null default 'not-started' check (status in ('not-started', 'in-progress', 'done')),
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, path_slug, step_slug),
  constraint progress_entries_step_fk
    foreign key (path_slug, step_slug)
    references public.learning_steps (path_slug, slug)
    on delete cascade
);

create index if not exists idx_learning_steps_path_slug on public.learning_steps (path_slug);
create index if not exists idx_controls_domain_slug on public.controls (domain_slug);
create index if not exists idx_risks_asset_slug on public.risks (asset_slug);
create index if not exists idx_risks_control_slug on public.risks (control_slug);
create index if not exists idx_evidence_control_slug on public.evidence_items (control_slug);
create index if not exists idx_progress_entries_user_id on public.progress_entries (user_id);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger set_learning_paths_updated_at
before update on public.learning_paths
for each row execute procedure public.set_updated_at();

create trigger set_learning_steps_updated_at
before update on public.learning_steps
for each row execute procedure public.set_updated_at();

create trigger set_control_domains_updated_at
before update on public.control_domains
for each row execute procedure public.set_updated_at();

create trigger set_controls_updated_at
before update on public.controls
for each row execute procedure public.set_updated_at();

create trigger set_assets_updated_at
before update on public.assets
for each row execute procedure public.set_updated_at();

create trigger set_risks_updated_at
before update on public.risks
for each row execute procedure public.set_updated_at();

create trigger set_evidence_items_updated_at
before update on public.evidence_items
for each row execute procedure public.set_updated_at();

create trigger set_progress_entries_updated_at
before update on public.progress_entries
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.learning_paths enable row level security;
alter table public.learning_steps enable row level security;
alter table public.control_domains enable row level security;
alter table public.controls enable row level security;
alter table public.assets enable row level security;
alter table public.risks enable row level security;
alter table public.evidence_items enable row level security;
alter table public.progress_entries enable row level security;

create policy "Profiles are readable by the owner"
on public.profiles
for select
using (auth.uid() = id);

create policy "Profiles are updatable by the owner"
on public.profiles
for update
using (auth.uid() = id);

create policy "Learning paths are public"
on public.learning_paths
for select
using (true);

create policy "Learning steps are public"
on public.learning_steps
for select
using (true);

create policy "Control domains are public"
on public.control_domains
for select
using (true);

create policy "Controls are public"
on public.controls
for select
using (true);

create policy "Assets are public"
on public.assets
for select
using (true);

create policy "Risks are public"
on public.risks
for select
using (true);

create policy "Evidence items are public"
on public.evidence_items
for select
using (true);

create policy "Progress entries are readable by the owner"
on public.progress_entries
for select
using (auth.uid() = user_id);

create policy "Progress entries are insertable by the owner"
on public.progress_entries
for insert
with check (auth.uid() = user_id);

create policy "Progress entries are updatable by the owner"
on public.progress_entries
for update
using (auth.uid() = user_id);

create policy "Progress entries are deletable by the owner"
on public.progress_entries
for delete
using (auth.uid() = user_id);
