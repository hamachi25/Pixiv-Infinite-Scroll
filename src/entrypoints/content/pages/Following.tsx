import type { Work } from "@/types/works";
import { FollowingContainer } from "../components/features/Following/FollowingContainer";

interface Props {
	profiles: Work[];
}

const Following = ({ profiles }: Props) => {
	return <FollowingContainer profiles={profiles} />;
};

export default Following;
