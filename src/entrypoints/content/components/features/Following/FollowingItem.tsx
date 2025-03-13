import type { Work } from "@/types/works";
import { NovelContainer } from "../Novel/NovelContainer";
import { GridImage } from "../../ui/GridImage";
import { BookmarkButton } from "../../ui/BookmarkButton";
import { FollowButton } from "../../ui/FollowButton";
import { RequestMark } from "../../ui/RequestMark";

import { ProfileImage } from "./ProfileImage";
import { UserName } from "./UserName";
import { WorkTitle } from "./WorkTitle";
import { ScrollArrow } from "./ScrollArrow";

interface Props {
	profile: Work;
}

export const FollowingItem = ({ profile }: Props) => {
	const [scrollPosition, setScrollPosition] = useState<"left" | "right">("left");
	const scrollElement = useRef<HTMLDivElement>(null);

	const scrollToLeft = () => {
		setScrollPosition("left");
		scrollElement.current?.scrollTo({
			left: 0,
			behavior: "smooth",
		});
	};

	const scrollToRight = () => {
		setScrollPosition("right");
		scrollElement.current?.scrollTo({
			left: scrollElement.current.scrollWidth,
			behavior: "smooth",
		});
	};

	const comment = profile.userComment;
	const displaySingleNovelItem =
		profile.illusts &&
		profile.illusts.length >= 1 &&
		profile.illusts.length <= 2 &&
		profile.novels &&
		profile.novels.length >= 1;

	return (
		<div className="border-b border-solid border-(--charcoal-border-default) py-[24px]">
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
								<div className="mt-[16px] text-[12px] break-all">
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
				<div className="group relative ml-[24px] w-[calc((var(--columns)-4)*80px+(var(--columns)-5)*24px)]">
					<div className="-mr-[72px] overflow-hidden">
						<div className="following-blur-right">
							<div
								className={`hidden-scrollbar -mr-[72px] overflow-x-auto pr-[72px] transition-all duration-200 ease-in ${
									scrollPosition === "left"
										? "following-blur-left-off"
										: "following-blur-left-on"
								}`}
								ref={scrollElement}
							>
								<ul className="inline-flex gap-[24px] pr-[72px]">
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
										<NovelContainer novel={profile.novels[0]} type="follow" />
									)}
								</ul>
							</div>
						</div>
					</div>
					<ScrollArrow
						scrollPosition={scrollPosition}
						scrollToLeft={scrollToLeft}
						scrollToRight={scrollToRight}
					/>
				</div>
			</div>
		</div>
	);
};
