import type { Work } from "@content/type";
import { FollowingContainer } from "../components/features/Following";

interface Props {
	profiles: Work[];
}

const Following = ({ profiles }: Props) => {
	return <FollowingContainer profiles={profiles} />;
};

export default Following;
