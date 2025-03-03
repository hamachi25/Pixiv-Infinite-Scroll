import type { ProfileData } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	profileFetchData: ProfileData;
}

export const BackgroundImage = ({ profileFetchData }: Props) => {
	const settings = useContext(SettingContext);

	return (
		profileFetchData.background?.url && (
			<a
				className="-mt-[24px] -mb-[64px] h-[168px] w-full"
				href={`/users/${profileFetchData.userId}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
				rel="noreferrer"
			>
				<div
					className="flex h-full w-full items-end rounded-t-[8px] bg-cover bg-[center_top] after:block after:h-[64px] after:w-full after:bg-[linear-gradient(rgba(0,0,0,0)_0%,var(--charcoal-surface1)_100%)] after:content-['']"
					style={{ backgroundImage: `url(${profileFetchData.background.url})` }}
				/>
			</a>
		)
	);
};
