import { createContext } from "react";
import type { Settings, TagMute, UserMute } from "@/types/storage";
import { settingsItem } from "@/utils/storage";
import { fetchOrigin } from "./fetch/fetch";
import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { extractCsrfToken, extractIsSensitive } from "./utils/extractDataFromOrigin";
import { PAGE_REGEX } from "@/constants/urlRegex";

interface HTMLAnchorElementWithHandleClick extends HTMLAnchorElement {
	_handleClick?: (e: MouseEvent) => void;
}

export const SettingContext = createContext<Settings | undefined>(undefined);
export const MuteContext = createContext<{
	isMute: boolean;
	tags: TagMute[];
	users: UserMute[];
}>({
	isMute: false,
	tags: [],
	users: [],
});
export const SensitiveContext = createContext<boolean>(false);
export const CsrfContext = createContext<React.RefObject<string | undefined>>({
	current: undefined,
});

export const Context = ({ children }: { children: React.ReactNode }) => {
	const [settings, setSettings] = useState<Settings>({ openInNewTab: false, mute: false });
	const [tagMute, setTagMute] = useState<string[]>(["null"]);
	const [userMute, setUserMute] = useState<UserMute[]>([]);
	const [isSensitive, setIsSensitive] = useState<boolean>(false);
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

	// ミュート設定
	useEffect(() => {
		tagMuteSettings.getValue().then((tags) => {
			setTagMute(tags);
		});

		const unwatch = tagMuteSettings.watch((tags) => {
			if (tags) setTagMute(tags);
		});
		return () => unwatch();
	}, []);
	useEffect(() => {
		userMuteSettings.getValue().then((users) => {
			if (users.length > 0) setUserMute(users);
		});

		const unwatch = userMuteSettings.watch((users) => {
			if (users) setUserMute(users);
		});
		return () => unwatch();
	}, []);

	// センシティブ作品の表示設定を取得
	useEffect(() => {
		const pathname = location.pathname;
		if (!PAGE_REGEX.newIllust.test(pathname) && !PAGE_REGEX.bookmarkIllust.test(pathname)) {
			return;
		}

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
		if (!anchor) return;
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
			<MuteContext value={{ isMute: settings.mute, tags: tagMute, users: userMute }}>
				<SensitiveContext value={isSensitive}>
					<CsrfContext value={csrfToken}>{children}</CsrfContext>
				</SensitiveContext>
			</MuteContext>
		</SettingContext>
	);
};
