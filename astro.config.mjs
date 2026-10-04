// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

import { readdirSync, readFileSync } from "node:fs";
import { pieces } from "./src/features/lab/pieces.ts";

// Empty sections are noindex (Base.astro), so keep them out of the sitemap too.
// Mirrors the content checks in Header.astro and the section index pages.
/** @param {URL} dir @returns {URL[]} */
const filesIn = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesIn(new URL(`${entry.name}/`, dir)) : [new URL(entry.name, dir)]
  );
const hasPosts = filesIn(new URL("./src/content/blog/", import.meta.url)).some(
  (file) => /\.mdx?$/.test(file.pathname) && !/^draft:\s*true\s*$/m.test(readFileSync(file, "utf8"))
);
const emptySections = [!hasPosts && "/blog/", pieces.length === 0 && "/lab/"].filter(Boolean);

// https://astro.build/config
export default defineConfig({
  site: "https://jpyepez.com",

  // Token colours come from the palette in src/styles/global.css.
  markdown: {
    shikiConfig: { theme: "css-variables" },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !emptySections.some((path) => new URL(page).pathname === path),
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
