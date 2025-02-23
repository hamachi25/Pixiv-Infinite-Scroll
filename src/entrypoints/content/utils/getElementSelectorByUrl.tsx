import { URL_SELECTORS } from "../constants/urlRegex";

export const getElementSelectorByUrl = (url: Location): string | undefined => {
	for (const { pattern, selector } of URL_SELECTORS) {
		if (pattern.test(url.pathname)) {
			return selector;
		}
	}
};
