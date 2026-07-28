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

## Replace the logo and photography

- Official logo: `public/images/school-logo.png`
- Hero image: `public/images/hero-campus.jpg`
- Introduction image: `public/images/campus-introduction.jpg`
- Academic-stage images: `public/images/early-years.jpg`,
  `junior-school.jpg`, `senior-school.jpg` and `a-level.jpg`
- Chairman portrait: `public/images/chairman-portrait.jpg`
- School-life image: `public/images/school-life.jpg`
- Gallery images: `public/images/gallery-01.jpg` through
  `public/images/gallery-06.jpg`

Keep the same filenames to replace images without changing the layout. The
current JPGs are intentionally branded placeholders; they do not depict fake
students, classrooms or facilities.

## Update school content

- Contact details, navigation, academic stages, statistics, stories and gallery
  entries: `data/site.ts`
- Homepage section layout: `app/page.tsx`
- Shared components: `components/`
- Colour and typography tokens: `app/globals.css`

Unverified statistics and sample story content are clearly marked with
`TODO(content)` comments in `data/site.ts`.
