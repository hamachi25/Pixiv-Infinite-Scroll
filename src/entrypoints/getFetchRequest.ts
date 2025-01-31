import { API_REGEX, PAGE_REGEX } from "@/constants/urlRegex";
import type { UserMute, Work, UserWorks, Settings } from "@/types/type";

const BASE_URL = "https://www.pixiv.net";

const filterMuted = (work: Work, muteSettings: { tags: string[]; users: UserMute[] }) => {
	return (
		!muteSettings.users.some((user) => user.id === work.userId) &&
		!muteSettings.tags.some((tag) => work.tags?.includes(tag))
	);
};

// TODO: 読みにくいのでどうにかしたい
// 初回ページのデータをフィルタリング (ブックマークは除外)
const filterFirstPageWorks = async (
	data: any,
	muteSettings: {
		tags: string[];
		users: UserMute[];
		isMute: boolean;
	},
) => {
	const pathName = location.pathname;

	if (muteSettings.tags.length === 0 && muteSettings.users.length === 0) {
		return data;
	}

	if (PAGE_REGEX.newNovel.test(pathName)) {
		data.body.thumbnails.novel = data.body.thumbnails.novel.filter((work: Work) =>
			filterMuted(work, muteSettings),
		);
	}

	if (PAGE_REGEX.newIllust.test(pathName)) {
		data.body.thumbnails.illust = data.body.thumbnails.illust.filter((work: Work) =>
			filterMuted(work, muteSettings),
		);
	}

	if (PAGE_REGEX.following.test(pathName)) {
		data.body.users = data.body.users.map((user: any) => {
			user.illusts = user.illusts
				.map((illust: Work) => illust)
				.filter((illust: Work) => filterMuted(illust, muteSettings));
			user.novels = user.novels
				.map((novel: Work) => novel)
				.filter((novel: Work) => filterMuted(novel, muteSettings));
			return user;
		});
	}

	if (PAGE_REGEX.userIllust.test(pathName) || PAGE_REGEX.userNovel.test(pathName)) {
		// ユーザー一覧のタグ絞りの場合
		const userTag = /\/users\/\d+\/(illustrations|manga|artworks)\/.+/;
		if (userTag.test(pathName)) {
			data.body.works = data.body.works.filter((work: Work) =>
				filterMuted(work, muteSettings),
			);
		} else {
			data.body.works &&
				(data.body.works = Object.fromEntries(
					Object.entries(data.body.works).filter(([_, work]) =>
						filterMuted(work as Work, muteSettings),
					),
				));
		}
	}

	if (PAGE_REGEX.tagIllust.test(pathName)) {
		const filteredWorks = (
			data.body.illustManga?.data ??
			data.body.illust?.data ??
			data.body.manga?.data
		)?.filter((work: Work) => filterMuted(work, muteSettings));

		if (data.body.illustManga?.data) {
			data.body.illustManga.data = filteredWorks;
		} else if (data.body.illust?.data) {
			data.body.illust.data = filteredWorks;
		} else if (data.body.manga?.data) {
			data.body.manga.data = filteredWorks;
		}
	}

	if (PAGE_REGEX.tagNovel.test(pathName)) {
		data.body.novel.data = data.body.novel.data.filter((work: Work) =>
			filterMuted(work, muteSettings),
		);
	}

	// トップページからフォロー新着に移動すると、データがそのまま使用されるため、ここでフィルタリング
	const topPageRegex = /^\/(en\/|manga)?$/;
	if (topPageRegex.test(pathName)) {
		data.body.thumbnails.illust = data.body.thumbnails.illust.filter((work: Work) =>
			filterMuted(work, muteSettings),
		);
	}

	return data;
};

export default defineUnlistedScript(() => {
	let apiUrl: string;
	let userWorks: UserWorks;
	const originalFetch = window.fetch.bind(window);

	// リクエストURLとユーザー作品一覧をcontent scriptに送信
	pisFetchMessenger.onMessage("firstPageRequest", () => {
		return { apiUrl, userWorks };
	});

	window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
		try {
			const response = await originalFetch(input, init);
			const inputUrl = input.toString();

			if (!Object.values(API_REGEX).some((r) => r.test(inputUrl))) {
				return response;
			}

			const clonedResponse = response.clone();
			const jsonResponse = await clonedResponse.json();

			if (API_REGEX.userAll.test(inputUrl)) {
				userWorks = jsonResponse;
				return response;
			}

			apiUrl = new URL(inputUrl, BASE_URL).toString();

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
