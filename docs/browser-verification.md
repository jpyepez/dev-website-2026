# Browser verification

Tests show the code does what the tests check; this shows the site does what the ticket asked, in a real browser.

The site has one theme, dark (`data-theme="night"` on `<html>`), so every screenshot is dark. The contact form is checked for rendering only: never type into it and press Send, never submit it.

This walk runs before the PR is reviewed. It doesn't replace the check in [git-workflow.md](./git-workflow.md#pull-requests), where the owner looks at the Vercel preview on a real phone before merging.

Keep every script, screenshot and comment file out of the repo: in the session's scratchpad, or `$RUNNER_TEMP` on a CI runner. Call that folder `<out>`.

## Steps

1. **Serve the build.** `bun run build`, then `bun run preview --port 4174 --strictPort` in the background. Done when `http://localhost:4174/` answers 200. The smoke suite uses the same port and reuses a running server, so stop this one before `bun run test:e2e` if you rebuild.
2. **Open a clean page.** Chrome DevTools MCP `new_page` with an `isolatedContext`, so the user's own browser data stays untouched.
   - No DevTools MCP (a CI runner), or DevTools says the browser profile is already in use: take the [headless route](#headless-route) for steps 3 to 5 instead. Leave a browser another session owns running.
3. **Walk the routes.** Every route the change touches, plus each acceptance criterion of the ticket or the bug's repro steps. The routes are `/`, `/uses`, `/contact`, `/blog`, `/lab`, any post the change touches (`/blog/<slug>`; lab pieces have no route of their own yet), and an unknown path such as `/no-such-page` for the 404 page. After each navigation, wait for the page's `h1` before a snapshot or screenshot; the home terrain canvas draws after load. Done when every route and criterion has been walked.
4. **Look at it.** Screenshot each walked route at desktop (1280×800) and phone (390×844), full page, and read every screenshot. Done when each one shows what the ticket describes and nothing is cut off, overlapping or unstyled.
5. **Check the console.** `list_console_messages` on each route. Done when every error and warning has been read and goes in the report. Errors from `/_vercel/insights/` are expected on the preview (Vercel serves analytics in production only) and so is the 404 page's own 404; note them as such.
6. **Post the screenshots.** Once the PR is open, name the files in walk order (`01-home-1280.png`, `02-home-390.png`, …), write the comment body to `<out>/comment.md` and post it with `gh pr comment <pr> --body-file <out>/comment.md`, plus one `--attach '<out>/<file>.png#<alt>'` per screenshot (gh 2.103 or later; up to 50 files). gh uploads each file and points its reference at the upload. The body holds:
   - a line on the setup (production build, `astro preview` on 4174, Chromium, dark) and the console result;
   - a table: what was walked, what showed, which criterion it checks;
   - the images in a two-column table, `![<alt>](./<file>.png)`, 1280 and 390 of each route side by side.

   The repo is private, so the images show only for people signed in with access. Skip this step for a change with nothing to see on screen. Done when the comment renders on the PR.
7. **Clean up.** Close the page and stop the preview server, unless the user wants it left running. Done when port 4174 is free (`lsof -i :4174` prints nothing).

## Headless route

For a runner with no DevTools MCP. Write a throwaway script to `<out>/walk.mjs` that imports the repo's installed Playwright by absolute path: an ES module resolves bare imports from its own folder, not the working directory, so `import "@playwright/test"` fails from `<out>`. Chromium must be installed (`bunx playwright install chromium`; CI does this already).

```js
// node <out>/walk.mjs <repo> <out>
import { join } from "node:path";
const [repo, out] = process.argv.slice(2);
const { chromium } = await import(join(repo, "node_modules/@playwright/test/index.mjs"));

const routes = ["/", "/uses", "/contact", "/blog", "/lab", "/no-such-page"];
const widths = [[1280, 800], [390, 844]];
const browser = await chromium.launch();
const report = [];
let n = 0;

for (const path of routes) {
  for (const [width, height] of widths) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: "dark" });
    const page = await context.newPage();
    const messages = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") messages.push(`${m.type()}: ${m.text()} @ ${m.location().url}`);
    });
    page.on("pageerror", (e) => messages.push(`pageerror: ${e.message}`));
    const response = await page.goto(`http://localhost:4174${path}`, { waitUntil: "networkidle" });
    await page.locator("h1").first().waitFor();
    const name = path === "/" ? "home" : path.slice(1).replaceAll("/", "-");
    const file = `${String(++n).padStart(2, "0")}-${name}-${width}.png`;
    await page.screenshot({ path: join(out, file), fullPage: true });
    report.push({ path, width, status: response?.status(), file, messages });
    await context.close();
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
```

Run it with the preview from step 1 up: `node <out>/walk.mjs "$PWD" <out>`. Add the routes and criteria the ticket touches, but keep the contact form unsubmitted. Then read every screenshot (step 4), and read the printed report for statuses and console messages (step 5).

## Report

List each route walked with what you saw at each width, every console error and warning, and anything that looks wrong but is outside the ticket (name the ticket that owns it, if any). A mismatch that a retry with a proper wait clears was timing, and is reported as such.
