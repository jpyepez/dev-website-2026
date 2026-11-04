# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Edit an issue body**: write the whole new body to a file, then `gh issue edit <number> --body-file <file>`. Never pass `-` or an empty body.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: see "When a skill says close or resolve a ticket" below.

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage-issues` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.

## When a skill says "close" or "resolve" a ticket

A merged PR closes the ticket. Open a PR to `main` with `Closes #<n>` in the description for each ticket it finishes; the issue stays open until that PR merges, even when the work is finished on a branch.

Put each `Closes #<n>` on a line of its own, and write any other issue as "issue 50", without the `#`. GitHub reads `close`, `fix` or `resolve` in any tense before `#<n>`, anywhere in the description, as closing that issue on merge.

Work that ships no code (wontfix, duplicates, pathfinder resolves, a parent spec whose sub-issues are all closed) closes directly: `gh issue close <number> --comment "..."`.

## Hand-back list

An agent doesn't build these changes. It hands them back to the owner. This is the only copy of the list: the [`ready` bar](triage-labels.md#the-ready-bar) points here, and so does the [Implement workflow](#automation), so link to it rather than repeating it.

- Copy or voice changes
- Blog posts
- The glossary (`GLOSSARY.md`)
- Design docs (`docs/*-design.md`)
- ADRs (`docs/adr/`)
- Out-of-scope records (`docs/out-of-scope/`)
- Vercel config
- The Astro config (`astro.config.mjs`)
- The content schema (`src/content.config.ts`)
- Anything under `.github/`
- Secrets
- New dependencies
- Anything that changes what the home page leads with (see [ADR-0001](../adr/0001-home-leads-with-visual-hero.md))
- The OG image (`public/og.png` and `scripts/og.ts`)

## Automation

Triage and Implement are two small caller workflows (`.github/workflows/triage.yml` and `implement.yml`) that run the shared engine, [`jpyepez/github-agents`](https://github.com/jpyepez/github-agents) at `@v1`. The callers are byte-identical in every repo that uses the engine, so change them there, not here. This repo's settings are in `.github/agents.yml`; its rules are the [`ready` bar](triage-labels.md#the-ready-bar), the [hand-back list](#hand-back-list), `docs/git-workflow.md` and `docs/browser-verification.md`.

- **Triage** runs when the owner opens an issue, or by hand (`gh workflow run triage.yml -f issue=<n>`). It skips closed issues, issues labelled `notes`, `spec` or `pathfinder:*`, and, on opening only, issues that already carry an outcome label, such as a ticket a session files as `ready`. It leaves one category label, one outcome (`ready`, `needs-info`, `ready-for-human`, or `wontfix` recommended with the issue still open) and a comment giving its reasons, promotes a spec into the body for `ready`, and sets the board Status from the table under Repo conventions.
- **Implement** runs when the owner labels one of their own issues `ready` (labels Triage applies count, since it acts as the owner), or by hand (`gh workflow run implement.yml -f issue=<n>`). It skips spec parents, claims the issue, builds it on `auto/issue-<n>`, runs the checks in `agents.yml` and a headless browser walk, and opens a PR with `Closes #<n>` and a screenshot comment. A run that can't get green, or finds the ticket fails the bar or needs something on the hand-back list, ends in a draft PR (or a comment, with no commits), with the issue relabelled `ready-for-human` and moved to HITL. Labelling it `ready` again carries on from that branch.

The agent works from a file holding the issue and only the owner's comments, so text from anyone else never reaches it. It holds no write token and its network is limited to an allowlist; the workflow checks its output, then makes every write. Nothing merges automatically, and Vercel deploys production only from `main`, so nothing ships until the owner merges.

The workflows act through `OWNER_PAT`, a classic PAT of the owner's with the scopes `repo`, `project` and `read:org`, and not `workflow`, so the bots can't edit their own workflows. A fine-grained PAT can't reach a user-owned Project, and `gh project` needs `read:org` to tell a user owner from an organization. `GITHUB_TOKEN` won't do: the events it causes don't start other workflows, so `ready` would never start Implement and CI wouldn't run on bot PRs. Claude runs on `CLAUDE_CODE_OAUTH_TOKEN`. Both tokens expire; renew them before they lapse, or every run fails.

## Commit references

A closing keyword in a commit message also closes that issue on merge, so commits never carry one. Write the issue as "issue 42" in a commit; `Closes #42` lives only in the PR description. Commit format: `docs/git-workflow.md`.

## Repo conventions

- **Labels**: the triage roles use the strings in `triage-labels.md`. A closed issue is done; there is no `done` label.
- **A spec is a parent issue.** The issue body is the spec, labelled `ready` and `spec`. Its tickets are GitHub sub-issues of it, added in dependency order (blockers first): `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`, where `<child-db-id>` is the child's numeric database id (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`). Blocking between tickets uses native issue dependencies, as described under Wayfinding below.
- **Promote, don't duplicate.** When a spec comes out of an existing issue (usually an inbox item after triage), replace that issue's body with the spec instead of opening a new issue. First post the original body as a comment headed `Original note:` so it stays readable. Retitle the issue if the scope changed.
- **PRs close tickets**: see "When a skill says close or resolve a ticket" above.
- **Claim before working**: before implementing an issue, assign it with `gh issue edit <n> --add-assignee @me` and set its board Status to In progress (below).
- **Board**: the [dev-website-2026 project](https://github.com/users/jpyepez/projects/1) is one board with a column per Status: Inbox, Ready, In progress, HITL, Done. GitHub's built-in workflows add new issues to Inbox and move closed issues to Done. Keep Status in step with the triage label whenever you change one:

  | Change | Status |
  | --- | --- |
  | `needs-triage` applied | Inbox |
  | `needs-info`, `ready-for-human` or `wontfix` applied | HITL |
  | `ready` applied | Ready |
  | Issue claimed | In progress |
  | Work an agent handed back | HITL |

  HITL is everything waiting on the owner: questions to answer, work to build by hand, a `wontfix` to confirm and close, and work an agent handed back. Ready holds only what an agent may build (see [the `ready` bar](triage-labels.md#the-ready-bar)).

  Set it with these two commands, which add the issue to the board first if it isn't there:

  ```sh
  item=$(gh project item-add 1 --owner jpyepez --url https://github.com/jpyepez/dev-website-2026/issues/<n> --format json --jq .id)
  gh project item-edit --project-id PVT_kwHOAJXAFM4Bn-u2 --id "$item" --field-id PVTSSF_lAHOAJXAFM4Bn-u2zhmg3qw --single-select-option-id <option-id>
  ```

  The option ids: Inbox `f75ad846`, HITL `4cabc2cd`, Ready `fb0b00b5`, In progress `47fc9ee4`, Done `98236657`.
- **Not issues**: glossary, ADRs and out-of-scope records stay as files (see `domain.md`).

## Wayfinding operations

Used by `/pathfinder`. The **map** is a single issue with **child** issues as tickets. Issues labelled `pathfinder:*` are planning, not requests: `/triage-issues` skips them.

- **Map**: a single issue labelled `pathfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label pathfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `pathfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies**, the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only, the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me`, the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.
