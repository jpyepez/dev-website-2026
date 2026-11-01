# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready`              | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Issues labelled `notes` are running notes, not requests: `/triage-issues` skips them.

## The `ready` bar

In this repo `ready` means an agent may build the issue unattended. Apply `ready` only when all of these hold:

- The change is small: about one module plus its tests.
- Every acceptance criterion can be checked by a test or a screenshot.
- For a bug: it was reproduced, or its cause is confirmed in the code.
- It touches nothing on the [hand-back list](issue-tracker.md#hand-back-list).
- It leaves no product or design decision open.

When in doubt, it isn't `ready`. A clear issue that fails the bar gets `ready-for-human`.

## Categories

Every triaged issue carries exactly one category label. This repo uses three:

| Label           | Meaning                                         |
| --------------- | ----------------------------------------------- |
| `bug`           | Something is broken                             |
| `enhancement`   | New feature or improvement                      |
| `documentation` | Docs-only change (no site code or copy changes) |

Edit the right-hand column to match whatever vocabulary you actually use.
