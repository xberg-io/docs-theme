// This module is loaded by Astro's config loader as an external node_modules
// package, so it must import NOTHING with a TypeScript entry point (Node's
// strip-types loader rejects .ts under node_modules). It stays import-free:
// it only shapes a plain config object with string references that Vite/Starlight
// resolve later during the build. Plugins like starlight-llms-txt are added by
// the consumer's own config (where Astro bundles them), via the `plugins` option.

/**
 * @typedef {import("./index.d.ts").XbergStarlightOptions} XbergStarlightOptions
 */

const CDN = "https://cdn.jsdelivr.net/gh/xberg-io/assets@v1";

// Canonical Google Analytics IDs — shared across every xberg.io docs site.
// Override per-site only with an explicit business reason.
const DEFAULT_GA_ID = "G-8G4NQW55PF";
const DEFAULT_ADS_ID = "AW-17853694443";
const DEFAULT_OG_IMAGE = `${CDN}/social/open-graph-card.png`;

/** @param {string | undefined} gaId @param {string | undefined} adsId */
function analyticsHead(gaId, adsId) {
  if (!gaId) return [];
  const ids = [gaId, adsId].filter(Boolean);
  const config = ids.map((id) => `gtag('config','${id}');`).join("");
  return [
    { tag: "script", attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` } },
    {
      tag: "script",
      content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${config}`,
    },
  ];
}

function faviconHead() {
  return [
    { tag: "link", attrs: { rel: "icon", href: `${CDN}/favicon/favicon.ico`, sizes: "any" } },
    { tag: "link", attrs: { rel: "icon", type: "image/svg+xml", href: `${CDN}/docs/app-icon.svg` } },
    {
      tag: "link",
      attrs: { rel: "icon", type: "image/png", sizes: "32x32", href: `${CDN}/favicon/favicon-32x32.png` },
    },
    { tag: "link", attrs: { rel: "apple-touch-icon", href: `${CDN}/favicon/apple-touch-icon-180x180.png` } },
  ];
}

/** @param {string} ogImage */
function socialHead(ogImage) {
  return [
    { tag: "meta", attrs: { property: "og:image", content: ogImage } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:image", content: ogImage } },
  ];
}

/**
 * Build a Starlight config carrying the shared xberg.io brand: navy/cyan/blue/purple
 * palette, Exo 2, CDN logos/favicons, canonical Google Analytics, and OG defaults.
 * Wrap the result with `starlight()` in your `astro.config`:
 *
 * ```js
 * import starlight from "@astrojs/starlight";
 * import starlightLlmsTxt from "starlight-llms-txt";
 * import { xbergStarlightConfig } from "@xberg-io/docs-theme";
 *
 * export default defineConfig({
 *   site: "https://docs.crawlberg.xberg.io",
 *   integrations: [starlight(xbergStarlightConfig({
 *     title: "crawlberg",
 *     githubUrl: "https://github.com/xberg-io/crawlberg",
 *     sidebar: [...],
 *     plugins: [starlightLlmsTxt()],
 *   }))],
 * });
 * ```
 *
 * The consumer imports `starlight` (and any Starlight plugins) directly, so Astro
 * bundles them during config load. This helper only shapes the config object; it
 * imports nothing, so no TypeScript-entry package is pulled through node_modules.
 *
 * @param {XbergStarlightOptions} options
 */
export function xbergStarlightConfig(options) {
  const {
    title,
    description,
    githubUrl,
    editBaseUrl,
    ogImage = DEFAULT_OG_IMAGE,
    googleAnalyticsId = DEFAULT_GA_ID,
    googleAdsId = DEFAULT_ADS_ID,
    sidebar,
    social,
    plugins = [],
    head = [],
    customCss = [],
    components = {},
    starlight: starlightOverrides = {},
  } = options;

  const resolvedSocial = social ?? (githubUrl ? [{ icon: "github", label: "GitHub", href: githubUrl }] : []);

  return {
    // Escape hatch first, so branding below always wins.
    ...starlightOverrides,
    title,
    ...(description ? { description } : {}),
    social: resolvedSocial,
    ...(editBaseUrl ? { editLink: { baseUrl: editBaseUrl } } : {}),
    customCss: ["@xberg-io/docs-theme/styles/brand.css", ...customCss],
    components: { SiteTitle: "@xberg-io/docs-theme/components/SiteTitle.astro", ...components },
    head: [...faviconHead(), ...socialHead(ogImage), ...analyticsHead(googleAnalyticsId, googleAdsId), ...head],
    ...(plugins.length ? { plugins } : {}),
    ...(sidebar ? { sidebar } : {}),
  };
}

export default xbergStarlightConfig;
