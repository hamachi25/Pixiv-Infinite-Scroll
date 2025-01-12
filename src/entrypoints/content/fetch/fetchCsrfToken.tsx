export const fetchCsrfToken = async (): Promise<string | undefined> => {
	const response = await fetch("https://www.pixiv.net/");
	const html = await response.text();
	const csrfToken = html.match(/"token":"([a-f0-9]+)"/)?.[1];
	return csrfToken;
};
