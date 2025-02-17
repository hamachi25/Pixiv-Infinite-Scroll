import type { Work } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	profile: Work;
}

export const UserName = ({ profile }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<a
			className="font-bold"
			href={`/users/${profile.userId}`}
			target={settings?.openInNewTab ? "_blank" : undefined}
		>
			{profile.userName}
		</a>
	);
};
