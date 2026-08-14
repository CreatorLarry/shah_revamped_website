# Shah Lalji Nangpar Academy — Phase 2

Responsive multi-page website and shared design system for Shah Lalji Nangpar
Academy. Built with Next.js, TypeScript, Tailwind CSS and Lucide icons.

## Phase 2 routes

- Homepage: `/`
- Our School: `/our-school`
  - About Us: `/our-school/about-us`
  - Message from the Board Chair: `/our-school/board-chair-message`
  - Message from the School Administrator: `/our-school/school-administrator-message`
  - Senior Management Team: `/our-school/senior-management-team`
- Education: `/education`
  - School Profile: `/education/school-profile`
  - Early Years & Nursery: `/education/nursery`
  - Junior School: `/education/junior-school`
  - Senior School: `/education/senior-school`
  - IGCSE: `/education/igcse`
  - A-Level: `/education/a-level`
  - Homework & Assessment Policy: `/education/homework-policy`
- Admissions: `/admissions`
  - Fee Structure: `/admissions/fee-structure`
- School Life: `/school-life`
- School Stories: `/stories`
  - Learning Through Discovery: `/stories/learning-through-discovery`
  - Confidence to Compete: `/stories/confidence-to-compete`
  - Learning Beyond the Classroom: `/stories/learning-beyond-the-classroom`
- Photo Gallery: `/gallery`
- Contact Us: `/contact`
- Staff Dashboard: `/dashboard`

This is an independent website project. Its content, routes, metadata, sitemap
and dashboard do not redirect to or depend on a previous website deployment.

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Verify a production build

```bash
npm run lint
npm run build
```

The dashboard uses Cloudflare D1 for school stories and admissions enquiries.
Generate database migrations after schema changes with:

```bash
npm run db:generate
```

Dashboard access uses ChatGPT sign-in and an explicit email allowlist in the
hosted `DASHBOARD_ALLOWED_EMAILS` environment variable. No email domain is
trusted automatically. Copy `.env.example` when local configuration is needed.

For local dashboard testing, set `DASHBOARD_LOCAL_PREVIEW=true` in the ignored
`.env.local` file. This opens the dashboard directly during `npm run dev` and
is hard-disabled when `NODE_ENV` is `production`.

Hosting and the public domain are intentionally deferred until the site owner
approves launch. At that point, set `NEXT_PUBLIC_SITE_URL` to the selected
origin. The creator credit can be linked later by setting
`NEXT_PUBLIC_CREATOR_PORTFOLIO_URL`.

## Logo and photography

- Official logo: `public/images/school-logo.png`
- Supplied school photography: `public/images/school/`
- Photo preparation script: `scripts/process-school-photos.mjs`
- Current photo usage map: `PHOTO-INVENTORY.md`

Regenerate the usage map after changing image files or page assignments with:

```bash
npm run photos:audit
```

The homepage now uses supplied school photography throughout the hero,
academic journey, school-life, story preview and gallery sections.

## Update school content

- Contact details, navigation, academic stages, statistics and gallery entries:
  `data/site.ts`
- Public detail page content: `data/content-pages.ts`
- Leadership messages and SMT structure: `data/leadership.ts`
- School story content: `data/stories.ts`
- Dashboard and enquiry storage: `db/dashboard.ts`
- Database schema and migrations: `db/schema.ts` and `drizzle/`
- Staff dashboard interface: `app/dashboard/` and `components/DashboardApp.tsx`
- Homepage section layout: `app/page.tsx`
- Shared components: `components/`
- Colour and typography tokens: `app/globals.css`
