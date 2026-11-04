# Testing strategy

Tests check behaviour a visitor or a caller can see: what a page returns and shows, what an exported function returns. Never internal state, component structure or how a value is worked out.

## Seams

Tests live at two seams only (agreed in spec #26). Ask before adding a third.

1. **Exported functions (`bun test`).** Logic with a public function to call: call it, assert on what it returns. The example is `src/features/home/noise.test.ts`: the z = 0 slice of `noise3` equals `noise` across a spread of points and seeds, so the home terrain can't jump when its drift starts.
2. **The built site, from outside (Playwright, `e2e/`).** The production build served by `astro preview` on port 4174, driven the way a visitor sees it: status, roles, labels, visible text. The suite never imports a component.

Astro components and pages have no tests of their own; the smoke suite covers them.

## The smoke suite

`e2e/smoke.spec.ts` runs one test per route × width, in Chromium, dark theme only (the site has no other theme). Widths are 1280 and 390, height 800.

| Route | Path | Status | `h1` |
| --- | --- | --- | --- |
| home | `/` | 200 | JP Yepez |
| uses | `/uses` | 200 | Uses |
| contact | `/contact` | 200 | Contact |
| writing | `/blog` | 200 | Writing |
| lab | `/lab` | 200 | Lab |
| unknown path | `/no-such-page` | 404 | Not found |

Each case checks:

- the response status;
- the `h1` with that exact name is visible (so Writing and Lab pass whether they have content or not);
- zero console errors and zero uncaught page errors. Two kinds of console error are ignored: anything from `/_vercel/insights/` (Vercel serves analytics in production only, so the preview 404s it), and the 404 page's own "status of 404" message, since the status is already asserted;
- on contact only: the Email and Message textboxes and the Send message button are visible. The form is never submitted, so CI needs no Web3Forms key and never sends a real message.

**Extend it** when a ticket adds a route (add a row to `routes`) or changes what a page shows (assert the new visible thing by role or label, inside that route's case).

## Scripts

| Script | Runs | Checks |
| --- | --- | --- |
| `bun run lint` | oxlint, default rules | lint across the repo |
| `bun run typecheck` | `astro check` | types in `.astro` and `.ts` files |
| `bun run test` | `bun test src` | every unit test. One file: `bun test src/features/home/noise.test.ts` |
| `bun run test:e2e` | Playwright | the smoke suite. Locally it builds and serves on 4174, unless a server is already up on 4174: then it tests that server and builds nothing, so stop it first if the build is stale. One test: `bunx playwright test -g "contact loads at 390"` |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, test, build and e2e on every PR to `main` and every push to `main`. A separate `actionlint` job lints the workflow files with a pinned actionlint release, which also runs shellcheck on every `run:` block.

## Conventions

- A unit test sits next to its module: `foo.ts` → `foo.test.ts`. Playwright files are `e2e/*.spec.ts`.
- Expected values come from outside the code: a literal worked out by hand, the spec, or an invariant the code must hold (like the noise slice). Never recompute them the way the code does.
- Find elements by role and accessible name (`getByRole`) first. Reach for `data-testid` only where no role or label identifies the element.
