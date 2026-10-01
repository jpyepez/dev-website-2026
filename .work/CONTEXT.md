# CONTEXT

Shared domain glossary for the jpyepez.com personal site.

## Glossary

### Blog
A small number of opinionated, polished posts positioned at the intersection
of **senior frontend/mobile engineering × AI tooling** — the angle where the
user is uniquely credentialed (12 years React, fluent in Claude Code / modern
AI tooling). Not a frontend blog, not an AI blog: posts only this author can
write convincingly. Posts should serve [[site-goal]] — demonstrate depth in
a way that earns inbound NZ leads, speaking invites, peer recognition.
See [[theses]] for the working positions blog posts argue from.

### Brand Position
**Experienced engineer who uses AI to keep the craft bar high — including the
visual/interactive work that used to be too expensive to justify.** This is
the synthesis of both [[theses]]: 12 years of React/mobile muscle memory plus
fluency with modern AI tooling, applied to keeping quality high on animation,
transitions, data viz, and 3D — categories that AI is making newly affordable
for ordinary websites. Distinct from "senior engineer who uses AI" (too
generic) and "Three.js guy" (too narrow). The [[blog]] explains the position;
the [[creative-coding]] lab proves it.

### Cadence
Committed publishing rhythm (2026-05-15):

- [[blog]]: 1 polished post per month (12/year).
- LinkedIn: 2–3 posts per week; one weekly post should be a snippet/teaser
  from that month's blog post.
- [[creative-coding]]: 1 finished lab piece per quarter (4/year).
- Meetups: attend 1 per month; submit 1 talk per quarter.

### Capture System
The post pipeline depends on a daily capture habit, not on weekly bursts of
inspiration. Convention: `.work/notes/post-ideas.md` (gitignored). Every time
the user notices something at work that fits [[theses]] — an AI code review
catch, a junior over-trusting Cursor, a visual thing shipped in an afternoon
that would've taken a week — one line goes in the file. LinkedIn posts are
one observation expanded; blog posts are one observation deepened.

Sequencing decision (2026-05-15): the user could not surface a specific recent
moment fitting either thesis on demand. That's a real signal — first blog
post should not be drafted yet. **Install the capture file, collect for ~4
weeks, then publish.** Avoids a generic-feeling launch post.

### Creative Coding
The artistic side of the site: web-native visual work — Three.js canvases,
generative pieces, data visualisations, GLSL/shader experiments. Browser-only;
no audio, no print, no physical. Serves [[site-goal]] specifically via the
speaking-invitations and peer-recognition tracks: visual demos are shareable
in NZ dev Slacks and memorable to meetup organisers in a way blog posts
aren't. Pieces are *finished artefacts*, not a graveyard of sketches; each
piece should be paired with or referenced from a [[blog]] post that explains
how it was built (typically: built fast with AI assistance — see [[theses]]).
A secondary mode of the site, not the primary framing. See [[site-framing]].

### Outbound Baseline
As of 2026-05-15, the user has **strong in-person professional reputation**
(highly respected at companies worked at) but **no real online presence**
(no significant social following, doesn't post regularly). The asset that
needs distributing is real; the distribution surface barely exists. Implication:
the [[site]] alone won't accomplish [[site-goal]] — an outbound channel
commitment is a precondition, not a follow-up. Underused amplifier:
**ex-colleague network**, who already know the work is good and would share
if asked.

Committed channels (2026-05-15):

- **Primary: LinkedIn** — NZ tech leadership lives there; most direct line
  to inbound-leads goal.
- **Primary: NZ meetups** — attend monthly, submit talk per quarter.
- **Tier-2: Twitter/Bluesky** — chosen despite warning it's less NZ-aligned;
  treat as bonus, not a load-bearing channel.
- *Explicitly not committed:* NZ Slacks/Discords (too time-sinky for now).

### Site Framing
The site is primarily an **engineer's portfolio** (full-stack/frontend, React,
AI tooling), and its words stay engineer-first: name, role, theses, writing.
The home page *looks* like [[creative-coding]]: it opens on an interactive
visual hero that demonstrates Thesis B instead of describing it. The
[[creative-coding]] lab itself stays a secondary section.

History: on 2026-05-14 creative coding was "surfaced but not foregrounded" on
the home page, after the user first called it "an artist's website" and the
homepage copy showed the engineer track was primary. Revised 2026-10-02 to
foreground the visual side on the home page; see ADR-0001.

### Site Goal
The underlying goal of the site is **reputation-building in the New Zealand
engineering scene** — being recognised as an experienced frontend/mobile/AI
engineer. The site itself is a landing pad, not an audience-builder; audience
flows in from outbound channels (talks, posts, communities) and the site
catches and credentials it. Content decisions should be evaluated against
"does this help NZ engineers find/remember me?" not "is this fun to make?"
(though those can overlap). The candidate additions ([[blog]],
[[digital-garden]], [[creative-coding]]) are tactics in service of this goal,
not ends in themselves.

Concrete win states (chosen 2026-05-14): (1) inbound freelance/consulting
leads from NZ companies, (2) speaking invitations at NZ meetups/confs
(React Wellington, Codemania, KiwiCoders), (3) peer recognition in NZ dev
community. Explicitly *not* a goal: generic global audience/follower count.

Scope decision 2026-05-14: digital garden cut. Reason: gardens optimise for
retention of an existing audience, not acquisition; they dilute credentialing
because half-formed notes signal "curious" not "deep expert." Site additions
narrowed to [[blog]] + [[creative-coding]].

### Theses
The two working positions the [[blog]] and [[creative-coding]] argue from
(2026-05-15):

- **Thesis A — AI underuse:** Most engineers (especially experienced ones)
  are leaving AI value on the table. Juniors over-rely on it without judgement;
  seniors mostly avoid or dabble. The biggest gains are available to
  experienced engineers who *engage* seriously.
- **Thesis B — Visual work goes mainstream:** AI lowers the cost of
  high-fidelity visual/interactive web work (animation, transitions, data
  viz, 3D). Categories that were previously bespoke-agency-only are about
  to become viable for ordinary websites. Engineers with both craft taste
  and AI fluency are positioned to ride this.

Both theses converge on the same call-to-action for NZ companies/teams:
*hire/contract people who can keep the bar high while moving fast.*

Content tone (chosen 2026-05-15): **NZ-flavoured but globally readable.**
Posts open with NZ framing/examples ("talking to Wellington startup CTOs
lately…") but the underlying ideas generalise. Earns local trust without
making posts useless to outsiders.
