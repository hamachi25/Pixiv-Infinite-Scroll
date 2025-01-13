import type { Work, NovelType } from "../../type";
import { NovelItem } from "../NovelItem";

interface Props {
	novels: Work[];
	type: NovelType;
}

export const Novels = ({ novels, type }: Props) => {
	return (
		<ul className="-mx-[12px] flex flex-wrap @container">
			{novels.map((novel) => (
				<NovelItem key={novel.id} novel={novel} type={type} />
			))}
		</ul>
	);
};
