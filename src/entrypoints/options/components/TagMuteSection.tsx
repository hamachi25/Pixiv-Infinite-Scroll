import { useForm } from "react-hook-form";
import type { Tag, MuteSectionContent } from "@/entrypoints/options/type";
import { SectionTitle } from "./SectionTitle";
import { AddButton } from "./ui/AddButton";
import { DeleteButton } from "./ui/DeleteButton";

interface Props {
	content: MuteSectionContent;
}

type FormType = { tag: string };

export const TagMuteSection = ({ content }: Props) => {
	const [tags, setTags] = useState<Tag[]>([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormType>();

	useEffect(() => {
		tagMuteSettings.getValue().then((value) => {
			setTags(value.map((tag) => ({ id: crypto.randomUUID(), tagName: tag })));
		});

		const unwatch = tagMuteSettings.watch((tags) => {
			setTags(tags.map((tag) => ({ id: crypto.randomUUID(), tagName: tag })));
		});
		return () => unwatch();
	}, []);

	const addTag = ({ tag }: FormType) => {
		setTags((prevTags) => {
			const newTags = [
				...prevTags,
				{ id: crypto.randomUUID(), tagName: tag.trim().replace("#", "") },
			];
			tagMuteSettings.setValue(newTags.map((tag) => tag.tagName));
			return newTags;
		});
		reset();
	};

	const deleteTag = (id: string) => {
		setTags((prevTags) => {
			const newTags = prevTags.filter((tag) => tag.id !== id);
			tagMuteSettings.setValue(newTags.map((tag) => tag.tagName));
			return newTags;
		});
	};

	return (
		<div className="flex w-1/2 flex-col rounded-lg border border-[var(--border-noraml)] p-4">
			<SectionTitle content={content} />

			{/* 一覧 */}
			<ul className="scrollbar-thin scrollbar-stable mb-3 flex-1 overflow-auto">
				{tags.map((item) => (
					<li
						key={item.id}
						className="flex items-center border-b border-[var(--border-noraml)] px-4 py-2"
					>
						<p className="flex-1 text-base">{item.tagName}</p>
						<DeleteButton content={content} item={item} handleDeleteItem={deleteTag} />
					</li>
				))}
			</ul>

			<form className="mb-2 mt-auto flex w-full gap-4" onSubmit={handleSubmit(addTag)}>
				<label className="relative flex flex-1 flex-col">
					<p className="mb-1 text-sm font-bold">{content.inputName}</p>
					<input
						className="input input-bordered h-12 w-full"
						type="text"
						placeholder={content.exampleName}
						{...register("tag", {
							required: true,
							validate: (value) =>
								!tags.some((tag) => tag.tagName === value) ||
								i18n.t("options.alreadyAdded"),
						})}
					/>
					{errors.tag && (
						<span className="absolute -bottom-5 text-red-500">
							{errors.tag.message}
						</span>
					)}
				</label>
				<AddButton content={content} />
			</form>
		</div>
	);
};
