# Home page leads with an interactive visual hero

On 2026-05-14 we decided creative coding would be surfaced but not foregrounded on the home page. On 2026-10-02, after comparing five home-page directions side by side, we reversed that: the home page now opens with an interactive generative figure (terrain drawn in type that responds to the pointer, drifts slowly and ripples on click), while the copy and nav stay engineer-first. The look and numbers are in `docs/home-design.md`. Reasons: the hero shows Thesis B (AI makes high-fidelity visual work affordable) instead of describing it, it makes the site more memorable to NZ meetup and LinkedIn audiences, and the user now wants the site to be a place to try creative ideas, since AI makes quick experiments cheap.

## Considered Options

- **Keep the 2026-05-14 framing** (text-led home, lab one click away): safer reading of "engineer's portfolio", but the home page looked like any other developer site.
- **Editorial, Terminal, Poster** directions: rejected in the same comparison. Editorial looked empty until posts exist; Terminal played down the visual-craft half of the brand; Poster was memorable but left no room for nuance.

## Consequences

- Touch devices get their own interaction (a tap raises the terrain and sends a ripple), since a pointer hill alone would leave the figure static on phones.
- The hero must stay credible as engineering: no autoplaying motion, reduced-motion support, and no hit to load performance. A slow or janky hero would contradict the thesis it is meant to prove.
