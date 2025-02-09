import type { Work } from "../type";
import { PAGE_REGEX } from "../constants/urlRegex";

type AdContainer = {
	isAdContainer: true;
};

const isIllustItem = (item: Work | AdContainer): item is Work => {
	return !("isAdContainer" in item);
};

export const transformData = (data: any, location: Location): Work[] => {
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
		illustData = Object.values(data.body.works).reverse(); // オブジェクトになっているので配列にする
	}

	if (PAGE_REGEX.tagIllust.test(pathName)) {
		illustData = data.body.illustManga?.data || data.body.illust?.data || data.body.manga?.data;
	}

	if (PAGE_REGEX.tagNovel.test(pathName)) {
		illustData = data.body.novel.data;
	}

	return illustData.filter(isIllustItem).map((item: Work) => ({
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
		illusts: item.illusts,
		novels: item.novels,
		following: item.following,
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
	}));
};
