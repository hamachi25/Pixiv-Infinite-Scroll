import { i18n } from "#i18n";
import { settingsItem } from "@/utils/storage";
import { GoReport, GoLinkExternal } from "react-icons/go";

const formsLinks = {
	ja: "https://forms.gle/nWLZzi86qnWaAyEs7",
	en: "https://forms.gle/viWPDzAzzwkVxjD18",
};

const formsLink = navigator.language === "ja" ? formsLinks.ja : formsLinks.en;

export default () => {
	const [openInNewTab, setOpenInNewTab] = useState(false);
	const [isMute, setIsMute] = useState(false);
	const { version } = browser.runtime.getManifest();

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
		<>
			<div className="relative flex justify-between border-b border-[var(--border-noraml)] px-2 pb-2">
				<div className="flex gap-3">
					<h1 className="text-xl font-bold">Pixiv Infinite Scroll</h1>
					<a
						className="self-end text-base text-[var(--text-pale)]"
						target="_blank"
						href={`https://github.com/hamachi25/Pixiv-Infinite-Scroll/releases/tag/${version}`}
					>
						v{version}
					</a>
				</div>
				<div className="flex items-center">
					<div
						className="tooltip tooltip-left before:text-xs"
						data-tip={i18n.t("popup.report")}
					>
						<button>
							<a href={formsLink} target="_blank" className="text-[var(--text-pale)]">
								<GoReport size={21} />
							</a>
						</button>
					</div>
				</div>
			</div>
			<div className="form-control px-2 pb-0.5 pt-3">
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
				<button className="btn h-11 min-h-11 p-0">
					<a
						className="flex h-full w-full items-center justify-center gap-1"
						href={browser.runtime.getURL("/options.html")}
						target="_blank"
					>
						{i18n.t("popup.mute.button")}
						<GoLinkExternal size={14} />
					</a>
				</button>
			</div>
		</>
	);
};
