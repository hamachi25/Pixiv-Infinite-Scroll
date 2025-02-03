import "./style.css";
import type { ContentScriptContext } from "wxt/client";
import ReactDOM from "react-dom/client";
import App from "./App";

import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { PAGE_REGEX } from "./constants/urlRegex";
import { Context } from "./context";
export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const anchor = getElementSelectorByUrl(location);

		let ui = await mountUi(ctx, anchor);

		if (isMatchUrl(location)) ui?.autoMount();

		ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
			const params = new URLSearchParams(newUrl.search);
			const isMatchFound = isMatchUrl(location);

			if (isMatchFound && !params.has("p")) {
				ui?.remove();

				const anchor = getElementSelectorByUrl(location);
				if (!anchor) return;

				ui = await mountUi(ctx, anchor);
				ui.autoMount();
			} else if (!isMatchFound) {
				ui?.remove();
			}
		});
	},
});

const isMatchUrl = (url: Location) =>
	Object.values(PAGE_REGEX).some((pattern) => pattern.test(url.pathname));

const mountUi = async (ctx: ContentScriptContext, anchor: string) => {
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
