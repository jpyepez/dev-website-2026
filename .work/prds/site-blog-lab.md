# Blog and Creative Coding Lab

## Problem Statement

The site today reads as a minimalist engineer portfolio but it cannot credential
JP against his three concrete win states (NZ inbound leads, speaking invites,
peer recognition in the NZ dev scene). Visitors landing from outbound channels
have nothing to read or look at — just a bio, a `/uses` page, and a contact
form. There is no place for the opinionated writing or visual/interactive
artefacts that would establish JP as the *senior frontend/mobile engineer ×
AI tooling* voice in NZ. Without those surfaces, every outbound effort
(LinkedIn post, meetup attendance, talk submission) lands traffic that the
site cannot convert.

## Solution

Add two new surfaces to the site: a **Blog** for monthly opinionated long-form
posts at the intersection of senior engineering and AI tooling, and a
**Creative Coding Lab** for quarterly finished visual/interactive pieces paired
with a short writeup explaining how each was built. Light home-page
acknowledgement so visitors discover both within one click. Engineer framing
stays primary; the lab is the secondary mode. Empty states cover the launch
gap before real content exists.

## User Stories

1. As an NZ CTO who clicked through from a LinkedIn post, I want to read JP's
   most recent writing within one click of the home page, so I can quickly
   evaluate whether to reach out for contract work.
2. As a meetup organiser vetting JP as a potential speaker, I want to find at
   least one polished long-form post and one visual demo, so I can decide
   whether to invite him to speak.
3. As an NZ peer who heard JP's name in Slack, I want a memorable visual
   artefact I can share with my team, so JP's name spreads through the local
   network organically.
4. As JP, I want to add a new blog post by creating a single MDX file with
   frontmatter, so the act of writing does not fight the tooling.
5. As JP, I want each lab piece to live as a standalone page where I can wire
   whatever libraries the piece needs (Three.js, shaders, custom controls),
   so I am not constrained by a shared schema designed for the average case.
6. As JP, I want both surfaces to display friendly "coming soon" empty states
   until real content exists, so I can ship the structure now without the
   site feeling abandoned. (Empty states remain for deep links; the nav
   entries themselves are hidden until content exists — see navigation.)

## Implementation Decisions

- **Module — Blog (deep).** A new typed content collection. Hides the
  authoring contract behind a small interface: author writes one MDX file
  with validated frontmatter; the index route reads the collection, filters
  drafts, sorts by publish date descending; the detail route renders the
  entry via the content-collection render API. Schema enforces title,
  description, pubDate (with optional updatedDate, tags, draft flag).
- **Module — Lab (deep).** A new page-per-piece module. Hides the snowflake
  nature of each piece behind a thin shared frame layout that provides title,
  writeup slot, and demo slot. A small ordered list of pieces (slug, title,
  summary, date, thumbnail) is consumed by the index route. Adding a piece
  is "one new page plus one new list entry."
- **Asymmetry rationale.** Blog content is uniform (markdown + frontmatter),
  so a collection earns its abstraction. Lab content is irregular per piece
  (different libraries, different demo wiring, sometimes SSR-incompatible),
  so a collection schema would either constrain demos or be near-empty.
  Different content shapes deserve different abstractions.
- **Interface — navigation.** Header gains two entries before the existing
  Uses and Contact links. Order: Writing, Lab, Uses, Contact. Each entry is
  rendered only when its source has content (same rule as the home "Latest"
  block), so an empty surface is never advertised in the nav. Revised
  2026-09-17: the original decision showed both links unconditionally and
  relied on the empty states; post-merge the empty pages read as abandoned
  rather than "coming soon". Routes still build and stay in the sitemap.
- **Interface — home page.** A "Latest" block sits below the existing social
  links on the home page: at most one row for the most recent published
  post and one for the most recent lab piece. The block hides entirely
  when both are empty; individual rows hide independently when their
  source is empty.
- **Schema changes.** One new Zod schema for the blog content collection.
  No other schemas.
- **API contracts.** None — this is a static site build, deployed to Vercel.
- **Dependencies.** Adds `@astrojs/mdx` to enable Astro components inside
  posts (for code styling, callouts, eventual inline interactive demos).
  Lab-piece libraries (e.g. Three.js) are per-piece concerns, not
  infrastructure of this PRD.
- **Draft handling.** A `draft: true` frontmatter flag filters posts at the
  index level. No separate route, no drafts UI.

## Testing Decisions

- This is a static site; "good tests" here mean build-time validation rather
  than runtime assertions.
- Zod schema must reject malformed blog frontmatter at build time. Verified
  by adding one intentionally malformed entry during development and
  confirming the build fails with a useful error, then removing it.
- Index routes must build cleanly when their underlying collection or list
  is empty. Verified by building before any real content exists.
- Empty-state rendering on both `/blog` and `/lab` index routes is visible
  in a local preview build with zero published entries.
- Sitemap integration picks up new routes without manual changes. Verified
  by inspecting the built `sitemap.xml`.
- No unit tests, no mocking — there are no process boundaries to fake and no
  business logic warranting them.

## Out of Scope

- RSS feed. Fast-follow once two or more posts exist.
- Per-post Open Graph images. Site-level OG remains sufficient until LinkedIn
  traffic data shows otherwise.
- Tags or categories index pages.
- Search.
- View counts, comments, webmentions, reactions.
- Newsletter signup form. Deferred until at least three posts exist so
  there is something to subscribe to.
- Scheduled publishing or a drafts UI. Handled by frontmatter filtering.
- Multi-author support.
- Any redesign of `/uses` or `/contact`.
- A digital garden, TIL stream, or micro-post surface. Explicitly cut during
  the grilling session — see `.work/CONTEXT.md`.
- A lab-piece "view source" link or built-with metadata block. Worth doing
  once two or more pieces exist to standardise the pattern.
- The actual first blog post and first lab piece. Per the capture-system
  decision in `.work/CONTEXT.md`, both are deferred until raw observations
  have accumulated for roughly four weeks.

## Further Notes

- **Open question — nav label.** Recommended: "Writing" (matches the
  dev-aesthetic of the site). Alternative: "Blog" (more conventional, may
  read as more discoverable). URL slug stays `/blog` regardless, for SEO.
- **Open question — lab URL.** Recommended: `/lab`. Alternatives considered:
  `/work` (implies commercial portfolio — wrong frame), `/experiments` (too
  long, signals "unfinished").
- **Resolved — home lede tagline (2026-05-18).** Added a small muted
  sub-line under the home H1: "Writing about senior engineering, AI, and
  the visual work it's bringing within reach." Anchors both theses and
  signposts the new Writing and Lab surfaces without inventing a new
  heading style.
- **Sequencing dependency.** First blog post is deferred roughly four weeks
  per the capture-system decision in `.work/CONTEXT.md`. Ship the empty
  structure now; populate as captures accumulate.
- **Sequencing dependency.** First lab piece is deferred until at least one
  capture surfaces a Thesis B candidate worth pairing with a post.
- **Aligns with.** `.work/CONTEXT.md` — read alongside for brand position,
  theses, win states, content tone, outbound channels, and cadence.
- **Next step.** Run `/draft-issues .work/prds/site-blog-lab.md` to slice this
  PRD into vertical-slice issue files.
