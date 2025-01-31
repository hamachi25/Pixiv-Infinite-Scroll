import { FormEventHandler } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { Tag, MuteSectionContent } from "../type";

interface Props {
	content: MuteSectionContent;
	items: Tag[];
	handleAddItem: FormEventHandler<HTMLFormElement>;
	handleDeleteItem: (id: string) => void;
}

export const TagMuteSection = ({ content, items, handleAddItem, handleDeleteItem }: Props) => {
	return (
		<div className="flex w-1/2 flex-col rounded-lg border p-4">
			<h2 className="text-base font-bold">{content.title}</h2>
			<p>{content.description}</p>
			<div className="divider mb-0 mt-1" />

			{/* 一覧 */}
			<div className="scrollbar-thin scrollbar-stable mb-3 flex-1 overflow-auto [&>div]:border-b">
				{items.map((item) => (
					<div key={item.id} className="flex items-center px-4 py-2">
						<p className="flex-1 text-base">{item.tagName}</p>
						<button
							type="button"
							title={content.delButtonText}
							className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
							onClick={() => handleDeleteItem(item.id)}
						>
							<RiDeleteBin6Line size={18} />
						</button>
					</div>
				))}
			</div>

			{/* 追加ボタン */}
			<form className="mb-1 mt-auto flex w-full gap-4" onSubmit={handleAddItem}>
				<label className="flex-1">
					<p className="mb-1 text-sm font-bold">{content.inputName}</p>
					<input
						type="text"
						placeholder={content.exampleName}
						name="tagName"
						defaultValue=""
						className="input input-bordered h-12 w-full"
					/>
				</label>
				<input
					type="submit"
					value={content.addButtonText}
					className="btn btn-primary mt-auto h-12 min-h-12"
				/>
			</form>
		</div>
	);
};
