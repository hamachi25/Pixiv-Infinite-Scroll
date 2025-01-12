import type { Work } from "../type";
import { pageRegex } from "../constants/pageRegex";

type AdContainer = {
	isAdContainer: true;
};

const isIllustItem = (item: Work | AdContainer): item is Work => {
	return !("isAdContainer" in item);
};

export const transformData = (data: any, location: Location): Work[] => {
	const pathName = location.pathname;
	let illustData = null;

	if (pageRegex.newNovel.test(pathName)) {
		illustData = data.body.thumbnails.novel;
	}

	if (pageRegex.newIllust.test(pathName)) {
		illustData = data.body.thumbnails.illust;
	}

	if (pageRegex.following.test(pathName)) {
		illustData = data.body.users;
	}

	if (pageRegex.bookmarkIllust.test(pathName) || pageRegex.bookmarkNovel.test(pathName)) {
		illustData = data.body.works;
	}

	if (pageRegex.userIllust.test(pathName) || pageRegex.userNovel.test(pathName)) {
		illustData = Object.values(data.body.works).reverse(); // オブジェクトになっているので配列にする
	}

	if (pageRegex.tagIllust.test(pathName)) {
		illustData = data.body.illustManga?.data || data.body.illust?.data || data.body.manga?.data;
	}

	if (pageRegex.tagNovel.test(pathName)) {
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

		// フォロー中
		userComment: item.userComment,
		illusts: item.illusts,
		novels: item.novels,
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
