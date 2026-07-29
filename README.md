# Shah Lalji Nangpar Academy — Phase 2

Responsive multi-page website and shared design system for Shah Lalji Nangpar
Academy. Built with Next.js, TypeScript, Tailwind CSS and Lucide icons.

## Phase 2 routes

- Homepage: `/`
- Our School: `/our-school`
- Education: `/education`
- Admissions: `/admissions`
- School Life: `/school-life`
- School Stories: `/stories`
  - Learning Through Discovery: `/stories/learning-through-discovery`
  - Confidence to Compete: `/stories/confidence-to-compete`
  - Learning Beyond the Classroom: `/stories/learning-beyond-the-classroom`
- Photo Gallery: `/gallery`
- Contact Us: `/contact`

The page structure and factual school content are based on the current official
website at `http://shahlalji.ac.ke/`. The new site retains the Phase 1 visual
direction while improving the content hierarchy, navigation and presentation.

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

For Vercel, connect the repository normally. The `vercel-build` script runs the
standard Next.js production build.

## Logo and photography

- Official logo: `public/images/school-logo.png`
- Supplied school photography: `public/images/school/`
- Photo preparation script: `scripts/process-school-photos.mjs`

The homepage now uses supplied school photography throughout the hero,
academic journey, school-life, story preview and gallery sections.

## Update school content

- Contact details, navigation, academic stages, statistics and gallery entries:
  `data/site.ts`
- School story content: `data/stories.ts`
- Homepage section layout: `app/page.tsx`
- Shared components: `components/`
- Colour and typography tokens: `app/globals.css`
