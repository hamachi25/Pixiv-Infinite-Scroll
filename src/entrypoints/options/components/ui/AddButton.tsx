import type { MuteSectionContent } from "../../type";

interface Props {
	content: MuteSectionContent;
}

export const AddButton = ({ content }: Props) => {
	return (
		<input
			type="submit"
			value={content.addButtonText}
			className="btn mt-auto h-12 min-h-12 bg-[var(--add-button)] text-[var(--text-normal-2)] hover:bg-[var(--add-button-hover)]"
		/>
	);
};
