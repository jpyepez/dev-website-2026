// Value noise for the home terrain figure. noise3's z = 0 slice equals noise,
// so the resting frame doesn't change when drift starts.

function hash(x: number, y: number, seed: number) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export function noise(x: number, y: number, seed: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, seed), b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed), d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// Each integer z reads an unrelated, far-away patch of the 2D noise.
export function noise3(x: number, y: number, z: number, seed: number) {
  const zi = Math.floor(z), zf = z - zi;
  const w = zf * zf * (3 - 2 * zf);
  const a = noise(x, y + zi * 1013, seed);
  const b = noise(x, y + (zi + 1) * 1013, seed);
  // Blending two independent values shrinks their spread mid-way, which would make the
  // terrain flatten and re-sharpen on a loop. Rescale around the 0.5 mean to hold contrast.
  const lerp = a + (b - a) * w;
  return 0.5 + (lerp - 0.5) / Math.sqrt((1 - w) * (1 - w) + w * w);
}

export function fbm3(x: number, y: number, z: number, octaves = 3) {
  let sum = 0, amp = 0.55, freq = 1;
  for (let o = 0; o < octaves; o++) {
    sum += amp * noise3(x * freq, y * freq, z * freq, o + 7);
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum;
}
