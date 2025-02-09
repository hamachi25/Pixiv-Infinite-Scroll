import type { ProfilePopupContextType } from "../type";
import { Work } from "../type";

interface ProfileHandlerProps {
	mouseEnterTimeout: React.RefObject<NodeJS.Timeout | undefined>;
	profilePopupData: ProfilePopupContextType | undefined;
}

export const handleProfileMouseEnter = (
	e: React.MouseEvent<HTMLDivElement>,
	work: Work,
	{ mouseEnterTimeout, profilePopupData }: ProfileHandlerProps,
) => {
	if (!profilePopupData) return;

	if (profilePopupData.hoverTimeout) {
		clearTimeout(profilePopupData.hoverTimeout);
		profilePopupData.setHoverTimeout(undefined);
	}

	const hostRect = (e.currentTarget.getRootNode() as ShadowRoot).host.getBoundingClientRect();
	const rect = e.currentTarget.getBoundingClientRect();
	const offsetTop = rect.top - hostRect.top;
	const offsetLeft = rect.left - hostRect.left - (168 - rect.width / 2);

	const timeout = setTimeout(() => {
		profilePopupData.setProfilePopup({
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

	mouseEnterTimeout.current = timeout;
};

export const handleProfileMouseLeave = ({
	mouseEnterTimeout,
	profilePopupData,
}: Omit<ProfileHandlerProps, "hoverTimeout">) => {
	if (!profilePopupData) return;

	if (mouseEnterTimeout.current) {
		clearTimeout(mouseEnterTimeout.current);
		mouseEnterTimeout.current = undefined;
	}

	const timeout = setTimeout(() => {
		profilePopupData.setProfilePopup(undefined);
	}, 200);
	profilePopupData.setHoverTimeout(timeout);
};
