import type { StarlightUserConfig } from "@astrojs/starlight/types";

/** Options accepted by {@link xbergStarlightConfig}. */
export interface XbergStarlightOptions {
  /** Site title shown in the tab and (via `aria-label`) the nav logo. */
  title: string;
  /** Meta description / default social description. */
  description?: string;
  /** GitHub repo URL — drives the default social link. */
  githubUrl?: string;
  /** `editLink.baseUrl`, e.g. `https://github.com/xberg-io/<repo>/edit/main/docs-site/`. */
  editBaseUrl?: string;
  /** OG/Twitter card image URL. Defaults to the shared xberg OG card on jsDelivr. */
  ogImage?: string;
  /** GA4 measurement id. Defaults to the canonical shared property. */
  googleAnalyticsId?: string;
  /** Google Ads conversion id. Defaults to the canonical shared account. */
  googleAdsId?: string;
  /** Starlight sidebar config. */
  sidebar?: StarlightUserConfig["sidebar"];
  /** Starlight social links. Defaults to a single GitHub link from `githubUrl`. */
  social?: StarlightUserConfig["social"];
  /**
   * Starlight plugins, e.g. `starlightLlmsTxt()`. Import them in your own config
   * (Astro bundles them at load time) and pass the instances here.
   */
  plugins?: StarlightUserConfig["plugins"];
  /** Extra head tags, appended after the theme's favicon/OG/analytics tags. */
  head?: StarlightUserConfig["head"];
  /** Extra `customCss` entries, appended after the brand stylesheet. */
  customCss?: string[];
  /** Extra component overrides, merged over the theme's (theme wins on conflict keys it sets). */
  components?: StarlightUserConfig["components"];
  /** Escape hatch: arbitrary extra Starlight config (branding keys are locked). */
  starlight?: Partial<StarlightUserConfig>;
}

/**
 * Build a branded Starlight config for an xberg.io docs site. Wrap the result with
 * `starlight()` in your `astro.config`: `starlight(xbergStarlightConfig({ ... }))`.
 */
export function xbergStarlightConfig(options: XbergStarlightOptions): StarlightUserConfig;
export default xbergStarlightConfig;
