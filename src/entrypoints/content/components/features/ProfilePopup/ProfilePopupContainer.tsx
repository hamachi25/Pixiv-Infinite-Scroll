import { useLayoutEffect } from "react";
import type { ProfileData, ProfileWork } from "@content/type";
import { fetchData } from "../../../fetch/fetch";
import { FollowButton } from "../../ui/FollowButton";
import { RequestMark } from "../../ui/RequestMark";
import { useStore } from "@content/store";

import { BackgroundImage } from "./BackgroundImage";
import { Profile } from "./Profile";
import { ViewProfile } from "./ViewProfile";
import { GridImage } from "./GridImage";

const cache = new Map<string, unknown>();

const fetchDataWithCache = async (url: string) => {
	if (cache.has(url)) {
		return cache.get(url);
	}
	const data = await fetchData(url);
	cache.set(url, data);
	return data;
};

const handleMouseEnter = () => {
	const { hoverTimeout } = useStore.getState();
	if (hoverTimeout) {
		clearTimeout(hoverTimeout);
	}
};

const handleMouseLeave = () => {
	const { setHoverTimeout, setProfilePopupData } = useStore.getState();
	const timeout = setTimeout(() => {
		setProfilePopupData(undefined);
	}, 200);
	setHoverTimeout(timeout);
};

export const ProfilePopupContainer = () => {
	const popupRef = useRef<HTMLDivElement>(null);
	const [profileFetchData, setProfileFetchData] = useState<ProfileData | undefined>(undefined);
	const [latestWorks, setLatestWorks] = useState<ProfileWork[]>([]);
	const [position, setPosition] = useState({
		top: "0px",
		left: "0px",
	});

	const profilePopupData = useStore((state) => state.profilePopupData);

	// データ取得
	useLayoutEffect(() => {
		if (!profilePopupData) return;
		setProfileFetchData(undefined); // 前のデータをクリア

		Promise.all([
			fetchDataWithCache(`https://www.pixiv.net/ajax/user/${profilePopupData.userId}?full=1`),
			fetchDataWithCache(
				`https://www.pixiv.net/ajax/user/${profilePopupData.userId}/works/latest`,
			),
		]).then(([profileResponse, worksResponse]) => {
			const illusts = Object.values(worksResponse.body.illusts)
				.filter((work: unknown): work is ProfileWork => work !== null)
				.reverse()
				.map((work: ProfileWork) => ({ ...work, workType: "illust" }));

			const novels: ProfileWork[] = Object.values(worksResponse.body.novels)
				.filter((work: unknown): work is ProfileWork => work !== null)
				.reverse()
				.map((work: ProfileWork) => ({ ...work, workType: "novel" }));

			let resultWorks: ProfileWork[] = [];
			if (illusts.length >= 3) {
				resultWorks = illusts.slice(0, 3);
			} else {
				resultWorks = [...illusts, ...novels.slice(0, 3 - illusts.length)];
			}

			setLatestWorks(resultWorks);
			setProfileFetchData(profileResponse.body);
		});
	}, [profilePopupData]);

	// ポップアップの位置
	useLayoutEffect(() => {
		if (popupRef.current && profilePopupData) {
			const { top, rectTop, height, left } = profilePopupData.position;
			const calculatedTop =
				top -
				(rectTop > window.innerHeight / 2
					? popupRef.current.getBoundingClientRect().height + 4
					: -height - 4);

			setPosition({
				top: `${calculatedTop}px`,
				left: `${left}px`,
			});
		}
	}, [profileFetchData, profilePopupData]);

	// データ取得されるまで、ポップアップを表示しない
	if (!profilePopupData || !profileFetchData) return null;

	const filteredComments =
		profileFetchData.comment.length > 39
			? `${profileFetchData.comment.substring(0, 39)}…`
			: profileFetchData.comment;

	return (
		<div
			className="absolute z-10 box-content flex w-[336px] flex-col rounded-[8px] border border-solid border-(--charcoal-border-default) bg-(--charcoal-surface1) pt-[24px]"
			style={position}
			ref={popupRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<BackgroundImage profileFetchData={profileFetchData} />

			<div className="pointer-events-none flex flex-col items-center px-[24px] text-center *:pointer-events-auto">
				<Profile profileFetchData={profileFetchData} />

				{profileFetchData.commission && (
					<div className="my-[4px]">
						<RequestMark
							acceptRequest={profileFetchData.commission.acceptRequest}
							userId={profileFetchData.userId}
						/>
					</div>
				)}

				{profileFetchData.comment && (
					<p className="text-(--charcoal-text2)">{filteredComments}</p>
				)}

				<ViewProfile profileFetchData={profileFetchData} />

				<div className="mt-[12px] mb-[24px]">
					<FollowButton
						userId={profileFetchData.userId}
						following={profileFetchData.isFollowed}
					/>
				</div>
			</div>
			<div className="flex">
				{latestWorks?.map((work) => <GridImage key={work.id} work={work} />)}
			</div>
		</div>
	);
};
