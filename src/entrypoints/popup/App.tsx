import { settingsItem } from "@/utils/storage";
import { GoReport, GoLinkExternal } from "react-icons/go";
import { getBrowserInfo } from "./utils/getBrowserInfo";
import { getFormsUrl } from "./utils/getFormsUrl";

const App = () => {
	const [openInNewTab, setOpenInNewTab] = useState(false);
	const [isMute, setIsMute] = useState(false);

	const lang = browser.i18n.getUILanguage();
	const isRTL = ["ar"].includes(lang);

	const { version } = browser.runtime.getManifest();
	const browserInfo = getBrowserInfo();
	const formsUrl = getFormsUrl(browserInfo, lang, version);

	const handleNewtabCheckbox = () => {
		setOpenInNewTab((prev) => {
			settingsItem.setValue({ openInNewTab: !prev, mute: isMute });
			return !prev;
		});
	};

	const handleMuteCheckbox = () => {
		setIsMute((prev) => {
			settingsItem.setValue({ openInNewTab, mute: !prev });
			return !prev;
		});
	};

	useEffect(() => {
		settingsItem.getValue().then((settings) => {
			setOpenInNewTab(settings.openInNewTab);
			setIsMute(settings.mute);
		});
	}, []);

	return (
		<div dir={isRTL ? "rtl" : "ltr"}>
			<div className="relative flex justify-between border-b border-[var(--border-noraml)] px-2 pb-2">
				<div className="flex gap-3">
					<h1 className="text-xl font-bold">Pixiv Infinite Scroll</h1>
					<a
						className="self-end text-base text-[var(--text-pale)]"
						target="_blank"
						href={`https://github.com/hamachi25/Pixiv-Infinite-Scroll/releases/tag/${version}`}
						rel="noreferrer"
					>
						v{version}
					</a>
				</div>
				<div className="flex items-center">
					<div
						className={`tooltip before:text-xs ${isRTL ? "tooltip-right" : "tooltip-left"}`}
						data-tip={i18n.t("popup.report")}
					>
						<a
							className="text-[var(--text-pale)]"
							href={formsUrl}
							target="_blank"
							rel="noreferrer"
						>
							<GoReport size={21} />
						</a>
					</div>
				</div>
			</div>
			<div className="form-control gap-2 px-2 pb-0.5 pt-3">
				<label className="label cursor-pointer justify-between gap-4">
					<span className="label-text text-[var(--text-normal)]">
						{i18n.t("popup.openInNewTab.title")}
						<span className="block text-xs text-[var(--text-pale)]">
							{i18n.t("popup.openInNewTab.detail")}
						</span>
					</span>
					<input
						type="checkbox"
						className="toggle checked:text-[var(--pixiv-blue)]"
						checked={openInNewTab}
						onChange={handleNewtabCheckbox}
					/>
				</label>
			</div>
			<div className="form-control px-2 pb-0.5 pt-3">
				<label className="label cursor-pointer justify-between gap-4">
					<span className="label-text text-[var(--text-normal)]">
						{i18n.t("popup.mute.title")}
						<span className="block text-xs text-[var(--text-pale)]">
							{i18n.t("popup.mute.detail")}
						</span>
					</span>
					<input
						type="checkbox"
						className="toggle checked:text-[var(--pixiv-blue)]"
						checked={isMute}
						onChange={handleMuteCheckbox}
					/>
				</label>
				<a
					className="p-0flex btn h-11 min-h-11 w-full items-center justify-center gap-1"
					href={browser.runtime.getURL("/options.html")}
					target="_blank"
					rel="noreferrer"
				>
					{i18n.t("popup.mute.button")}
					<GoLinkExternal size={14} />
				</a>
			</div>
		</div>
	);
};
export default App;
