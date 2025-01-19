export const extractCsrfToken = (html: string | null): string | undefined => {
	const token = html?.match(/"token":"([a-f0-9]+)"/)?.[1];
	return token;
};

export const extractIsSensitive = (html: string | null): boolean => {
	const isNotSensitive = html?.match(/"isSensitiveViewable":(true|false)/)?.[1];
	return isNotSensitive === "false";
};
