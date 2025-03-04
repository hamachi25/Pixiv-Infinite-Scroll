import type { Work } from "@/types/works";
import { SettingContext } from "@content/context";
interface Props {
	illust: Work;
}

export const WorkTitle = ({ illust }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<div className="mt-[4px] flex">
			<a
				className="overflow-hidden text-[14px] font-bold text-ellipsis whitespace-nowrap"
				href={`/artworks/${illust.id}`}
				target={settings?.openInNewTab ? "_blank" : undefined}
				rel="noreferrer"
			>
				{illust.isMuted ? (
					<span className="text-(--charcoal-text3)">{i18n.t("mute.muted")}</span>
				) : (
					illust.title
				)}
			</a>
		</div>
	);
};
