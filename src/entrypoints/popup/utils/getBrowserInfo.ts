import type { BrowserInfo } from "@popup/types";

export const getBrowserInfo = (): BrowserInfo => {
	const ua = navigator.userAgent;

	let name = undefined;
	let version = undefined;

	if (/Firefox\/\d+/i.test(ua)) {
		name = "Firefox";
		version = ua.match(/Firefox\/(\d+\.\d+)/i)?.[1] || undefined;
	} else if (/Edg\/\d+/i.test(ua)) {
		name = "Edge";
		version = ua.match(/Edg\/(\d+\.\d+)/i)?.[1] || undefined;
	} else if (/Opera|OPR\//.test(ua)) {
		name = "Opera";
		version = ua.match(/(?:Opera|OPR)\/(\d+\.\d+)/i)?.[1] || undefined;
	} else if (/Vivaldi\/\d+/i.test(ua)) {
		name = "Vivaldi";
		version = ua.match(/Vivaldi\/(\d+\.\d+)/i)?.[1] || undefined;
	} else if (/Chrome\/\d+/i.test(ua)) {
		name = "Chrome";
		version = ua.match(/Chrome\/(\d+\.\d+)/i)?.[1] || undefined;
	}

	return {
		name,
		version,
	};
};
