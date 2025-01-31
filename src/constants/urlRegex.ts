export const PAGE_REGEX = {
	tagIllust: /\/tags\/.+\/(illustrations|manga|artworks)/,
	tagNovel: /\/tags\/.+\/novels/,
	newIllust: /\/bookmark_new_illust(_r18)?\.php/,
	newNovel: /\/novel\/bookmark_new(_r18)?\.php/,
	following: /\/users\/\d+\/following/,
	bookmarkIllust: /\/users\/\d+\/bookmarks\/artworks/,
	bookmarkNovel: /\/users\/\d+\/bookmarks\/novels/,
	userIllust: /\/users\/\d+\/(illustrations|manga|artworks)/,
	userNovel: /\/users\/\d+\/novels/,
};

export const API_REGEX = {
	top: /\/ajax\/top\/(illust|manga)\?.+/,
	bookmark: /\/ajax\/user\/\d+\/(novels|illusts)\/bookmarks\?.+/,
	following: /\/ajax\/user\/\d+\/following\?.+/,
	new: /\/ajax\/follow_latest\/(illust|novel)\?.+/,
	tag: /\/ajax\/search\/(artworks|illustrations|manga|novels)\/.+\?/,
	userTag: /\/ajax\/user\/\d+\/(illustmanga|illusts|manga|novels)\/tag\?.+/,
	userAll: /\/ajax\/user\/\d+\/profile\/all\?.+/,
	userWorks: /\/ajax\/user\/\d+\/profile\/(illusts|novels)\?.+/,
};
