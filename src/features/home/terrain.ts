// Terrain drawn in type: drifts slowly through time, rises under the pointer,
// ripples on click/tap. Values and rationale: docs/home-design.md.
import { fbm3 } from "./noise";

const GLYPHS = "  ·.:;+*xX#%@";
const GLYPH_SIZE = 8;
const LINE_HEIGHT = 1.25;
const GLYPH_ALPHA = 0.12;
const BAND_ALPHA = 0.67;
const BANDS = 4;
const BAND_WIDTH = 0.15;
const TERRAIN_SCALE = 290;
const HILL_RADIUS = 215;
const HILL_HEIGHT = 0.5;
const HILL_FOLLOW = 0.14;
const DRIFT_PER_SECOND = 0.09;
const RIPPLE_STRENGTH = 0.16;
const RIPPLE_SPEED = 210;
const RIPPLE_WAVELENGTH = 60;
const RIPPLE_LIFE = 1.8;
const MAX_RIPPLES = 4;
const RIPPLE_TAIL = (3 * RIPPLE_WAVELENGTH) / RIPPLE_SPEED;
const FPS = 20;

// Glyphs take the base-content hue, bands take --color-primary (src/styles/global.css).
const glyphColor = (alpha: number) => `oklch(0.8 0.05 230 / ${alpha})`;
const bandColor = (alpha: number) => `oklch(0.86 0.13 175 / ${alpha})`;

type Ripple = { x: number; y: number; born: number };

