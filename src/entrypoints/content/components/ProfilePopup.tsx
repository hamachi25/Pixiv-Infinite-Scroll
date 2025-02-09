import { memo, useLayoutEffect } from "react";
import {
	SettingContext,
	ProfilePopupContext,
	SetProfilePopupContext,
	HoverTimeoutContext,
	SetHoverTimeouContext,
} from "../context";
import { fetchData } from "../fetch/fetch";
import { FollowButton } from "./ui/FollowButton";
import { IllustCount } from "./ui/IllustCount";

type ProfileWork = {
	workType: string;
	id: string;
	url: string;
	alt: string;
	title: string;
	pageCount?: number;
};

type ProfileData = {
	background: {
		url: string;
	};
	imageBig: string;
	name: string;
	comment: string;
	isFollowed: boolean;
};

const cache = new Map<string, any>();

const fetchDataWithCache = async (url: string): Promise<any> => {
	if (cache.has(url)) {
		return cache.get(url);
	}
	const data = await fetchData(url);
	cache.set(url, data);
	return data;
};

export const ProfilePopup = memo(() => {
	const popupRef = useRef<HTMLDivElement>(null);
	const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
	const [latestWorks, setLatestWorks] = useState<ProfileWork[]>([]);
	const [position, setPosition] = useState<{ top: string; left: string }>({
		top: "0px",
		left: "0px",
	});

	const settings = useContext(SettingContext);
	const profilePopupData = useContext(ProfilePopupContext);
	const setProfilePopupData = useContext(SetProfilePopupContext);
	const hoverTimeout = useContext(HoverTimeoutContext);
	const setHoverTimeout = useContext(SetHoverTimeouContext);

	// データ取得
	useLayoutEffect(() => {
		if (!profilePopupData) return;
		setProfileData(undefined); // 前のデータをクリア

		Promise.all([
			fetchDataWithCache(`https://www.pixiv.net/ajax/user/${profilePopupData.userId}?full=1`),
			fetchDataWithCache(
				`https://www.pixiv.net/ajax/user/${profilePopupData.userId}/works/latest`,
			),
		]).then(([profileResponse, worksResponse]) => {
			const illusts: ProfileWork[] = Object.values(worksResponse.body.illusts)
				.filter((work: any) => work !== null)
				.reverse()
				.map((work: any) => ({ ...work, workType: "illust" }));

			const novels: ProfileWork[] = Object.values(worksResponse.body.novels)
				.filter((work: any) => work !== null)
				.reverse()
				.map((work: any) => ({ ...work, workType: "novel" }));

			let resultWorks: ProfileWork[] = [];
			if (illusts.length >= 3) {
				resultWorks = illusts.slice(0, 3);
			} else {
				resultWorks = [...illusts, ...novels.slice(0, 3 - illusts.length)];
			}

			setLatestWorks(resultWorks);
			setProfileData(profileResponse.body);
		});
	}, [profilePopupData]);

	// ポップアップの位置
	useLayoutEffect(() => {
		if (popupRef.current && profilePopupData) {
			const { top, rectTop, height, left } = profilePopupData.position;
			const calculatedTop =
				top -
				(rectTop > window.innerHeight / 2
					? popupRef.current.getBoundingClientRect().height + 5
					: -height - 5);

			setPosition({
				top: `${calculatedTop}px`,
				left: `${left}px`,
			});
		}
	}, [profileData, profilePopupData]);

	// データ取得されるまで、ポップアップを表示しない
	if (!profileData || !profilePopupData) return null;

	const filteredComments =
		profileData.comment.length > 39
			? `${profileData.comment.substring(0, 39)}…`
			: profileData.comment;

	const handleProfileMouseEnter = () => {
		if (hoverTimeout && setHoverTimeout) {
			clearTimeout(hoverTimeout);
			setHoverTimeout(undefined);
		}
	};

	const handleProfileMouseLeave = () => {
		const timeout = setTimeout(() => {
			setProfilePopupData && setProfilePopupData(undefined);
		}, 200);
		setHoverTimeout && setHoverTimeout(timeout);
	};

	return (
		<div
			className="absolute z-10 box-content flex max-h-[609px] w-[336px] flex-col rounded-[8px] border border-[var(--charcoal-border-default)] bg-[var(--charcoal-surface1)] pt-[24px]"
			style={position}
			ref={popupRef}
			onMouseEnter={handleProfileMouseEnter}
			onMouseLeave={handleProfileMouseLeave}
		>
			{profileData.background?.url && (
				<a
					className="-mb-[64px] -mt-[24px] h-[168px] w-full"
					href={`/users/${profilePopupData.userId}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					<div
						className={`flex h-full w-full items-end rounded-t-[8px] bg-cover bg-[center_top] after:block after:h-[64px] after:w-full after:bg-[linear-gradient(rgba(0,0,0,0)0%,var(--charcoal-surface1)100%)]`}
						style={{ backgroundImage: `url(${profileData.background.url})` }}
					/>
				</a>
			)}
			<div className="pointer-events-none flex flex-col items-center px-[24px] text-center [&>*]:pointer-events-auto">
				<a
					href={`/users/${profilePopupData.userId}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					<img
						className="h-[64px] w-[64px] rounded-full object-cover object-[center_top]"
						src={profileData.imageBig}
						alt={profileData.name}
						title={profileData.name}
					/>
				</a>
				<a
					className="mt-[4px] text-[16px] font-bold text-[var(--charcoal-text1)]"
					href={`/users/${profilePopupData.userId}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					{profileData.name}
				</a>
				{profileData.comment && profileData.comment.length > 0 && (
					<p className="text-[var(--charcoal-text2)]">{filteredComments}</p>
				)}
				<a
					className="text-[var(--charcoal-text3)]"
					href={`/users/${profilePopupData.userId}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					プロフィールを見る
				</a>
				<div className="mb-[24px] mt-[12px]">
					<FollowButton
						userId={profilePopupData.userId}
						following={profileData.isFollowed}
					/>
				</div>
			</div>
			<div className="flex">
				{latestWorks?.map((work) => (
					<div
						key={work.id}
						className="flex h-[112px] w-[112px] items-end justify-center overflow-hidden rounded-[4px] bg-[var(--charcoal-surface2)]"
					>
						{work.workType === "illust" ? (
							<a
								className="group relative flex h-full w-full items-center justify-center before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:rounded-[4px] before:bg-[var(--charcoal-surface7)]"
								href={`/artworks/${work.id}`}
								title={work.title}
								target={settings?.openInNewTab ? "_blank" : undefined}
							>
								<img
									className="h-full w-full rounded-[4px] bg-[var(--charcoal-background1)] object-cover object-center transition-opacity duration-200 group-hover:opacity-80"
									src={work.url}
									alt={work.alt}
								/>
								<div className="pointer-events-none absolute left-0 right-0 top-0 flex items-start px-[4px] pt-[4px]">
									<IllustCount pageCount={work.pageCount} />
								</div>
							</a>
						) : (
							<a
								className="group relative flex h-full w-[82px] items-center justify-center before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:rounded-[4px] before:bg-[var(--charcoal-surface7)]"
								href={`/novel/show.php?id=${work.id}`}
								title={work.title}
								target={settings?.openInNewTab ? "_blank" : undefined}
							>
								<img
									className="h-full w-full rounded-b-[4px] rounded-t-[8px] bg-[var(--charcoal-background1)] object-cover object-center transition-opacity duration-200 group-hover:opacity-80"
									src={work.url}
									alt={work.alt}
								/>
								<div className="absolute left-0 top-0 h-full w-full rounded-b-[4px] rounded-t-[8px] bg-[var(--charcoal-surface4)] px-[4px] py-[12px] text-center">
									<p
										className="max-h-[80px] overflow-hidden break-words text-[12px] font-bold text-[var(--charcoal-text5)]"
										style={{
											display: "-webkit-box",
											WebkitBoxOrient: "vertical",
											WebkitLineClamp: 4,
										}}
									>
										{work.title}
									</p>
								</div>
							</a>
						)}
					</div>
				))}
			</div>
		</div>
	);
});
