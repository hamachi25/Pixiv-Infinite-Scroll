import type { Settings } from "@/types/storage";

export const settingsItem = storage.defineItem<Settings>("local:settings", {
	fallback: {
		openInNewTab: false,
	},
	version: 1,
});
