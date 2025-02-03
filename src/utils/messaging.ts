import { defineCustomEventMessaging } from "@webext-core/messaging/page";
import type { UserMute, UserWorks, Work } from "@/types/type";

type PisFetchMessengerSchema = {
	firstPageRequest(data: null): {
		apiUrl: string | undefined;
		userWorks: UserWorks;
		firstPageWorks: Work[];
	};
};

export const pisFetchMessenger = defineCustomEventMessaging<PisFetchMessengerSchema>({
	namespace: "pixiv-infinite-scroll-fetch",
});

type PisSettingsMessengerSchema = {
	muteSettings(data: null): { tags: string[]; users: UserMute[]; isMute: boolean };
};

export const pisSettingsMessenger = defineCustomEventMessaging<PisSettingsMessengerSchema>({
	namespace: "pixiv-infinite-scroll-settings",
});
