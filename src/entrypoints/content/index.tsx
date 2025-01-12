import "./style.css";
import type { ContentScriptContext } from "wxt/client";
import ReactDOM from "react-dom/client";
import App from "./App";

import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { waitForElement } from "./utils/waitForElement";
import { pageRegex } from "./constants/pageRegex";
import { Context } from "./context";
export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const anchor = getElementSelectorByUrl(location);

		let ui = await mountUi(ctx, anchor);
		const isElement = await waitForElement(anchor);

		if (isElement && isMatch(location)) ui?.mount();

		ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
			const params = new URLSearchParams(newUrl.search);
			const isMatchFound = isMatch(location);

			if (isMatchFound && !params.has("p")) {
				ui?.remove();

				const anchor = getElementSelectorByUrl(location);
				if (!anchor) return;

				ui = await mountUi(ctx, anchor);
				const isElement = await waitForElement(anchor);

				if (ui && isElement) ui.mount();
			} else if (!isMatchFound) {
				ui?.remove();
			}
		});
	},
});

const isMatch = (url: Location) =>
	Object.values(pageRegex).some((pattern) => new RegExp(pattern).test(url.pathname));

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
