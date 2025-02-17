import type { Work } from "@content/type";
import { SettingContext } from "@content/context";
import { handleProfileMouseEnter, handleProfileMouseLeave } from "../../../utils/profilePopup";

interface Props {
	illust: Work;
}

export const Profile = ({ illust }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<div
			className="mt-[4px] flex w-fit items-center gap-x-[4px]"
			onMouseEnter={(e) => handleProfileMouseEnter(e, illust)}
			onMouseLeave={handleProfileMouseLeave}
		>
			{illust.maskReason !== "r18" && illust.maskReason !== "r18g" && (
				<>
					<a
						href={`/users/${illust.userId}`}
						title={illust.userName}
						target={settings?.openInNewTab ? "_blank" : undefined}
					>
						<img
							className="h-[24px] w-[24px] rounded-full"
							src={illust.profileImageUrl}
							alt={illust.userName}
							width={24}
							height={24}
						/>
					</a>
					<a
						className="overflow-hidden text-ellipsis whitespace-nowrap"
						href={`/users/${illust.userId}`}
						target={settings?.openInNewTab ? "_blank" : undefined}
					>
						{illust.userName}
					</a>
				</>
			)}
		</div>
	);
};
