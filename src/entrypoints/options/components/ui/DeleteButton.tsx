import { RiDeleteBin6Line } from "react-icons/ri";
import type { Tag, User, MuteSectionContent } from "@/entrypoints/options/type";

interface Props {
	content: MuteSectionContent;
	item: Tag | User;
	handleDeleteItem: (id: string) => void;
}

export const DeleteButton = ({ content, item, handleDeleteItem }: Props) => {
	return (
		<button
			type="button"
			title={content.delButtonText}
			className="btn btn-circle h-9 min-h-9 w-9 bg-[var(--delete-button)] hover:bg-[var(--delete-button-hover)]"
			onClick={() => handleDeleteItem(item.id)}
		>
			<RiDeleteBin6Line size={18} />
		</button>
	);
};
