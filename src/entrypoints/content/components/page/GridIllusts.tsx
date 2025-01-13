import { i18n } from "#i18n";
import type { Work } from "../../type";
import { GridImage } from "../GridImage";
import { BookmarkButton } from "../ui/BookmarkButton";
import { SettingContext } from "../../context";

interface Props {
	illusts: Work[];
	type: string;
}

export const GridIllusts = ({ illusts, type }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<ul className="mt-[24px] grid grid-cols-[repeat(auto-fit,184px)] gap-[24px]">
			{illusts.map((illust) => (
				<li key={illust.id}>
					<div className="relative">
						{/* メイン画像 */}
						{illust.maskReason !== "r18" && illust.maskReason !== "r18g" ? (
							<GridImage illust={illust} />
						) : (
							// R18 / R18G 作品
							<div className="flex h-[184px] w-[184px] items-center justify-center rounded-[8px] bg-[var(--charcoal-background2)]">
								<div className="-mb-[1px] flex h-[122px] w-[122px] select-none flex-col items-center justify-center gap-[4px] text-[var(--charcoal-text4)]">
									<svg
										className="h-[72px] w-[72px] fill-current"
										viewBox="0 0 24 24"
									>
										<path d="M5.26763775,4 L9.38623853,11.4134814 L5,14.3684211 L5,18 L13.0454155,18 L14.1565266,20 L5,20 C3.8954305,20 3,19.1045695 3,18 L3,6 C3,4.8954305 3.8954305,4 5,4 L5.26763775,4 Z M9.84347336,4 L19,4 C20.1045695,4 21,4.8954305 21,6 L21,18 C21,19.1045695 20.1045695,20 19,20 L18.7323623,20 L17.6212511,18 L19,18 L19,13 L16,15 L15.9278695,14.951913 L9.84347336,4 Z M16,7 C14.8954305,7 14,7.8954305 14,9 C14,10.1045695 14.8954305,11 16,11 C17.1045695,11 18,10.1045695 18,9 C18,7.8954305 17.1045695,7 16,7 Z M7.38851434,1.64019979 L18.3598002,21.3885143 L16.6114857,22.3598002 L5.64019979,2.61148566 L7.38851434,1.64019979 Z" />
									</svg>
									<div className="text-center text-[16px] font-bold">
										{i18n.t("illust.r18")}
										<br />
										{i18n.t("illust.work")}
									</div>
								</div>
							</div>
						)}
						{/* ブックマークボタン */}
						<BookmarkButton
							bookmarkData={illust.bookmarkData}
							workId={illust.id}
							type="illust"
						/>
					</div>

					{/* タイトル */}
					<div className="mt-[4px] flex">
						{illust.maskReason !== "r18" && illust.maskReason !== "r18g" ? (
							<a
								className="overflow-hidden text-ellipsis whitespace-nowrap font-bold visited:text-[var(--charcoal-text1Visited)]"
								href={`/artworks/${illust.id}`}
								target={settings?.openInNewTab ? "_blank" : undefined}
							>
								{illust.title}
							</a>
						) : (
							// R18 / R18G 作品
							<span className="font-bold text-[var(--charcoal-text3)]">
								{i18n.t("illust.restrict")}
							</span>
						)}
					</div>

					{/* プロフィール */}
					{type === "other" && (
						<div className="mt-[4px] flex items-center gap-x-[4px]">
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
					)}
				</li>
			))}
		</ul>
	);
};
