import type { Work } from "../../../type";
import { SettingContext } from "../../../context";

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
