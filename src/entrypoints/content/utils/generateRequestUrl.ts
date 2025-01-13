import type { WorkTag, UserWorks } from "../type";

export const generateRequestUrl = (
	tag: WorkTag | undefined,
	page: number,
	UserIllusts: UserWorks,
): string | null => {
	if (!tag) return null;
	const baseUrl = "https://www.pixiv.net";

	const path = generatePath(tag);
	if (!path) return null;

	const requestUrl = new URL(path, baseUrl);

	const params = setDefualtParams(tag);
	if (tag.param) {
		for (const [key, value] of Object.entries(tag.param)) {
			if (value !== undefined) {
				params.set(key, value);
			}
		}
	}

	const pathName = tag.path;
	if (pathName.type === "users" && pathName.other) {
		params.delete("p");
		if (
			pathName.other[1] === "following" || //24
			pathName.other[1] === "bookmarks" || //48
			isUserIllustWithTag(pathName) //イラスト:48, 小説:30
		) {
			let offset = 48;
			if (pathName.other[1] === "following") {
				offset = 24;
			} else if (pathName.other[1] === "novels") {
				offset = 30;
			}

			params.set("offset", ((page - 1) * offset).toString());
		} else if (pathName.other[1] === "artworks" && UserIllusts.illustManga) {
			const result = appendIllustIds(params, UserIllusts.illustManga, page, "illust");
			if (!result) return null;
		} else if (pathName.other[1] === "illustrations" && UserIllusts.illusts) {
			const result = appendIllustIds(params, UserIllusts.illusts, page, "illust");
			if (!result) return null;
		} else if (pathName.other[1] === "manga" && UserIllusts.manga) {
			const result = appendIllustIds(params, UserIllusts.manga, page, "illust");
			if (!result) return null;
		} else if (pathName.other[1] === "novels" && UserIllusts.novels) {
			const result = appendIllustIds(params, UserIllusts.novels, page, "novel");
			if (!result) return null;
		}
	} else {
		params.set("p", page.toString());
	}

	requestUrl.search = params.toString();

	return requestUrl.toString();
};

const generatePath = (tag: WorkTag): string | null => {
	const path = tag.path;
	if (path.type === "tags") {
		if (!path.other) return null;

		// /ajax/search/illustrations/自然
		return `/ajax/search/${path.other[1]}/${path.other[0]}`;
	}

	if (path.type === "users") {
		if (!path.other) return null;

		// /ajax/user/1234567/following
		if (path.other[1] === "following") {
			return `/ajax/user/${path.other[0]}/following`;
		}

		// /ajax/user/1234567/(illusts|novels)/bookmarks
		if (path.other[1] === "bookmarks") {
			const category = path.other[2] === "novels" ? "novels" : "illusts";
			return `/ajax/user/${path.other[0]}/${category}/bookmarks`;
		}

		// /ajax/user/1234567/illustmanga/tag
		if (isUserIllustWithTag(path)) {
			let page = "";
			switch (path.other[1]) {
				case "artworks":
					page = "illustmanga";
					break;
				case "illustrations":
					page = "illusts";
					break;
				case "manga":
					page = "manga";
					break;
				case "novels":
					page = "novels";
			}

			return `/ajax/user/${path.other[0]}/${page}/tag`;
		}

		// /ajax/user/1234567/profile/illusts
		if (
			path.other[1] === "artworks" ||
			path.other[1] === "illustrations" ||
			path.other[1] === "manga"
		) {
			return `/ajax/user/${path.other[0]}/profile/illusts`;
		}

		// /ajax/user/1234567/profile/novels
		if (path.other[1] === "novels") {
			return `/ajax/user/${path.other[0]}/profile/novels`;
		}
	}

	if (path.type === "bookmark_new_illust.php" || path.type === "bookmark_new_illust_r18.php") {
		return "/ajax/follow_latest/illust";
	}

	if (path.type === "novel") {
		return "/ajax/follow_latest/novel";
	}

	return null;
};

const setDefualtParams = (tag: WorkTag): URLSearchParams => {
	const path = tag.path;
	const params = new URLSearchParams();

	if (path.type === "tags") {
		params.set("order", "date_d");
		params.set("mode", "all");
		params.set("s_mode", "s_tag_full");

		if (!path.other) return params;

		switch (path.other[1]) {
			case "artworks":
				params.set("type", "all");
				break;
			case "illustrations":
				params.set("type", "illust_and_ugoira");
				break;
			case "manga":
				params.set("type", "manga");
				break;
		}
	}

	if (path.type === "bookmark_new_illust.php") {
		params.set("mode", "all");
	}

	if (path.type === "bookmark_new_illust_r18.php") {
		params.set("mode", "r18");
	}

	if (path.type === "novel") {
		if (!path.other) return params;

		if (path.other[1] === "bookmark_new.php") {
			params.set("mode", "all");
		}
		if (path.other[1] === "bookmark_new_r18.php") {
			params.set("mode", "r18");
		}
	}

	if (path.type === "users") {
		if (!path.other) return params; // generatePath関数でチェックしているので不要だが、エラーがでるので追加

		if (path.other[1] === "novels" && path.other[2]) {
			params.set("limit", "30");
			return params;
		}

		if (
			path.other[1] === "artworks" ||
			path.other[1] === "illustrations" ||
			path.other[1] === "manga"
		) {
			params.set("sensitiveFilterMode", "userSetting");

			// タグ絞り込み
			if (path.other[2]) {
				params.set("limit", "48");
				return params;
			}

			params.set("is_first_page", "0");
		}

		switch (path.other[1]) {
			case "following":
				params.set("rest", "show");
				params.set("limit", "24");
				break;
			case "bookmarks":
				params.set("rest", "show");
				params.set("limit", "48");
				params.set("tag", "");
				break;
			case "artworks":
				params.set("work_category", "illustManga");
				break;
			case "illustrations":
				params.set("work_category", "illust");
				break;
			case "manga":
				params.set("work_category", "manga");
		}

		if (path.other[1] === "bookmarks" && path.other[2] === "novels") {
			params.set("limit", "30");
		}
	}

	return params;
};

const isUserIllustWithTag = (path: { type: string; other?: string[] }): boolean => {
	if (path.type === "users" && path.other && path.other.length > 2) {
		const category = path.other[1];
		return (
			category === "artworks" ||
			category === "illustrations" ||
			category === "manga" ||
			category === "novels"
		);
	}
	return false;
};

const appendIllustIds = (
	params: URLSearchParams,
	illusts: string[],
	page: number,
	type: "illust" | "novel",
) => {
	const offset = type === "illust" ? 48 : 30;

	const offsetIndex = (page - 1) * offset;
	const illustIds = illusts.slice(offsetIndex, offsetIndex + offset);
	if (illustIds.length === 0) return false;

	for (const illustId of illustIds) {
		params.append("ids[]", illustId);
	}
	return true;
};
