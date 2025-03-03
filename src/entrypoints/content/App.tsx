import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { InView, useInView } from "react-intersection-observer";

import GridIllusts from "./pages/GridIllusts.tsx";
import Following from "./pages/Following.tsx";
import Novels from "./pages/Novels.tsx";
import { PageHeader } from "./components/ui/PageHeader";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

import { transformData } from "./utils/transformData";
import { extractWorkTag } from "./utils/extractWorkTag";
import { generateRequestUrl } from "./utils/generateRequestUrl";
import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";

import type { WorkTag, UserWorks } from "@content/type";
import type { Work } from "@/types/works";
import { PAGE_REGEX } from "@/constants/urlRegex.ts";
import { fetchData } from "./fetch/fetch";
import { MuteContext } from "./context";

const InnerContent = ({ works }: { works: Work[] }) => {
	const pathName = location.pathname;

	// ユーザーの小説一覧
	if (PAGE_REGEX.userNovel.test(pathName)) {
		return <Novels novels={works} type="user" />;
	}

	// タグ検索の小説
	if (PAGE_REGEX.tagNovel.test(pathName)) {
		return <Novels novels={works} type="tag" />;
	}

	// フォロー新着の小説
	if (PAGE_REGEX.newNovel.test(pathName)) {
		return <Novels novels={works} type="newNovel" />;
	}

	// ブックマークの小説
	if (PAGE_REGEX.bookmarkNovel.test(pathName)) {
		return <Novels novels={works} type="bookmark" />;
	}

	// フォロー中
	if (PAGE_REGEX.following.test(pathName)) {
		return <Following profiles={works} />;
	}

	// ユーザーのイラスト一覧
	if (PAGE_REGEX.userIllust.test(pathName)) {
		return <GridIllusts illusts={works} type="user" />;
	}

	// ブックマークのイラスト
	if (PAGE_REGEX.bookmarkIllust.test(pathName)) {
		return <GridIllusts illusts={works} type="bookmark" />;
	}

	return <GridIllusts illusts={works} type="other" />;
};

const ItemContent = memo(
	({
		works,
		workTag,
		index,
	}: {
		works: Work[];
		workTag: React.RefObject<WorkTag | undefined>;
		index: number;
	}) => {
		return works.length !== 0 ? (
			<InView
				as="div"
				rootMargin="-50% 0px"
				onChange={(inView) => {
					if (inView) {
						const oldUrl = new URL(location.href);
						const page = workTag.current?.param?.p
							? Number(workTag.current.param.p) + index + 1
							: index + 2;
						oldUrl.searchParams.set("p", page.toString());

						const newUrl = oldUrl.toString();
						history.pushState(null, "", newUrl);
					}
				}}
			>
				<PageHeader workTag={workTag} index={index} location={location} />
				<InnerContent works={works} />
			</InView>
		) : (
			<div className="h-[63px]" />
		);
	},
);
ItemContent.displayName = "ItemContent";

