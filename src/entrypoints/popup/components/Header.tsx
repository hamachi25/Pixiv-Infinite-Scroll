import { GoReport } from "react-icons/go";

interface Props {
	version: string;
	isRTL: boolean;
	formsLink: string;
}

export const Header = ({ version, isRTL, formsLink }: Props) => {
	return (
		<div className="relative flex justify-between border-b border-solid border-(--border-noraml) px-2 pb-2">
			<div className="flex gap-3">
				<h1 className="text-xl font-bold">Pixiv Infinite Scroll</h1>
				<a
					className="self-end text-base text-(--text-pale)"
					target="_blank"
					href={`https://github.com/hamachi25/Pixiv-Infinite-Scroll/releases/tag/v${version}`}
					rel="noreferrer"
				>
					v{version}
				</a>
			</div>
			<div className="flex items-center">
				<div
					className={`tooltip before:text-xs ${isRTL ? "tooltip-right" : "tooltip-left"}`}
					data-tip={i18n.t("popup.report")}
				>
					<a
						className="text-(--text-pale)"
						href={formsLink}
						target="_blank"
						rel="noreferrer"
					>
						<GoReport size={21} />
					</a>
				</div>
			</div>
		</div>
	);
};
