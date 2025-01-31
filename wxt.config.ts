import { defineConfig } from "wxt";

const perBrowserManifest: Record<string, any> = {
	firefox: {
		browser_specific_settings: {
			gecko: {
				id: "{d0f23639-e6dd-7728-a518-d98369de6998}",
			},
		},
	},
};

export default defineConfig({
	srcDir: "src",
	extensionApi: "chrome",
	modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	manifest: ({ browser }) => ({
		name: "Pixiv Infinite Scroll",
		description: "__MSG_extension_extDescription__",
		version: "2.0.2",
		default_locale: "en",
		permissions: ["storage"],
		web_accessible_resources: [
			{
				resources: ["getFetchRequest.js"],
				matches: ["https://www.pixiv.net/*"],
			},
		],
		...perBrowserManifest[browser],
	}),
});
