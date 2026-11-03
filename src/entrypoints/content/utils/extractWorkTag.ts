import type { WorkTag } from "@content/type";
import { getPagePath, isSearchPage } from "@/constants/urlRegex";

export const extractWorkTag = (url: Location): WorkTag | null => {
	const path = getPagePath(url).replace("/en", "").split("/").filter(Boolean);

	if (path.length === 0) return null;

	const illustTag: WorkTag = {
		path: {
			type: path[0],
			other: path.slice(1),
		},
		param: {},
	};

	const params = new URLSearchParams(url.search);
	params.forEach((value, key) => {
		illustTag.param[key] = decodeURIComponent(value);
	});

	if (isSearchPage(url)) convertSearchParams(illustTag);

	const tag = extractTagFromPath(url);
	if (tag) illustTag.param["tag"] = tag;

	return illustTag;
};

/**
 * 新しいタグ検索URL(/search?q=タグ&s_mode=tag&type=artwork)のパラメータをAPI用に変換する
 */
function convertSearchParams(illustTag: WorkTag) {
	const param = illustTag.param;

	// 検索ワードはパスに含まれている
	delete param.q;

	// typeはカテゴリ(artwork, illust, manga, novel)を表すので、generateRequestUrlのデフォルト値を使う
	delete param.type;

	// s_mode: tag → s_tag, tag_full → s_tag_full, tc → s_tc
	if (param.s_mode && !param.s_mode.startsWith("s_")) {
		param.s_mode = `s_${param.s_mode}`;
	}
}

/**
 * URLのPathからタグを取得する
 */
function extractTagFromPath(url: Location): string | null {
	const patterns = {
		following: /\/users\/\d+\/following\/(.+)$/,
		bookmarks: /\/users\/\d+\/bookmarks\/(?:artworks|novels)\/(.+)$/,
		userIllust: /\/users\/.+\/(?:illustrations|manga|artworks|novels)\/(.+)$/,
	};

	const path = url.pathname;

	const followingMatch = path.match(patterns.following);
	const bookmarksMatch = path.match(patterns.bookmarks);
	const userIllustMatch = path.match(patterns.userIllust);

	if (followingMatch) return decodeURIComponent(followingMatch[1]);
	if (bookmarksMatch) return decodeURIComponent(bookmarksMatch[1]);
	if (userIllustMatch) return decodeURIComponent(userIllustMatch[1]);

	return null;
}
