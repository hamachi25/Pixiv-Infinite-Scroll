export const fetchData = async (requestUrl: string) => {
	try {
		const response = await fetch(requestUrl);
		if (!response.ok) throw new Error("response error");

		return await response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};

export const fetchOrigin = async (): Promise<string | null> => {
	try {
		const response = await fetch("https://www.pixiv.net/");
		if (!response.ok) throw new Error("response error");

		return await response.text();
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
