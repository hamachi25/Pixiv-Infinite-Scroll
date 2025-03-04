import { ImageCount } from "../icons/illust/ImageCount";

interface Props {
	pageCount?: number;
}

export const IllustCount = ({ pageCount }: Props) => {
	return (
		pageCount &&
		pageCount > 1 && (
			<div className="ml-auto flex h-[20px] items-center justify-center gap-x-[2px] rounded-[10px] bg-(--charcoal-surface4) px-[6px] text-(--charcoal-text5)">
				<ImageCount />
				<span className="text-[10px] font-bold">{pageCount}</span>
			</div>
		)
	);
};
