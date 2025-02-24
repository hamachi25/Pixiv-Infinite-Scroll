import type { Work } from "@/types/works";
import { SettingContext, SensitiveContext } from "@content/context";
import { IllustCount } from "./IllustCount";
import { UgoiraOverlay } from "../icons/illust/UgoiraOverlay";
import { SensitiveOverlay } from "../icons/illust/SensitiveOverlay";

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
						<svg className="h-[48px] w-[48px] fill-current" viewBox="0 0 24 24">
							<path d="M5.26763775,4 L9.38623853,11.4134814 L5,14.3684211 L5,18 L13.0454155,18 L14.1565266,20 L5,20 C3.8954305,20 3,19.1045695 3,18 L3,6 C3,4.8954305 3.8954305,4 5,4 L5.26763775,4 Z M9.84347336,4 L19,4 C20.1045695,4 21,4.8954305 21,6 L21,18 C21,19.1045695 20.1045695,20 19,20 L18.7323623,20 L17.6212511,18 L19,18 L19,13 L16,15 L15.9278695,14.951913 L9.84347336,4 Z M16,7 C14.8954305,7 14,7.8954305 14,9 C14,10.1045695 14.8954305,11 16,11 C17.1045695,11 18,10.1045695 18,9 C18,7.8954305 17.1045695,7 16,7 Z M7.38851434,1.64019979 L18.3598002,21.3885143 L16.6114857,22.3598002 L5.64019979,2.61148566 L7.38851434,1.64019979 Z"></path>
						</svg>
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
