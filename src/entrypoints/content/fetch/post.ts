export const postData = async (
	requestUrl: string,
	headers: { [key: string]: string },
	body: string | URLSearchParams,
) => {
	try {
		const response = await fetch(requestUrl, {
			method: "POST",
			headers,
			body,
		});
		if (!response.ok) throw new Error("response error");

		return await response.json();
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
