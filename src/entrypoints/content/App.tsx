import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { InView } from "react-intersection-observer";

import type { UserWorks } from "./type";
import type { Work } from "@/types/type";

import { GridIllusts } from "./components/page/GridIllusts";
import { Following } from "./components/page/Following";
import { Novels } from "./components/page/Novels";

import { PageHeader } from "./components/ui/PageHeader";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

import { transformData } from "./utils/transformData";
import { generateRequestUrl } from "./utils/generateRequestUrl";
import { PAGE_REGEX } from "@/constants/urlRegex";
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
		index,
		firstPage,
	}: {
		works: Work[];
		index: number;
		firstPage: React.RefObject<number>;
	}) => {
		return works.length !== 0 ? (
			<InView
				as="div"
				rootMargin="-50% 0px"
				onChange={(inView) => {
					if (inView) {
						const oldUrl = new URL(location.href);
						const currentPage = firstPage.current + index + 1;
						oldUrl.searchParams.set("p", currentPage.toString());

						const newUrl = oldUrl.toString();
						history.pushState(null, "", newUrl);
					}
				}}
			>
				<PageHeader firstPage={firstPage.current} index={index} />
				<InnerContent works={works} />
			</InView>
		) : (
			<div className="h-[63px]" />
		);
	},
);

export default () => {
	const [works, setWorks] = useState<Work[][]>(() => []);
	const [hasMore, setHasMore] = useState(true); // さらに読み込むかどうか
	const hasRun = useRef(false); // useEffectを初回のみ実行

	const firstPage = useRef(0); // 初期ページ(変動しない)
	const currentPage = useRef(1); // 現在のページ

	// main worldからのデータ
	const userWorks = useRef<UserWorks>({});
	const apiUrl = useRef("");

	const muteSettings = useContext(MuteContext);

	const loadMore = () => {
		if (!hasMore) return;

		const requestUrl = generateRequestUrl(
			apiUrl.current,
			currentPage.current,
			userWorks.current,
		);
		if (!requestUrl) {
			setHasMore(false);
			return;
		}

		fetchData(requestUrl).then((data) => {
			if (!data) {
				setHasMore(false);
				return;
			}

			const transformedData = transformData(data, location, muteSettings);
			setWorks((prevWorks) => [...prevWorks, transformedData]);
			currentPage.current += 1;

			if (transformedData.length === 0) setHasMore(false);
		});
	};

	useEffect(() => {
		if (muteSettings.tags[0] === "null" || hasRun.current) return;
		hasRun.current = true;

		(async () => {
			// リクエストURLとユーザー作品一覧をmain worldから取得
			const fetchedFirstRequest = await pisFetchMessenger.sendMessage(
				"firstPageRequest",
				null,
			);

			if (!fetchedFirstRequest.apiUrl) {
				setHasMore(false);
				return;
			}

			if (fetchedFirstRequest.userWorks) {
				const { illusts, manga, novels } = fetchedFirstRequest.userWorks.body;

				const combined = { ...illusts, ...manga };
				const illustMangaKeys = Object.keys(combined).sort((a, b) => Number(b) - Number(a));

				userWorks.current = {
					illusts: Object.keys(illusts).reverse(),
					manga: Object.keys(manga).reverse(),
					illustManga: illustMangaKeys,
					novels: Object.keys(novels).reverse(),
				};
			}

			apiUrl.current = fetchedFirstRequest.apiUrl;

			const page = Number(new URLSearchParams(location.search).get("p"));
			firstPage.current = page || 1;
			currentPage.current = page || 1;

			loadMore();
		})();
	}, [muteSettings]);

	// 1ページ目にURLを書き換えるIntersectionObserverを追加
	useEffect(() => {
		if (firstPage.current === 0) return;

		const anchor = getElementSelectorByUrl(location);
		const firstPageElement = document.querySelector(anchor);
		if (!firstPageElement) return;

		const oldUrl = new URL(location.href);
		oldUrl.searchParams.set("p", firstPage.current.toString());
		const newUrl = oldUrl.toString();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const isFirst =
							firstPage.current === 1
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
	}, [firstPage.current]);

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
		const style = document.createElement("style");
		style.textContent = "div:empty:has(+div>div>ul){display:none}";
		document.head.append(style);
	}, []);

	// context propの使い方がわからないのでメモ化
	// https://virtuoso.dev/footer/
	const Footer = useCallback(() => <LoadingSpinner hasMore={hasMore} />, [hasMore]);

	return (
		<Virtuoso
			useWindowScroll
			data={works}
			endReached={loadMore}
			components={{ Footer }}
			itemContent={(index, works) => (
				<ItemContent works={works} index={index} firstPage={firstPage} />
			)}
		/>
	);
};
