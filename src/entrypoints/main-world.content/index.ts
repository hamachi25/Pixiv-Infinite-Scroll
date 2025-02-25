export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	runAt: "document_start",

	async main() {
		let currentSettings = await settingsItem.getValue();
		let currentTags = await tagMuteSettings.getValue();
		let currentUsers = await userMuteSettings.getValue();

		settingsItem.watch((settings) => {
			currentSettings = settings;
		});
		tagMuteSettings.watch((tags) => {
			currentTags = tags;
		});
		userMuteSettings.watch((users) => {
			currentUsers = users;
		});

		await injectScript("/getFetchRequest.js", {
			keepInDom: true,
		});

		pisSettingsMessenger.onMessage("muteSettings", () => {
			return { tags: currentTags, users: currentUsers, isMute: currentSettings.mute };
		});
	},
});
