import { PAGE_REGEX } from "@/constants/urlRegex";
import { Work } from "@/types/works";
import { TagMute, UserMute } from "@/types/storage";

const filterMuted = (
	work: Work,
	mutedItems: {
		mutedUserIds: Set<string>;
		mutedTags: Set<string>;
		isMute: boolean;
	},
): boolean => {
	// ユーザーがミュートされている場合
	if (mutedItems.mutedUserIds.has(work.userId)) {
		return false;
	}

	// タグが存在しない場合
	if (!work.tags || work.tags.length === 0) {
		return true;
	}

	// ミュートされたタグが含まれているか確認
	return !work.tags.some((tag) => mutedItems.mutedTags.has(tag));
};

export const filterFirstPageWorks = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any,
	muteSettings: {
		tags: TagMute[];
		users: UserMute[];
		isMute: boolean;
	},
) => {
	const pathName = location.pathname;

	if (muteSettings.tags.length === 0 && muteSettings.users.length === 0) {
		return data;
	}

	const mutedUserIds = new Set(muteSettings.users.map((user) => user.id));
	const mutedTags = new Set(muteSettings.tags);
	const mutedItems = { mutedUserIds, mutedTags, isMute: muteSettings.isMute };

	if (PAGE_REGEX.newNovel.test(pathName)) {
		data.body.thumbnails.novel = data.body.thumbnails.novel.filter((work: Work) =>
			filterMuted(work, mutedItems),
		);
		return data;
	}

	if (PAGE_REGEX.newIllust.test(pathName)) {
		data.body.thumbnails.illust = data.body.thumbnails.illust.filter((work: Work) =>
			filterMuted(work, mutedItems),
		);
		return data;
	}

	if (PAGE_REGEX.following.test(pathName)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data.body.users = data.body.users.map((user: any) => {
			user.illusts = user.illusts
				.map((illust: Work) => illust)
				.filter((illust: Work) => filterMuted(illust, mutedItems));
			user.novels = user.novels
				.map((novel: Work) => novel)
				.filter((novel: Work) => filterMuted(novel, mutedItems));
			return user;
		});
		return data;
	}

	if (PAGE_REGEX.userIllust.test(pathName) || PAGE_REGEX.userNovel.test(pathName)) {
		// ユーザー一覧のタグ絞りの場合
		const userTag = /\/users\/\d+\/(illustrations|manga|artworks)\/.+/;
		if (userTag.test(pathName)) {
			data.body.works = data.body.works.filter((work: Work) => filterMuted(work, mutedItems));
		} else {
			if (data.body.works) {
				data.body.works = Object.fromEntries(
					Object.entries(data.body.works).filter(([, work]) =>
						filterMuted(work as Work, mutedItems),
					),
				);
			}
		}
		return data;
	}

	if (PAGE_REGEX.tagIllust.test(pathName)) {
		const filteredWorks = (
			data.body.illustManga?.data ??
			data.body.illust?.data ??
			data.body.manga?.data
		)?.filter((work: Work) => filterMuted(work, mutedItems));

		if (data.body.illustManga?.data) {
			data.body.illustManga.data = filteredWorks;
		} else if (data.body.illust?.data) {
			data.body.illust.data = filteredWorks;
		} else if (data.body.manga?.data) {
			data.body.manga.data = filteredWorks;
		}
		return data;
	}

	if (PAGE_REGEX.tagNovel.test(pathName)) {
		data.body.novel.data = data.body.novel.data.filter((work: Work) =>
			filterMuted(work, mutedItems),
		);
		return data;
	}

	// トップページからフォロー新着に移動すると、データがそのまま使用されるため、ここでフィルタリング
	const topPageRegex = /^\/(illustration|manga)?$/;
	if (topPageRegex.test(pathName)) {
		data.body.thumbnails.illust = data.body.thumbnails.illust.filter((work: Work) =>
			filterMuted(work, mutedItems),
		);
		return data;
	}

	return data;
};
