export type Tag = {
	id: string;
	tagName: string;
};

export type User = {
	id: string;
	userId: string;
	userName: string;
};

export type MuteSectionContent = {
	title: string;
	description: string;
	inputName: string;
	exampleName: string;
	inputId?: string;
	exampleId?: string;
	addButtonText: string;
	delButtonText: string;
};
