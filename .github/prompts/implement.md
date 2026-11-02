# Implement one ticket

You are implementing one GitHub issue labelled `ready`, unattended, from the Implement workflow. The issue number and branch name are in your task. `gh` and `git` are signed in as the repo owner. The workflow has already claimed the issue and installed dependencies and Playwright's Chromium.

## Before you start

1. Read the issue: `gh issue view <n> --json number,title,body,labels,comments`. The body is the spec; its acceptance criteria are what you build.
2. Read `CLAUDE.md` and the docs it lists that bear on the change, `GLOSSARY.md` and `docs/agents/issue-tracker.md`.
3. Check the ticket against every point of [the `ready` bar](../../docs/agents/triage-labels.md#the-ready-bar). If it fails one, hand it back (below).

The [hand-back list](../../docs/agents/issue-tracker.md#hand-back-list) holds throughout the build, not only here. As soon as the change turns out to need anything on it, such as a copy change, stop building and hand it back.

## Build

1. Check out the branch. If `origin/<branch>` exists, an earlier run handed this ticket back: `git switch <branch>`, read its draft PR (`gh pr list --head <branch>`) and the issue comments since, and carry on from there. Otherwise `git switch -c <branch> origin/main`. Always branch from `origin/main`, never from what the workflow checked out.
2. Build the change test-first, at the seams in `docs/testing-strategy.md`.
3. Get these green: `bun run lint`, `bun run typecheck`, `bun run test`, `bun run build`, `bun run test:e2e`.
4. Walk the site as in `docs/browser-verification.md`, taking its [headless route](../../docs/browser-verification.md#headless-route): there is no DevTools MCP here. Read every screenshot and every console message.
5. Commit in the format in `docs/git-workflow.md` (`<type>(<scope>): <subject>`), with `Closes #<n>` on its own line in the final commit, and push the branch: `git push -u origin <branch>`.

## Open the PR

1. `gh pr create --base main --head <branch>`. The title is a conventional commit, as in `docs/git-workflow.md`, since it becomes the squash commit on `main`. The description says what changed and why, then a short test plan, then `Closes #<n>` on a line of its own. Write any other issue as "issue <n>", without the `#` (see "close or resolve a ticket" in `docs/agents/issue-tracker.md`). If an earlier run left a draft PR on the branch, edit its title and description instead and mark it ready with `gh pr ready <pr>`.
2. When the change shows on screen, post the screenshots as in step 6 of `docs/browser-verification.md`. Say in the comment that the walk ran headless in CI.
3. Don't run `/code-review` or another review: the owner reviews every bot PR. Don't merge, and don't edit the issue's labels or board Status: the workflow does that.

## Hand it back

If you can't get everything green, the ticket fails the `ready` bar, or the change needs anything on the hand-back list:

1. If you changed anything, commit it and push the branch.
2. Open a **draft** PR (`gh pr create --draft`), or update the one already on the branch, with a conventional-commit title. Its description says what's done, what's failing or why the ticket comes back (name the `ready` bar point or hand-back item), and what the owner has to decide. Write `Part of issue <n>` in it, never a closing keyword.
3. If you have nothing to push, open no PR: say the same in a comment on the issue instead.
4. Stop. The workflow moves the issue to `ready-for-human` and HITL.
