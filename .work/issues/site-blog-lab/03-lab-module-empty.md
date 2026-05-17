---
slice: 3
title: Lab module — index, shared frame, empty state
status: ready
type: afk
blocked_by: []
parent_prd: site-blog-lab
stories: [5, 6]
---

## What to build

End-to-end scaffolding for the Lab surface. After this slice ships, `/lab`
is a real route with a friendly empty state, the shared `LabFrame` layout
is ready for any future piece to use, and the pieces list is a single typed
file that future slices append one entry to.

Vertical: shared frame layout + typed pieces list + index route + UI.
Independent of the blog module — can ship in parallel with slice 1.

See `.work/prds/site-blog-lab.md` — Module — Lab (deep) and Asymmetry
rationale.

## Acceptance criteria

- [ ] `src/features/lab/pieces.ts` exports a typed, ordered list of pieces.
      Type covers `slug`, `title`, `summary`, `date`, and `thumbnail`
      (path or component reference — pick whichever fits the layout).
      List ships empty.
- [ ] `src/components/layout/LabFrame.astro` is a layout/component exposing
      named slots: a title (or prop), a writeup slot, and a demo slot.
      Uses `Base.astro` underneath and accepts `title` / `description`
      props for page metadata.
- [ ] `src/pages/lab/index.astro` reads the pieces list and renders:
        - a friendly "coming soon" empty state when the list is empty
        - a card grid (slug, title, summary, date, thumbnail) when non-empty
- [ ] `bun build` succeeds; `bunx astro check` passes
- [ ] Built sitemap includes `/lab`
- [ ] No actual lab piece is added (deferred per PRD)

## Notes

- The `LabFrame` is exercised by future per-piece slices, not by this slice.
  Confirm its shape compiles and that a hypothetical piece could plug in,
  but do not ship a placeholder piece.
- Per PRD asymmetry rationale, deliberately do **not** model lab pieces
  as a content collection — page-per-piece is the contract.
- Empty-state copy should match the blog's in tone (see slice 1) so both
  surfaces feel like one site, not two.
