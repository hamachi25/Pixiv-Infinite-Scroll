interface Props {
	lang: string;
	version: string;
	browserInfo: {
		name: string | undefined;
		version: string | undefined;
	};
}

const FORMS_INFO = {
	ja: {
		url: "https://docs.google.com/forms/d/e/1FAIpQLSfMXVLOG1tSjL8qH4SabLLAvjW32OMZwqNMwDjbgXMW0-guZw/viewform?usp=dialog",
		extVersion: "entry.1458562736",
		browser: "entry.1879078577",
	},
	en: {
		url: "https://docs.google.com/forms/d/e/1FAIpQLSfglmKh2bxsYzHX3IlpYUhkxCUVqUH-4eIQyFcceDDykM7uFw/viewform?usp=dialog",
		extVersion: "entry.279573501",
		browser: "entry.1405636948",
	},
};

export const createFormsLink = ({ lang, version, browserInfo }: Props): string => {
	const localizedFormsInfo = lang === "ja" ? FORMS_INFO.ja : FORMS_INFO.en;

	const formsUrl = new URL(localizedFormsInfo.url);
	formsUrl.searchParams.append(localizedFormsInfo.extVersion, version);
	if (browserInfo.name && browserInfo.version) {
		formsUrl.searchParams.append(
			localizedFormsInfo.browser,
			`${browserInfo.name} ${browserInfo.version}`,
		);
	}

	return formsUrl.toString();
};
