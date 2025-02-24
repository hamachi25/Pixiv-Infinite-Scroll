import { API_REGEX } from "@/constants/urlRegex";

export default defineUnlistedScript(() => {
	const originalFetch = window.fetch.bind(window);

	window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
		try {
			const response = await originalFetch(input, init);
			const inputUrl = input.toString();

			if (!Object.values(API_REGEX).some((r) => r.test(inputUrl))) {
				return response;
			}

			const clonedResponse = response.clone();
			const jsonResponse = await clonedResponse.json();

			const muteSettings = await pisSettingsMessenger.sendMessage("muteSettings", null);
			if (!muteSettings.isMute) return response;

			const filteredResponse = await filterFirstPageWorks(jsonResponse, muteSettings);

			return new Response(JSON.stringify(filteredResponse), {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
			});
		} catch (error) {
			console.error("Fetch error:", error);
			throw error;
		}
	};
});
