import type { Work } from "../../../type";
import { SettingContext } from "../../../context";

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
