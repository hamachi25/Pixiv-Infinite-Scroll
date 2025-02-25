import type { MuteSectionContent } from "../type";

interface Props {
	content: MuteSectionContent;
}

export const SectionTitle = ({ content }: Props) => {
	return (
		<>
			<h2 className="text-base font-bold">{content.title}</h2>
			<p className="text-[var(--text-pale)]">{content.description}</p>
			<div className="divider mb-0 mt-1" />
		</>
	);
};
