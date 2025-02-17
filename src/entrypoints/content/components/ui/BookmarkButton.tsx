import type { Work } from "@content/type";
import { postData } from "../../fetch/post";
import { CsrfContext, SensitiveContext } from "@content/context";
import { fetchOrigin } from "../../fetch/fetch";
import { extractCsrfToken } from "../../utils/extractDataFromOrigin";
import { Bookmark } from "../icons/Bookmark";

interface Props {
	bookmarkData?: {
		id: string;
		private: boolean;
	} | null;
	work: Work;
	type: "illust" | "novel";
}

export const BookmarkButton = ({ bookmarkData, work, type }: Props) => {
	const [bookmarkId, setBookmarkId] = useState<string | undefined>(bookmarkData?.id);
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

	const showBookmarkButton = () => {
		return !(isSensitive && (work.sl === 4 || work.sl === 6)) || bookmarkId;
	};

	return (
		<>
			{showBookmarkButton() ? (
				<button
					className="absolute bottom-0 right-0 flex h-[32px] w-[32px] cursor-pointer justify-end"
					type="button"
					onClick={bookmarkId ? deleteBookmark : addBookmark}
				>
					<Bookmark active={!!bookmarkId} />
				</button>
			) : (
				<div />
			)}
		</>
	);
};
