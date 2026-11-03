# Home design: Specimen · Type

Decided 2026-10-02 after three rounds of side-by-side prototypes (`/proto/home`, since deleted). Why the home page leads with a visual at all is in [ADR-0001](./adr/0001-home-leads-with-visual-hero.md); this file records what it looks like and the numbers behind it.

## Direction

A split layout. The left column has the name, role and tagline, then the bio and socials. The right column is the visual hero, a framed piece named **Terrain**: a terrain field drawn in monospace characters. The copy stays engineer-first; the piece shows the visual craft instead of describing it.

## Palette and type

- Background `oklch(0.17 0.03 245)` (ink blue); Terrain panel 0.035 darker; hairlines `oklch(0.30 0.035 245)`.
- Text `oklch(0.95 0.01 245)`, secondary `oklch(0.72 0.03 245)`.
- Accent `oklch(0.86 0.13 175)` (teal): bands in Terrain, role line, link hovers, frame corners, focus rings.
- Geist for text, Geist Mono for labels, the name in the header and the Terrain glyphs.

## Terrain values

| Value | Setting |
|---|---|
| Glyph size | 8px, line height 1.25 |
| Glyph set | Mixed: `  ·.:;+*xX#%@` |
| Glyph opacity | 0.12 + 0.6 × elevation |
| Bands | 4 across the elevation range, each 0.15 wide, opacity 0.67 (+0.3) |
| Terrain scale | 290 px per noise unit, 3 octaves of value noise |
| Pointer hill | Gaussian, radius 215px, height 0.50, follows at 0.14 per frame |
| Drift | 0.60 speed → time advances 0.09 noise units/s along z, capped at 20 fps |
| Click ripple | Strength 0.16, 210 px/s, wavelength 60px, fades over 1.8s, max 4 at once |

## Behaviour

- Drift moves through time (the z axis of 3D noise), so the terrain changes shape in place instead of sliding. The z blend is variance-corrected so contrast doesn't dip between time steps.
- Drift pauses when Terrain is off-screen or the tab is hidden, and nothing redraws when nothing changes.
- Reduced motion: no drift and no ripples. The hill follows the pointer without easing.
- Touch: press and hold raises the hill under the finger and it follows sideways drags; lifting lowers it. A 120ms hold delay stops a scroll that starts on Terrain from flashing a hill. A quick tap sends a ripple.
- The header drops its "JP Yepez" wordmark on the home page, where the h1 already says it; the h1's cap height lines up with Terrain's top edge.
- Drawing copies glyphs from a pre-rendered atlas. Measured on an M-series Mac at 8px glyphs (~7,700 cells): 32 ms/frame with per-glyph `fillText`, 3.8 ms/frame with the atlas while drifting.

## Caption

Decided 2026-10-21 after a prototype round ([#15](https://github.com/jpyepez/dev-website-2026/issues/15)): "Legend, quiet". One row under the frame, the two halves at opposite ends on a shared baseline; on narrow screens the key wraps under the name.

- Left: the piece's name, `Terrain, set in type`, in Geist at small size, medium weight, full-strength text.
- Right: a controls key in the mono label style, muted, with each action word in teal and pairs split by a middle dot. Fine pointer: `hover raise · click ripple`. Touch: `hold raise · tap ripple`.
- No numbered marker. Pieces are named, not numbered like academic figures (see Visual Hero in the glossary).

Rejected:

- **Fig. 01** (the original): read as a numbered academic figure.
- **Live:** a teal dot plus "Live" felt like a streaming badge.
- **Plate:** a two-line gallery label; the instructions faded into the background.
- **Legend:** keycap boxes looked like app UI and competed with the bio's mono links.
- **Plate + keys:** the tallest option, with boxes under a quiet title.

## Rejected

- **Round 1:** Editorial (light, serif, writing-led) looked empty until posts exist. Terminal (mono spec sheet) played down the visual half of the brand. Poster (huge expanded grotesk, orange block) was memorable but left no room for nuance. The original centred layout looked like most developer sites.
- **Round 2 (Lab riffs):** Stir (halftone dots with spring physics) let the interaction take over. Survey (light printed topo map) was busy, and its legend took over the screen on phones. Contours (full-bleed contour hero) was the runner-up: its colours carried over here, but the framed piece was more interesting.
- **Specimen · Lines** (the same frame drawn with contour lines) lost to the type version.
- **Drift by panning** two noise layers read as the image sliding sideways; replaced with z-axis drift.
