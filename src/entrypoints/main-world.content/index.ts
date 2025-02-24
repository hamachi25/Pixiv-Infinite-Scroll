export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	runAt: "document_start",

	async main() {
		await injectScript("/getFetchRequest.js", {
			keepInDom: true,
		});

		const settings = await settingsItem.getValue();
		const tags = await tagMuteSettings.getValue();
		const users = await userMuteSettings.getValue();

		pisSettingsMessenger.onMessage("muteSettings", () => {
			return { tags, users, isMute: settings.mute };
		});
	},
});
