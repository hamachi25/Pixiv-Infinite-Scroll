interface Props {
	hasMore: boolean;
}

export const LoadingSpinner = ({ hasMore }: Props) => {
	return (
		<>
			{hasMore ? (
				<div className="py-[104px]">
					<div className="flex justify-center p-[16px]">
						<div
							className="h-[48px] w-[48px] animate-[charcoal-loading-spinner-icon-scale-out_1s_ease-out_both] rounded-full bg-[var(--charcoal-text4)] opacity-[0.84]"
							style={{ animationIterationCount: "infinite" }}
						/>
					</div>
				</div>
			) : (
				<div />
			)}
		</>
	);
};
