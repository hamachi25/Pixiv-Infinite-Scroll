import { defineConfig } from "wxt";

export default defineConfig({
	srcDir: "src",
	extensionApi: "chrome",
	modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	manifest: {
		name: "Pixiv Infinite Scroll",
		description: "__MSG_extension_extDescription__",
		version: "2.0.1",
		default_locale: "en",
		permissions: ["storage"],
	},
});
