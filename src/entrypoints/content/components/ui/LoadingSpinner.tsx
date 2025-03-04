import { memo } from "react";

interface Props {
	ref: (node?: Element | null) => void;
	hasMore: boolean | undefined;
}

export const LoadingSpinner = memo(({ ref, hasMore }: Props) => {
	// undefinedの場合はrefを削除、falseの場合は非表示にするだけ
	return hasMore !== undefined ? (
		<div className="py-[104px]" ref={ref}>
			{hasMore ? (
				<div className="flex justify-center p-[16px]">
					<div
						className="h-[48px] w-[48px] animate-[charcoal-loading-spinner-icon-scale-out_1s_ease-out_both] rounded-full bg-(--charcoal-text4) opacity-[0.84]"
						style={{ animationIterationCount: "infinite" }}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	) : (
		<></>
	);
});
LoadingSpinner.displayName = "LoadingSpinner";
