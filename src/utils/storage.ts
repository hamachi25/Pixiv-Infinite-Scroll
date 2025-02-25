import type { Settings, TagMute, UserMute } from "@/types/storage";

export const settingsItem = storage.defineItem<Settings>("local:settings", {
	fallback: {
		openInNewTab: false,
		mute: false,
	},
	version: 1,
});

export const tagMuteSettings = storage.defineItem<TagMute[]>("local:tagMute", {
	fallback: [],
	version: 1,
});

export const userMuteSettings = storage.defineItem<UserMute[]>("local:userMute", {
	fallback: [],
	version: 1,
});
