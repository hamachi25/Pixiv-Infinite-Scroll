import type { Work } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	profile: Work;
}

export const ProfileImage = ({ profile }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<a
			href={`/users/${profile.userId}`}
			title={profile.userName}
			target={settings?.openInNewTab ? "_blank" : undefined}
			rel="noreferrer"
		>
			<img
				className="h-[80px] w-[80px] rounded-full object-cover"
				src={profile.profileImageUrl}
				alt={profile.userName}
				width={80}
				height={80}
			/>
		</a>
	);
};
