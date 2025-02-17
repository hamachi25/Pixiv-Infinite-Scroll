import { Work } from "../type";
import { useStore } from "@content/store";

export const handleProfileMouseEnter = (e: React.MouseEvent<HTMLDivElement>, work: Work) => {
	const { hoverTimeout, setHoverTimeout, profilePopupData, setProfilePopupData } =
		useStore.getState();

	if (hoverTimeout) {
		clearTimeout(hoverTimeout);
	}

	if (profilePopupData?.userId === work.userId) {
		return;
	}

	const hostRect = (e.currentTarget.getRootNode() as ShadowRoot).host.getBoundingClientRect();
	const rect = e.currentTarget.getBoundingClientRect();
	const offsetTop = rect.top - hostRect.top;
	const offsetLeft = rect.left - hostRect.left - (168 - rect.width / 2);

	const timeout = setTimeout(() => {
		setProfilePopupData({
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
	setHoverTimeout(timeout);
};

export const handleProfileMouseLeave = () => {
	const { hoverTimeout, setHoverTimeout, setProfilePopupData } = useStore.getState();

	if (hoverTimeout) {
		clearTimeout(hoverTimeout);
	}

	const timeout = setTimeout(() => {
		setProfilePopupData(undefined);
	}, 200);
	setHoverTimeout(timeout);
};
