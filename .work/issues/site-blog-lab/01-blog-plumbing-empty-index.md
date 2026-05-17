---
slice: 1
title: Blog module — plumbing and empty /blog index
status: done
type: afk
blocked_by: []
parent_prd: site-blog-lab
stories: [4, 6]
---

## What to build

End-to-end scaffolding for the Blog surface, stopping short of the detail
route. After this slice ships, `/blog` exists as a real route with a friendly
empty state, the content collection is wired with a Zod schema that rejects
malformed frontmatter at build time, and a future post is "drop one MDX file
into `src/content/blog/`" away.

Touches every layer the slice needs: dependency, content config, collection
directory, route, page UI.

See `.work/prds/site-blog-lab.md` for full context — particularly the Module
— Blog (deep), Schema changes, Dependencies, and Draft handling decisions.

## Acceptance criteria

- [x] `@astrojs/mdx` added as a dependency and registered in `astro.config.mjs`
- [x] `src/content.config.ts` defines a `blog` collection with a Zod schema:
      required `title` (string), `description` (string), `pubDate` (date);
      optional `updatedDate` (date), `tags` (string[]), `draft` (boolean)
- [x] `src/content/blog/` directory exists (kept under git with a `.gitkeep`
      or equivalent if needed)
- [x] `src/pages/blog/index.astro` reads the collection, filters out entries
      with `draft: true`, sorts by `pubDate` descending, and renders a
      friendly "coming soon" empty state when zero published entries exist
- [x] Page uses the `Base.astro` layout and sets a sensible `title` /
      `description`
- [x] `bun build` succeeds; `bunx astro check` passes
- [x] Built `dist/sitemap-*.xml` (or whichever sitemap output the adapter
      emits) includes `/blog`
- [x] Manual schema validation: during development, temporarily add an MDX
      entry missing a required field and confirm the build fails with a
      useful error, then remove it

## Notes

- Empty-state copy should be brief and in the dev-aesthetic of the site; no
  newsletter prompt, no "subscribe" placeholder (per PRD Out of Scope).
- Detail route, post list rendering, sort/filter visibility on populated
  state — all intentionally deferred to [[02-blog-detail-and-rendering]].
- Per project git workflow, commit directly to `main` (`feat(blog): …`).
