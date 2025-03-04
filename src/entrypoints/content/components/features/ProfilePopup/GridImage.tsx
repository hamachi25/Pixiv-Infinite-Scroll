import type { ProfileWork } from "@content/type";
import { SettingContext } from "@content/context";
import { IllustCount } from "../../ui/IllustCount";

interface Props {
	work: ProfileWork;
}

export const GridImage = ({ work }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<div className="flex h-[112px] w-[112px] items-end justify-center overflow-hidden rounded-[4px] bg-(--charcoal-surface2)">
			{work.workType === "illust" ? (
				<a
					className="group relative flex h-full w-full items-center justify-center before:absolute before:top-0 before:left-0 before:block before:h-full before:w-full before:rounded-[4px] before:bg-(--charcoal-surface7)"
					href={`/artworks/${work.id}`}
					title={work.title}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					<img
						className="h-full w-full rounded-[4px] bg-(--charcoal-background1) object-cover object-center transition-opacity duration-200 group-hover:opacity-80"
						src={work.url}
						alt={work.alt}
					/>
					<div className="pointer-events-none absolute top-0 right-0 left-0 flex items-start px-[4px] pt-[4px]">
						<IllustCount pageCount={work.pageCount} />
					</div>
				</a>
			) : (
				<a
					className="group relative flex h-full w-[82px] items-center justify-center before:absolute before:top-0 before:left-0 before:block before:h-full before:w-full before:rounded-[4px] before:bg-(--charcoal-surface7)"
					href={`/novel/show.php?id=${work.id}`}
					title={work.title}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					<img
						className="h-full w-full rounded-t-[8px] rounded-b-[4px] bg-(--charcoal-background1) object-cover object-center transition-opacity duration-200 group-hover:opacity-80"
						src={work.url}
						alt={work.alt}
					/>
					<div className="absolute top-0 left-0 h-full w-full rounded-t-[8px] rounded-b-[4px] bg-(--charcoal-surface4) px-[4px] py-[12px] text-center">
						<p
							className="max-h-[80px] overflow-hidden text-[12px] font-bold break-words text-(--charcoal-text5)"
							style={{
								display: "-webkit-box",
								WebkitBoxOrient: "vertical",
								WebkitLineClamp: 4,
							}}
						>
							{work.title}
						</p>
					</div>
				</a>
			)}
		</div>
	);
};
