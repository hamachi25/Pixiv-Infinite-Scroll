import { test, expect } from "./fixtures";
import { openPopup } from "./pages/popup";

test.use({
	locale: "ja",
});

test("Popup checkbox toggles correctly", async ({ page, extensionId }) => {
	const popup = await openPopup(page, extensionId);
	expect(await popup.isCheckboxChecked()).toBe(false);

	await popup.clickCheckbox();
	expect(await popup.isCheckboxChecked()).toBe(true);

	await page.reload();
	expect(await popup.isCheckboxChecked()).toBe(true);
});

test("Load second page", async ({ page, extensionId }) => {
	const popup = await openPopup(page, extensionId);
	await popup.clickCheckbox();
	expect(await popup.isCheckboxChecked()).toBe(true);

	await page.goto("https://www.pixiv.net/tags/%E8%87%AA%E7%84%B6/illustrations?s_mode=s_tag");

	await page
		.locator("section>div:nth-of-type(2)>div:nth-of-type(1)>ul>li:last-child")
		.scrollIntoViewIfNeeded();

	// 2ページ目のヘッダーが2であることを確認
	const secondHeader = page.getByTestId("virtuoso-item-list").locator("[data-index]>div>div>a");
	await expect(secondHeader).toHaveText("2");

	// URLが2ページ目に変わっていることを確認
	await page.mouse.wheel(0, 200);
	expect(page.url()).toBe("https://www.pixiv.net/tags/%E8%87%AA%E7%84%B6/illustrations?p=2");

	// 新しいタブで開く設定が有効であることを確認
	const secondPageLink = page
		.getByTestId("virtuoso-item-list")
		.locator("ul>li:first-child>div:first-child>a");
	await expect(secondPageLink).toHaveAttribute("target", "_blank");
});
