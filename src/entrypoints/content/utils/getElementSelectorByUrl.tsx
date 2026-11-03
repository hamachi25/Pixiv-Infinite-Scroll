import { URL_SELECTORS, getPagePath } from "@/constants/urlRegex";

export const getElementSelectorByUrl = (url: Location): string | undefined => {
	for (const { pattern, selector } of URL_SELECTORS) {
		if (pattern.test(getPagePath(url))) {
			return selector;
		}
	}
};
