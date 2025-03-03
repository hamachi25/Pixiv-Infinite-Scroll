import type { Work } from "@/types/works";
import { SettingContext } from "@content/context";

interface Props {
	illust: Work;
}

export const WorkTitle = ({ illust }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<div className="mt-[4px] flex">
			{!illust.maskReason ? (
				<a
					className="overflow-hidden font-bold text-ellipsis whitespace-nowrap visited:text-(--charcoal-text1Visited)"
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
			) : (
				// R18・R18G・削除済み
				<>
					{illust.maskReason === "unknown" ? (
						<span className="font-bold">-----</span>
					) : (
						<span className="font-bold text-(--charcoal-text3)">
							{i18n.t("illust.restrict")}
						</span>
					)}
				</>
			)}
		</div>
	);
};
