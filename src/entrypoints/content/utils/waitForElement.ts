export const waitForElement = async (selector: string): Promise<true | false> => {
	const element = document.querySelector(selector);
	if (element) return true;

	return new Promise((resolve) => {
		const observer = new MutationObserver((mutations, obs) => {
			for (const mutation of mutations) {
				if (mutation.type === "childList") {
					const element = document.querySelector(selector);
					if (element) {
						obs.disconnect();
						resolve(true);
					}
				}
			}
		});

		setTimeout(() => {
			observer.disconnect();
			resolve(false);
		}, 2000);

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
};
