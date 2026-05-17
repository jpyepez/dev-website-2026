---
slice: 2
title: Blog module — detail route and post rendering
status: done
type: afk
blocked_by: [1]
parent_prd: site-blog-lab
stories: [1, 2, 4]
---

## What to build

Complete the blog rendering loop: a detail route that renders an MDX entry
via the content-collection render API, and an index that shows a list of
published posts when the collection is non-empty (keeping the empty state
from slice 1 when it is empty). After this slice ships, "add a post" is
genuinely "drop one MDX file into `src/content/blog/`."

Verified end-to-end with a temporary fixture post created during development
and removed before commit (per PRD: the first real post is deferred).

See `.work/prds/site-blog-lab.md` — Module — Blog (deep) and Draft handling.

## Acceptance criteria

- [x] `src/pages/blog/[...slug].astro` resolves entries from the `blog`
      collection and renders them via the content-collection render API
- [x] Detail page shows `title`, `pubDate` (formatted), `description`, and
      the rendered MDX body
- [x] If `updatedDate` is present, it is shown alongside `pubDate`
- [x] Detail page uses `Base.astro` and sets `title` / `description` from
      the entry's frontmatter
- [x] Index route (`src/pages/blog/index.astro`) renders a list of published
      posts (title, date, description, link) when entries exist; empty state
      from slice 1 still renders when the collection is empty
- [x] Posts with `draft: true` do not appear on the index and do not produce
      a published detail route in the build output
- [x] Index list is sorted by `pubDate` descending
- [x] During development, add a temporary fixture MDX entry; confirm it
      shows on the index, links to a working detail page, and is excluded
      when its frontmatter is flipped to `draft: true`. Remove the fixture
      before committing.
- [x] `bun build` succeeds; `bunx astro check` passes
- [x] Built sitemap includes the index but does not include any draft slugs

## Notes

- No RSS, no tag index, no per-post OG image, no view counts — all out of
  scope per the PRD.
- No `prev`/`next` post navigation in this slice unless trivially derivable
  from the sorted collection; defer if it adds meaningful complexity.
- Keep typography readable in dark mode (theme is `night`); rely on
  daisyUI semantic classes rather than hardcoded colours.
