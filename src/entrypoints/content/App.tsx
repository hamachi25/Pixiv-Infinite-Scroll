import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { InView, useInView } from "react-intersection-observer";

import type { WorkTag, Work, UserWorks } from "./type";

import { GridIllusts } from "./components/page/GridIllusts";
import { Following } from "./components/page/Following";
import { Novels } from "./components/page/Novels";

import { PageHeader } from "./components/ui/PageHeader";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

import { transformData } from "./utils/transformData";
import { extractWorkTag } from "./utils/extractWorkTag";
import { generateRequestUrl } from "./utils/generateRequestUrl";
import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { PAGE_REGEX } from "./constants/urlRegex";
import { fetchData } from "./fetch/fetch";

const InnerContent = ({ works }: { works: Work[] }) => {
	const pathName = location.pathname;

	// フォロー中
	if (PAGE_REGEX.following.test(pathName)) {
		return <Following profiles={works} />;
	}

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

	// ユーザーのイラスト一覧
	if (PAGE_REGEX.userIllust.test(pathName)) {
		return <GridIllusts illusts={works} type="user" />;
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

export default () => {
	const [works, setWorks] = useState<Work[][]>(() => []);
	const [hasMore, setHasMore] = useState<boolean | undefined>(false); // さらに読み込むかどうか
	const userWorks = useRef<UserWorks>({}); // ユーザーの作品一覧
	const workTag = useRef<WorkTag | undefined>(undefined);
	const page = useRef(2);
	const prevScrollY = useRef(window.scrollY); // 前回のスクロール位置s

	const loadMore = () => {
		if (hasMore === undefined) return;

		setHasMore(true);
		const requestUrl = generateRequestUrl(workTag.current, page.current, userWorks.current);
		if (!requestUrl) {
			setHasMore(undefined);
			return;
		}

		fetchData(requestUrl).then((data) => {
			if (!data) return;

			const transformedData = transformData(data, location);
			setWorks((prevWorks) => [...prevWorks, transformedData]);
			page.current += 1;

			if (transformedData.length === 0) {
				setHasMore(undefined);
			} else {
				setHasMore(false);
			}
		});
	};

	useEffect(() => {
		(async () => {
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
				if (!tag.path.other) return;

				const targetUrl = `https://www.pixiv.net/ajax/user/${tag.path.other[0]}/profile/all?sensitiveFilterMode=userSetting`;
				await fetchData(targetUrl).then((data) => {
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
		})();
	}, []);

	// 1ページ目にURLを書き換えるIntersectionObserverを追加
	useEffect(() => {
		if (!workTag.current) return;

		const anchor = getElementSelectorByUrl(location);
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

	const { ref } = useInView({
		rootMargin: "-150% 0px",
		onChange: (inView) => {
			const isScrollingDown = window.scrollY > prevScrollY.current;
			if (inView && isScrollingDown) {
				prevScrollY.current = window.scrollY;
				loadMore();
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
