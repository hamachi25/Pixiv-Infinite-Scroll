import { i18n } from "#i18n";
import { settingsItem } from "@/utils/storage";

export default () => {
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
		<>
			<div className="relative flex justify-center gap-3 border-b border-[var(--border-noraml)] px-2 pb-2">
				<h1 className="mr-2 text-xl font-bold">Pixiv Infinite Scroll</h1>
				<a
					className="absolute right-3 self-end text-base text-[var(--text-pale)]"
					target="_blank"
					href={`https://github.com/hamachi25/Pixiv-Infinite-Scroll/releases/tag/${version}`}
				>
					v{version}
				</a>
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
		</>
	);
};
