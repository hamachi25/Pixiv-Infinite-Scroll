import { FormEventHandler } from "react";
import type { User, MuteSectionContent } from "../type";

import { SectionTitle } from "./SectionTitle";
import { AddButton, DelButton } from "./ui/Button";

interface Props {
	content: MuteSectionContent;
	items: User[];
	handleAddItem: FormEventHandler<HTMLFormElement>;
	handleDeleteItem: (id: string) => void;
}

export const UserMuteSection = ({ content, items, handleAddItem, handleDeleteItem }: Props) => {
	return (
		<div className="flex w-1/2 flex-col rounded-lg border border-[var(--border-noraml)] p-4">
			<SectionTitle content={content} />

			{/* 一覧 */}
			<div className="scrollbar-thin scrollbar-stable mb-3 flex-1 overflow-auto [&>div]:border-b">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center border-[var(--border-noraml)] px-4 py-2"
					>
						<p className="flex-1 text-base">{item.userName || item.userId}</p>
						<DelButton
							content={content}
							item={item}
							handleDeleteItem={handleDeleteItem}
						/>
					</div>
				))}
			</div>

			{/* 追加ボタン */}
			<form className="mb-1 mt-auto flex w-full gap-4" onSubmit={handleAddItem}>
				<label className="relative flex-1 [&>span]:has-[input:invalid]:!block">
					<p className="mb-1 text-sm font-bold">{content.inputId}</p>
					<input
						type="text"
						placeholder={content.exampleId}
						name="userId"
						defaultValue=""
						pattern="\d+"
						className="input input-bordered h-12 w-full"
					/>
					<span className="absolute -bottom-5 hidden text-red-500">
						{i18n.t("options.user.inputIdError")}
					</span>
				</label>
				<label className="flex-1">
					<p className="mb-1 text-sm font-bold">{content.inputName}</p>
					<input
						type="text"
						placeholder={content.exampleName}
						name="userName"
						defaultValue=""
						className="input input-bordered h-12 w-full"
					/>
				</label>
				<AddButton content={content} />
			</form>
		</div>
	);
};
