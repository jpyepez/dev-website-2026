# Git Workflow

Solo personal project. Direct-to-`main` — no PR workflow, no feature branches by default.

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

## Branching

- `main` is the only long-lived branch.
- Use short-lived branches (`exp/<name>`) only for spikes or risky refactors that might be discarded. Otherwise commit directly.

## What gets committed

- `.work/prds/` and `.work/issues/` — committed (project decisions live with the code).
- `.work/notes/` — gitignored (scratch only).
- `.env*` — gitignored.
- `dist/`, `node_modules/`, `.astro/`, `.vercel/`, `.vscode/` — gitignored.
