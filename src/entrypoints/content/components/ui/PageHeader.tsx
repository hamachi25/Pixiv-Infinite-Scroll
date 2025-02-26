import type { WorkTag } from "@content/type";

interface Props {
	workTag: React.RefObject<WorkTag | undefined>;
	index: number;
	location: Location;
}

export const PageHeader = ({ workTag, index, location }: Props) => {
	const page = workTag.current?.param?.p
		? Number(workTag.current.param.p) + index + 1
		: index + 2;

	const oldUrl = new URL(location.href);
	oldUrl.searchParams.set("p", page.toString());
	const newUrl = oldUrl.toString();

	return (
		<div className="mb-[20px] mt-[30px] border-t border-current text-center text-[24px]">
			<a
				className="block w-full rounded-[4px] transition-colors duration-200 hover:bg-[var(--charcoal-surface1-hover)]"
				href={newUrl}
				target="_blank"
				rel="noreferrer"
			>
				{page}
			</a>
		</div>
	);
};
