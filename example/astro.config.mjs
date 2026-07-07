// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";
import { xbergStarlightConfig } from "@xberg-io/docs-theme";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.xberg.io",
	integrations: [
		starlight(
			xbergStarlightConfig({
				title: "docs-theme",
				description: "Live preview of the shared @xberg-io/docs-theme.",
				githubUrl: "https://github.com/xberg-io/docs-theme",
				editBaseUrl: "https://github.com/xberg-io/docs-theme/edit/main/example/",
				plugins: [starlightLlmsTxt()],
				sidebar: [
					{ label: "Home", link: "/" },
					{ label: "Get Started", items: [{ autogenerate: { directory: "get-started" } }] },
					{ label: "Guides", items: [{ autogenerate: { directory: "guides" } }] },
				],
			}),
		),
	],
});
