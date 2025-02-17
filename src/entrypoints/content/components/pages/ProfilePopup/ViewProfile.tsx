import type { ProfileData } from "../../../type";
import { SettingContext } from "../../../context";

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
		>
			{i18n.t("profilePopup.view")}
		</a>
	);
};
