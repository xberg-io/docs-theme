# @xberg-io/docs-theme

Shared [Astro Starlight](https://starlight.astro.build) theme for xberg.io documentation sites.
One versioned package carries the brand — navy/cyan/blue/purple palette, Exo 2, CDN logos and
favicons, canonical Google Analytics, Open Graph defaults, and `llms.txt` generation — so every
repo's docs stay consistent without copying assets around.

## Install

```sh
pnpm add @xberg-io/docs-theme @astrojs/starlight astro starlight-llms-txt
```

`astro` and `@astrojs/starlight` are peer dependencies. The theme itself has **no runtime
dependencies** and no build step — it ships `.astro`/CSS source plus a plain config helper.

## Usage

```js
// docs-site/astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";
import { xbergStarlightConfig } from "@xberg-io/docs-theme";

export default defineConfig({
  site: "https://docs.crawlberg.xberg.io",
  integrations: [
    starlight(
      xbergStarlightConfig({
        title: "crawlberg",
        description: "Web crawling and scraping with HTML→Markdown and headless-Chrome fallback.",
        githubUrl: "https://github.com/xberg-io/crawlberg",
        editBaseUrl: "https://github.com/xberg-io/crawlberg/edit/main/docs-site/",
        plugins: [starlightLlmsTxt({ promote: ["index*", "get-started/**"] })],
        sidebar: [
          { label: "Home", link: "/" },
          { label: "Get Started", items: [{ autogenerate: { directory: "get-started" } }] },
          { label: "Guides", items: [{ autogenerate: { directory: "guides" } }] },
          { label: "Concepts", items: [{ autogenerate: { directory: "concepts" } }] },
          { label: "Reference", items: [{ autogenerate: { directory: "reference" } }] },
        ],
      }),
    ),
  ],
});
```

`xbergStarlightConfig()` returns a Starlight config object; you wrap it with `starlight()`. It bakes
in the brand stylesheet, the CDN logo (`SiteTitle` override), and the favicon/OG/GA/Ads head tags.

> **Why not a single `xbergStarlight()` wrapper?** Astro loads `astro.config` as an external
> node_modules module, and Node's type-stripping loader rejects the `.ts` entry points that both
> `@astrojs/starlight` and `starlight-llms-txt` ship. Importing `starlight` (and plugins) in *your*
> config lets Astro bundle them; the theme stays import-free and just shapes the config object.

## Options

| Option              | Default                                   | Notes                                             |
| ------------------- | ----------------------------------------- | ------------------------------------------------- |
| `title` (required)  | —                                         | Tab title + nav logo `aria-label`.                |
| `description`       | —                                         | Meta / social description.                        |
| `githubUrl`         | —                                         | Drives the default GitHub social link.            |
| `editBaseUrl`       | —                                         | `editLink.baseUrl`.                               |
| `ogImage`           | shared OG card on jsDelivr                 | OG/Twitter image URL.                             |
| `googleAnalyticsId` | `G-8G4NQW55PF`                            | Canonical shared GA4 property.                    |
| `googleAdsId`       | `AW-17853694443`                          | Canonical shared Ads account.                     |
| `sidebar`           | —                                         | Starlight sidebar.                                |
| `social`            | GitHub from `githubUrl`                    | Starlight social links.                           |
| `plugins`           | `[]`                                      | Starlight plugin instances, e.g. `starlightLlmsTxt()`. |
| `head` / `customCss` / `components` | —                         | Appended/merged after the theme's own.            |
| `starlight`         | —                                         | Escape hatch for extra Starlight config.          |

Brand assets are pulled from [`xberg-io/assets`](https://github.com/xberg-io/assets) via jsDelivr
(`@v1`); nothing is bundled, so a brand refresh is a tag bump there.

## Develop

```sh
pnpm install
pnpm --dir example dev     # runs the example site against the local theme
pnpm --dir example build
```

## Publish

First publish is manual (`scripts/first-publish.sh`); thereafter cut a GitHub Release and
`.github/workflows/publish.yaml` publishes with OIDC Trusted Publishing + provenance.

## License

MIT © Kreuzberg, Inc.
