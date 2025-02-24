import { useForm } from "react-hook-form";
import type { User, MuteSectionContent } from "@/entrypoints/options/type";
import { SectionTitle } from "./SectionTitle";
import { AddButton } from "./ui/AddButton";
import { DeleteButton } from "./ui/DeleteButton";

interface Props {
	content: MuteSectionContent;
}

type FormType = { userId: string; userName: string };

export const UserMuteSection = ({ content }: Props) => {
	const [users, setUsers] = useState<User[]>([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormType>();

	useEffect(() => {
		userMuteSettings.getValue().then((value) => {
			setUsers(
				value.map((user) => ({
					id: crypto.randomUUID(),
					userId: user.id,
					userName: user.name,
				})),
			);
		});

		const unwatch = userMuteSettings.watch((users) => {
			setUsers(
				users.map((user) => ({
					id: crypto.randomUUID(),
					userId: user.id,
					userName: user.name,
				})),
			);
		});
		return () => unwatch();
	}, []);

	const addUser = ({ userId, userName }: FormType) => {
		setUsers((prevUsers) => {
			const newUsers = [
				...prevUsers,
				{
					id: crypto.randomUUID(),
					userId: userId.trim(),
					userName: userName.trim(),
				},
			];
			userMuteSettings.setValue(
				newUsers.map((user) => ({ id: user.userId, name: user.userName })),
			);
			return newUsers;
		});
		reset();
	};

	const deleteUser = (id: string) => {
		setUsers((prevUsers) => {
			const newUsers = prevUsers.filter((user) => user.id !== id);
			userMuteSettings.setValue(
				newUsers.map((user) => ({ id: user.userId, name: user.userName })),
			);
			return newUsers;
		});
	};

	return (
		<div className="flex w-1/2 flex-col rounded-lg border border-[var(--border-noraml)] p-4">
			<SectionTitle content={content} />

			{/* 一覧 */}
			<ul className="scrollbar-thin scrollbar-stable mb-3 flex-1 overflow-auto">
				{users.map((item) => (
					<li
						key={item.id}
						className="flex items-center border-b border-[var(--border-noraml)] px-4 py-2"
					>
						<p className="flex-1 text-base">{item.userName || item.userId}</p>
						<DeleteButton content={content} item={item} handleDeleteItem={deleteUser} />
					</li>
				))}
			</ul>

			{/* 追加ボタン */}
			<form className="mb-2 mt-auto flex w-full gap-4" onSubmit={handleSubmit(addUser)}>
				<label className="relative flex flex-1 flex-col justify-end">
					<p className="mb-1 text-sm font-bold">{content.inputId}</p>
					<input
						className="input input-bordered h-12 w-full"
						type="text"
						placeholder={content.exampleId}
						{...register("userId", {
							required: true,
							pattern: {
								value: /\d+/,
								message: i18n.t("options.user.inputIdError"),
							},
							validate: (value) =>
								!users.some((user) => user.userId === value) ||
								i18n.t("options.alreadyAdded"),
						})}
					/>
					{errors.userId && (
						<span className="absolute -bottom-5 text-red-500">
							{errors.userId.message}
						</span>
					)}
				</label>
				<label className="flex-1">
					<p className="mb-1 text-sm font-bold">{content.inputName}</p>
					<input
						className="input input-bordered h-12 w-full"
						type="text"
						placeholder={content.exampleName}
						{...register("userName")}
					/>
				</label>
				<AddButton content={content} />
			</form>
		</div>
	);
};
