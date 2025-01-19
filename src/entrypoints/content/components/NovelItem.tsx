import { i18n } from "#i18n";
import type { Work, NovelType } from "../type";
import { BookmarkButton } from "./ui/BookmarkButton";
import { SettingContext } from "../context";

const NovelInfo = ({ novel, readingTime }: { novel: Work; readingTime: number | undefined }) => {
	return (
		<div className="my-[4px] flex gap-[8px] text-[12px] text-[var(--charcoal-text3)]">
			{/* 文字数 */}
			{novel.textCount && (
				<span>{i18n.t("novel.character", [novel.textCount.toLocaleString()])}</span>
			)}

			{/* 読了時間 */}
			{readingTime && <span>{i18n.t("novel.minute", [readingTime.toLocaleString()])}</span>}

			{/* ブックマーク数 */}
			{novel.bookmarkCount && novel.bookmarkCount > 0 && (
				<span className="inline-flex items-center gap-[4px] align-top">
					<svg className="h-[12px] w-[12px] fill-current" viewBox="0 0 12 12">
						<path d="M9 0.75C10.6569 0.75 12 2.09315 12 3.75C12 7.71703 7.33709 10.7126 6.23256 11.3666C6.08717 11.4526 5.91283 11.4526 5.76744 11.3666C4.6629 10.7126 0 7.71703 0 3.75C0 2.09315 1.34315 0.75 3 0.75C4.1265 0.75 5.33911 1.60202 6 2.66823C6.66089 1.60202 7.8735 0.75 9 0.75Z" />
					</svg>
					<span>{novel.bookmarkCount.toLocaleString()}</span>
				</span>
			)}
		</div>
	);
};

interface Props {
	novel: Work;
	type: NovelType;
}

export const NovelItem = ({ novel, type }: Props) => {
	const settings = useContext(SettingContext);

	const readingTime = novel.readingTime ? Math.floor(novel.readingTime / 60) : undefined;
	const description = novel.description?.replace(/<[^>]*>/g, "");
	return (
		<li
			key={novel.id}
			// TODO: 読みにくいのでなんとかしたい
			className={`${type === "follow" && "!w-[392px]"} ${type === "tag" ? "w-[600px]" : "w-[392px]"} ${type === "newNovel" || type === "bookmark" ? "@[1040px]:w-[496px] @[1248px]:w-[392px]" : "max-lg:w-[496px]"} ${type !== "follow" && type !== "tag" && "mx-[12px] my-[20px] border-b border-[var(--charcoal-border-default)] pb-[23px]"} ${type === "tag" && "mx-[12px] my-[20px]"}`}
		>
			<div
				className={`${type !== "tag" && "w-[392px]"} relative flex h-full min-h-[112px] pr-[40px]`}
			>
				{/* メイン画像 */}
				<a
					className="mr-[16px] flex-[0_0_auto]"
					href={`/novel/show.php?id=${novel.id}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					<img
						className="h-[112px] w-[80px] rounded-[8px] object-cover transition-opacity duration-200 hover:opacity-80"
						src={novel.url}
						alt={novel.alt}
						width={80}
						height={112}
					/>
				</a>
				<div className="-my-[4px] flex min-w-[0px] flex-[1_1_0%] flex-col">
					{/* シリーズタイトル */}
					{novel.seriesTitle && (
						<a
							className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[var(--charcoal-text3)]"
							href={`/novel/series/${novel.seriesId}`}
							title={novel.seriesTitle}
							target={settings?.openInNewTab ? "_blank" : undefined}
						>
							{novel.seriesTitle}
						</a>
					)}
					{/* タイトル */}
					<a
						className={`${type !== "tag" && "whitespace-nowrap text-[16px]"} overflow-hidden text-ellipsis font-bold`}
						href={`/novel/show.php?id=${novel.id}`}
						title={novel.title}
						target={settings?.openInNewTab ? "_blank" : undefined}
					>
						{novel.title}
					</a>

					{/* プロフィール */}
					{(type === "tag" || type === "newNovel" || type === "bookmark") && (
						<div className="flex gap-[4px]">
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
								className="overflow-hidden text-ellipsis whitespace-nowrap"
								href={`/users/${novel.userId}`}
								target={settings?.openInNewTab ? "_blank" : undefined}
							>
								{novel.userName}
							</a>
						</div>
					)}

					{(type === "user" || type === "follow" || type === "bookmark") && (
						<NovelInfo novel={novel} readingTime={readingTime} />
					)}

					{/* タグ */}
					<ul className="[&>li:not(:last-child)]:mr-[8px]">
						{novel.xRestrict !== 0 && (
							<li className="inline">
								<a
									className="break-words font-bold text-[var(--charcoal-r18)]"
									href={`/tags/${novel.xRestrict === 1 ? "R-18" : "R-18G"}/novels`}
									target={settings?.openInNewTab ? "_blank" : undefined}
								>
									{novel.xRestrict === 1 ? "R-18" : "R-18G"}
								</a>
							</li>
						)}
						{novel.isOriginal && (
							<li className="inline">
								<a
									className="break-words font-bold text-[var(--charcoal-link1)]"
									href="/tags/%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB/novels"
									target={settings?.openInNewTab ? "_blank" : undefined}
								>
									{i18n.t("novel.original")}
								</a>
							</li>
						)}
						{novel.tags?.map((tag) => (
							<li key={tag} className="inline">
								<a
									className="break-words text-[var(--charcoal-link1)] before:content-['#']"
									href={`/tags/${encodeURIComponent(tag)}/novels`}
									target={settings?.openInNewTab ? "_blank" : undefined}
								>
									{tag}
								</a>
							</li>
						))}
					</ul>

					{description && (
						<div
							className="max-h-[66px] overflow-hidden text-[var(--charcoal-text2)]"
							title={description}
							style={{
								display: "-webkit-box",
								WebkitLineClamp: type === "tag" ? 2 : 3,
								WebkitBoxOrient: "vertical",
							}}
						>
							{description}
						</div>
					)}

					{(type === "tag" || type === "newNovel") && (
						<NovelInfo novel={novel} readingTime={readingTime} />
					)}

					<BookmarkButton bookmarkData={novel.bookmarkData} work={novel} type="novel" />
				</div>
			</div>
		</li>
	);
};
