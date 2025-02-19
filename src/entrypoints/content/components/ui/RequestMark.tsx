import { SettingContext } from "@content/context";
import { AcceptRequest } from "../icons/AcceptRequest";
import { StopRequest } from "../icons/StopRequest";

interface Props {
	acceptRequest: boolean;
	userId: string;
}

export const RequestMark = ({ acceptRequest, userId }: Props) => {
	const settings = useContext(SettingContext);

	return (
		<>
			{acceptRequest ? (
				<a
					className="flex items-center gap-[2px] text-[var(--charcoal-request)]"
					href={`/users/${userId}/request`}
					target={settings?.openInNewTab ? "_blank" : undefined}
					rel="noreferrer"
				>
					<AcceptRequest />
					<div className="text-[12px] font-bold">{i18n.t("request.accept")}</div>
				</a>
			) : (
				<span className="flex items-center gap-[2px] text-[var(--charcoal-text3)]">
					<StopRequest />
					<div className="text-[12px] font-bold">{i18n.t("request.closed")}</div>
				</span>
			)}
		</>
	);
};
