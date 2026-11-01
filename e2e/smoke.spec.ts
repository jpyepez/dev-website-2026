import { expect, test } from "@playwright/test";

// Vercel serves the Web Analytics script in production only, so `astro preview` 404s it.
// This ignores every console error from that script, not only the 404.
// The URL can be relative; the base only lets `new URL` parse it.
const isVercelAnalytics = (url: string) =>
  new URL(url, "http://localhost").pathname.startsWith("/_vercel/insights/");

test("home loads at 1280 with its heading and no console or page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error" || isVercelAnalytics(msg.location().url)) return;
    errors.push(`console: ${msg.text()} @ ${msg.location().url}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  await page.setViewportSize({ width: 1280, height: 800 });
  const response = await page.goto("/", { waitUntil: "networkidle" });

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "JP Yepez" })).toBeVisible();
  expect(errors).toEqual([]);
});
