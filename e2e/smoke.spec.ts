import { expect, test, type Page } from "@playwright/test";

// Vercel serves the Web Analytics script in production only, so `astro preview` 404s it.
// This ignores every console error from that script, not only the 404.
// The URL can be relative; the base only lets `new URL` parse it.
const isVercelAnalytics = (url: string) =>
  new URL(url, "http://localhost").pathname.startsWith("/_vercel/insights/");

// Headings are the visible ones, so Writing and Lab pass whether they're empty or not.
const routes = [
  { name: "home", path: "/", status: 200, heading: "JP Yepez" },
  { name: "uses", path: "/uses", status: 200, heading: "Uses" },
  { name: "contact", path: "/contact", status: 200, heading: "Contact" },
  { name: "writing", path: "/blog", status: 200, heading: "Writing" },
  { name: "lab", path: "/lab", status: 200, heading: "Lab" },
  { name: "unknown path", path: "/no-such-page", status: 404, heading: "Not found" },
];

const widths = [1280, 390];

// The browser logs a 404 page's own response as a console error. The test asserts that
// status already, so only that one message is ignored, and only for the page's own URL.
const isOwn404 = (text: string, url: string, path: string, status: number) =>
  status === 404 &&
  new URL(url, "http://localhost").pathname === path &&
  text.includes("status of 404");

const collectErrors = (page: Page, path: string, status: number) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    const { url } = msg.location();
    if (msg.type() !== "error" || isVercelAnalytics(url)) return;
    if (isOwn404(msg.text(), url, path, status)) return;
    errors.push(`console: ${msg.text()} @ ${url}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
};

for (const route of routes) {
  for (const width of widths) {
    test(`${route.name} loads at ${width} with its heading and no console or page errors`, async ({ page }) => {
      const errors = collectErrors(page, route.path, route.status);

      await page.setViewportSize({ width, height: 800 });
      const response = await page.goto(route.path, { waitUntil: "networkidle" });

      expect(response?.status()).toBe(route.status);
      await expect(page.getByRole("heading", { level: 1, name: route.heading, exact: true })).toBeVisible();
      if (route.name === "contact") {
        await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
        await expect(page.getByRole("textbox", { name: "Message" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
      }
      if (width === 390) {
        // The intro is the first paragraph under the h1, wherever it sits in the page.
        const intro = page.locator("h1 ~ p, h1 + p").first();
        if ((await intro.count()) > 0) {
          const lines = await intro.evaluate((el) => {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            return Math.round(el.getBoundingClientRect().height / lineHeight);
          });
          expect(lines, "intro line count at 390").toBe(1);
        }
      }
      expect(errors).toEqual([]);
    });
  }
}
