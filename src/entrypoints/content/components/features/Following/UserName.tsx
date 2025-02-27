import type { Work } from "@/types/works";
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
			rel="noreferrer"
		>
			{profile.userName}
		</a>
	);
};
