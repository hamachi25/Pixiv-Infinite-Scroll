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

	isMuted?: boolean;
};
