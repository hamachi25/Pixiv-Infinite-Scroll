import type { NovelType } from "@content/type";
import type { Work } from "@/types/works";
import { SettingContext } from "@content/context";

export const NovelSeriesTitle = ({ novel }: { novel: Work }) => {
	const settings = useContext(SettingContext);
	return (
		novel.seriesTitle && (
			<a
				className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[var(--charcoal-text3)]"
				href={`/novel/series/${novel.seriesId}`}
				title={novel.seriesTitle}
				target={settings?.openInNewTab ? "_blank" : undefined}
				rel="noreferrer"
			>
				{novel.seriesTitle}
			</a>
		)
	);
};

export const NovelTitle = ({ novel, type }: { novel: Work; type: NovelType }) => {
	const settings = useContext(SettingContext);
	return (
		<a
			className={`${type === "bookmark" && "whitespace-nowrap text-[16px]"} overflow-hidden text-ellipsis font-bold`}
			href={`/novel/show.php?id=${novel.id}`}
			title={novel.title}
			target={settings?.openInNewTab ? "_blank" : undefined}
			rel="noreferrer"
		>
			{novel.title}
		</a>
	);
};
