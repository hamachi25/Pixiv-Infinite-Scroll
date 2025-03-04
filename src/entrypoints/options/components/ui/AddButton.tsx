import type { MuteSectionContent } from "../../type";

interface Props {
	content: MuteSectionContent;
}

export const AddButton = ({ content }: Props) => {
	return (
		<input
			type="submit"
			value={content.addButtonText}
			className="btn btn-primary mt-auto h-12"
		/>
	);
};
