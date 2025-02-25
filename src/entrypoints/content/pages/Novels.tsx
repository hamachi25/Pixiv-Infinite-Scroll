import type { NovelType } from "@content/type";
import type { Work } from "@/types/works";
import { NovelContainer } from "../components/features/Novel/NovelContainer";

interface Props {
	novels: Work[];
	type: NovelType;
}

const Novels = ({ novels, type }: Props) => {
	const filteredNovels =
		type === "tag" || type === "newNovel" ? novels.filter((novel) => !novel.isMuted) : novels;

	return (
		<ul className="-mx-[12px] flex flex-wrap @container">
			{filteredNovels.map((novel) => (
				<NovelContainer key={novel.id} novel={novel} type={type} />
			))}
		</ul>
	);
};

export default Novels;
