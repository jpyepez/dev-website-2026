# Feature Flags for Content Gating

This site does not use a runtime feature-flag platform (PostHog, LaunchDarkly,
Vercel Flags, or similar) to show or hide sections such as Writing and Lab.

## Why this is out of scope

The site is fully static: every route is rendered at `bun build` and served as
HTML from Vercel's CDN. The only thing that decides whether a section should be
visible is whether it has content, and that is known at build time — the blog
collection is either empty or not, `pieces` in `src/features/lab/pieces.ts` is
either empty or not. Adding content is itself a deploy, so a flag would never
be flipped independently of the thing it gates.

A runtime flag would cost more than it gives:

- Client-side evaluation ships the section in the HTML and hides it after
  hydration — a visible flash, and the content is still in the page source.
- Server-side evaluation means moving those routes to SSR and paying a function
  invocation per request on a personal site.
- Flag SDKs default to `false` when they can't reach their API, which ad
  blockers cause routinely. A nav link that silently disappears for a slice of
  visitors is worse than the problem being solved.

The convention instead is build-time emptiness checks, the same rule
`LatestBlock.astro` already follows: a surface is advertised only when its
source has at least one published entry.

This rejection is scoped to *gating content*. Adopting PostHog (or anything
else) for analytics is a separate decision and is not ruled out here.

## Considered

- 2026-09-17 — proposed while handling empty Writing/Lab sections after the
  blog-and-lab merge
