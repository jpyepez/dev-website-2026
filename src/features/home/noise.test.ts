import { describe, expect, test } from "bun:test";
import { noise, noise3 } from "./noise";

// Negative, fractional, on and off the integer lattice, and far from the origin.
const coords = [-37.25, -3.5, -1, -0.01, 0, 0.3, 0.5, 1, 2.71, 9.99, 128.4, 4096.125];
const points = coords.flatMap((x) => coords.map((y) => [x, y] as const));

describe("noise3", () => {
  test("its z = 0 slice equals the 2D noise, so the terrain holds still when drift starts", () => {
    for (const [x, y] of points) {
      // fbm3 uses seeds 7, 8, 9 for its octaves.
      for (const seed of [0, 7, 8, 9]) {
        expect(noise3(x, y, 0, seed)).toBeCloseTo(noise(x, y, seed), 12);
      }
    }
  });
});
