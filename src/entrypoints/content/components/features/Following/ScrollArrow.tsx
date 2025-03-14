import { FollowingScrollRight, FollowingScrollLeft } from "../../icons/FollowingScroll";

interface Props {
	scrollPosition: "left" | "right";
	scrollToLeft: () => void;
	scrollToRight: () => void;
}

export const ScrollArrow = ({ scrollPosition, scrollToLeft, scrollToRight }: Props) => {
	return (
		<div className="opacity-0 transition-opacity duration-400 group-hover:opacity-100 min-[1392px]:hidden">
			<button
				className={`absolute top-0 bottom-0 flex cursor-pointer items-center bg-transparent pl-[16px] transition-opacity duration-400 ${scrollPosition === "left" ? "opacity-0" : "opacity-100"}`}
				onClick={scrollToLeft}
			>
				<div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-(--charcoal-surface4) text-white">
					<FollowingScrollLeft />
				</div>
			</button>
			<button
				className={`absolute top-0 -right-[72px] bottom-0 flex cursor-pointer items-center bg-transparent pr-[16px] transition-opacity duration-400 ${scrollPosition === "right" ? "opacity-0" : "opacity-100"}`}
				onClick={scrollToRight}
			>
				<div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-(--charcoal-surface4) text-white">
					<FollowingScrollRight />
				</div>
			</button>
		</div>
	);
};
