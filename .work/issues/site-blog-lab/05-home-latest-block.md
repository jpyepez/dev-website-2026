---
slice: 5
title: Home page — "Latest" block
status: in-progress
type: afk
blocked_by: [1, 3]
parent_prd: site-blog-lab
stories: [1, 2, 3]
---

## What to build

Add a "Latest" block to the home page so visitors landing from outbound
channels reach recent writing and recent lab work within one click. The
block sits **below the existing social links** on `src/pages/index.astro`.

Behaviour:

- At most one row for the most recent **published** blog post.
- At most one row for the most recent lab piece.
- Each row hides independently when its source has nothing to surface.
- The whole block hides when both sources are empty (i.e. site looks
  unchanged from today at launch).

Vertical: two data reads + conditional rendering + UI rows.

See `.work/prds/site-blog-lab.md` — Interface — home page.

## Acceptance criteria

- [ ] On the home page, a "Latest" block renders below `<SocialLinks />`
- [ ] The block reads the most recent **published** entry from the `blog`
      collection (drafts excluded, sorted by `pubDate` desc, take 1)
- [ ] The block reads the most recent piece from `src/features/lab/pieces.ts`
      (sorted by `date` desc, take 1)
- [ ] Each row shows enough to be useful at a glance (label of surface,
      title, date, link) and links to the detail page
- [ ] Row hides when its source is empty
- [ ] The entire block hides when both rows would be empty — home page
      is byte-identical to today's home in that case (aside from the
      conditional itself)
- [ ] Visual treatment is consistent with the existing home page (typography,
      spacing, dark theme); no new section heading style invented just for
      this block
- [ ] `bun build` and `bunx astro check` pass
- [ ] Manual check: with both sources empty, the block does not render.
      With one source populated (use a temporary fixture during dev), only
      its row renders. With both populated, both rows render in the
      committed order (e.g. Writing first, then Lab — or whatever reads
      best in the layout).

## Notes

- Out of scope here (per PRD Further Notes): the optional home lede
  tagline ("writing about senior engineering, AI, and the visual work
  it's making cheap…"). That is a separate open question and not part of
  this slice.
- This slice is the only home-page change the PRD commits to. Resist
  touching anything else on `index.astro`.
- Verifying the "both empty" case is important — at launch, that *is*
  the production state.
