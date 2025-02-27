import { defineCustomEventMessaging } from "@webext-core/messaging/page";
import type { TagMute, UserMute } from "@/types/storage";

type PisSettingsMessengerSchema = {
	muteSettings(data: null): { tags: TagMute[]; users: UserMute[]; isMute: boolean };
};

export const pisSettingsMessenger = defineCustomEventMessaging<PisSettingsMessengerSchema>({
	namespace: "pixiv-infinite-scroll-settings",
});
