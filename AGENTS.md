# Aryan Rathor Portfolio

## Architecture

This is a single-page developer portfolio built with TanStack Start, React 19, TypeScript, Vite, and Tailwind CSS 4. Netlify hosts the generated site and handles contact submissions through Netlify Forms.

## Key Directories

- `src/routes/index.tsx` contains the portfolio content, section structure, tab interactions, mobile navigation, and contact form submission states.
- `src/routes/__root.tsx` defines global metadata, the document shell, and the favicon.
- `src/styles.css` contains the complete visual system, responsive layouts, terminal effects, and motion treatments.
- `public/contact.html` is the static Netlify Forms detection document. Its field names must stay synchronized with the React form.
- `public/Aryan-Rathor-Resume.txt` is the downloadable resume asset and can be replaced with a PDF while keeping the same link updated.
- `content/` and the additional template routes remain from the scaffold but are not linked from the primary portfolio experience.

## Coding Conventions

- Use TypeScript and functional React components.
- Keep portfolio content in data arrays near the top of `src/routes/index.tsx` when practical.
- Reuse CSS variables from `src/styles.css`; preserve the black and neon-green visual language.
- Keep section IDs aligned with navbar anchor names.
- Maintain visible keyboard focus, semantic headings, labels, and reduced-motion behavior.
- Use Lucide React for interface icons rather than custom SVG markup.

## Netlify Forms

The contact form submits URL-encoded data to `/contact.html`. Any new form field must be added to both `src/routes/index.tsx` and `public/contact.html`. The `.netlify/features/netlify-forms` marker keeps the platform feature enabled.

## Local Commands

- Install dependencies with `pnpm install`.
- Run locally with `pnpm dev`.
- Create a production build with `pnpm build`.
