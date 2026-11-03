const styles = `
    .tag-illust {
    	display: block;
    }
`;

export const createStyleElement = () => {
	const styleElement = document.createElement("style");
	styleElement.textContent = styles;
	return styleElement;
};
