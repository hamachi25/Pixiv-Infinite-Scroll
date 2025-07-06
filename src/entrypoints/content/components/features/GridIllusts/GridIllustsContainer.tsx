import type { Work } from "@/types/works";
import { GridImage } from "../../ui/GridImage";
import { BookmarkButton } from "../../ui/BookmarkButton";
import { DeletedIllust } from "../../icons/illust/DeletedIllust";
import { R18Illust } from "../../icons/illust/R18Illust";

import { WorkTitle } from "./WorkTitle";
import { Profile } from "./Profile";
import { OpenMuteModalButton } from "@content/components/ui/OpenMuteModalButton";

interface Props {
	illusts: Work[];
	type: "user" | "bookmark" | "other";
}

export const GridIllustsContainer = ({ illusts, type }: Props) => {
	const filteredIllusts =
		type === "other" ? illusts.filter((illust) => !illust.isMuted) : illusts;

	return (
		<ul className="mt-[24px] grid grid-cols-[repeat(auto-fit,184px)] gap-[24px]">
			{filteredIllusts.map((illust) => (
				<li key={illust.id}>
					<div className="relative">
						{/* メイン画像 */}
						{!illust.maskReason ? (
							<GridImage illust={illust} />
						) : (
							// R18・R18G・削除済み
							<div className="flex h-[184px] w-[184px] items-center justify-center rounded-[8px] bg-(--charcoal-background2)">
								<div className="-mb-[1px] flex h-[122px] w-[122px] flex-col items-center justify-center gap-[4px] text-(--charcoal-text4) select-none">
									{illust.maskReason === "unknown" ? (
										<DeletedIllust />
									) : (
										<R18Illust />
									)}

									<div className="text-center text-[16px] font-bold">
										{illust.maskReason === "unknown" ? (
											<>
												{i18n.t("illust.deleted")}
												<br />
												{i18n.t("illust.private")}
											</>
										) : (
											<>
												{i18n.t("illust.r18")}
												<br />
												{i18n.t("illust.work")}
											</>
										)}
									</div>
								</div>
							</div>
						)}
						<OpenMuteModalButton work={illust} />
						{/* ブックマークボタン */}
						<BookmarkButton
							bookmarkData={illust.bookmarkData}
							work={illust}
							type={type === "bookmark" ? "bookmark" : "illust"}
						/>
					</div>

					{/* タイトル */}
					<WorkTitle illust={illust} />

					{/* プロフィール */}
					{type !== "user" && <Profile illust={illust} />}
				</li>
			))}
		</ul>
	);
};
