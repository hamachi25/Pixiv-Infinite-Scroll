import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	extensionApi: "chrome",
	modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	manifest: {
		name: "Pixiv Infinite Scroll",
		description: "__MSG_description__",
		default_locale: "en",
		permissions: ["storage"],
		web_accessible_resources: [
			{
				resources: ["getFetchRequest.js"],
				matches: ["https://www.pixiv.net/*"],
			},
		],
	},
	alias: {
		"@content": "src/entrypoints/content",
	},
});
