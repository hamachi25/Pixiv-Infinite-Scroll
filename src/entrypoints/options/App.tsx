import { TagMuteSection } from "./components/TagMuteSection";
import { UserMuteSection } from "./components/UserMuteSection";

const lang = browser.i18n.getUILanguage();
const isRTL = ["ar", "he", "fa", "ps", "ur", "sd"].includes(lang);

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

const App = () => {
	return (
		<div
			className="mx-auto flex h-screen max-w-[65rem] flex-col p-6"
			dir={isRTL ? "rtl" : "ltr"}
		>
			<h1 className="text-xl font-bold">{i18n.t("options.title")}</h1>
			<div className="divider" />
			<div className="flex w-full flex-1 gap-4 overflow-hidden">
				<TagMuteSection content={muteSectionContent.tags} />
				<UserMuteSection content={muteSectionContent.users} />
			</div>
		</div>
	);
};
export default App;
