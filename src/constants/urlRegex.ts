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
	userWorks: /\/ajax\/user\/\d+\/profile\/(illusts|novels)\?.+/,
};

export const URL_SELECTORS: { pattern: RegExp; selector: string }[] = [
	{
		pattern: PAGE_REGEX.tagIllust,
		selector: "section>div:nth-of-type(2)>div:nth-of-type(1):has(>ul)", // タグ検索のみulの親要素に挿入する
	},
	{
		pattern: PAGE_REGEX.tagNovel,
		selector: "section>div:nth-of-type(2)>div>div>div>ul",
	},
	{
		pattern: PAGE_REGEX.newIllust,
		selector: "section>div>div>div>div>div>ul",
	},
	{
		pattern: PAGE_REGEX.newNovel,
		selector: "section>div>div>div>div>div>ul",
	},
	{
		pattern: PAGE_REGEX.bookmarkIllust,
		selector: "section>div:nth-of-type(3)>div>ul",
	},
	{
		pattern: PAGE_REGEX.bookmarkNovel,
		selector: "section>div:nth-of-type(3)>div>ul",
	},
	{
		pattern: PAGE_REGEX.following,
		selector: "section:has(>div:last-of-type)", // 親要素に挿入
	},
	{
		pattern: PAGE_REGEX.userIllust,
		selector: "ul:has([size='1'])",
	},
	{
		pattern: PAGE_REGEX.userNovel,
		selector: "ul:has([size='1'])",
	},
];
