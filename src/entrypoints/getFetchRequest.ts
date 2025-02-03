import { API_REGEX } from "@/constants/urlRegex";
import type { Work, UserWorks } from "@/types/type";

const BASE_URL = "https://www.pixiv.net";

export default defineUnlistedScript(() => {
	let apiUrl: string | undefined = undefined;
	let userWorks: UserWorks = { body: { illusts: {}, manga: {}, novels: {} } };
	let firstPageWorks: Work[] = [];
	const originalFetch = window.fetch.bind(window);

	// リクエストURL、ユーザー作品一覧、1ページ目の作品をcontent scriptに送信
	pisFetchMessenger.onMessage("firstPageRequest", () => {
		return { apiUrl, userWorks, firstPageWorks };
	});

	window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
		try {
			const response = await originalFetch(input, init);
			const inputUrl = input.toString();

			if (!Object.values(API_REGEX).some((r) => r.test(inputUrl))) {
				return response;
			}
			const clonedResponse = response.clone();
			const jsonResponse = await clonedResponse.json();
			if (API_REGEX.userAll.test(inputUrl)) {
				userWorks = jsonResponse;
				return response;
			}

			firstPageWorks = jsonResponse;
			apiUrl = new URL(inputUrl, BASE_URL).toString();

			return response;
		} catch (error) {
			console.error("Fetch error:", error);
			throw error;
		}
	};
});
