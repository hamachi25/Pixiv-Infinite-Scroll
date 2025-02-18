import { Page } from "@playwright/test";

export async function openPopup(page: Page, extensionId: string) {
	await page.goto(`chrome-extension://${extensionId}/popup.html`);

	await page.waitForSelector("#root>div:nth-of-type(2)>label>input");

	const popup = {
		getCheckbox: () => page.waitForSelector("#root>div:nth-of-type(2)>label>input"),
		clickCheckbox: async () => {
			const checkbox = await popup.getCheckbox();
			await checkbox.click();
		},
		isCheckboxChecked: async () => {
			const checkbox = await popup.getCheckbox();
			return await checkbox.isChecked();
		},
	};
	return popup;
}
