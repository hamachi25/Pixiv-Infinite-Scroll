import { defineCustomEventMessaging } from "@webext-core/messaging/page";
import type { UserMute, UserWorks, Settings } from "@/types/type";

export type PisFetchMessengerSchema = {
	firstPageRequest(data: null): { apiUrl: string; userWorks: UserWorks };
};

export type PisSettingsMessengerSchema = {
	muteSettings(data: null): { tags: string[]; users: UserMute[]; isMute: boolean };
};

export const pisFetchMessenger = defineCustomEventMessaging<PisFetchMessengerSchema>({
	namespace: "pixiv-infinite-scroll-fetch",
});

export const pisSettingsMessenger = defineCustomEventMessaging<PisSettingsMessengerSchema>({
	namespace: "pixiv-infinite-scroll-settings",
});
