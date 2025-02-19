import type { Work } from "@content/type";
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
					className="overflow-hidden text-ellipsis whitespace-nowrap font-bold visited:text-[var(--charcoal-text1Visited)]"
					href={`/artworks/${illust.id}`}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					{illust.title}
				</a>
			) : (
				// R18・R18G・削除済み
				<>
					{illust.maskReason === "unknown" ? (
						<span className="font-bold">-----</span>
					) : (
						<span className="font-bold text-[var(--charcoal-text3)]">
							{i18n.t("illust.restrict")}
						</span>
					)}
				</>
			)}
		</div>
	);
};
