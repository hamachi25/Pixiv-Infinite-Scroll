interface Props {
	pageCount?: number;
}

export const IllustCount = ({ pageCount }: Props) => {
	return (
		pageCount &&
		pageCount > 1 && (
			<div className="ml-auto flex h-[20px] items-center justify-center gap-x-[2px] rounded-[10px] bg-[var(--charcoal-surface4)] px-[6px] text-[var(--charcoal-text5)]">
				<svg className="fill-current" viewBox="0 0 9 10" width={9} height={10}>
					<path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10 C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1 C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8 0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z" />
				</svg>
				<span className="text-[10px] font-bold">{pageCount}</span>
			</div>
		)
	);
};
