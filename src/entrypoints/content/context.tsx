import { createContext } from "react";
import type { Settings } from "@/types/storage";
import type { ProfilePopupType } from "@/types/content";
import { settingsItem } from "@/utils/storage";
import { fetchOrigin } from "./fetch/fetch";
import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { extractCsrfToken, extractIsSensitive } from "./utils/extractDataFromOrigin";
import { PAGE_REGEX } from "./constants/urlRegex";

interface HTMLAnchorElementWithHandleClick extends HTMLAnchorElement {
	_handleClick?: (e: MouseEvent) => void;
}

export const SettingContext = createContext<Settings | undefined>(undefined);
export const SensitiveContext = createContext<boolean>(false);
export const ProfilePopupContext = createContext<ProfilePopupType | undefined>(undefined);
export const SetProfilePopupContext = createContext<
	React.Dispatch<React.SetStateAction<ProfilePopupType | undefined>> | undefined
>(undefined);
export const HoverTimeoutContext = createContext<NodeJS.Timeout | undefined>(undefined);
export const SetHoverTimeouContext = createContext<
	React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>> | undefined
>(undefined);
export const CsrfContext = createContext<React.RefObject<string | undefined>>({
	current: undefined,
});

export const Context = ({ children }: { children: React.ReactNode }) => {
	const [settings, setSettings] = useState<Settings | undefined>(undefined);
	const [isSensitive, setIsSensitive] = useState<boolean>(false);
	const [profilePopup, setProfilePopup] = useState<ProfilePopupType | undefined>(undefined);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
	const csrfToken = useRef<string | undefined>(undefined);

	useEffect(() => {
		settingsItem.getValue().then((settings) => {
			if (settings) setSettings(settings);
		});

		const unwatch = settingsItem.watch((settings) => {
			if (settings) setSettings(settings);
		});
		return () => unwatch();
	}, []);

	// センシティブ作品の表示設定を取得
	useEffect(() => {
		const pathname = location.pathname;
		if (!PAGE_REGEX.newIllust.test(pathname) && !PAGE_REGEX.bookmarkIllust.test(pathname))
			return;

		fetchOrigin().then((html) => {
			const token = extractCsrfToken(html);
			const isSensitive = extractIsSensitive(html);

			if (token) csrfToken.current = token;
			if (isSensitive) setIsSensitive(true);
		});
	}, []);

	// リンクを新規タブで開く
	useEffect(() => {
		const anchor = getElementSelectorByUrl(location);
		const firstPageElement = document.querySelector(anchor);
		if (!firstPageElement) return;

		const links = firstPageElement.querySelectorAll<HTMLAnchorElementWithHandleClick>("a");

		if (settings?.openInNewTab) {
			links.forEach((link) => {
				const handleClick = (e: MouseEvent) => {
					e.stopPropagation();
				};
				link.addEventListener("click", handleClick);
				link.setAttribute("target", "_blank");

				link._handleClick = handleClick;
			});
		} else {
			links.forEach((link) => {
				if (link._handleClick) {
					link.removeEventListener("click", link._handleClick);
					delete link._handleClick;
				}
				link.removeAttribute("target");
			});
		}
	}, [settings]);

	return (
		<SettingContext value={settings}>
			<SensitiveContext value={isSensitive}>
				<ProfilePopupContext value={profilePopup}>
					<SetProfilePopupContext value={setProfilePopup}>
						<HoverTimeoutContext value={hoverTimeout}>
							<SetHoverTimeouContext value={setHoverTimeout}>
								<CsrfContext value={csrfToken}>{children}</CsrfContext>
							</SetHoverTimeouContext>
						</HoverTimeoutContext>
					</SetProfilePopupContext>
				</ProfilePopupContext>
			</SensitiveContext>
		</SettingContext>
	);
};
