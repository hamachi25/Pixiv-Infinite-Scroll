import { settingsItem } from "@/utils/storage";
import { GoLinkExternal } from "react-icons/go";
import { Header } from "./components/Header";
import { ToggleSetting } from "./components/ToggleSetting";
import { getBrowserInfo } from "./utils/getBrowserInfo";
import { createFormsLink } from "./utils/createFormsLink";

const lang = browser.i18n.getUILanguage();
const { version } = browser.runtime.getManifest();
const browserInfo = getBrowserInfo();
const formsLink = createFormsLink({ lang, version, browserInfo });
const isRTL = ["ar"].includes(lang);

const App = () => {
	const [openInNewTab, setOpenInNewTab] = useState(false);
	const [isMute, setIsMute] = useState(false);

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
			<Header version={version} isRTL={isRTL} formsLink={formsLink} />
			<ToggleSetting
				title={i18n.t("popup.openInNewTab.title")}
				detail={i18n.t("popup.openInNewTab.detail")}
				checked={openInNewTab}
				onChange={handleNewtabCheckbox}
			/>
			<ToggleSetting
				title={i18n.t("popup.mute.title")}
				detail={i18n.t("popup.mute.detail")}
				checked={isMute}
				onChange={handleMuteCheckbox}
			/>
			<div className="form-control px-2 pt-3 pb-1">
				<a
					className="btn h-11 w-full dark:border-gray-800/40 dark:bg-gray-800/40"
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
