-- Run once in Supabase Dashboard > SQL Editor on an existing project.
-- Removes the old 10 MB bucket limits. The project's global Storage limit
-- still applies and can be changed under Storage > Settings.

update storage.buckets
set file_size_limit = null
where id in ('site-images', 'story-images');
