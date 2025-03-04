import type { Work } from "@/types/works";
import { SettingContext } from "@content/context";
import { MutedImage } from "../../icons/MutedImage";

interface Props {
	novel: Work;
}

export const NovelImage = ({ novel }: Props) => {
	const settings = useContext(SettingContext);
	return (
		<a
			className="mr-[16px] flex-[0_0_auto]"
			href={`/novel/show.php?id=${novel.id}`}
			target={settings?.openInNewTab ? "_blank" : undefined}
			rel="noreferrer"
		>
			{novel.isMuted ? (
				<div className="flex h-[112px] w-[80px] items-center justify-center rounded-[8px] bg-(--charcoal-background2)">
					<div className="-mb-[1px] flex h-[112px] w-[80px] flex-col items-center justify-center gap-[4px] text-(--charcoal-text4) select-none">
						<MutedImage className="h-[24px] w-[24px]" />
					</div>
				</div>
			) : (
				<img
					className="h-[112px] w-[80px] rounded-[8px] object-cover transition-opacity duration-200 hover:opacity-80"
					src={novel.url}
					alt={novel.alt}
					width={80}
					height={112}
				/>
			)}
		</a>
	);
};
