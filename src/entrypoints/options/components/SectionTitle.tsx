import type { MuteSectionContent } from "../type";

interface Props {
	content: MuteSectionContent;
}

export const SectionTitle = ({ content }: Props) => {
	return (
		<>
			<h2 className="text-base font-bold">{content.title}</h2>
			<p className="text-sm text-(--text-pale)">{content.description}</p>
			<div className="divider mt-1 mb-0" />
		</>
	);
};
