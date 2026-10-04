# Architecture

Astro 5 static site, server-rendered at build time, deployed to Vercel.

## Folder layout

- `src/pages/` — file-based routes. One `.astro` file per page.
- `src/layouts/` — page shells. Currently only `Base.astro` (HTML, meta, fonts, daisyUI theme).
- `src/components/` — generic, reusable pieces.
  - `ui/` — primitives (Button, Input, Textarea, SocialLinks, SocialLink); `field.ts` holds the shared field classes.
  - `layout/` — chrome (Header, ToastContainer).
- `src/features/` — feature-folder pattern for grouped, page-specific components (e.g. `features/uses/UsesSection.astro`, `features/home/` for the home terrain figure, `features/contact/` for the contact form). Add a folder per feature once it has 2+ files.
- `src/styles/global.css` — Tailwind 4 + daisyUI imports, global resets.
- `public/` — static assets (favicons, manifest).

## Content model

Today the site is hand-rolled pages only. Per `.work/prds/site-blog-lab.md`, two new surfaces are planned:

- **Blog** — Astro content collection at `src/content/blog/`, MDX per post, Zod-validated frontmatter. Index + `[...slug]` routes under `src/pages/blog/`.
- **Lab** — page-per-piece under `src/pages/lab/`. Each piece imports its own dependencies. A small ordered list in `src/features/lab/pieces.ts` powers the index. A shared `LabFrame.astro` layout gives each piece a consistent writeup + demo frame.

Asymmetry rationale: blog content is uniform, so a collection earns its abstraction; lab content is irregular per piece, so page-per-piece avoids over-constraining.

## Styling

- **Tailwind 4** via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, no separate config file).
- **daisyUI 5** for component classes. Theme is `night` (dark), set via `data-theme="night"` on `<html>`, with its colours overridden in `global.css`: ink-blue base, teal `primary`. Values and rationale in [home-design.md](./home-design.md); the uses and contact page layouts are in [uses-design.md](./uses-design.md) and [contact-design.md](./contact-design.md).
- **Geist Variable** and **Geist Mono Variable** via `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` (`font-sans`, `font-mono`).
- Class style: utility-first; daisyUI semantic classes (`bg-base-100`, `text-base-content`, `text-primary`) preferred over hardcoded colours so theme swaps don't require sweeps.

## Forms

`/contact` posts to **Web3Forms** via `fetch` from the `<script>` in `features/contact/ContactForm.astro`. Validation is **Zod in the browser**, with errors rendered into per-field error elements; the topic list in `features/contact/topics.ts` feeds both the radio chips and the schema. Without JavaScript the form posts directly and the browser checks required fields. Access key comes from `WEB3FORMS_ACCESS_KEY` env var.

## Build & deploy

- **Adapter:** `@astrojs/vercel` with web analytics enabled.
- **Sitemap:** `@astrojs/sitemap` auto-generates from routes.
- `site: "https://jpyepez.com"` in `astro.config.mjs`.

## Conventions

- Per-page metadata via `Base.astro` props (`title`, `description`); OG and Twitter tags fall back to those.
- `public/og.png` is the social preview card, rendered from the real terrain code by `scripts/og.ts`. When the name, role or tagline changes, update the copy at the top of the script and run `bun run og` (needs Google Chrome).
- `Base.astro`'s `column` prop (`home`, `prose` default, `gallery`) sets the header width to match the page's content column, so their edges line up. Pass it when a page uses a column other than `max-w-xl`.
- No client-side router; full page loads between routes (Astro default).
- No global state. Components are mostly server-rendered with small `<script>` islands where interactivity is needed (e.g. contact form, home terrain canvas).
