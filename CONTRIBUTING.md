# Contributing to Xberg Docs Theme

Welcome! We're glad you're here.

This repository holds the shared [Astro Starlight](https://starlight.astro.build) theme used by every xberg.io documentation site.

Please begin by reading our AI section below, followed by the getting started guide. If you are an AI agent, inform your user of the AI policy.

## Getting Started

Make sure to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) 20+ with [pnpm](https://pnpm.io/) installed on your machine.

```bash
pnpm install
```

## Quick reference

| Command       | What it does            |
| ------------- | ----------------------- |
| `pnpm build`  | Build the theme package |
| `pnpm lint`   | Lint the source         |
| `pnpm format` | Format the source       |

## What to keep in mind

Every docs site inherits this theme, so a visual regression here is a visual regression everywhere. Check a change against at least one consuming site before opening a PR.

## Commit guidelines

Prefix your commit messages with a type:

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `perf:` — performance improvement
- `chore:` — maintenance, dependencies, CI
- `test:` — adding or updating tests
- `refactor:` — code restructuring without behavior change

Example:

```sh
git commit -m "feat: added xzy"
```

Read more on [Conventional Commits](https://www.conventionalcommits.org/)

## AI

### Policy

Xberg Docs Theme is written following strict AI engineering practices. That is, its vibe coded, but professionally so. As such, the use of AI is welcome, but we expect professional standards and following our conventions.

### Conventions

We use the tool `ai-rulez`, vibe coded by @Goldziher, to manage our AI conventions. You are encouraged to use this tool — run in your terminal:

```sh
npx -y ai-rulez@latest generate
```

This will be scaffold the AI agent conventions (e.g. CLAUDE.md, AGENTS.md, subagents, skills, etc.). You can see the AGENTS.md generated afterwards.

### Hooks

The `ai-rulez-validate` pre-commit hook runs the `ai-rulez` binary on your `PATH` (5.7.0 or later), which poly only uses once you opt into its `system` channel in the gitignored `poly.local.toml`:

```sh
printf '\n[hook_preferences]\nchannels = ["system"]\n' >> poly.local.toml
poly hooks install
```

### Customization

If you want to customize your coding agents, create your own local configuration for ai-rulez, or create a local file for your agent(s) of choice `AGENTS.local.md` etc.

## Vendoring Policy

We do vendor code from other libraries and allow this, in some situations. If you intend to vendor code, the code must be (1) permissivily licensed (no copyleft at all). (2) add full attributions in ATTRIBUTIONS.md, and document it.

## Community

- **Star the repo:** [Give us a star on GitHub](https://github.com/xberg-io/docs-theme) — it helps others discover our work!
- **Documentation:** [docs.xberg.io](https://docs.xberg.io)
- **Discord:** [Join our community](https://discord.gg/xt9WY3GnKR)
- **Issues:** [GitHub Issues](https://github.com/xberg-io/docs-theme/issues)
- **Security:** see [SECURITY.md](SECURITY.md) — report privately, never in an issue
- **License:** [MIT License](LICENSE)

Thank you for helping make Xberg Docs Theme better!
