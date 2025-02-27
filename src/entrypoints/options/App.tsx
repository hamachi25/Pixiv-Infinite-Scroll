import { ExportButton } from "./components/ui/ExportButton";
import { ImportButton } from "./components/ui/ImportButton";
import { TagMuteSection } from "./components/TagMuteSection";
import { UserMuteSection } from "./components/UserMuteSection";

const lang = browser.i18n.getUILanguage();
const isRTL = ["ar"].includes(lang);

const muteSectionContent = {
	tags: {
		title: i18n.t("options.tag.title"),
		description: i18n.t("options.tag.detail"),
		inputName: i18n.t("options.tag.inputName"),
		exampleName: `${i18n.t("options.example")}東方`,
		addButtonText: i18n.t("options.tag.addButtonText"),
		delButtonText: i18n.t("options.tag.delButtonText"),
	},
	users: {
		title: i18n.t("options.user.title"),
		description: i18n.t("options.user.detail"),
		inputId: i18n.t("options.user.inputId"),
		exampleId: `${i18n.t("options.example")}2033916`,
		inputName: i18n.t("options.user.inputName"),
		exampleName: `${i18n.t("options.example")}あすてろid`,
		addButtonText: i18n.t("options.user.addButtonText"),
		delButtonText: i18n.t("options.user.delButtonText"),
	},
};

const App = () => {
	return (
		<div
			className="mx-auto flex h-screen max-w-[65rem] flex-col px-6"
			dir={isRTL ? "rtl" : "ltr"}
		>
			<div className="mb-3 mt-5 flex items-center justify-between">
				<h1 className="text-xl font-bold">{i18n.t("options.title")}</h1>
				<div className="flex gap-4">
					<ImportButton />
					<ExportButton />
				</div>
			</div>
			<div className="divider mt-0" />
			<div className="mb-6 flex w-full flex-1 gap-4 overflow-hidden">
				<TagMuteSection content={muteSectionContent.tags} />
				<UserMuteSection content={muteSectionContent.users} />
			</div>
		</div>
	);
};
export default App;
