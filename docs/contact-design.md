# Contact design: Split

Decided 2026-10-05 after one round of side-by-side prototypes (`/proto/contact`, since deleted). The page follows the home page's language; see [home-design.md](./home-design.md) for the palette and type, and [uses-design.md](./uses-design.md) for the other split page.

## Direction

The home page's 5:7 split. The left column has the title, a mono location line and a short intro set like the home tagline, with the social links below. The right column is the form, and the form is the main thing on the page: someone who opens Contact has already decided to write, so nothing comes before it.

On phones the order is intro, form, then social links. The grid uses the same `grid-template-areas` approach as the home page, so on desktop the links move back under the intro. The HTML is in the phone order, so screen readers and keyboard users get the form before the links on every screen size.

## Values

| Value | Setting |
|---|---|
| Columns | `lg:grid-cols-[5fr_7fr]`, gap `clamp(32px,5vw,72px)`, inside the 1360px home container; areas `text form / more form` from `lg`, `text / form / more` below |
| Intro | `clamp(22px,2vw,28px)`, medium, balanced, max 22em |
| Form width | Max 40rem; name and email side by side from `md` |
| Labels | Mono 12px (`text-label`), 70% opacity, above the field |
| Fields | 48px tall, `bg-base-200`, `border-base-300`, 2px radius (the figure frame's), 16px text on phones and 14px from `md`. Focus turns the border teal; an error turns it red. Shared classes live in `components/ui/field.ts` |
| Topic | Four radio chips in the same frame as the fields, at least 44px tall; the checked chip gets a teal border and dot |
| Errors | One line reserved under every field. They appear on send, then each one is re-checked as it's fixed, and focus moves to the first field with a problem |
| Send button | Teal, 44px tall, 2px radius, scales to 0.97 when pressed; reads "Sending…" and is disabled while a request is out. ⌘/Ctrl + Enter sends from the message box (the hint is hidden on touch screens) |
| Sent | The form is replaced by a "Sent" label, "Thanks, {name}. Your message is on its way." and the reply address, with a link to send another. Focus moves to the heading |
| Failure | The error appears under the button, and everything the visitor wrote stays in the fields |
| Without JavaScript | The browser checks the required fields and the form posts straight to Web3Forms |

## Rejected

- **Current** (the old single 40rem column with daisyUI boxed inputs, browser-popup errors and a one-line success message) didn't match the new home and uses pages.
- **Ledger** (topics listed first, uses-page style, each with a one-line note on what it covers, then the form on ruled lines) came second. Telling people what you take on helps them write a better first message, but the topic list roughly doubled the scroll before the first field. It also looked like a copy of the uses page rather than the same family, and it depended on four notes nobody had written yet. If the topics ever need explaining, a one-line hint under the selected chip gets most of the benefit.
- **Letter** (the form written as a note, "Hi JP, my name is ___ and I'm getting in touch about ___", with the fields inline) was the most memorable. It cut off long names and emails, relied on `field-sizing` for fields that grow as you type (Safari shows a fixed width), and swapped visible labels for screen-reader-only ones. That's too much friction on a page whose only job is getting a message through. It could come back as a lab piece.
- **Split v1** put the social links at the bottom of the left column, which put them above the form on phones and pushed the first field about a screen down.

## Content

Settled 2026-10-05. Who the page is for is under "Contact Page" in [.work/CONTEXT.md](../.work/CONTEXT.md).

- Topics, in order: Freelance, Consulting, Speaking, Just saying hi. Nothing is selected when the page loads, so the subject line in the inbox reflects what the sender actually chose.
- Speaking has its own topic so invitations have an obvious place, but the intro doesn't advertise talks. Collaboration was dropped; side projects come in under "Just saying hi".
- The intro speaks to leads: "Open to freelance and consulting work, especially with teams here in New Zealand."
- The message placeholder is "A bit about what you're building and where it's at."

## Open

- No email address is published. The form and the social links are the only ways to get in touch. Deferred 2026-10-05; if one goes up, it should be an alias that can be turned off.
