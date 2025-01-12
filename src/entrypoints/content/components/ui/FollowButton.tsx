import { i18n } from "#i18n";
import { postData } from "../../fetch/post";
import { CsrfContext } from "../../context";
import { fetchCsrfToken } from "../../fetch/fetchCsrfToken";

interface Props {
	userId: string;
}

export const FollowButton = ({ userId }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(true);
	const csrfToken = useContext(CsrfContext);

	const follow = async () => {
		if (!csrfToken.current) {
			await fetchCsrfToken().then((token) => {
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
			if (!data) return;
			setIsFollowing(true);
		});
	};

	const unfollow = async () => {
		if (!csrfToken.current) {
			await fetchCsrfToken().then((token) => {
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
			if (!data) return;
			setIsFollowing(false);
		});
	};

	return (
		<div className="mt-[16px]">
			<button
				type="button"
				className={`h-[40px] rounded-full px-[24px] font-bold transition-[color,background-color,box-shadow] ${
					isFollowing
						? "bg-[var(--charcoal-surface3)] text-[var(--charcoal-text2)] hover:bg-[var(--charcoal-surface3-hover)] hover:text-[var(--charcoal-text2-hover)]"
						: "bg-[var(--charcoal-brand)] text-[var(--charcoal-text5)] hover:bg-[var(--charcoal-brand-hover)] hover:text-[var(--charcoal-text5-hover)]"
				} `}
				onClick={isFollowing ? unfollow : follow}
			>
				{isFollowing ? i18n.t("following.following") : i18n.t("following.follow")}
			</button>
		</div>
	);
};
