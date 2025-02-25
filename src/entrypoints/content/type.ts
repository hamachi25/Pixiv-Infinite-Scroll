import { UserMute } from "@/types/storage";

export type WorkTag = {
	path: {
		type: string;
		other?: Array<string>;
	};
	param: {
		p?: string; // ページ数

		// タグ検索結果
		type?: string; // イラスト・うごイラ・マンガ
		s_mode?: string; // タグの一致
		order?: string; // 順番
		wlt?: string; // 最小幅
		hlt?: string; // 最小高さ
		wgt?: string; // 最大幅
		hgt?: string; // 最大高さ
		ratio?: string; // 縦横比
		tool?: string; // 使用ツール
		scd?: string; // 作成日時はじまり
		ecd?: string; // 作成日時おわり
		work_lang?: string; // 作品言語

		// タグ検索結果・フォローユーザーの作品
		mode?: string; // 全年齢とR-18

		// フォローユーザーの作品・ブックマーク・フォロー中
		tag?: string; // タグ

		// ブックマーク
		rest?: string; // 公開・非公開

		// フォロー中
		acceptingRequests?: string; // リクエスト募集中

		[key: string]: string | undefined;
	};
};

export type UserWorks = {
	illusts?: string[];
	manga?: string[];
	illustManga?: string[];
	novels?: string[];
};

export type NovelType = "tag" | "user" | "newNovel" | "follow" | "bookmark";

export type ProfilePopupType = {
	userId: string;
	position: { rectTop: number; top: number; left: number; width: number; height: number };
};

export type ProfileData = {
	background: {
		url: string;
	};
	commission: {
		acceptRequest: boolean;
	} | null;
	imageBig: string;
	name: string;
	userId: string;
	comment: string;
	isFollowed: boolean;
};

export type ProfileWork = {
	id: string;
	url: string;
	alt: string;
	title: string;
	pageCount?: number;
};

export type MuteSettings = {
	isMute: boolean;
	tags: string[];
	users: UserMute[];
};
