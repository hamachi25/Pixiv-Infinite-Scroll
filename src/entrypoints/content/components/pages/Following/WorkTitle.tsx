import type { Work } from "../../../type";
import { SettingContext } from "../../../context";
interface Props {
	illust: Work;
}

export const WorkTitle = ({ illust }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<div className="mt-[4px] flex">
			<a
				className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold"
				href={`/artworks/${illust.id}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
			>
				{illust.title}
			</a>
		</div>
	);
};
