import type { Work } from "../../../type";
import { GridImage } from "../../ui/GridImage";
import { BookmarkButton } from "../../ui/BookmarkButton";

import { WorkTitle } from "./WorkTitle";
import { Profile } from "./Profile";

interface Props {
	illusts: Work[];
	type: string;
}

export default ({ illusts, type }: Props) => {
	return (
		<ul className="mt-[24px] grid grid-cols-[repeat(auto-fit,184px)] gap-[24px]">
			{illusts.map((illust) => (
				<li key={illust.id}>
					<div className="relative">
						{/* メイン画像 */}
						{!illust.maskReason ? (
							<GridImage illust={illust} />
						) : (
							// R18・R18G・削除済み
							<div className="flex h-[184px] w-[184px] items-center justify-center rounded-[8px] bg-[var(--charcoal-background2)]">
								<div className="-mb-[1px] flex h-[122px] w-[122px] select-none flex-col items-center justify-center gap-[4px] text-[var(--charcoal-text4)]">
									{illust.maskReason === "unknown" ? (
										<svg
											className="h-[72px] w-[72px] fill-current"
											viewBox="0 0 24 24"
										>
											<path
												d="M 5 22 C 3.34315 22 2 20.6569 2 19 V 5 C 2 3.34315 3.34315 2 5 2 H 15 C 16.6569 2 18 3.34315 18 5 V 15 H 22 V 19 C 22 20.6569 20.6569 22 19 22 H 5 Z M 18 19 C 18 19.2652 18.1054 19.5196 18.2929 19.7071 C 18.4804 19.8946 18.7348 20 19 20 C 19.2652 20 19.5196 19.8946 19.7071 19.7071 C 19.8946 19.5196 20 19.2652 20 19 V 17 H 18 V 19 Z M 11.0819 16.8469 C 11.0819 17.4837 10.5656 18 9.92874 18 C 9.29189 18 8.77562 17.4837 8.77562 16.8469 C 8.77562 16.21 9.29189 15.6938 9.92874 15.6938 C 10.5656 15.6938 11.0819 16.21 11.0819 16.8469 Z M 11.0063 13.3967 C 11.0432 13.3229 11.117 13.203 11.1631 13.1292 C 11.4142 12.761 11.764 12.4544 12.1185 12.1435 C 12.9365 11.4263 13.7802 10.6866 13.4971 9.11635 C 13.2295 7.55733 11.9842 6.27505 10.4251 6.04443 C 8.5248 5.76768 6.84585 6.93925 6.33848 8.6182 C 6.18165 9.15325 6.58755 9.69753 7.14105 9.69753 H 7.32555 C 7.70378 9.69753 8.0082 9.43 8.13735 9.0979 C 8.43255 8.27688 9.2997 7.71415 10.2591 7.9171 C 11.1447 8.1016 11.7904 8.97798 11.7074 9.88203 C 11.6449 10.5864 11.1417 10.976 10.5834 11.4083 C 10.2349 11.678 9.86497 11.9644 9.56723 12.3543 C 9.54814 12.3734 9.4852 12.4627 9.43889 12.5283 C 9.41803 12.5579 9.40054 12.5827 9.39195 12.5942 C 9.30893 12.7233 9.19823 12.9447 9.14288 13.0923 C 9.13365 13.1015 9.13365 13.1108 9.13365 13.12 C 9.02295 13.4521 8.94915 13.8488 8.94915 14.3192 H 10.8034 C 10.8034 14.0886 10.831 13.8857 10.8956 13.6919 C 10.9049 13.655 10.9879 13.4244 11.0063 13.3967 Z"
												fillRule="evenodd"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											className="h-[72px] w-[72px] fill-current"
											viewBox="0 0 24 24"
										>
											<path d="M5.26763775,4 L9.38623853,11.4134814 L5,14.3684211 L5,18 L13.0454155,18 L14.1565266,20 L5,20 C3.8954305,20 3,19.1045695 3,18 L3,6 C3,4.8954305 3.8954305,4 5,4 L5.26763775,4 Z M9.84347336,4 L19,4 C20.1045695,4 21,4.8954305 21,6 L21,18 C21,19.1045695 20.1045695,20 19,20 L18.7323623,20 L17.6212511,18 L19,18 L19,13 L16,15 L15.9278695,14.951913 L9.84347336,4 Z M16,7 C14.8954305,7 14,7.8954305 14,9 C14,10.1045695 14.8954305,11 16,11 C17.1045695,11 18,10.1045695 18,9 C18,7.8954305 17.1045695,7 16,7 Z M7.38851434,1.64019979 L18.3598002,21.3885143 L16.6114857,22.3598002 L5.64019979,2.61148566 L7.38851434,1.64019979 Z" />
										</svg>
									)}
									<div className="text-center text-[16px] font-bold">
										{illust.maskReason === "unknown" ? (
											<>
												{i18n.t("illust.deleted")}
												<br />
												{i18n.t("illust.private")}
											</>
										) : (
											<>
												{i18n.t("illust.r18")}
												<br />
												{i18n.t("illust.work")}
											</>
										)}
									</div>
								</div>
							</div>
						)}
						{/* ブックマークボタン */}
						<BookmarkButton
							bookmarkData={illust.bookmarkData}
							work={illust}
							type="illust"
						/>
					</div>

					{/* タイトル */}
					<WorkTitle illust={illust} />

					{/* プロフィール */}
					{type === "other" && <Profile illust={illust} />}
				</li>
			))}
		</ul>
	);
};
