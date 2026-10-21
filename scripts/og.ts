/// <reference types="bun" />
// Renders public/og.png (1200×630): the home page's name, role and tagline beside the
// terrain figure, caught mid-ripple. Uses the real terrain code and fonts, screenshotted
// by headless Chrome. Run with `bun run og` after changing any of the copy below.
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const NAME = "JP Yepez";
const ROLE = "Senior Product Engineer";
const TAGLINE = "Writing about senior engineering, AI, and the visual work it’s bringing within reach.";
const CAPTION = "Terrain, set in type";
const URL_TEXT = "jpyepez.com";

// The pointer rests here to raise the ground, then clicks to start a ripple that is
// captured mid-travel. Canvas pixels and milliseconds.
const POINTER = { x: 250, y: 240 };
const CLICK_AT_MS = 800;
const RIPPLE_AGE_MS = 450;

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const root = resolve(import.meta.dir, "..");
const out = join(root, "public/og.png");
const font = (pkg: string, file: string) =>
  `file://${join(root, "node_modules/@fontsource-variable", pkg, "files", file)}`;

const entry = `
  import { mountTerrain } from "${join(root, "src/features/home/terrain.ts")}";
  // Headless Chrome doesn't run animation frames under virtual time; timers it does.
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  window.cancelAnimationFrame = clearTimeout;
  const canvas = document.querySelector("canvas");
  mountTerrain(canvas);
  const at = () => {
    const box = canvas.getBoundingClientRect();
    return { clientX: box.left + ${POINTER.x}, clientY: box.top + ${POINTER.y}, bubbles: true };
  };
  document.fonts.ready.then(() => {
    const surface = canvas.parentElement;
    surface.dispatchEvent(new PointerEvent("pointermove", { ...at(), pointerType: "mouse" }));
    setTimeout(() => surface.dispatchEvent(new MouseEvent("click", at())), ${CLICK_AT_MS});
  });
`;

const dir = mkdtempSync(join(tmpdir(), "og-"));
try {
  writeFileSync(join(dir, "entry.js"), entry);
  const build = await Bun.build({ entrypoints: [join(dir, "entry.js")], target: "browser" });
  if (!build.success) throw new AggregateError(build.logs, "bundling the terrain failed");
  const script = await build.outputs[0].text();

  // Colours mirror the night theme in src/styles/global.css.
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Geist Variable"; src: url("${font("geist", "geist-latin-wght-normal.woff2")}"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono Variable"; src: url("${font("geist-mono", "geist-mono-latin-wght-normal.woff2")}"); font-weight: 100 900; }
  :root {
    --base-100: oklch(0.17 0.03 245); --base-200: oklch(0.135 0.03 245);
    --base-300: oklch(0.3 0.035 245); --content: oklch(0.95 0.01 245);
    --primary: oklch(0.86 0.13 175);
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; display: flex; gap: 48px; padding: 52px 60px 52px 72px;
    background: var(--base-100); color: var(--content); font-family: "Geist Variable", sans-serif;
    -webkit-font-smoothing: antialiased; font-synthesis: none;
  }
  .mono { font-family: "Geist Mono Variable", monospace; }
  .text { flex: 0 0 490px; display: flex; flex-direction: column; justify-content: center; }
  h1 { font-size: 84px; line-height: 0.95; font-weight: 600; letter-spacing: -0.045em; }
  .role { margin-top: 18px; font-size: 17px; letter-spacing: 0.02em; color: var(--primary); }
  .tagline { max-width: 440px; margin-top: 56px; font-size: 34px; line-height: 1.25; letter-spacing: -0.015em; font-weight: 500; }
  .url { margin-top: auto; font-size: 17px; color: color-mix(in oklch, var(--content) 70%, transparent); }
  figure { flex: 1; display: flex; flex-direction: column; gap: 14px; }
  .surface { position: relative; flex: 1; border: 1px solid var(--base-300); border-radius: 2px; background: var(--base-200); }
  canvas { position: absolute; inset: 14px; width: calc(100% - 28px); height: calc(100% - 28px); font-family: "Geist Mono Variable", monospace; }
  .corner { position: absolute; width: 10px; height: 10px; border: 0 solid var(--primary); }
  figcaption { font-size: 14px; font-weight: 500; }
</style></head><body>
  <section class="text">
    <div style="margin-top: auto">
      <h1>${NAME}</h1>
      <p class="role mono">${ROLE}</p>
      <p class="tagline">${TAGLINE}</p>
    </div>
    <p class="url mono">${URL_TEXT}</p>
  </section>
  <figure>
    <div class="surface">
      <canvas></canvas>
      <span class="corner" style="top:-1px;left:-1px;border-top-width:1px;border-left-width:1px"></span>
      <span class="corner" style="top:-1px;right:-1px;border-top-width:1px;border-right-width:1px"></span>
      <span class="corner" style="bottom:-1px;left:-1px;border-bottom-width:1px;border-left-width:1px"></span>
      <span class="corner" style="bottom:-1px;right:-1px;border-bottom-width:1px;border-right-width:1px"></span>
    </div>
    <figcaption>${CAPTION}</figcaption>
  </figure>
  <script>${script}</script>
</body></html>`;
  const page = join(dir, "card.html");
  writeFileSync(page, html);

  const chrome = Bun.spawnSync([
    CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1200,630", "--allow-file-access-from-files",
    `--virtual-time-budget=${CLICK_AT_MS + RIPPLE_AGE_MS}`, `--screenshot=${out}`, `file://${page}`,
  ], { stderr: "pipe" });
  if (chrome.exitCode !== 0) throw new Error(`Chrome failed:\n${chrome.stderr.toString()}`);
  console.log(`Wrote ${out}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
