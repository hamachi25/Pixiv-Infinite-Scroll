import type { NovelType } from "@content/type";
import type { Work } from "@/types/works";
import { SettingContext } from "@content/context";
import { handleProfileMouseEnter, handleProfileMouseLeave } from "../../../utils/profilePopup";

interface Props {
	novel: Work;
	type: NovelType;
}

export const Profile = ({ novel, type }: Props) => {
	const settings = useContext(SettingContext);
	return (
		<div
			className="flex w-fit gap-[4px]"
			onMouseEnter={(e) => handleProfileMouseEnter(e, novel)}
			onMouseLeave={handleProfileMouseLeave}
		>
			{type !== "bookmark" && (
				<a
					className="my-auto"
					href={`/users/${novel.userId}`}
					title={novel.userName}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					<img
						className="h-[16px] w-[16px] rounded-full object-cover"
						src={novel.profileImageUrl}
						alt={novel.userName}
						width={16}
						height={16}
					/>
				</a>
			)}
			<a
				className={`${type === "bookmark" ? "text-[14px]" : "text-[12px]"} overflow-hidden text-ellipsis whitespace-nowrap text-(--charcoal-text2)`}
				href={`/users/${novel.userId}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
				rel="noreferrer"
			>
				{novel.userName}
			</a>
		</div>
	);
};
