import type { Work } from "@/types/type";
import type { MuteSettings } from "../type";
import { PAGE_REGEX } from "@/constants/urlRegex";

type AdContainer = {
	isAdContainer: true;
};

const isIllustItem = (item: Work | AdContainer): item is Work => {
	return !("isAdContainer" in item);
};

const isMuted = (
	item: Work,
	muteSettings: MuteSettings,
	type: "following" | "normal",
): boolean | undefined => {
	// ブックマークは除外
	const pathName = location.pathname;
	if (PAGE_REGEX.bookmarkIllust.test(pathName) || PAGE_REGEX.bookmarkNovel.test(pathName)) {
		return undefined;
	}

	// フォロー中ページは、作品にのみミュート適用
	if (type === "normal" && PAGE_REGEX.following.test(pathName)) {
		return undefined;
	}

	/*
	 *ミュート設定のオンオフで、リアルタイムで表示を切り替えている
	 *切り替える必要があるのは、isMuteがtrueの場合のみ
	 *isMuteがfalseの場合は、そもそも切り替える必要がないので、undefinedにしておく
	 */
	const isMute =
		muteSettings.users.some((user) => user.id === item.userId) ||
		muteSettings.tags.some((tag) => item?.tags?.includes(tag));

	if (!isMute) return undefined;
	if (!muteSettings.isMute && isMute) return false;

	return isMute;
};

export const transformData = (
	data: any,
	location: Location,
	muteSettings: MuteSettings,
): Work[] => {
	const pathName = location.pathname;
	let illustData = null;

	if (PAGE_REGEX.newNovel.test(pathName)) {
		illustData = data.body.thumbnails.novel;
	}

	if (PAGE_REGEX.newIllust.test(pathName)) {
		illustData = data.body.thumbnails.illust;
	}

	if (PAGE_REGEX.following.test(pathName)) {
		illustData = data.body.users;
	}

	if (PAGE_REGEX.bookmarkIllust.test(pathName) || PAGE_REGEX.bookmarkNovel.test(pathName)) {
		illustData = data.body.works;
	}

	if (PAGE_REGEX.userIllust.test(pathName) || PAGE_REGEX.userNovel.test(pathName)) {
		// ユーザー一覧のタグ絞りの場合
		const userTag = /\/users\/\d+\/(illustrations|manga|artworks)\/.+/;
		if (userTag.test(pathName)) {
			illustData = data.body.works;
		} else {
			if (data.body.works) illustData = Object.values(data.body.works).reverse(); // オブジェクトになっているので配列にする
		}
	}

	if (PAGE_REGEX.tagIllust.test(pathName)) {
		illustData = data.body.illustManga?.data || data.body.illust?.data || data.body.manga?.data;
	}

	if (PAGE_REGEX.tagNovel.test(pathName)) {
		illustData = data.body.novel.data;
	}

	return (illustData || []).filter(isIllustItem).map((item: Work) => ({
		id: item.id,
		title: item.title,
		url: item.url,
		alt: item.alt,
		pageCount: item.pageCount,
		userId: item.userId,
		userName: item.userName,
		profileImageUrl: item.profileImageUrl,
		bookmarkData: item.bookmarkData,
		xRestrict: item.xRestrict,
		maskReason: item.maskReason,
		illustType: item.illustType,
		sl: item.sl,

		// フォロー中
		userComment: item.userComment,
		illusts: item.illusts?.map((illust) => ({
			...illust,
			isMuted: isMuted(illust, muteSettings, "following"),
		})),
		novels: item.novels?.map((novel) => ({
			...novel,
			isMuted: isMuted(novel, muteSettings, "following"),
		})),
		commission: item.commission,

		// 小説
		textCount: item.textCount,
		readingTime: item.readingTime,
		bookmarkCount: item.bookmarkCount,
		isOriginal: item.isOriginal,
		tags: item.tags,
		description: item.description,
		seriesTitle: item.seriesTitle,
		seriesId: item.seriesId,
		isMuted: isMuted(item, muteSettings, "normal"),
	}));
};
