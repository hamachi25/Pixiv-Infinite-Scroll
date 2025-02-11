import { createPortal } from "react-dom";
import type { Work, NovelType, ProfilePopupType } from "../../type";
import { NovelItem } from "../NovelItem";
import { ProfilePopup } from "../ProfilePopup";

interface Props {
	novels: Work[];
	type: NovelType;
}

export const Novels = ({ novels, type }: Props) => {
	const [profilePopupData, setProfilePopupData] = useState<ProfilePopupType | undefined>(
		undefined,
	);

	const shadowRoot = document
		.querySelector("pixiv-infinite-scroll")!
		.shadowRoot!.querySelector("body")!;

	return (
		<>
			{createPortal(
				<ProfilePopup
					profilePopupData={profilePopupData}
					setProfilePopupData={setProfilePopupData}
				/>,
				shadowRoot,
			)}
			<ul className="-mx-[12px] flex flex-wrap @container">
				{novels.map((novel) => (
					<NovelItem
						key={novel.id}
						novel={novel}
						type={type}
						profilePopupData={profilePopupData}
						setProfilePopupData={setProfilePopupData}
					/>
				))}
			</ul>
		</>
	);
};
