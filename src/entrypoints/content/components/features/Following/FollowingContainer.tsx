import type { Work } from "@/types/works";
import { FollowingItem } from "./FollowingItem";

interface Props {
	profiles: Work[];
}

export const FollowingContainer = ({ profiles }: Props) => {
	return profiles.map((profile) => <FollowingItem key={profile.userId} profile={profile} />);
};
