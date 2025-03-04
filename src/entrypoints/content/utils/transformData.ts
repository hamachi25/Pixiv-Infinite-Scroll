import type { Work } from "@/types/works";
import type { MuteSettings } from "@content/type";
import { PAGE_REGEX } from "@/constants/urlRegex";

type AdContainer = {
	isAdContainer: true;
};

const isIllustItem = (item: Work | AdContainer): item is Work => {
	return !("isAdContainer" in item);
};

/*
 *ミュート設定のオンオフで、リアルタイムで表示を切り替えている
 *切り替える必要があるのは、isMuteがtrueの場合のみ
 *isMuteがfalseの場合は、そもそも切り替える必要がないので、undefinedにしておく
 */
const filterMuted = (
	item: Work,
	mutedItems: {
		mutedUserIds: Set<string>;
		mutedTags: Set<string>;
		isMute: boolean;
	},
	type: "following" | "normal",
): boolean | undefined => {
	// フォロー中ページでは、ユーザーにはミュートしない
	const pathName = location.pathname;
	if (type === "normal" && PAGE_REGEX.following.test(pathName)) {
		return undefined;
	}

	// ユーザーがミュートされている場合
	if (mutedItems.mutedUserIds.has(item.userId)) {
		if (!mutedItems.isMute) return false;
		return true;
	}

	// タグが存在しない場合
	if (!item.tags || item.tags.length === 0) {
		return undefined;
	}

	// ミュートされたタグが含まれているか確認
	const isMute = item.tags.some((tag) => mutedItems.mutedTags.has(tag));
	if (!isMute) {
		return undefined;
	} else {
		if (!mutedItems.isMute) return false;
		return true;
	}
};

export const transformData = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any,
	location: Location,
	muteSettings: MuteSettings,
): Work[] => {
	const mutedUserIds = new Set(muteSettings.users.map((user) => user.id));
	const mutedTags = new Set(muteSettings.tags);
	const mutedItems = { mutedUserIds, mutedTags, isMute: muteSettings.isMute };

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
		const tagWorks = /\/users\/\d+\/(illustrations|manga|artworks|novels)\/.+/;
		if (tagWorks.test(pathName)) {
			illustData = data.body.works;
		} else {
			illustData = Object.values(data.body.works).reverse(); // オブジェクトになっているので配列にする
		}
	}

	if (PAGE_REGEX.tagIllust.test(pathName)) {
		illustData = data.body.illustManga?.data || data.body.illust?.data || data.body.manga?.data;
	}

	if (PAGE_REGEX.tagNovel.test(pathName)) {
		illustData = data.body.novel.data;
	}

	// ブックマークを除外
	const shouldFilterMuted =
		!(PAGE_REGEX.bookmarkIllust.test(pathName) || PAGE_REGEX.bookmarkNovel.test(pathName)) &&
		(muteSettings.tags.length > 0 || muteSettings.users.length > 0);

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
			isMuted: shouldFilterMuted ? filterMuted(illust, mutedItems, "following") : undefined,
		})),
		novels: item.novels?.map((novel) => ({
			...novel,
			isMuted: shouldFilterMuted ? filterMuted(novel, mutedItems, "following") : undefined,
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
		isMuted: shouldFilterMuted ? filterMuted(item, mutedItems, "normal") : undefined,
	}));
};
