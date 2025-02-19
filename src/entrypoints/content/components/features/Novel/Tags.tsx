import type { Work } from "@content/type";
import { SettingContext } from "@content/context";

interface Props {
	novel: Work;
}

export const R18Tag = ({ novel }: Props) => {
	const settings = useContext(SettingContext);
	return (
		novel.xRestrict !== 0 && (
			<li className="inline">
				<a
					className="break-words font-bold text-[var(--charcoal-r18)]"
					href={`/tags/${novel.xRestrict === 1 ? "R-18" : "R-18G"}/novels`}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					{novel.xRestrict === 1 ? "R-18" : "R-18G"}
				</a>
			</li>
		)
	);
};

export const OriginalTag = ({ novel }: Props) => {
	const settings = useContext(SettingContext);
	return (
		novel.isOriginal && (
			<li className="inline">
				<a
					className="break-words font-bold text-[var(--charcoal-link1)]"
					href="/tags/%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB/novels"
					target={settings?.openInNewTab ? "_blank" : undefined}
				>
					{i18n.t("novel.original")}
				</a>
			</li>
		)
	);
};

export const OtherTag = ({ novel }: Props) => {
	const settings = useContext(SettingContext);
	return (
		<>
			{novel.tags?.map((tag) => (
				<li className="inline" key={tag}>
					<a
						className="break-words text-[var(--charcoal-link1)] before:content-['#']"
						href={`/tags/${encodeURIComponent(tag)}/novels`}
						target={settings?.openInNewTab ? "_blank" : undefined}
						rel="noreferrer"
					>
						{tag}
					</a>
				</li>
			))}
		</>
	);
};
