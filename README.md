# jpyepez.com

The source for [jpyepez.com](https://jpyepez.com), JP Yepez's engineering portfolio, with writing and a creative-coding lab.

Built with Astro 5, Tailwind 4 and daisyUI 5, and deployed to Vercel.

## Commands

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Start the dev server at `localhost:4321` |
| `bun run build` | Build the site to `dist/` |
| `bun run preview` | Serve the build locally |
| `bun run lint` | Lint with oxlint |
| `bun run typecheck` | Run `astro check` |
| `bun run test` | Unit tests |
| `bun run test:e2e` | Playwright smoke tests against the built site |
| `bun run og` | Render `public/og.png` (the 1200×630 social image) from the home page's name, role and tagline, using headless Chrome (needs Chrome installed). Run it after changing that copy |

The contact form needs a `WEB3FORMS_ACCESS_KEY` in `.env` to send.

## Docs

- [Architecture](docs/architecture.md): folder layout, content model, styling
- [Testing strategy](docs/testing-strategy.md)
- [Git workflow](docs/git-workflow.md)
- [Glossary](GLOSSARY.md), [ADRs](docs/adr/) and the page design records in `docs/*-design.md`

Most changes are made with AI agents. Their working docs are in [`CLAUDE.md`](CLAUDE.md) and [`docs/agents/`](docs/agents/).

## License

No license is granted. The code is public to read, but all rights are reserved.
