import type { Work } from "@/types/works";
import { NovelContainer } from "../Novel/NovelContainer";
import { GridImage } from "../../ui/GridImage";
import { BookmarkButton } from "../../ui/BookmarkButton";
import { FollowButton } from "../../ui/FollowButton";
import { RequestMark } from "../../ui/RequestMark";

import { ProfileImage } from "./ProfileImage";
import { UserName } from "./UserName";
import { WorkTitle } from "./WorkTitle";

interface Props {
	profiles: Work[];
}

export const FollowingContainer = ({ profiles }: Props) => {
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
									<ProfileImage profile={profile} />
									<div className="ml-[16px] flex-[1_1_0%]">
										<UserName profile={profile} />

										{/* リクエスト */}
										{profile.commission && (
											<div className="mt-[8px]">
												<RequestMark
													acceptRequest={profile.commission.acceptRequest}
													userId={profile.userId}
												/>
											</div>
										)}

										{comment && (
											<div className="mt-[16px] break-all text-[12px]">
												{comment?.length > 99
													? `${comment.substring(0, 99)}…`
													: comment}
											</div>
										)}

										<div className="mt-[16px]">
											<FollowButton
												userId={profile.userId}
												following={profile.following || false}
											/>
										</div>
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
													<GridImage illust={illust} type="following" />
													<BookmarkButton
														bookmarkData={illust.bookmarkData}
														work={illust}
														type="illust"
													/>
												</div>
												<WorkTitle illust={illust} />
											</li>
										))}

										{/* 小説 */}
										{profile.illusts?.length === 0 &&
											profile.novels?.map((novel) => (
												<NovelContainer
													key={novel.id}
													novel={novel}
													type="follow"
												/>
											))}
										{displaySingleNovelItem && profile.novels && (
											<NovelContainer
												novel={profile.novels[0]}
												type="follow"
											/>
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
