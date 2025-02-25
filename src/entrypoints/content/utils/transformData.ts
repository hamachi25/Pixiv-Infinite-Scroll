import type { Work } from "@content/type";
import { PAGE_REGEX } from "../constants/urlRegex";

type AdContainer = {
	isAdContainer: true;
};

const isIllustItem = (item: Work | AdContainer): item is Work => {
	return !("isAdContainer" in item);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	return illustData.filter(isIllustItem);
};
