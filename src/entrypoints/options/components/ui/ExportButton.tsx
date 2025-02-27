import { GoUpload } from "react-icons/go";

export const ExportButton = () => {
	const handleClick = async () => {
		const userMute = await userMuteSettings.getValue();
		const tagMute = await tagMuteSettings.getValue();
		const settingsJson = JSON.stringify({ userMute, tagMute });
		const blob = new Blob([settingsJson], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "pixiv-infinite-scroll-mute.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<button className="btn btn-outline" onClick={handleClick}>
			<GoUpload size={20} />
			{i18n.t("options.export")}
		</button>
	);
};
