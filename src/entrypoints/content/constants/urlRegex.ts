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
		selector: "section>div:nth-of-type(4)>div>div>div>ul",
	},
	{
		pattern: PAGE_REGEX.newNovel,
		selector: "section>div:nth-of-type(4)>div>div>div>ul",
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
		selector: "section>div:last-of-type",
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
