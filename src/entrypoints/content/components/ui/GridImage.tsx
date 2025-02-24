import type { Work } from "@/types/works";
import { SettingContext, SensitiveContext } from "@content/context";
import { IllustCount } from "./IllustCount";
import { UgoiraOverlay } from "../icons/illust/UgoiraOverlay";
import { SensitiveOverlay } from "../icons/illust/SensitiveOverlay";
import { MutedImage } from "../icons/MutedImage";

interface Props {
	illust: Work;
	type: string;
}

export const GridImage = ({ illust, type }: Props) => {
	const settings = useContext(SettingContext);
	const isSensitive = useContext(SensitiveContext);

	return (
		<a
			href={`/artworks/${illust.id}`}
			target={settings?.openInNewTab ? "_blank" : undefined}
			rel="noreferrer"
		>
			{illust.isMuted && type !== "bookmark" ? (
				<div className="flex h-[184px] w-[184px] items-center justify-center rounded-[8px] bg-[var(--charcoal-background2)]">
					<div className="-mb-[1px] flex h-[122px] w-[122px] select-none flex-col items-center justify-center gap-[4px] text-[var(--charcoal-text4)]">
						<MutedImage className="h-[48px] w-[48px]" />
					</div>
				</div>
			) : (
				<>
					<div className="relative flex items-center justify-center">
						<img
							className="rounded-[8px] transition-opacity duration-200 hover:opacity-80"
							src={illust.url}
							alt={illust.alt}
							width={184}
							height={184}
						/>

						{/* うごイラ */}
						{illust.illustType === 2 && <UgoiraOverlay />}

						{/* センシティブ */}
						{isSensitive && (illust.sl === 4 || illust.sl === 6) && (
							<div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.08)] backdrop-blur-[20px]">
								<SensitiveOverlay />
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
				</>
			)}
		</a>
	);
};
