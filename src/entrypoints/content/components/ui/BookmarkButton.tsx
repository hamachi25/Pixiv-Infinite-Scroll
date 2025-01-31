import type { Work } from "@/types/type";
import { postData } from "../../fetch/post";
import { CsrfContext, SensitiveContext } from "../../context";
import { fetchOrigin } from "../../fetch/fetch";
import { extractCsrfToken } from "../../utils/extractDataFromOrigin";

interface Props {
	work: Work;
	type: "illust" | "novel";
}

export const BookmarkButton = ({ work, type }: Props) => {
	const [bookmarkId, setBookmarkId] = useState<string | undefined>(work.bookmarkData?.id);
	const csrfToken = useContext(CsrfContext);
	const isSensitive = useContext(SensitiveContext);

	const addBookmark = async () => {
		if (!csrfToken.current) {
			await fetchOrigin().then((html) => {
				const token = extractCsrfToken(html);
				if (!token) return;

				csrfToken.current = token;
			});
			if (!csrfToken.current) return;
		}

		const headers = {
			"Content-Type": "application/json",
			"x-csrf-token": csrfToken.current,
		};
		const body = JSON.stringify({
			[type === "illust" ? "illust_id" : "novel_id"]: work.id,
			restrict: 0,
			comment: "",
			tags: [],
		});

		postData(
			`https://www.pixiv.net/ajax/${type === "illust" ? "illusts" : "novels"}/bookmarks/add`,
			headers,
			body,
		).then((data) => {
			if (!data) return;

			setBookmarkId(data.body.last_bookmark_id ?? data.body);
		});
	};

	const deleteBookmark = async () => {
		if (!bookmarkId) return;
		if (!csrfToken.current) {
			await fetchOrigin().then((html) => {
				const token = extractCsrfToken(html);
				if (!token) return;

				csrfToken.current = token;
			});
			if (!csrfToken.current) return;
		}

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"x-csrf-token": csrfToken.current,
		};
		const body = new URLSearchParams({
			[type === "illust" ? "bookmark_id" : "book_id"]: bookmarkId,
		});

		postData(
			`https://www.pixiv.net/ajax/${type === "illust" ? "illusts" : "novels"}/bookmarks/delete`,
			headers,
			body,
		).then((data) => {
			if (!data) return;

			const bookmarkId = data.body;
			if (bookmarkId) setBookmarkId(undefined);
		});
	};

	const shouldDisplayBookmark =
		(!(isSensitive && (work.sl === 4 || work.sl === 6)) || bookmarkId) &&
		(type === "novel" || !work.isMuted);

	return (
		<>
			{shouldDisplayBookmark ? (
				<button
					className={`${work.isMuted && !bookmarkId && "cursor-default opacity-40"} absolute bottom-0 right-0 flex h-[32px] w-[32px] cursor-pointer justify-end`}
					type="button"
					onClick={bookmarkId ? deleteBookmark : addBookmark}
					disabled={work.isMuted && !bookmarkId}
				>
					<svg
						className="transition-[fill,colors] duration-200"
						style={{
							fill: bookmarkId ? "var(--charcoal-like)" : "rgb(31, 31, 31)",
						}}
						viewBox="0 0 32 32"
						width={32}
						height={32}
					>
						<path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z" />
						<path
							className="transition-[fill] duration-200"
							style={{
								fill: bookmarkId ? "var(--charcoal-like)" : "var(--charcoal-text5)",
							}}
							d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z"
						/>
					</svg>
				</button>
			) : (
				<div />
			)}
		</>
	);
};
