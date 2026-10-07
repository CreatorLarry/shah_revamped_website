-- Run in Supabase Dashboard > SQL Editor after setup.sql.
-- This migration is repeatable and preserves existing replacement images.

create table if not exists public.site_images (
  key text primary key check (key like '/images/%'),
  label text not null check (char_length(label) between 1 and 120),
  group_name text not null check (char_length(group_name) between 1 and 40),
  default_url text not null check (default_url like '/images/%'),
  current_url text check (current_url is null or current_url like 'https://%'),
  alt_text text not null default '' check (char_length(alt_text) <= 220),
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

drop trigger if exists site_images_set_updated_at on public.site_images;
create trigger site_images_set_updated_at
before update on public.site_images
for each row execute function public.set_updated_at();

alter table public.site_images enable row level security;

drop policy if exists "site images are public" on public.site_images;
create policy "site images are public"
on public.site_images for select
to anon, authenticated
using (true);

drop policy if exists "admins can update site images" on public.site_images;
create policy "admins can update site images"
on public.site_images for update
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (
  ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
  and (updated_by is null or updated_by = (select auth.uid()))
);

revoke all on table public.site_images from anon, authenticated;
grant select on table public.site_images to anon, authenticated;
grant update on table public.site_images to authenticated;

insert into public.site_images (key, label, group_name, default_url)
values
  ('/images/school-logo.png', 'School logo', 'Brand', '/images/school-logo.png'),
  ('/images/chairman-portrait.jpg', 'Board Chair portrait', 'Leadership', '/images/chairman-portrait.jpg'),
  ('/images/school/school-event-leadership.webp', 'School leadership event', 'Leadership', '/images/school/school-event-leadership.webp'),
  ('/images/school/student-portrait.webp', 'Student portrait', 'Community', '/images/school/student-portrait.webp'),
  ('/images/school/senior-students-community.webp', 'Senior students community', 'Community', '/images/school/senior-students-community.webp'),
  ('/images/school/campus-assembly.webp', 'Campus assembly', 'Community', '/images/school/campus-assembly.webp'),
  ('/images/school/sports-day-community.webp', 'Sports day community', 'Community', '/images/school/sports-day-community.webp'),
  ('/images/school/early-years-fruit-learning.webp', 'Early Years fruit learning', 'Learning', '/images/school/early-years-fruit-learning.webp'),
  ('/images/school/outdoor-study.webp', 'Outdoor study', 'Learning', '/images/school/outdoor-study.webp'),
  ('/images/school/museum-learning-trip.webp', 'Museum learning trip', 'Learning', '/images/school/museum-learning-trip.webp'),
  ('/images/school/careers-day.webp', 'Careers day', 'Learning', '/images/school/careers-day.webp'),
  ('/images/school/creative-arts-masks.webp', 'Creative arts masks', 'Activities', '/images/school/creative-arts-masks.webp'),
  ('/images/school/chess-club.webp', 'Chess club', 'Activities', '/images/school/chess-club.webp'),
  ('/images/school/cycling-club.webp', 'Cycling club', 'Activities', '/images/school/cycling-club.webp'),
  ('/images/school/early-years-taekwondo.webp', 'Early Years taekwondo', 'Activities', '/images/school/early-years-taekwondo.webp'),
  ('/images/school/netball-training.webp', 'Netball training', 'Activities', '/images/school/netball-training.webp'),
  ('/images/school/swimming-competition.webp', 'Swimming competition', 'Activities', '/images/school/swimming-competition.webp'),
  ('/images/school/swimming-training.webp', 'Swimming training', 'Activities', '/images/school/swimming-training.webp'),
  ('/images/school/basketball-team.webp', 'Basketball team', 'Activities', '/images/school/basketball-team.webp')
on conflict (key) do update
set
  label = excluded.label,
  group_name = excluded.group_name,
  default_url = excluded.default_url;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-images',
  'site-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site image files are public" on storage.objects;
create policy "site image files are public"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'site-images');

drop policy if exists "admins can upload site image files" on storage.objects;
create policy "admins can upload site image files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'site-images'
  and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "admins can replace site image files" on storage.objects;
create policy "admins can replace site image files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'site-images'
  and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'site-images'
  and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "admins can remove site image files" on storage.objects;
create policy "admins can remove site image files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'site-images'
  and ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
);

notify pgrst, 'reload schema';
