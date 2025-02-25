import { GoDownload } from "react-icons/go";
import type { UserMute, TagMute } from "@/types/storage";

type FileType = {
	tagMute: TagMute[];
	userMute: UserMute[];
};

export const ImportButton = () => {
	const ref = useRef<HTMLInputElement>(null);

	const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = (event) => {
			const fileContent = event.target?.result;
			if (typeof fileContent === "string") {
				const jsonObject: FileType = JSON.parse(fileContent);
				tagMuteSettings.setValue(jsonObject.tagMute);
				userMuteSettings.setValue(jsonObject.userMute);
			}
		};
		reader.readAsText(file);
	};

	return (
		<>
			<button className="btn btn-outline" onClick={() => ref.current?.click()}>
				<GoDownload size={20} />
				{i18n.t("options.import")}
			</button>
			<input className="hidden" ref={ref} type="file" accept=".json" onChange={getFile} />
		</>
	);
};
