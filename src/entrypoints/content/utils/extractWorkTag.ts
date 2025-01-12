import type { WorkTag } from "../type";

export const extractWorkTag = (url: Location): WorkTag | null => {
	const path = url.pathname.replace("/en", "").split("/").filter(Boolean);

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

	const tag = extractTagFromPath(url);
	if (tag) illustTag.param["tag"] = tag;

	return illustTag;
};

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
