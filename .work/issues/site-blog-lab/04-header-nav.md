---
slice: 4
title: Header nav — add Writing and Lab entries
status: in-progress
type: hitl
blocked_by: [1, 3]
parent_prd: site-blog-lab
stories: [1, 2]
---

## What to build

Surface both new sections from the global header so visitors can reach them
within one click. Order from left to right: **Writing, Lab, Uses, Contact**.

Trivial markup change, but gated as HITL because the PRD flagged the
"Writing" vs "Blog" label as an open question. Confirm the label before
shipping; URL slug stays `/blog` either way for SEO.

See `.work/prds/site-blog-lab.md` — Interface — navigation, and the
Open question — nav label note.

## Decision point (HITL)

- [x] Confirm nav label: **"Writing"** (PRD recommendation, dev-aesthetic)
      or **"Blog"** (more conventional, may scan as more discoverable).
      URL is `/blog` regardless.
      **Decision: "Writing"** (2026-05-18) — matches dev-aesthetic per PRD recommendation.

## Acceptance criteria

- [ ] `src/components/layout/Header.astro` includes two new `<a>` entries
      in this order: Writing/Blog → `/blog`, Lab → `/lab`, then existing
      Uses, then existing Contact
- [ ] Same styling as existing nav entries (uppercase, tracking, hover
      colour transition)
- [ ] Active-route styling, if any is added, behaves correctly for both
      new entries (otherwise leave styling unchanged from siblings)
- [ ] Manual check: each link from every page in the site (`/`, `/uses`,
      `/contact`, `/blog`, `/lab`) lands on the correct destination
- [ ] `bun build` and `bunx astro check` pass

## Notes

- Header is currently a single non-responsive row; this slice does not
  introduce a mobile menu — keep the existing layout assumption.
- The Header is the *only* surface that gains links from this slice; the
  home page "Latest" block is its own slice ([[05-home-latest-block]]).
