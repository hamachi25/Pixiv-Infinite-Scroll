interface Props {
	firstPage: number;
	index: number;
}

export const PageHeader = ({ firstPage, index }: Props) => {
	const currentPage = firstPage + index + 1;

	const url = new URL(location.href);
	url.searchParams.set("p", currentPage.toString());

	return (
		<div className="mb-[20px] mt-[30px] border-t border-current text-center text-[24px]">
			<a
				className="block w-full rounded-[4px] transition-colors duration-200 hover:bg-[var(--charcoal-surface1-hover)]"
				href={url.toString()}
				target="_blank"
			>
				{currentPage}
			</a>
		</div>
	);
};
