import { UserMute } from "@/types/type";

export type UserWorks = {
	illusts?: string[];
	manga?: string[];
	illustManga?: string[];
	novels?: string[];
};

export type NovelType = "tag" | "user" | "newNovel" | "follow" | "bookmark";

export type MuteSettings = {
	isMute: boolean;
	tags: string[];
	users: UserMute[];
};