export function mountTerrain(canvas: HTMLCanvasElement): () => void {
  const surface = canvas.parentElement!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const family = getComputedStyle(canvas).fontFamily;

  let ctx: CanvasRenderingContext2D;
  let w = 0, h = 0, dpr = 1, cw = 0, ch = 0, cols = 0, rows = 0, min = 0, max = 1;
  let base = new Float32Array(0);
  let t = 0, lastTick = 0, raf = 0, dirty = false, onScreen = true;
  let ripples: Ripple[] = [];
  const hill = { x: 0, y: 0, a: 0 };
  const target = { x: 0, y: 0, a: 0 };

  const sample = (x: number, y: number) => fbm3(x / TERRAIN_SCALE, y / TERRAIN_SCALE, t);

  // Every (glyph, band) pair is drawn once here; frames are drawImage copies.
  const atlas = document.createElement("canvas");
  function buildAtlas() {
    atlas.width = Math.ceil(GLYPHS.length * cw * dpr);
    atlas.height = Math.ceil(2 * ch * dpr);
    const a = atlas.getContext("2d")!;
    a.setTransform(dpr, 0, 0, dpr, 0, 0);
    a.font = `${GLYPH_SIZE}px ${family}`;
    a.textBaseline = "top";
    for (let k = 0; k < GLYPHS.length; k++) {
      const elevation = (k + 0.5) / GLYPHS.length;
      a.fillStyle = glyphColor(Math.min(1, GLYPH_ALPHA + elevation * 0.6));
      a.fillText(GLYPHS[k], k * cw, 0);
      a.fillStyle = bandColor(Math.min(1, BAND_ALPHA + 0.3));
      a.fillText(GLYPHS[k], k * cw, ch);
    }
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = box.width; h = box.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${GLYPH_SIZE}px ${family}`;
    cw = Math.ceil(ctx.measureText("M").width);
    ch = GLYPH_SIZE * LINE_HEIGHT;
    cols = Math.ceil(w / cw);
    rows = Math.ceil(h / ch);
    buildAtlas();

    const now = t;
    t = 0;
    base = new Float32Array(cols * rows);
    min = Infinity; max = -Infinity;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const v = sample(i * cw, j * ch);
      base[j * cols + i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    t = now;
    draw(performance.now());
  }

  function draw(now: number) {
    ctx.clearRect(0, 0, w, h);
    const span = max - min + HILL_HEIGHT * 0.6;
    const r2 = 2 * HILL_RADIUS * HILL_RADIUS, amp = HILL_HEIGHT * hill.a;
    const waves = ripples.map((r) => {
      const age = (now - r.born) / 1000;
      return { x: r.x, y: r.y, front: age * RIPPLE_SPEED, fade: Math.max(0, 1 - age / RIPPLE_LIFE) ** 2 };
    });
    const L = RIPPLE_WAVELENGTH, L2 = 2 * L * L;
    const sw = cw * dpr, sh = ch * dpr, n = GLYPHS.length;

    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const px = i * cw, py = j * ch;
      let v = t === 0 ? base[j * cols + i] : sample(px, py);
      if (amp > 0.001) {
        const dx = px - hill.x, dy = py - hill.y;
        v += amp * Math.exp(-(dx * dx + dy * dy) / r2);
      }
      for (const wave of waves) {
        const dx = px - wave.x, dy = py - wave.y;
        const off = Math.sqrt(dx * dx + dy * dy) - wave.front;
        if (off > 3 * L || off < -3 * L) continue;
        v += RIPPLE_STRENGTH * wave.fade * Math.exp(-(off * off) / L2) * Math.cos((2 * Math.PI * off) / L);
      }
      const q = Math.max(0, Math.min(1, (v - min) / span));
      const k = Math.min(n - 1, Math.floor(q * n));
      if (GLYPHS[k] === " ") continue;
      const band = (q * BANDS) % 1 < BAND_WIDTH ? 1 : 0;
      ctx.drawImage(atlas, k * sw, band * sh, sw, sh, px, py, cw, ch);
    }
  }

  const visible = () => onScreen && !document.hidden;
  const drifting = () => !reduced && visible();

  function frame(now: number) {
    raf = 0;
    const easing = Math.abs(target.x - hill.x) > 0.3 || Math.abs(target.y - hill.y) > 0.3 || Math.abs(target.a - hill.a) > 0.003;
    if (easing) {
      hill.x += (target.x - hill.x) * HILL_FOLLOW;
      hill.y += (target.y - hill.y) * HILL_FOLLOW;
      hill.a += (target.a - hill.a) * 0.1;
      dirty = true;
    }
    const maxAge = (RIPPLE_LIFE + RIPPLE_TAIL) * 1000;
    ripples = ripples.filter((r) => now - r.born < maxAge);
    const timed = drifting() || (ripples.length > 0 && visible());

    // Drift and ripples are capped at FPS; pointer easing runs every frame so it tracks the hand.
    if (timed && now - lastTick >= 1000 / FPS) {
      if (lastTick && drifting()) t += ((now - lastTick) / 1000) * DRIFT_PER_SECOND;
      lastTick = now;
      dirty = true;
    }
    if (!timed) lastTick = 0;
    if (dirty) { dirty = false; draw(now); }
    if (timed || easing) raf = requestAnimationFrame(frame);
  }
  const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

  function local(e: PointerEvent) {
    const box = canvas.getBoundingClientRect();
    return { x: e.clientX - box.left, y: e.clientY - box.top };
  }
  function placeHill(e: PointerEvent) {
    const p = local(e);
    if (target.a === 0) { hill.x = p.x; hill.y = p.y; }
    target.x = p.x; target.y = p.y; target.a = 1;
    if (reduced) { hill.x = p.x; hill.y = p.y; hill.a = 1; dirty = true; }
    wake();
  }
  const onMove = (e: PointerEvent) => { if (e.pointerType !== "touch") placeHill(e); };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    target.a = 0;
    if (reduced) { hill.a = 0; dirty = true; }
    wake();
  };
  // `click` (not pointerdown) so a scroll that starts on the figure doesn't count as a tap.
  const onTap = (e: PointerEvent) => {
    if (e.pointerType === "touch") placeHill(e);
    if (reduced) return;
    const p = local(e);
    ripples.push({ ...p, born: performance.now() });
    if (ripples.length > MAX_RIPPLES) ripples.shift();
    wake();
  };

  surface.addEventListener("pointermove", onMove);
  surface.addEventListener("pointerleave", onLeave);
  surface.addEventListener("click", onTap);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; wake(); });
  io.observe(canvas);
  document.addEventListener("visibilitychange", wake);
  // Glyph width is measured from the font; re-measure once it has loaded.
  document.fonts.load(`${GLYPH_SIZE}px ${family}`).then(resize);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", wake);
    surface.removeEventListener("pointermove", onMove);
    surface.removeEventListener("pointerleave", onLeave);
    surface.removeEventListener("click", onTap);
  };
}
