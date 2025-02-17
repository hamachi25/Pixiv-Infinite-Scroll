import type { Work, NovelType } from "@content/type";
import { NovelContainer } from "../components/features/Novel";

interface Props {
	novels: Work[];
	type: NovelType;
}

const Novels = ({ novels, type }: Props) => {
	return (
		<ul className="-mx-[12px] flex flex-wrap @container">
			{novels.map((novel) => (
				<NovelContainer key={novel.id} novel={novel} type={type} />
			))}
		</ul>
	);
};

export default Novels;
