---
title: Components demo
description: How admonitions, tables, and code render under the theme.
---

A grab-bag of Starlight content, so we can eyeball the theme while developing it.

## Admonitions

:::tip
Cyan accents in dark mode; purple in light mode — matching the Zensical convention.
:::

:::caution
Tables are rendered denser than Starlight's default, since reference pages are table-heavy.
:::

:::danger
Destructive things look like this.
:::

## Table

| Option        | Default          | Notes                        |
| ------------- | ---------------- | ---------------------------- |
| `title`       | —                | Required.                    |
| `googleAdsId` | `AW-17853694443` | Canonical shared account.    |
| `llmsTxt`     | `{}`             | Set `false` to disable.      |

## Code

```ts
import { xbergStarlight } from "@xberg-io/docs-theme";

export default {
	integrations: [xbergStarlight({ title: "my-site", githubUrl: "https://github.com/xberg-io/my-site" })],
};
```
