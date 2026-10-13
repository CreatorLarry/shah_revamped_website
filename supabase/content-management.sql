-- Run once in Supabase Dashboard > SQL Editor.
-- Repeatable: adds story publication dates and editable core website pages.

alter table public.stories
  add column if not exists published_at timestamptz;

update public.stories
set published_at = created_at
where status = 'published' and published_at is null;

create index if not exists stories_published_at_idx
  on public.stories (published_at desc)
  where status = 'published';

create table if not exists public.editable_pages (
  key text primary key check (
    key in ('board-chair-message', 'school-administrator-message', 'fee-structure')
  ),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists editable_pages_set_updated_at on public.editable_pages;
create trigger editable_pages_set_updated_at
before update on public.editable_pages
for each row execute function public.set_updated_at();

alter table public.editable_pages enable row level security;

drop policy if exists "editable pages are public" on public.editable_pages;
create policy "editable pages are public"
on public.editable_pages for select
to anon, authenticated
using (true);

drop policy if exists "admins can create editable pages" on public.editable_pages;
create policy "admins can create editable pages"
on public.editable_pages for insert
to authenticated
with check (
  ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
  and updated_by = (select auth.uid())
);

drop policy if exists "admins can update editable pages" on public.editable_pages;
create policy "admins can update editable pages"
on public.editable_pages for update
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (
  ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
  and updated_by = (select auth.uid())
);

drop policy if exists "admins can delete editable pages" on public.editable_pages;
create policy "admins can delete editable pages"
on public.editable_pages for delete
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

revoke all on table public.editable_pages from anon, authenticated;
grant select on table public.editable_pages to anon, authenticated;
grant insert, update, delete on table public.editable_pages to authenticated;
