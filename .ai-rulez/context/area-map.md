---
type: Concept
title: Area Map
x-ai-rulez:
  kind: context
  id: area-map
  metadata:
    priority: high
---

## Area Map

`@xberg-io/docs-theme`: `xbergStarlightConfig()` (`index.mjs`), `src/styles/brand.css` and `src/components/SiteTitle.astro`. `example/` is a workspace site for trying changes.

- `package.json` `exports` are the public interface every docs site imports.
- Consumers pin `^0.4.1`, which on 0.x takes patches only: a minor bump reaches no site until `docs-site/package.json` is bumped in crawlberg, html-to-markdown, liter-llm, sceptre, sdks, tree-sitter-language-pack, xberg and xberg-enterprise.
- Publishing: a published GitHub release runs `publish.yaml` (`workflow_dispatch` defaults to dry-run). It skips without error when the `package.json` version is already on npm, so bump the version before releasing.
- Brand files load from `cdn.jsdelivr.net/gh/xberg-io/assets@v1.0.0`.
