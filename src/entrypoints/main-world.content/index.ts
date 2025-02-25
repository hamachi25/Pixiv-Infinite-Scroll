export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	runAt: "document_start",

	async main() {
		injectScript("/getFetchRequest.js", {
			keepInDom: true,
		});

		let [currentSettings, currentTags, currentUsers] = await Promise.all([
			settingsItem.getValue(),
			tagMuteSettings.getValue(),
			userMuteSettings.getValue(),
		]);

		settingsItem.watch((settings) => {
			currentSettings = settings;
		});
		tagMuteSettings.watch((tags) => {
			currentTags = tags;
		});
		userMuteSettings.watch((users) => {
			currentUsers = users;
		});

		pisSettingsMessenger.onMessage("muteSettings", () => {
			return { tags: currentTags, users: currentUsers, isMute: currentSettings.mute };
		});
	},
});
