import { Work, ProfilePopupType } from "../type";

export const handleProfileMouseEnter = (
	e: React.MouseEvent<HTMLDivElement>,
	work: Work,
	profilePopupData: ProfilePopupType | undefined,
	setProfilePopupData: React.Dispatch<React.SetStateAction<ProfilePopupType | undefined>>,
) => {
	if (profilePopupData?.hoverTimeout) {
		clearTimeout(profilePopupData.hoverTimeout);
	}

	const hostRect = (e.currentTarget.getRootNode() as ShadowRoot).host.getBoundingClientRect();
	const rect = e.currentTarget.getBoundingClientRect();
	const offsetTop = rect.top - hostRect.top;
	const offsetLeft = rect.left - hostRect.left - (168 - rect.width / 2);

	const timeout = setTimeout(() => {
		setProfilePopupData({
			hoverTimeout: timeout,
			userId: work.userId,
			position: {
				rectTop: rect.top,
				top: offsetTop,
				left: offsetLeft,
				width: rect.width,
				height: rect.height,
			},
		});
	}, 200);
};

export const handleProfileMouseLeave = (
	profilePopupData: ProfilePopupType | undefined,
	setProfilePopupData: React.Dispatch<React.SetStateAction<ProfilePopupType | undefined>>,
) => {
	if (profilePopupData?.hoverTimeout) {
		clearTimeout(profilePopupData.hoverTimeout);
	}

	const timeout = setTimeout(() => {
		setProfilePopupData(undefined);
	}, 200);
	setProfilePopupData((prev) => (prev ? { ...prev, hoverTimeout: timeout } : undefined));
};
