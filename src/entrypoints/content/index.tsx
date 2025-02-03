import "./style.css";
import type { ContentScriptContext } from "wxt/client";
import ReactDOM from "react-dom/client";
import App from "./App";

import { getElementSelectorByUrl } from "@/utils/getElementSelectorByUrl";
import { PAGE_REGEX } from "@/constants/urlRegex";
import { Context } from "./context";

const mountUi = async (ctx: ContentScriptContext, anchor: string | null) => {
	const ui = await createShadowRootUi(ctx, {
		name: "pixiv-infinite-scroll",
		position: "inline",
		append: "after",
		anchor: anchor,
		onMount: (container) => {
			const root = ReactDOM.createRoot(container);
			root.render(
				<Context>
					<App />
				</Context>,
			);
			return root;
		},
		onRemove: (root) => {
			root?.unmount();
		},
	});
	return ui;
};

export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const anchor = getElementSelectorByUrl(location);

		// 1ページ目を非表示
		const style = createStyleElement(anchor);
		if (style) document.head.appendChild(style);

		let ui = await mountUi(ctx, anchor);

		if (isMatchUrl(location)) ui?.autoMount();

		ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
			const params = new URLSearchParams(newUrl.search);
			const isMatchFound = isMatchUrl(location);

			if (isMatchFound && !params.has("p")) {
				document.getElementById("pis-style")?.remove();
				ui?.remove();

				const anchor = getElementSelectorByUrl(location);

				const style = createStyleElement(anchor);
				if (style) document.head.appendChild(style);

				ui = await mountUi(ctx, anchor);
				ui?.autoMount();
			} else if (!isMatchFound) {
				document.getElementById("pis-style")?.remove();
				ui?.remove();
			}
		});
	},
});

const isMatchUrl = (url: Location) =>
	Object.values(PAGE_REGEX).some((pattern) => pattern.test(url.pathname));

const createStyleElement = (anchor: string | null) => {
	if (!anchor) return;

	const style = document.createElement("style");
	style.id = "pis-style";
	style.textContent = `${anchor}{display:none}`;
	return style;
};
