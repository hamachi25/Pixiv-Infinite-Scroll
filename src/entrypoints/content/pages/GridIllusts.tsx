import type { Work } from "@/types/works";
import { GridIllustsContainer } from "../components/features/GridIllusts/GridIllustsContainer";

interface Props {
	illusts: Work[];
	type: "user" | "bookmark" | "other";
}

const GridIllusts = ({ illusts, type }: Props) => {
	return <GridIllustsContainer illusts={illusts} type={type} />;
};

export default GridIllusts;
