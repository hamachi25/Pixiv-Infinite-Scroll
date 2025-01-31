import type { NovelType } from "../../type";
import type { Work } from "@/types/type";
import { NovelItem } from "../NovelItem";

interface Props {
	novels: Work[];
	type: NovelType;
}

export const Novels = ({ novels, type }: Props) => {
	const filteredNovels =
		type === "tag" || type === "newNovel" ? novels.filter((novel) => !novel.isMuted) : novels;

	return (
		<ul className="-mx-[12px] flex flex-wrap @container">
			{filteredNovels.map((novel) => (
				<NovelItem key={novel.id} novel={novel} type={type} />
			))}
		</ul>
	);
};
