import type { ProfileData } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	profileFetchData: ProfileData;
}

export const Profile = ({ profileFetchData }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<>
			<a
				href={`/users/${profileFetchData.userId}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				<img
					className="h-[64px] w-[64px] rounded-full object-cover object-[center_top]"
					src={profileFetchData.imageBig}
					alt={profileFetchData.name}
					title={profileFetchData.name}
				/>
			</a>
			<a
				className="mt-[4px] text-[16px] font-bold text-[var(--charcoal-text1)]"
				href={`/users/${profileFetchData.userId}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{profileFetchData.name}
			</a>
		</>
	);
};
