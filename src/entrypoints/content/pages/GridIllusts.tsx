import type { Work } from "@content/type";
import { GridIllustsContainer } from "../components/features/GridIllusts";

interface Props {
	illusts: Work[];
	type: string;
}

const GridIllusts = ({ illusts, type }: Props) => {
	return <GridIllustsContainer illusts={illusts} type={type} />;
};

export default GridIllusts;
