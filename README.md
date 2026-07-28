# Aryan Rathor Developer Portfolio

A responsive personal portfolio for Aryan Rathor with a dark terminal-inspired interface, neon-green accents, animated circuit-like details, and a code-editor aesthetic. The site presents Aryan's background, education, featured work, technical skills, certifications, and contact methods in one polished scrolling experience.

## Highlights

- Fixed responsive navigation with smooth section links
- Animated hero with downloadable resume
- About section with core stack and CI pipeline visual
- Timeline-based education history
- Featured StudySync project and future project placeholders
- Interactive tabbed skills grid
- Certification placeholders ready for final Anthropic titles
- Netlify-powered contact form with spam protection and status feedback
- Responsive layouts and reduced-motion accessibility support

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4 with custom CSS
- Lucide React icons
- Netlify Forms

## Run Locally

```bash
pnpm install
pnpm dev
```

The local Vite server uses port `3000`. For Netlify platform emulation, run:

```bash
netlify dev --port 8889
```

## Personalizing

- Replace `public/Aryan-Rathor-Resume.txt` with the final resume and update the hero link if the filename changes.
- Update the project arrays and certificate titles in `src/routes/index.tsx`.
- Keep fields in `public/contact.html` synchronized with the visible contact form.
