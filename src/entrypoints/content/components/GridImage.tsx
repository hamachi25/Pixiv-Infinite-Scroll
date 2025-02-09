import type { Work } from "../type";
import { SettingContext, SensitiveContext } from "../context";
import { IllustCount } from "./ui/IllustCount";

interface Props {
	illust: Work;
}

export const GridImage = ({ illust }: Props) => {
	const settings = useContext(SettingContext);
	const isSensitive = useContext(SensitiveContext);

	return (
		<a href={`/artworks/${illust.id}`} target={settings?.openInNewTab ? "_blank" : undefined}>
			<div className="relative flex items-center justify-center">
				<img
					className="rounded-[8px] transition-opacity duration-200 hover:opacity-80"
					src={illust.url}
					alt={illust.alt}
					width={184}
					height={184}
				/>
				{/* うごイラ */}
				{illust.illustType === 2 && (
					<svg
						className="pointer-events-none absolute h-[48px] w-[48px]"
						viewBox="0 0 24 24"
					>
						<circle
							className="fill-[var(--charcoal-surface4)]"
							cx="12"
							cy="12"
							r="10"
						/>
						<path
							className="fill-[var(--charcoal-text5)]"
							d="M9,8.74841664 L9,15.2515834 C9,15.8038681 9.44771525,16.2515834 10,16.2515834 C10.1782928,16.2515834 10.3533435,16.2039156 10.5070201,16.1135176 L16.0347118,12.8619342 C16.510745,12.5819147 16.6696454,11.969013 16.3896259,11.4929799 C16.3034179,11.3464262 16.1812655,11.2242738 16.0347118,11.1380658 L10.5070201,7.88648243 C10.030987,7.60646294 9.41808527,7.76536339 9.13806578,8.24139652 C9.04766776,8.39507316 9,8.57012386 9,8.74841664 Z"
						/>
					</svg>
				)}
				{/* センシティブ */}
				{isSensitive && (illust.sl === 4 || illust.sl === 6) && (
					<div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.08)] backdrop-blur-[20px]">
						<svg
							viewBox="0 0 256 256"
							fill="white"
							height="32"
							width="32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M215.16 124.84C193.02 80.37 162.31 56 128.79 56c-8.63 0-17.15 1.66-25.42 4.86L87.16 28.42l-14.31 7.16 96 192 14.31-7.16-15.8-31.61c18.2-11.33 34.34-30.87 47.75-56.73 1.18-2.27 1.2-4.96.06-7.25zm-55.01 49.57-11.14-22.28c6.73-5.87 10.99-14.5 10.99-24.13 0-17.67-14.33-32-32-32-2.3 0-4.54.25-6.7.71l-10.71-21.43c6.14-2.21 12.24-3.28 18.21-3.28 24.07 0 49.63 17.01 70.19 56.33-11.94 22.02-25.16 37.2-38.83 46.08zM57.06 128.4c8.18-15.01 17.15-26.84 26.46-35.71l-7.43-14.86c-13.08 11.48-25.02 27.28-35.19 46.89a7.994 7.994 0 0 0 0 7.37c23.26 44.85 55.63 67.91 89 67.91 2.38 0 4.75-.13 7.09-.38l-7.81-15.63c-24.24-.32-50.92-16.79-72.11-55.59z" />
						</svg>
					</div>
				)}
			</div>

			<div className="pointer-events-none absolute left-0 right-0 top-0 flex items-start px-[4px] pt-[4px]">
				{/* R18 */}
				{illust.xRestrict !== 0 && (
					<span className="rounded-[4px] bg-[var(--charcoal-r18)] px-[4px] text-[10px] font-bold text-[var(--charcoal-text5)]">
						{illust.xRestrict === 1 ? "R-18" : "R-18G"}
					</span>
				)}
				{/* 画像枚数 */}
				<IllustCount pageCount={illust.pageCount} />
			</div>
		</a>
	);
};
