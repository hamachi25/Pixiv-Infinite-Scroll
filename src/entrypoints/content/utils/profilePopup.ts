import type { ProfilePopupType } from "@/types/content";
import { Work } from "../type";

interface ProfileHandlerProps {
	mouseEnterTimeout: React.RefObject<NodeJS.Timeout | undefined>;
	setProfilePopupData:
		| React.Dispatch<React.SetStateAction<ProfilePopupType | undefined>>
		| undefined;
	hoverTimeout: NodeJS.Timeout | undefined;
	setHoverTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>> | undefined;
}

export const handleProfileMouseEnter = (
	e: React.MouseEvent<HTMLDivElement>,
	work: Work,
	{ mouseEnterTimeout, setProfilePopupData, hoverTimeout, setHoverTimeout }: ProfileHandlerProps,
) => {
	if (hoverTimeout && setHoverTimeout) {
		clearTimeout(hoverTimeout);
		setHoverTimeout(undefined);
	}

	const hostRect = (e.currentTarget.getRootNode() as ShadowRoot).host.getBoundingClientRect();
	const rect = e.currentTarget.getBoundingClientRect();
	const offsetTop = rect.top - hostRect.top;
	const offsetLeft = rect.left - hostRect.left - (168 - rect.width / 2);

	const timeout = setTimeout(() => {
		setProfilePopupData &&
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

	mouseEnterTimeout.current = timeout;
};

export const handleProfileMouseLeave = ({
	mouseEnterTimeout,
	setProfilePopupData,
	setHoverTimeout,
}: Omit<ProfileHandlerProps, "hoverTimeout">) => {
	if (mouseEnterTimeout.current) {
		clearTimeout(mouseEnterTimeout.current);
		mouseEnterTimeout.current = undefined;
	}

	const timeout = setTimeout(() => {
		setProfilePopupData && setProfilePopupData(undefined);
	}, 200);
	setHoverTimeout && setHoverTimeout(timeout);
};
