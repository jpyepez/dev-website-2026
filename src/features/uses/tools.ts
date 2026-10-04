// src/features/uses/tools.ts
// What earns a spot is defined under "Uses Page" in .work/CONTEXT.md.

export interface ToolLink {
  name: string;
  href: string;
}

export interface Tool {
  label: string;
  values: ToolLink[];
  note: string;
}

export interface ToolSection {
  id: string;
  title: string;
  items: Tool[];
}

export const updated = new Date("2026-10-04");

export const sections: ToolSection[] = [
  {
    id: "ai",
    title: "AI",
    items: [
      {
        label: "Agent",
        values: [{ name: "Claude Code", href: "https://claude.com/claude-code" }],
        note: "Where most of my work starts these days, with my own skills and rules set up around it.",
      },
      {
        label: "Parallel work",
        values: [{ name: "dmux", href: "https://github.com/standardagents/dmux" }],
        note: "A few agents at once, each in its own worktree, so they don’t step on each other.",
      },
      {
        label: "Voice",
        values: [{ name: "Wispr Flow", href: "https://wisprflow.ai" }],
        note: "Probably talking to Claude more than typing to it at this point. I use it for as much as I can.",
      },
    ],
  },
  {
    id: "editor",
    title: "Editor",
    items: [
      {
        label: "Editor",
        values: [
          { name: "Neovim", href: "https://neovim.io" },
          { name: "LazyVim", href: "https://www.lazyvim.org" },
        ],
        note: "Kept close to the LazyVim defaults, tweaking a bit as I go.",
      },
      {
        label: "Theme & font",
        values: [
          { name: "Kanagawa Dragon", href: "https://github.com/rebelot/kanagawa.nvim" },
          { name: "JetBrains Mono", href: "https://www.jetbrains.com/lp/mono/" },
        ],
        note: "Same theme in the editor and the terminal, so it all kinda blends together.",
      },
    ],
  },
  {
    id: "terminal",
    title: "Terminal",
    items: [
      {
        label: "Terminal",
        values: [{ name: "Ghostty", href: "https://ghostty.org" }],
        note: "Replaced iTerm2 for me. Fast and pretty low maintenance so far.",
      },
      {
        label: "Multiplexer",
        values: [
          { name: "tmux", href: "https://github.com/tmux/tmux" },
          { name: "tmuxinator", href: "https://github.com/tmuxinator/tmuxinator" },
        ],
        note: "A session per project, so I can jump back in where I left off.",
      },
      {
        label: "Shell",
        values: [
          { name: "zsh", href: "https://www.zsh.org" },
          { name: "Oh My Zsh", href: "https://ohmyz.sh" },
        ],
        note: "Nothing fancy, a couple of plugins for git and autosuggestions.",
      },
      {
        label: "CLI",
        values: [
          { name: "fzf", href: "https://github.com/junegunn/fzf" },
          { name: "zoxide", href: "https://github.com/ajeetdsouza/zoxide" },
          { name: "ripgrep", href: "https://github.com/BurntSushi/ripgrep" },
          { name: "bat", href: "https://github.com/sharkdp/bat" },
          { name: "fd", href: "https://github.com/sharkdp/fd" },
          { name: "gh", href: "https://cli.github.com" },
        ],
        note: "zoxide and fzf for getting around, ripgrep whenever I need to find something.",
      },
      {
        label: "Dotfiles",
        values: [{ name: "chezmoi", href: "https://www.chezmoi.io" }],
        note: "Keeps the setup the same across my work and personal Macs.",
      },
    ],
  },
  {
    id: "stack",
    title: "Stack",
    items: [
      {
        label: "Frameworks",
        values: [
          { name: "React", href: "https://react.dev" },
          { name: "React Native", href: "https://reactnative.dev" },
          { name: "Expo", href: "https://expo.dev" },
          { name: "Next.js", href: "https://nextjs.org" },
          { name: "Astro", href: "https://astro.build" },
          { name: "Vue", href: "https://vuejs.org" },
        ],
        note: "React by default. Astro for content sites like this one, and Expo whenever it has to ship to a phone.",
      },
      {
        label: "Desktop",
        values: [{ name: "Electron", href: "https://www.electronjs.org" }],
        note: "For the desktop app work I’m doing at the moment.",
      },
      {
        label: "Data",
        values: [
          { name: "TanStack Query", href: "https://tanstack.com/query" },
          { name: "Zod", href: "https://zod.dev" },
        ],
        note: "Server state and validation sorted, so I can focus on the actual feature.",
      },
      {
        label: "Styling",
        values: [{ name: "Tailwind", href: "https://tailwindcss.com" }],
        note: "Still my preferred way to style things, with colour tokens in OKLCH.",
      },
      {
        label: "Backend",
        values: [
          { name: "Node", href: "https://nodejs.org" },
          { name: "Hono", href: "https://hono.dev" },
          { name: "Convex", href: "https://www.convex.dev" },
        ],
        note: "Hono on Node for APIs. Convex when I want a real backend, not the client hitting the database directly.",
      },
      {
        label: "Testing",
        values: [{ name: "Vitest", href: "https://vitest.dev" }],
        note: "Fast and plays nicely with Vite, so not much config to look after.",
      },
      {
        label: "Tooling",
        values: [
          { name: "Vite", href: "https://vite.dev" },
          { name: "pnpm", href: "https://pnpm.io" },
          { name: "bun", href: "https://bun.sh" },
          { name: "Volta", href: "https://volta.sh" },
        ],
        note: "Volta keeps Node versions in check per project. pnpm or bun depending on the repo.",
      },
      {
        label: "Language",
        values: [{ name: "TypeScript", href: "https://www.typescriptlang.org" }],
        note: "Everywhere I can, even for the small stuff.",
      },
    ],
  },
  {
    id: "creative",
    title: "Creative",
    items: [
      {
        label: "2D",
        values: [{ name: "Canvas", href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" }],
        note: "The terrain on the home page is plain Canvas 2D, no library needed.",
      },
      {
        label: "3D",
        values: [{ name: "Three.js", href: "https://threejs.org" }],
        note: "My go-to for any 3D or visual stuff in the browser.",
      },
      {
        label: "Shaders",
        values: [{ name: "GLSL", href: "https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.html" }],
        note: "For shaders, when the GPU should be doing the heavy lifting.",
      },
      {
        label: "Data viz",
        values: [
          { name: "D3", href: "https://d3js.org" },
          { name: "Visx", href: "https://airbnb.io/visx" },
        ],
        note: "Visx when it lives in a React app, D3 when I need a bit more control.",
      },
      {
        label: "Audio",
        values: [
          { name: "Web Audio", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" },
          { name: "Tone.js", href: "https://tonejs.github.io" },
        ],
        note: "Old habit from my Sonic Arts PhD. Tone.js on top when I want to move a bit faster.",
      },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    items: [
      {
        label: "Browser",
        values: [{ name: "Helium", href: "https://helium.computer" }],
        note: "Chromium underneath, with a lot less in the way.",
      },
      {
        label: "Launcher",
        values: [{ name: "Raycast", href: "https://www.raycast.com" }],
        note: "My Spotlight replacement, plus clipboard history, window management and the emoji picker.",
      },
      {
        label: "Containers",
        values: [{ name: "OrbStack", href: "https://orbstack.dev" }],
        note: "Lighter than Docker Desktop and starts up a lot faster.",
      },
      {
        label: "Design",
        values: [{ name: "Figma", href: "https://www.figma.com" }],
        note: "Mostly in the browser, for mockups and checking designs.",
      },
      {
        label: "Screenshots",
        values: [{ name: "CleanShot X", href: "https://cleanshot.com" }],
        note: "Pretty much every screenshot and screen recording I take goes through it.",
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    items: [
      {
        label: "Machine",
        values: [{ name: "MacBook Pro", href: "https://www.apple.com/macbook-pro/" }],
        note: "Usually whatever work hands me. I’m pretty conservative on specs anyway.",
      },
      {
        label: "Keyboard",
        values: [
          { name: "Ergodox EZ", href: "https://ergodox-ez.com" },
          { name: "Moonlander", href: "https://www.zsa.io/moonlander" },
        ],
        note: "Ergodox at the desk, Moonlander when I’m on the go.",
      },
      {
        label: "Mouse",
        values: [{ name: "Logitech Lift", href: "https://www.logitech.com/products/mice/lift-vertical-ergonomic-mouse.html" }],
        note: "Vertical, so my wrist isn’t twisted all day.",
      },
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");
