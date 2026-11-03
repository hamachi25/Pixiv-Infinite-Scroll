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

// 新しいタグ検索URL(/search?q=タグ&type=artwork)のtypeと、旧URL(/tags/タグ/artworks)のカテゴリの対応
const SEARCH_TYPE_TO_CATEGORY: Record<string, string> = {
	artwork: "artworks",
	illust: "illustrations",
	manga: "manga",
	novel: "novels",
};

export const isSearchPage = (url: Location | URL) => /^(\/en)?\/search\/?$/.test(url.pathname);

/**
 * PAGE_REGEXで判定するためのパスを返す。
 * 新しいタグ検索URL(/search?q=タグ&type=artwork)は旧URL(/tags/タグ/artworks)の形に変換する。
 */
export const getPagePath = (url: Location | URL): string => {
	if (!isSearchPage(url)) return url.pathname;

	const params = new URLSearchParams(url.search);
	const query = params.get("q");
	if (!query) return url.pathname;

	const category = SEARCH_TYPE_TO_CATEGORY[params.get("type") ?? "artwork"];
	if (!category) return url.pathname;

	return `/tags/${encodeURIComponent(query)}/${category}`;
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
		selector: "[data-ga4-label='works_content']>div:has(>[data-ga4-label='thumbnail'])", // 作品グリッドの後に挿入する
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
