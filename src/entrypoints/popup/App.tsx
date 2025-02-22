import { settingsItem } from "@/utils/storage";
import { GoReport } from "react-icons/go";

const formsLinks = {
	ja: "https://forms.gle/nWLZzi86qnWaAyEs7",
	en: "https://forms.gle/viWPDzAzzwkVxjD18",
};

const lang = browser.i18n.getUILanguage();
const formsLink = lang === "ja" ? formsLinks.ja : formsLinks.en;
const isRTL = ["ar", "he", "fa", "ps", "ur", "sd"].includes(lang);

const App = () => {
	const [isChecked, setIsChecked] = useState(false);
	const { version } = browser.runtime.getManifest();

	const handleCheckboxChange = () => {
		setIsChecked((prev) => !prev);
		settingsItem.setValue({ openInNewTab: !isChecked });
	};

	useEffect(() => {
		settingsItem.getValue().then((settings) => {
			setIsChecked(settings.openInNewTab);
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
						<button>
							<a
								href={formsLink}
								target="_blank"
								className="text-[var(--text-pale)]"
								rel="noreferrer"
							>
								<GoReport size={21} />
							</a>
						</button>
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
						checked={isChecked}
						onChange={handleCheckboxChange}
					/>
				</label>
			</div>
		</div>
	);
};
export default App;
