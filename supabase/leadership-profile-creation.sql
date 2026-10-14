-- Run once in Supabase Dashboard > SQL Editor on projects that already ran
-- media-library.sql. This safely adds dashboard permission to create profiles.

alter table public.leadership_profiles enable row level security;

drop policy if exists "admins can create leadership profiles" on public.leadership_profiles;
create policy "admins can create leadership profiles"
on public.leadership_profiles for insert
to authenticated
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

grant insert on table public.leadership_profiles to authenticated;

notify pgrst, 'reload schema';
