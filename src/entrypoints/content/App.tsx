import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { InView } from "react-intersection-observer";

import type { TransformUserWorks } from "./type";
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
						const currentPage = firstPage.current + index;
						oldUrl.searchParams.set("p", currentPage.toString());
						const newUrl = oldUrl.toString();

						const isFirst =
							index === 0
								? !new URLSearchParams(location.search).has("p")
								: location.href === newUrl;
						if (!isFirst) history.pushState(null, "", newUrl);
					}
				}}
			>
				{index !== 0 && <PageHeader firstPage={firstPage.current} index={index} />}
				<InnerContent works={works} />
			</InView>
		) : (
			<div className="h-[63px]" />
		);
	},
);

export default () => {
	const [works, setWorks] = useState<Work[][]>(() => []);
	const [hasMore, setHasMore] = useState<boolean | undefined>(false); // さらに読み込むかどうか
	const hasRun = useRef(false); // useEffectを初回のみ実行
	const prevScrollY = useRef(window.scrollY); // 前回のスクロール位置

	const firstPage = useRef(0); // 初期ページ(変動しない)
	const currentPage = useRef(1); // 現在のページ

	// main worldからのデータ
	const userWorks = useRef<TransformUserWorks>({});
	const apiUrl = useRef("");

	const muteSettings = useContext(MuteContext);

	const loadMore = () => {
		if (hasMore === undefined || !apiUrl.current) return;

		setHasMore(true);
		const requestUrl = generateRequestUrl(
			apiUrl.current,
			currentPage.current,
			userWorks.current,
		);
		if (!requestUrl) {
			setHasMore(undefined);
			return;
		}

		fetchData(requestUrl).then((data) => {
			if (!data) {
				setHasMore(undefined);
				return;
			}

			const transformedData = transformData(data, location, muteSettings);
			setWorks((prevWorks) => [...prevWorks, transformedData]);
			currentPage.current += 1;

			if (transformedData.length === 0) {
				setHasMore(undefined);
			} else {
				setHasMore(false);
			}
		});
	};

	// TODO: レスポンス遅延の限度が決まっているため、改善したい
	/*
	 * main worldからデータを、onMessageで受け取ればレスポンスが遅くても問題なくなる
	 * ただしレスポンスが早い場合は、content scriptが実行される前に送信されてしまう
	 */

	// main worldでのレスポンスが遅い場合は、繰り返し実行する
	const RETRY_INTERVAL = 200;
	const MAX_RETRIES = 8;
	useEffect(() => {
		if (muteSettings.tags[0] === "null" || hasRun.current) return;

		let retryCount = 0;
		let timeoutId: NodeJS.Timeout;

		const fetchApiUrl = async () => {
			try {
				const fetchedFirstRequest = await pisFetchMessenger.sendMessage(
					"firstPageRequest",
					null,
				);

				if (!fetchedFirstRequest.apiUrl) {
					if (retryCount < MAX_RETRIES) {
						retryCount++;
						timeoutId = setTimeout(fetchApiUrl, RETRY_INTERVAL);
						return;
					}
					setHasMore(undefined);
					return;
				}

				// APIUrl取得成功時の処理
				if (fetchedFirstRequest.userWorks) {
					const { illusts, manga, novels } = fetchedFirstRequest.userWorks.body;
					const combined = { ...illusts, ...manga };
					const illustMangaKeys = Object.keys(combined).sort(
						(a, b) => Number(b) - Number(a),
					);

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

				const transformedData = transformData(
					fetchedFirstRequest.firstPageWorks,
					location,
					muteSettings,
				);
				setWorks(() => [transformedData]);
				hasRun.current = true;
			} catch (error) {
				console.error("Error fetching API URL:", error);
				setHasMore(undefined);
			}
		};

		fetchApiUrl();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [muteSettings]);

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

	// context propの使い方がわからないのでメモ化
	// https://virtuoso.dev/footer/
	const Footer = useCallback(() => <LoadingSpinner hasMore={hasMore} />, [hasMore]);

	return (
		<InView
			as="div"
			rootMargin="-140% 0px"
			onChange={async (inView) => {
				// 下にスクロールしたときのみ、読み込む
				const isScrollingDown = window.scrollY > prevScrollY.current;
				if (!inView && isScrollingDown) {
					prevScrollY.current = window.scrollY;
					loadMore();
				}
			}}
		>
			<Virtuoso
				useWindowScroll
				data={works}
				components={{ Footer }}
				itemContent={(index, works) => (
					<ItemContent works={works} index={index} firstPage={firstPage} />
				)}
			/>
		</InView>
	);
};
