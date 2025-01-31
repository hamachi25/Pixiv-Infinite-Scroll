import type { Settings, UserMute } from "@/types/type";

export const settingsItem = storage.defineItem<Settings>("local:settings", {
	fallback: {
		openInNewTab: false,
		mute: false,
	},
	version: 1,
});

export const tagMuteSettings = storage.defineItem<string[]>("sync:tagMute", {
	fallback: [],
	version: 1,
});

export const userMuteSettings = storage.defineItem<UserMute[]>("sync:userMute", {
	fallback: [],
	version: 1,
});
