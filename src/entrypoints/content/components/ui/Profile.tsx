import type { Work, NovelType } from "../../type";
import { SettingContext, ProfilePopupContext } from "../../context";
import { handleProfileMouseEnter, handleProfileMouseLeave } from "../../utils/profilePopup";

interface IllustProfileProps {
	illust: Work;
}

export const IllustProfile = ({ illust }: IllustProfileProps) => {
	const mouseEnterTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

	const settings = useContext(SettingContext);
	const profilePopupData = useContext(ProfilePopupContext);

	return (
		<div
			className="mt-[4px] flex w-fit items-center gap-x-[4px]"
			onMouseEnter={(e) =>
				handleProfileMouseEnter(e, illust, {
					mouseEnterTimeout,
					profilePopupData,
				})
			}
			onMouseLeave={() =>
				handleProfileMouseLeave({
					mouseEnterTimeout,
					profilePopupData,
				})
			}
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

interface NovelProfileProps {
	novel: Work;
	type: NovelType;
}

export const NovelProfile = ({ novel, type }: NovelProfileProps) => {
	const mouseEnterTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

	const settings = useContext(SettingContext);
	const profilePopupData = useContext(ProfilePopupContext);

	return (
		<div
			className="flex w-fit gap-[4px]"
			onMouseEnter={(e) =>
				handleProfileMouseEnter(e, novel, {
					mouseEnterTimeout,
					profilePopupData,
				})
			}
			onMouseLeave={() =>
				handleProfileMouseLeave({
					mouseEnterTimeout,
					profilePopupData,
				})
			}
		>
			{type !== "bookmark" && (
				<a
					className="my-auto"
					href={`/users/${novel.userId}`}
					title={novel.userName}
					target={settings?.openInNewTab ? "_blank" : undefined}
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
				className={`${type === "bookmark" ? "text-[14px]" : "text-[12px]"} overflow-hidden text-ellipsis whitespace-nowrap text-[var(--charcoal-text2)]`}
				href={`/users/${novel.userId}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{novel.userName}
			</a>
		</div>
	);
};
