import type { Work } from "@content/type";
import { NovelBookmarkCount } from "../../icons/novel/NovelBookmarkCount";

interface Props {
	novel: Work;
	readingTime: number | undefined;
}

export const NovelInfo = ({ novel, readingTime }: Props) => {
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
					<NovelBookmarkCount />
					<span>{novel.bookmarkCount.toLocaleString()}</span>
				</span>
			)}
		</div>
	);
};