const App = () => {
	const [works, setWorks] = useState<Work[][]>(() => []);
	const [hasMore, setHasMore] = useState<boolean | undefined>(false); // さらに読み込むかどうか
	const userWorks = useRef<UserWorks>({}); // ユーザーの作品一覧
	const workTag = useRef<WorkTag | undefined>(undefined);
	const page = useRef(2);
	const inView = useRef(false);

	const muteSettings = useContext(MuteContext);

	// Intersection Observer発火後にmuteSettingsが読み込まれた場合
	useEffect(() => {
		(async () => {
			if (muteSettings.tags[0] !== "null" && inView.current) {
				await firstPageRequest();
				await loadMore();
			}
		})();
	}, [muteSettings.tags]);

	const loadMore = async () => {
		if (hasMore === undefined) return;

		setHasMore(true);
		const requestUrl = generateRequestUrl(workTag.current, page.current, userWorks.current);
		if (!requestUrl) {
			setHasMore(undefined);
			return;
		}

		fetchData(requestUrl).then((data) => {
			if (!data) {
				setHasMore(false);
				return;
			}

			const transformedData = transformData(data, location, muteSettings);
			setWorks((prevWorks) => [...prevWorks, transformedData]);
			page.current += 1;

			if (transformedData.length === 0) {
				setHasMore(undefined);
			} else {
				setHasMore(false);
			}
		});
	};

	const firstPageRequest = async () => {
		if (page.current !== 2) return;

		setHasMore(true);

		const tag = extractWorkTag(location);
		if (!tag) return;
		workTag.current = tag;

		const pageFromUrl = tag.param.p;
		if (pageFromUrl) page.current = Number(pageFromUrl) + 1;

		// ユーザーのイラスト・小説のidをまとめて取得
		if (
			PAGE_REGEX.userIllust.test(location.pathname) ||
			PAGE_REGEX.userNovel.test(location.pathname)
		) {
			if (!tag.path.other) {
				setHasMore(false);
				return;
			}

			const targetUrl = `https://www.pixiv.net/ajax/user/${tag.path.other[0]}/profile/all?sensitiveFilterMode=userSetting`;
			await fetchData(targetUrl).then((data) => {
				if (!data) {
					setHasMore(false);
					return;
				}

				const { illusts, manga, novels } = data.body;
				const combined = { ...illusts, ...manga };
				const sortedKeys = Object.keys(combined).sort((a, b) => Number(b) - Number(a));

				userWorks.current = {
					illusts: Object.keys(illusts).reverse(),
					manga: Object.keys(manga).reverse(),
					illustManga: sortedKeys,
					novels: Object.keys(novels).reverse(),
				};
			});
		}
	};

	// 1ページ目にURLを書き換えるIntersectionObserverを追加
	useEffect(() => {
		if (!workTag.current) return;

		const anchor = getElementSelectorByUrl(location);
		if (!anchor) return;
		const firstPageElement = document.querySelector(anchor);
		if (!firstPageElement) return;

		const oldUrl = new URL(location.href);
		const page = workTag.current?.param.p ? Number(workTag.current.param.p) : 1;
		oldUrl.searchParams.set("p", page.toString());
		const newUrl = oldUrl.toString();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const isFirst =
							page === 1
								? !new URLSearchParams(location.search).has("p")
								: location.href === newUrl;
						if (!isFirst) history.pushState(null, "", newUrl);
					}
				}
			},
			{
				rootMargin: "-50% 0px",
			},
		);

		observer.observe(firstPageElement);
		return () => observer.disconnect();
	}, [workTag.current]);

	// muteのオンオフをリアルタイムで反映
	useEffect(() => {
		setWorks((prevWorks) =>
			prevWorks.map((work) =>
				work.map((item) => {
					if (item.isMuted !== undefined) {
						item.isMuted = !item.isMuted;
					}

					item.illusts?.forEach((illust) => {
						if (illust.isMuted !== undefined) {
							illust.isMuted = !illust.isMuted;
						}
					});
					item.novels?.forEach((novel) => {
						if (novel.isMuted !== undefined) {
							novel.isMuted = !novel.isMuted;
						}
					});

					return item;
				}),
			),
		);
	}, [muteSettings.isMute]);

	// ユーザー作品ページでミュートを行うと、空のdivが追加されるので非表示
	useEffect(() => {
		if (
			!PAGE_REGEX.userIllust.test(location.pathname) &&
			!PAGE_REGEX.userNovel.test(location.pathname)
		) {
			return;
		}

		const element = document.querySelector("div:empty:has(+div>div>ul)");
		if (element) {
			(element as HTMLElement).style.display = "none";
		}
	}, []);

	const { ref } = useInView({
		rootMargin: "50% 0px",
		onChange: async (isInView) => {
			inView.current = isInView;
			if (isInView && muteSettings.tags[0] !== "null") {
				await firstPageRequest();
				await loadMore();
			}
		},
	});

	return (
		<>
			<Virtuoso
				useWindowScroll
				data={works}
				itemContent={(index, works) => (
					<ItemContent works={works} workTag={workTag} index={index} />
				)}
			/>
			<LoadingSpinner ref={ref} hasMore={hasMore} />
		</>
	);
};
export default App;
