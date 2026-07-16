---
title: Introduction
description: What the shared theme provides and how to adopt it.
---

`@xberg-io/docs-theme` wraps `@astrojs/starlight` with the xberg.io brand. Call `xbergStarlight()`
in your `astro.config.mjs` and pass the per-site bits (`title`, `githubUrl`, `sidebar`); the theme
supplies everything else.

## What you get

- Cream/deep-purple surfaces with Geist and Geist Mono, in both light and dark mode.
- Nav logo, favicon, and OG image pulled from the `xberg-io/assets` CDN.
- Canonical Google Analytics + Ads tags.
- `llms.txt` generation via `starlight-llms-txt`.

:::note
Brand assets resolve from jsDelivr (`@v1`). A brand refresh is a tag bump in `xberg-io/assets` —
no change needed in consuming repos.
:::

## Next

See the [components demo](/guides/components/) for how content renders under the theme.
