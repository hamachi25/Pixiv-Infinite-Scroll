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

export type Work = {
	id?: string;
	title?: string;
	url?: string;
	alt?: string;
	pageCount?: number;
	userId: string;
	userName: string;
	profileImageUrl: string;
	xRestrict?: 0 | 1 | 2; // 0: 公開, 1: R18, 2: R18G
	maskReason?: "r18" | "r18g" | "unknown"; // unknown: 削除済み
	bookmarkData?: { id: string; private: boolean } | null;
	illustType?: number;
	sl: number; // 4と6がセンシティブ

	// フォロー中
	userComment?: string;
	illusts?: Work[];
	novels?: Work[];
	following?: boolean;

	commission: {
		acceptRequest: boolean;
	} | null;

	// 小説
	textCount?: number;
	readingTime?: number;
	bookmarkCount?: number;
	isOriginal?: boolean;
	tags?: string[];
	description?: string;
	seriesTitle?: string;
	seriesId?: string;
};

export type UserWorks = {
	illusts?: string[];
	manga?: string[];
	illustManga?: string[];
	novels?: string[];
};

export type NovelType = "tag" | "user" | "newNovel" | "follow" | "bookmark";
