import type { BrowserInfo } from "@popup/types";

const FORMS_INFO = {
	ja: {
		url: "https://docs.google.com/forms/d/e/1FAIpQLSfMXVLOG1tSjL8qH4SabLLAvjW32OMZwqNMwDjbgXMW0-guZw/viewform",
		extVersion: "entry.1458562736",
		browser: "entry.1879078577",
	},
	en: {
		url: "https://docs.google.com/forms/d/e/1FAIpQLSfglmKh2bxsYzHX3IlpYUhkxCUVqUH-4eIQyFcceDDykM7uFw/viewform",
		extVersion: "entry.279573501",
		browser: "entry.1405636948",
	},
};

export const getFormsUrl = (browserInfo: BrowserInfo, lang: string, version: string): string => {
	const localizedFormsLinks = lang === "ja" ? FORMS_INFO.ja : FORMS_INFO.en;

	const formsUrl = new URL(localizedFormsLinks.url);
	formsUrl.searchParams.set(localizedFormsLinks.extVersion, version);
	if (browserInfo.name && browserInfo.version) {
		formsUrl.searchParams.set(
			localizedFormsLinks.browser,
			`${browserInfo.name} ${browserInfo.version}`,
		);
	}

	return formsUrl.href;
};
