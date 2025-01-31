import { PAGE_REGEX } from "@/constants/urlRegex";

const SELECTOR_PATTERN: { pattern: RegExp; selector: string }[] = [
	{
		pattern: PAGE_REGEX.tagIllust,
		selector: "section>div:nth-of-type(2)>div:nth-of-type(1)>ul",
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
		selector: "div:last-child>div>ul:has([size='1'])",
	},
	{
		pattern: PAGE_REGEX.userNovel,
		selector: "div:last-child>div>ul:has([size='1'])",
	},
];

export const getElementSelectorByUrl = (url: Location): string => {
	for (const { pattern, selector } of SELECTOR_PATTERN) {
		if (pattern.test(url.pathname)) {
			return selector;
		}
	}

	return "section ul";
};
