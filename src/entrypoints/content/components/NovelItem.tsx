import type { Work, NovelType } from "../type";
import { BookmarkButton } from "./ui/BookmarkButton";
import { SettingContext } from "../context";
import { handleProfileMouseEnter, handleProfileMouseLeave } from "../utils/profilePopup";

interface Props {
	novel: Work;
	type: NovelType;
}

const NovelInfo = ({ novel, readingTime }: { novel: Work; readingTime: number | undefined }) => {
	return (
		<div className="my-[4px] flex gap-[8px] text-[12px] text-[var(--charcoal-text3)]">
			{/* 文字数 */}
			{novel.textCount !== undefined && (
				<span>{i18n.t("novel.character", [novel.textCount.toLocaleString()])}</span>
			)}

			{/* 読了時間 */}
			{readingTime !== undefined && (
				<span>{i18n.t("novel.minute", [readingTime.toLocaleString()])}</span>
			)}

			{/* ブックマーク数 */}
			{novel.bookmarkCount !== undefined && novel.bookmarkCount > 0 && (
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

const NovelImage = ({ novel }: { novel: Work }) => {
	const settings = useContext(SettingContext);
	return (
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
	);
};

const NovelSeriesTitle = ({ novel }: { novel: Work }) => {
	const settings = useContext(SettingContext);
	return (
		<a
			className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[var(--charcoal-text3)]"
			href={`/novel/series/${novel.seriesId}`}
			title={novel.seriesTitle}
			target={settings?.openInNewTab ? "_blank" : undefined}
		>
			{novel.seriesTitle}
		</a>
	);
};

const NovelTitle = ({ novel }: { novel: Work }) => {
	const settings = useContext(SettingContext);
	return (
		<a
			className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[var(--charcoal-text3)]"
			href={`/novel/series/${novel.seriesId}`}
			title={novel.seriesTitle}
			target={settings?.openInNewTab ? "_blank" : undefined}
		>
			{novel.seriesTitle}
		</a>
	);
};

const Profile = ({ novel, type }: { novel: Work; type: NovelType }) => {
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

const R18Tag = ({ novel }: { novel: Work }) => {
	const settings = useContext(SettingContext);
	return (
		<li className="inline">
			<a
				className="break-words font-bold text-[var(--charcoal-r18)]"
				href={`/tags/${novel.xRestrict === 1 ? "R-18" : "R-18G"}/novels`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{novel.xRestrict === 1 ? "R-18" : "R-18G"}
			</a>
		</li>
	);
};

const OriginalTag = () => {
	const settings = useContext(SettingContext);
	return (
		<li className="inline">
			<a
				className="break-words font-bold text-[var(--charcoal-link1)]"
				href="/tags/%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB/novels"
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{i18n.t("novel.original")}
			</a>
		</li>
	);
};

const OtherTag = ({ tag }: { tag: string }) => {
	const settings = useContext(SettingContext);
	return (
		<li className="inline">
			<a
				className="break-words text-[var(--charcoal-link1)] before:content-['#']"
				href={`/tags/${encodeURIComponent(tag)}/novels`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{tag}
			</a>
		</li>
	);
};

export const NovelItem = ({ novel, type }: Props) => {
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
				<NovelImage novel={novel} />

				<div className="-my-[4px] flex min-w-[0px] flex-[1_1_0%] flex-col">
					{/* シリーズタイトル */}
					{novel.seriesTitle && <NovelSeriesTitle novel={novel} />}

					{/* タイトル */}
					<NovelTitle novel={novel} />

					{/* プロフィール */}
					{(type === "tag" || type === "newNovel" || type === "bookmark") && (
						<Profile novel={novel} type={type} />
					)}

					{(type === "user" || type === "follow" || type === "bookmark") && (
						<NovelInfo novel={novel} readingTime={readingTime} />
					)}

					{/* タグ */}
					<ul className="[&>li:not(:last-child)]:mr-[8px]">
						{novel.xRestrict !== 0 && <R18Tag novel={novel} />}

						{novel.isOriginal && <OriginalTag />}

						{novel.tags?.map((tag) => <OtherTag key={tag} tag={tag} />)}
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
