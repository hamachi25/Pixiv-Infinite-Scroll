import type { UserWorks } from "../type";
import { API_REGEX } from "@/constants/urlRegex";

export const generateRequestUrl = (
	url: string,
	currentPage: number,
	userWorks: UserWorks,
): string | undefined => {
	const newUrl = new URL(url);
	const params = new URLSearchParams(newUrl.search);

	// ユーザーの作品一覧の場合
	if (API_REGEX.userWorks.test(url)) {
		const workCategory = params.get("work_category");

		params.forEach((_, key) => {
			if (key === "ids[]") {
				params.delete(key);
			}
		});
		params.set("is_first_page", "0");

		let works;
		let offset = 48;
		switch (workCategory) {
			case "illustManga":
				works = userWorks.illustManga;
				break;
			case "illust":
				works = userWorks.illusts;
				break;
			case "manga":
				works = userWorks.manga;
				break;
			default:
				works = userWorks.novels;
				offset = 30;
				break;
		}
		if (!works) return;

		const start = currentPage * offset;
		const end = start + offset;

		const slicedWorks = works.slice(start, end);
		if (slicedWorks.length === 0) return;

		slicedWorks.forEach((value) => {
			params.append("ids[]", value);
		});

		newUrl.search = params.toString();
		return newUrl.toString();
	}

	if (params.has("p")) {
		params.set("p", (currentPage + 1).toString());
	} else {
		const limit = params.get("limit");
		if (!limit) return;

		params.set("offset", (currentPage * Number(limit)).toString());
	}

	newUrl.search = params.toString();
	return newUrl.toString();
};
