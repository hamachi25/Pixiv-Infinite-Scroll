import { pageRegex } from "../constants/pageRegex";

const patterns: { pattern: RegExp; selector: string }[] = [
	{
		pattern: pageRegex.tagIllust,
		selector: "section>div:nth-of-type(2)>div:nth-of-type(1)>ul",
	},
	{
		pattern: pageRegex.tagNovel,
		selector: "section>div:nth-of-type(2)>div>div>div>ul",
	},
	{
		pattern: pageRegex.newIllust,
		selector: "section>div:nth-of-type(4)>div>div>div>ul",
	},
	{
		pattern: pageRegex.newNovel,
		selector: "section>div:nth-of-type(4)>div>div>div>ul",
	},
	{
		pattern: pageRegex.bookmarkIllust,
		selector: "section>div:nth-of-type(3)>div>ul",
	},
	{
		pattern: pageRegex.bookmarkNovel,
		selector: "section>div:nth-of-type(3)>div>ul",
	},
	{
		pattern: pageRegex.following,
		selector: "section>div:last-of-type",
	},
	{
		pattern: pageRegex.userIllust,
		selector: "ul:has([size='1'])",
	},
	{
		pattern: pageRegex.userNovel,
		selector: "ul:has([size='1'])",
	},
];

export const getElementSelectorByUrl = (url: Location): string => {
	for (const { pattern, selector } of patterns) {
		if (pattern.test(url.pathname)) {
			return selector;
		}
	}

	return "section ul";
};
