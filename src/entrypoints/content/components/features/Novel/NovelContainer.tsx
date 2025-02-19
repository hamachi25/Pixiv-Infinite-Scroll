import type { Work, NovelType } from "@content/type";
import { NovelInfo } from "./NovelInfo";
import { NovelSeriesTitle, NovelTitle } from "./Title";
import { NovelImage } from "./NovelImage";
import { Profile } from "./Profile";
import { R18Tag, OriginalTag, OtherTag } from "./Tags";
import { BookmarkButton } from "../../ui/BookmarkButton";

interface Props {
	novel: Work;
	type: NovelType;
}

export const NovelContainer = ({ novel, type }: Props) => {
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
					<NovelSeriesTitle novel={novel} />

					{/* タイトル */}
					<NovelTitle novel={novel} type={type} />

					{/* プロフィール */}
					{(type === "tag" || type === "newNovel" || type === "bookmark") && (
						<Profile novel={novel} type={type} />
					)}

					{(type === "user" || type === "follow" || type === "bookmark") && (
						<NovelInfo novel={novel} readingTime={readingTime} />
					)}

					{/* タグ */}
					<ul className="[&>li:not(:last-child)]:mr-[8px]">
						<R18Tag novel={novel} />
						<OriginalTag novel={novel} />
						<OtherTag novel={novel} />
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
