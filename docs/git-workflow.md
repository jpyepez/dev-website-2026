# Git Workflow

Solo personal project. Every change reaches `main` through a pull request, so each one gets a Vercel preview and a place for review before it ships.

## Commit format

Conventional commits: `<type>(<scope>): <subject>`.

Types in use (extend as needed):

- `feat` — new feature or visible change
- `fix` — bug fix
- `refactor` — internal change with no behaviour shift
- `docs` — documentation only
- `chore` — tooling, deps, build config

Scope is the page or feature touched: `uses`, `contact`, `toasts`, `app`, `blog`, `lab`, etc.

Subject is imperative, lowercase, no trailing period. Keep it under ~60 chars.

Examples (from this repo's history):

```
feat(uses): switch editor from Cursor to Neovim
feat(toasts): add toasts and improve layout
feat(app): add daisy-ui
feat(contact): add contact form page
```

PR titles use the same format; with squash merges the PR title becomes the commit on `main`.

## Branching

- `main` is the only long-lived branch. Don't commit to it directly.
- One short-lived branch per piece of work, named by type: `feat/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`. Worktree branches (e.g. from dmux) are fine as they are.
- `exp/<name>` for spikes or risky refactors that might be thrown away. These don't need a PR unless they turn into real work.

## Pull requests

- Open a PR to `main` for every change. Keep it to one coherent change; split unrelated work into separate PRs.
- The description says what changed and why, plus a short test plan.
- Visual changes: check the Vercel preview, including on a phone, before merging.
- Run a review (`/code-review`, or `emil-ui-review` for UI) on anything non-trivial.
- Squash merge, then delete the branch.

## What gets committed

- `CONTEXT.md`, `docs/adr/` and `docs/out-of-scope/` — committed (project decisions live with the code).
- PRDs and tickets — not committed; they are GitHub issues (see `docs/agents/issue-tracker.md`).
- `.work/notes/` — gitignored (private scratch only).
- `.env*` — gitignored.
- `dist/`, `node_modules/`, `.astro/`, `.vercel/`, `.vscode/` — gitignored.
