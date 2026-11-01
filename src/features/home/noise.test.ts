import { describe, expect, test } from "bun:test";
import { fbm, fbm3 } from "./noise";

// Negative, fractional, on and off the integer lattice, and far from the origin.
const coords = [-37.25, -3.5, -1, -0.01, 0, 0.3, 0.5, 1, 2.71, 9.99, 128.4, 4096.125];
const points = coords.flatMap((x) => coords.map((y) => [x, y] as const));

describe("fbm3", () => {
  test("its z = 0 slice equals the 2D noise, so the terrain holds still when drift starts", () => {
    for (const [x, y] of points) {
      for (const octaves of [1, 3, 5]) {
        expect(fbm3(x, y, 0, octaves)).toBeCloseTo(fbm(x, y, octaves), 12);
      }
    }
  });
});
