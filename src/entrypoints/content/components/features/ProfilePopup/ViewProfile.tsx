import type { ProfileData } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	profileFetchData: ProfileData;
}

export const ViewProfile = ({ profileFetchData }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<a
			className="text-[var(--charcoal-text3)]"
			href={`/users/${profileFetchData.userId}`}
			target={settings?.openInNewTab ? "_blank" : undefined}
			rel="noreferrer"
		>
			{i18n.t("profilePopup.view")}
		</a>
	);
};
