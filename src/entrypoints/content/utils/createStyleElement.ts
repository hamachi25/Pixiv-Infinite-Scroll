const styles = `
    .tag-illust {
    	display: block;
    	width: 1224px;
    	margin: 0 auto;
    }
    @media (max-width: 1367px) {
    	.tag-illust {
    		width: 1016px;
    	}
    }
`;

export const createStyleElement = () => {
	const styleElement = document.createElement("style");
	styleElement.textContent = styles;
	return styleElement;
};
