import { createContext } from "react";
import type { Settings } from "@/types/storage";
import { settingsItem } from "@/utils/storage";

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

	return (
		<SettingContext value={settings}>
			<CsrfContext value={csrfToken}>{children}</CsrfContext>
		</SettingContext>
	);
};
