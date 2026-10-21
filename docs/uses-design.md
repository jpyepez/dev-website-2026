# Uses design: Annotated · Split

Decided 2026-10-03 after two rounds of side-by-side prototypes (`/proto/uses`, since deleted). The page follows the home page's language; see [home-design.md](./home-design.md) for the palette, type and figure conventions it borrows.

## Direction

The home page's 5:7 split. The left column holds the title, the mono role line, a short intro set like the home tagline, and a section index that sticks while the list scrolls. The right column is the list: each tool's label in mono, the tool names, and a one-line note on why it's there.

The notes are the point. A uses page gets read to learn how someone works, not to look up a single tool, so the reason sits directly under each tool instead of in a muted side column.

## Values

| Value | Setting |
|---|---|
| Columns | `lg:grid-cols-[5fr_7fr]`, gap `clamp(32px,5vw,72px)`, inside the 1360px home container |
| Left column | `lg:sticky lg:top-6`; index hidden below `lg` |
| Intro | `clamp(22px,2vw,28px)`, medium, balanced, max 22em |
| Section heading | Mono 12px (`text-label`), teal two-digit number, hairline below |
| Row | Mono 12px (`text-label`) label (136px column from `md`), tools at `text-xl` medium, note at `text-base` 70% opacity, max 34em |
| Multiple tools | Joined with a 30% opacity ` / `; screen readers hear commas |
| Tool links | Every tool name links to its official site; 25% opacity underline at a 5px offset, teal on hover |
| Updated date | Mono 12px (`text-label`) under the intro, from `updated` in `tools.ts` |
| Index | Mono 12px (`text-label`) rows, min 40px tall, tool count on the right; the section in view is marked `aria-current="location"` |

On phones the index is hidden and every row stacks label, tools, then note.

What goes on the page is defined under "Uses Page" in [GLOSSARY.md](../GLOSSARY.md).

## Rejected

- **Round 1:** **Current** (the old badge list) was the dull page this replaced, and its teal badges matched nothing on the new home page. **Figure** (a framed desk schematic with numbered callouts) was the most memorable, but it covered 5 of 19 tools, pushed the list down on phones and repeated the home page's interactive figure. A smaller version for the Hardware section was also ruled out: the page has no picture. **Ledger** without notes was tidy but kept the one-word content that made the page dull. **Annotated** in a single 40rem column was right on content but left the right half of a desktop screen empty.
- **Round 2:** **Ledger** with notes (a full-width table of label, tools and note) came closest. It lost because the note read as a secondary column and the eye had to travel both across and down. The split layout gives the same quick jumping through its index.
