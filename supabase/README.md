# Supabase activation

1. Confirm these variables are in the project-root .env.local file:

       NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
       NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY

2. In Supabase, open Authentication → Users → Add user.
3. Create lawrencengugi@shahlalji.ac.ke, choose the dashboard password
   privately, and enable automatic confirmation.
4. Open SQL Editor → New query, paste all of setup.sql, then click Run.
5. Run media-library.sql in a second SQL Editor query to enable independent
   editing for every image placement and the Senior Management Team profiles.
   The file is repeatable; run it again after pulling an updated version.
6. Run story-engagement.sql to enable positive story reactions, moderated
   comments and staff replies. This file is also repeatable.
7. Sign out and back in if the user existed before the SQL ran. This refreshes
   the JWT with the new administrator role.
8. Open /login, sign in, and test Stories, Comments, Enquiries, Media and Leadership.
9. Add the same two environment variables to Vercel for Production, Preview
   and Development, then redeploy.

Never place a secret key, service-role key or database password in a
NEXT_PUBLIC_ variable.
