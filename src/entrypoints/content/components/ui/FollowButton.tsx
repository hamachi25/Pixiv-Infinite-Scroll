import { postData } from "../../fetch/post";
import { CsrfContext } from "@content/context";
import { fetchOrigin } from "../../fetch/fetch";
import { extractCsrfToken } from "../../utils/extractDataFromOrigin";

interface Props {
	userId: string;
	following: boolean;
}

export const FollowButton = ({ userId, following }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(following);
	const csrfToken = useContext(CsrfContext);

	const follow = async () => {
		setIsFollowing(true);
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
			mode: "add",
			type: "user",
			user_id: userId,
			tag: "",
			restrict: "0",
			format: "json",
		});

		postData("https://www.pixiv.net/bookmark_add.php", headers, body).then((data) => {
			if (!data) setIsFollowing(false);
		});
	};

	const unfollow = async () => {
		setIsFollowing(false);
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
			mode: "del",
			type: "bookuser",
			id: userId,
		});

		postData("https://www.pixiv.net/rpc_group_setting.php", headers, body).then((data) => {
			if (!data) setIsFollowing(true);
		});
	};

	return (
		<button
			type="button"
			className={`h-[40px] rounded-full px-[24px] font-bold transition-[color,background-color,box-shadow] ${
				isFollowing
					? "bg-(--charcoal-surface3) text-(--charcoal-text2) hover:bg-(--charcoal-surface3-hover) hover:text-(--charcoal-text2-hover)"
					: "bg-(--charcoal-brand) text-(--charcoal-text5) hover:bg-(--charcoal-brand-hover) hover:text-(--charcoal-text5-hover)"
			} `}
			onClick={isFollowing ? unfollow : follow}
		>
			{isFollowing ? i18n.t("following.following") : i18n.t("following.follow")}
		</button>
	);
};
