create extension if not exists "uuid-ossp";

create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  location_zone text not null,
  area numeric not null,
  finish_level text not null,
  service_needed text not null,
  goal text,
  budget_range text,
  urgency text,
  complexity text,
  lead_score integer,
  status text not null default 'nuevo',
  ai_summary text,
  notes text
);

create table if not exists public.ai_reports (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads(id) on delete cascade,
  report jsonb not null
);

alter table public.leads enable row level security;
alter table public.ai_reports enable row level security;

-- Las operaciones públicas de lectura quedan cerradas.
-- Las API routes usan service role key en servidor.

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_score_idx on public.leads(lead_score desc);
