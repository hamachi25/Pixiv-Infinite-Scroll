import { createContext } from "react";
import type { Settings } from "@/types/storage";
import { settingsItem } from "@/utils/storage";
import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";

interface HTMLAnchorElementWithHandleClick extends HTMLAnchorElement {
	_handleClick?: (e: MouseEvent) => void;
}

export const SettingContext = createContext<Settings | undefined>(undefined);
export const CsrfContext = createContext<React.RefObject<string | undefined>>({
	current: undefined,
});

export const Context = ({ children }: { children: React.ReactNode }) => {
	const [settings, setSettings] = useState<Settings | undefined>(undefined);
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
			<CsrfContext value={csrfToken}>{children}</CsrfContext>
		</SettingContext>
	);
};
