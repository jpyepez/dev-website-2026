# Architecture

Astro 5 static site, server-rendered at build time, deployed to Vercel.

## Folder layout

- `src/pages/` — file-based routes. One `.astro` file per page.
- `src/layouts/` — page shells. Currently only `Base.astro` (HTML, meta, fonts, daisyUI theme).
- `src/components/` — generic, reusable pieces.
  - `ui/` — primitives (Button, Input, Select, Textarea, Badge, SocialLinks, SocialLink).
  - `layout/` — chrome (Header, ToastContainer).
- `src/features/` — feature-folder pattern for grouped, page-specific components (e.g. `features/uses/UsesSection.astro`). Add a folder per feature once it has 2+ files.
- `src/styles/global.css` — Tailwind 4 + daisyUI imports, global resets.
- `public/` — static assets (favicons, manifest).

## Content model

Today the site is hand-rolled pages only. Per `.work/prds/site-blog-lab.md`, two new surfaces are planned:

- **Blog** — Astro content collection at `src/content/blog/`, MDX per post, Zod-validated frontmatter. Index + `[...slug]` routes under `src/pages/blog/`.
- **Lab** — page-per-piece under `src/pages/lab/`. Each piece imports its own dependencies. A small ordered list in `src/features/lab/pieces.ts` powers the index. A shared `LabFrame.astro` layout gives each piece a consistent writeup + demo frame.

Asymmetry rationale: blog content is uniform, so a collection earns its abstraction; lab content is irregular per piece, so page-per-piece avoids over-constraining.

## Styling

- **Tailwind 4** via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, no separate config file).
- **daisyUI 5** for component classes. Theme is `night` (dark), set via `data-theme="night"` on `<html>`.
- **Inter Variable** font via `@fontsource-variable/inter`.
- Class style: utility-first; daisyUI semantic classes (`bg-base-100`, `text-base-content`, `text-primary`) preferred over hardcoded colours so theme swaps don't require sweeps.

## Forms

`/contact` posts to **Web3Forms** via `fetch` from a client-side `<script>`. Validation is **Zod in the browser**, errors rendered into per-field error elements. Access key comes from `WEB3FORMS_ACCESS_KEY` env var.

## Build & deploy

- **Adapter:** `@astrojs/vercel` with web analytics enabled.
- **Sitemap:** `@astrojs/sitemap` auto-generates from routes.
- `site: "https://jpyepez.com"` in `astro.config.mjs`.

## Conventions

- Per-page metadata via `Base.astro` props (`title`, `description`); OG and Twitter tags fall back to those.
- No client-side router; full page loads between routes (Astro default).
- No global state. Components are mostly server-rendered with small `<script>` islands where interactivity is needed (e.g. contact form).
