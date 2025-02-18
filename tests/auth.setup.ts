import { test as setup, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ browser }) => {
	if (!process.env.MAIL || !process.env.PASSWORD) {
		throw new Error("環境変数 MAIL と PASSWORD を設定してください");
	}

	const context = await browser.newContext({ locale: "ja-JP" });
	const page = await context.newPage();

	await page.goto("https://accounts.pixiv.net/login");
	await page.getByPlaceholder("メールアドレスまたはpixiv ID").fill(process.env.MAIL);
	await page.getByPlaceholder("パスワード").fill(process.env.PASSWORD);
	await page.getByRole("button", { name: "ログイン", exact: true }).click();

	await page.waitForURL("https://www.pixiv.net/");

	const bodyClass = await page.evaluate(() => document.body.classList.contains("not-logged-in"));
	expect(bodyClass).toBeFalsy();

	await page.context().storageState({ path: authFile });
});
