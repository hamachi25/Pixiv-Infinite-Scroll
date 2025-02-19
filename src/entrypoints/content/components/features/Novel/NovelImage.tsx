import type { Work } from "@content/type";
import { SettingContext } from "@content/context";

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
			<img
				className="h-[112px] w-[80px] rounded-[8px] object-cover transition-opacity duration-200 hover:opacity-80"
				src={novel.url}
				alt={novel.alt}
				width={80}
				height={112}
			/>
		</a>
	);
};
