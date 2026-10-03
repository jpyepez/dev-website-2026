// src/features/uses/tools.ts
// TODO(JP): the notes are drafts written by Claude. Rewrite them in your own words.

export interface Tool {
  label: string;
  values: string[];
  note: string;
}

export interface ToolSection {
  id: string;
  title: string;
  items: Tool[];
}

export const sections: ToolSection[] = [
  {
    id: "editor",
    title: "Editor",
    items: [
      { label: "Editor", values: ["Neovim"], note: "Modal editing, configured in Lua." },
      { label: "AI", values: ["Claude Code"], note: "Runs in a terminal pane beside the editor." },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    items: [
      { label: "Keyboard", values: ["Ergodox"], note: "Split, columnar and fully programmable." },
      { label: "Mouse", values: ["Logitech Lift"], note: "Vertical, so the wrist stays neutral next to the split board." },
    ],
  },
  {
    id: "terminal",
    title: "Terminal & Shell",
    items: [
      { label: "Terminal", values: ["iTerm2"], note: "Split panes and per-project profiles." },
      { label: "Shell", values: ["zsh", "Oh My Zsh"], note: "Plugins for git and completion, nothing exotic." },
    ],
  },
  {
    id: "stack",
    title: "Stack",
    items: [
      {
        label: "Frameworks",
        values: ["React", "Next.js", "Astro", "React Native"],
        note: "React for most product work, Astro for content sites like this one, Next.js when it needs a server, and React Native when it has to ship to a phone.",
      },
      { label: "Languages", values: ["TypeScript", "JavaScript"], note: "TypeScript wherever the build allows it." },
      { label: "Styling", values: ["Tailwind"], note: "Utility classes, with colour tokens kept in OKLCH." },
      { label: "Backend", values: ["Firebase", "Supabase", "Convex"], note: "Managed backends, so a side project ships in a weekend." },
      { label: "Package Manager", values: ["pnpm", "bun"], note: "pnpm for monorepos, bun for everything small." },
      { label: "Browser", values: ["Helium"], note: "Chromium underneath, with less in the way." },
      { label: "API Testing", values: ["Yaak"], note: "A lightweight REST and GraphQL client." },
    ],
  },
  {
    id: "creative",
    title: "Creative",
    items: [
      { label: "Design", values: ["Figma"], note: "Mockups, and the occasional handoff." },
      { label: "2D / Data Viz", values: ["Visx", "D3"], note: "Visx for charts in React; D3 when I need the primitives." },
      { label: "3D", values: ["Three.js", "GLSL"], note: "Three.js for scenes, GLSL when the GPU should do the work." },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    items: [{ label: "Launcher", values: ["Raycast"], note: "Replaced Spotlight, plus clipboard history and window snapping." }],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");
