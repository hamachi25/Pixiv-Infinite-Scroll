import "./style.css";
import type { ContentScriptContext, ShadowRootContentScriptUi } from "wxt/client";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProfilePopup from "./pages/ProfilePopup.tsx";

import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { createStyleElement } from "./utils/createStyleElement";
import { PAGE_REGEX } from "./constants/urlRegex";
import { Context } from "./context";

export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const anchor = getElementSelectorByUrl(location);
		let ui: ShadowRootContentScriptUi<ReactDOM.Root>;
		if (anchor) {
			ui = await mountUi(ctx, anchor);
			if (isMatchUrl(location)) ui?.autoMount();
		}

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
		onMount: (container, _, shadowHost) => {
			/*
            / タグ検索ページでpixiv側の再レンダリングが起きて、既存の要素との順番が入れ替わることがあるので、
            / タグ検索のみulの親要素に挿入する。
            / https://github.com/hamachi25/Pixiv-Infinite-Scroll/issues/15
            */
			if (PAGE_REGEX.tagIllust.test(location.pathname)) {
				const styleElement = createStyleElement();
				document.head.append(styleElement);
				shadowHost.classList.add("tag-illust");
			}

			const app = document.createElement("div");
			container.append(app);

			const root = ReactDOM.createRoot(app);
			root.render(
				<Context>
					<App />
					<ProfilePopup />
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
