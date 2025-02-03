import type { Work } from "../../type";
import { NovelItem } from "../NovelItem";
import { GridImage } from "../GridImage";
import { BookmarkButton } from "../ui/BookmarkButton";
import { FollowButton } from "../ui/FollowButton";
import { RequestMark } from "../ui/RequestMark";
import { SettingContext } from "../../context";

interface Props {
	profiles: Work[];
}

export const Following = ({ profiles }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<>
			{profiles.map((profile) => {
				const comment = profile.userComment;
				const displaySingleNovelItem =
					profile.illusts &&
					profile.illusts.length >= 1 &&
					profile.illusts.length <= 2 &&
					profile.novels &&
					profile.novels.length >= 1;

				return (
					<div
						key={profile.userId}
						className="border-b border-[var(--charcoal-border-default)] py-[24px]"
					>
						<div className="flex">
							{/* プロフィール */}
							<div className="w-[392px] flex-[0_0_auto]">
								<div className="flex">
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
									<div className="ml-[16px] flex-[1_1_0%]">
										<a
											className="font-bold"
											href={`/users/${profile.userId}`}
											target={settings?.openInNewTab ? "_blank" : undefined}
										>
											{profile.userName}
										</a>

										{/* リクエスト */}
										{profile.commission && <RequestMark profile={profile} />}

										{comment && (
											<div className="mt-[16px] break-all text-[12px]">
												{comment?.length > 99
													? `${comment.substring(0, 99)}…`
													: comment}
											</div>
										)}
										<FollowButton userId={profile.userId} />
									</div>
								</div>
							</div>

							{/* 作品 */}
							<div className="ml-[24px] w-[calc((var(--columns)-4)*80px+(var(--columns)-5)*24px)]">
								<div className="following-blur -mr-[72px] overflow-hidden">
									<ul className="flex gap-[24px]">
										{/* イラスト */}
										{profile.illusts?.map((illust) => (
											<li key={illust.id} className="w-[184px] min-w-[184px]">
												<div className="relative">
													<GridImage illust={illust} />
													<BookmarkButton
														bookmarkData={illust.bookmarkData}
														work={illust}
														type="illust"
													/>
												</div>
												<div className="mt-[4px] flex">
													<a
														className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold"
														href={`/artworks/${illust.id}`}
														target={
															settings?.openInNewTab
																? "_blank"
																: undefined
														}
													>
														{illust.title}
													</a>
												</div>
											</li>
										))}

										{/* 小説 */}
										{profile.illusts?.length === 0 &&
											profile.novels?.map((novel) => {
												return (
													<NovelItem
														key={novel.id}
														novel={novel}
														type="follow"
													/>
												);
											})}
										{displaySingleNovelItem && profile.novels && (
											<NovelItem novel={profile.novels[0]} type="follow" />
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};
