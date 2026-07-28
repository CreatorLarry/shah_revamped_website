# Shah Lalji Nangpar Academy — Phase 1

Premium, responsive homepage and shared design foundation for Shah Lalji
Nangpar Academy. Built with Next.js, TypeScript, Tailwind CSS and Lucide icons.

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
- Chairman portrait: `public/images/chairman-portrait.jpg`
- Supplied school photography: `public/images/school/`
- Photo preparation script: `scripts/process-school-photos.mjs`

The homepage now uses supplied school photography throughout the hero,
academic journey, school-life, story preview and gallery sections. The chairman
portrait remains a temporary image until an official portrait is supplied.

## Update school content

- Contact details, navigation, academic stages, statistics, stories and gallery
  entries: `data/site.ts`
- Homepage section layout: `app/page.tsx`
- Shared components: `components/`
- Colour and typography tokens: `app/globals.css`

Unverified statistics and sample story content are clearly marked with
`TODO(content)` comments in `data/site.ts`.
