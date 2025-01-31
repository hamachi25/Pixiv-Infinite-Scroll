import { FormEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Tag, User } from "./type";
import { TagMuteSection } from "./components/TagMuteSection";
import { UserMuteSection } from "./components/UserMuteSection";
import { tagMuteSettings, userMuteSettings } from "@/utils/storage";

const muteSectionContent = {
	tags: {
		title: i18n.t("options.tag.title"),
		description: i18n.t("options.tag.detail"),
		inputName: i18n.t("options.tag.inputName"),
		exampleName: `${i18n.t("options.tag.exampleName")}東方`,
		addButtonText: i18n.t("options.tag.addButtonText"),
		delButtonText: i18n.t("options.tag.delButtonText"),
	},
	users: {
		title: i18n.t("options.user.title"),
		description: i18n.t("options.user.detail"),
		inputId: i18n.t("options.user.inputId"),
		exampleId: `${i18n.t("options.user.exampleId")}2033916`,
		inputName: i18n.t("options.user.inputName"),
		exampleName: `${i18n.t("options.user.exampleName")}あすてろid`,
		addButtonText: i18n.t("options.user.addButtonText"),
		delButtonText: i18n.t("options.user.delButtonText"),
	},
};

export default () => {
	const [tags, setTags] = useState<Tag[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const handleAddTag: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const tagInputValue = form.get("tagName") || "";
		const trimmedTagInput = tagInputValue.toString().trim().replace("#", "");

		if (!trimmedTagInput) return;
		if (tags.some((tag) => tag.tagName === trimmedTagInput)) return;

		setTags((prevTags) => {
			const newTags = [...prevTags, { id: uuidv4(), tagName: trimmedTagInput }];
			tagMuteSettings.setValue(newTags.map((tag) => tag.tagName));
			return newTags;
		});
		event.currentTarget.reset();
	};

	const handleDeleteTag = (id: string) => {
		setTags((prevTags) => {
			const newTags = prevTags.filter((tag) => tag.id !== id);
			tagMuteSettings.setValue(newTags.map((tag) => tag.tagName));
			return newTags;
		});
	};

	const handleAddUser: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const userIdValue = form.get("userId") || "";
		const userNameValue = form.get("userName") || "";

		const trimmedUserId = userIdValue.toString().trim();
		const trimmedUserName = userNameValue.toString().trim();

		if (!trimmedUserId) return;
		if (users.some((user) => user.userId === trimmedUserId)) return;

		setUsers((prevUsers) => {
			const newUsers = [
				...prevUsers,
				{
					id: uuidv4(),
					userId: trimmedUserId,
					userName: trimmedUserName,
				},
			];
			userMuteSettings.setValue(
				newUsers.map((user) => ({ id: user.userId, name: user.userName })),
			);
			return newUsers;
		});
		event.currentTarget.reset();
	};

	const handleDeleteUser = (id: string) => {
		setUsers((prevUsers) => {
			const newUsers = prevUsers.filter((user) => user.id !== id);
			userMuteSettings.setValue(
				newUsers.map((user) => ({ id: user.userId, name: user.userName })),
			);
			return newUsers;
		});
	};

	useEffect(() => {
		tagMuteSettings.getValue().then((value) => {
			if (!value) return;
			setTags(value.map((tag) => ({ id: uuidv4(), tagName: tag })));
		});

		userMuteSettings.getValue().then((value) => {
			if (!value) return;
			setUsers(value.map((user) => ({ id: uuidv4(), userId: user.id, userName: user.name })));
		});
	}, []);

	return (
		<div className="mx-auto flex h-screen max-w-[65rem] flex-col p-6">
			<h1 className="text-xl font-bold">{i18n.t("options.title")}</h1>
			<div className="divider" />
			<div className="flex w-full flex-1 gap-4 overflow-hidden">
				<TagMuteSection
					content={muteSectionContent.tags}
					items={tags}
					handleAddItem={handleAddTag}
					handleDeleteItem={handleDeleteTag}
				/>
				<UserMuteSection
					content={muteSectionContent.users}
					items={users}
					handleAddItem={handleAddUser}
					handleDeleteItem={handleDeleteUser}
				/>
			</div>
		</div>
	);
};
