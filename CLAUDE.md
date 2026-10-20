# JP Yepez — Personal Site

Personal portfolio site (jpyepez.com) — Astro 5 static site, Tailwind + DaisyUI, deployed to Vercel. Engineer-led brand with a planned blog + creative-coding lab; serves NZ reputation-building, not generic audience.

## Commands

- `bun install` — install deps
- `bun dev` — local dev server
- `bun build` — production build
- `bunx astro check` — typecheck

## Deep Context

IMPORTANT: Before starting a task, identify which of these files are relevant and read them.

- [Domain glossary — brand, theses, cadence, goals](./CONTEXT.md) — read for any content, copy, scope, or feature decision
- Active PRDs are GitHub issues labelled `ready` that have sub-issues — read the relevant one (`gh issue view <n>`) before implementing a feature
- [Architecture](./docs/architecture.md) — folder layout, content model, planned routes
- [Git workflow](./docs/git-workflow.md) — commit format, branching

## Agent skills

### Issue tracker

Issues and specs (PRDs) are GitHub issues, managed with `gh`. A PRD is a parent issue with its tickets as sub-issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five triage roles; `ready-for-agent` is written as `ready`. See `docs/agents/triage-labels.md`.

### Domain docs

Glossary `CONTEXT.md`, ADRs `docs/adr/`, out-of-scope `docs/out-of-scope/`, all writable. See `docs/agents/domain.md`.

### Notes

Scratch notes go in `.work/notes/`.
