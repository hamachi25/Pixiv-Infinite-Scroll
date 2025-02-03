import { RiDeleteBin6Line } from "react-icons/ri";
import type { Tag, User, MuteSectionContent } from "../../type";

interface AddButtonProps {
	content: MuteSectionContent;
}

export const AddButton = ({ content }: AddButtonProps) => {
	return (
		<input
			type="submit"
			value={content.addButtonText}
			className="btn mt-auto h-12 min-h-12 bg-[var(--pixiv-blue)] text-[var(--text-normal)]"
		/>
	);
};

interface DelButtonProps {
	content: MuteSectionContent;
	item: Tag | User;
	handleDeleteItem: (id: string) => void;
}

export const DelButton = ({ content, item, handleDeleteItem }: DelButtonProps) => {
	return (
		<button
			type="button"
			title={content.delButtonText}
			className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--delete-button)] transition-colors duration-200 hover:bg-[var(--delete-button-hover)]"
			onClick={() => handleDeleteItem(item.id)}
		>
			<RiDeleteBin6Line size={18} />
		</button>
	);
};
