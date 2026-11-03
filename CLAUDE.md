# JP Yepez — Personal Site

Personal portfolio site (jpyepez.com) — Astro 5 static site, Tailwind + DaisyUI, deployed to Vercel. Engineer-led portfolio with a blog and a creative-coding lab, written for NZ engineers and companies who might work with the owner.

## Commands

- `bun install` — install deps
- `bun dev` — local dev server
- `bun build` — production build
- `bunx astro check` — typecheck

## Deep Context

IMPORTANT: Before starting a task, identify which of these files are relevant and read them.

- [Domain glossary — audience, brand, theses, pages](./GLOSSARY.md) — read for any content, copy, scope, or feature decision
- Active specs are GitHub issues labelled `ready` and `spec` that have sub-issues (`ready` without `spec` starts the Implement bot) — read the relevant one (`gh issue view <n> --json number,title,body,labels,comments`) before implementing a feature
- [Architecture](./docs/architecture.md) — folder layout, content model, routes
- [Git workflow](./docs/git-workflow.md) — commit format, branching
- [Testing strategy](./docs/testing-strategy.md) — read before writing or changing a test, or adding a route
- [Browser verification](./docs/browser-verification.md) — read before handing back or opening a PR for a change visible on the site

## Agent skills

### Issue tracker

Issues and specs are GitHub issues, managed with `gh`. A spec is a parent issue with its tickets as sub-issues. A merged PR with `Closes #<n>` closes a code ticket. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five triage roles; `ready-for-agent` is written as `ready`. See `docs/agents/triage-labels.md`.

### Domain docs

Glossary `GLOSSARY.md`, ADRs `docs/adr/`, out-of-scope `docs/out-of-scope/`, all writable. See `docs/agents/domain.md`.

### Notes

Running notes are GitHub issues labelled `notes`, added to as comments.
