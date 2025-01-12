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
