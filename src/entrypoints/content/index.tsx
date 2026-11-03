import "./style.css";
import type { ContentScriptContext, ShadowRootContentScriptUi } from "#imports";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProfilePopup from "./pages/ProfilePopup.tsx";

import { getElementSelectorByUrl } from "./utils/getElementSelectorByUrl";
import { createStyleElement } from "./utils/createStyleElement";
import { PAGE_REGEX, getPagePath } from "@/constants/urlRegex.ts";
import { Context } from "./context";

export default defineContentScript({
	matches: ["https://www.pixiv.net/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		let anchor = getElementSelectorByUrl(location);
		let ui: ShadowRootContentScriptUi<ReactDOM.Root> | undefined;
		if (anchor) {
			ui = await mountUi(ctx, anchor);
			if (isMatchUrl(location)) ui?.autoMount();
		}

		/*
        / タグ検索ページ(Next.js)ではハイドレーションエラー後の再レンダリングで、アンカー要素と
        / 挿入した要素が置き換えられることがある。新しいアンカー要素が同時に追加されると
        / autoMountは削除を検知できないので、挿入した要素が外れていたらアンカーの後ろに再挿入する。
        */
		const observer = new MutationObserver(() => {
			if (!ui?.mounted || ui.shadowHost.isConnected || !anchor) return;
			document.querySelector(anchor)?.after(ui.shadowHost);
		});
		observer.observe(document.body, { childList: true, subtree: true });
		ctx.onInvalidated(() => observer.disconnect());

		ctx.addEventListener(window, "wxt:locationchange", async ({ newUrl }) => {
			const params = new URLSearchParams(newUrl.search);
			const isMatchFound = isMatchUrl(location);

			if (isMatchFound && !params.has("p")) {
				ui?.remove();

				anchor = getElementSelectorByUrl(location);
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
	Object.values(PAGE_REGEX).some((pattern) => pattern.test(getPagePath(url)));

const mountUi = async (ctx: ContentScriptContext, anchor: string) => {
	const ui = await createShadowRootUi(ctx, {
		name: "pixiv-infinite-scroll",
		inheritStyles: true,
		position: "inline",
		append: "after",
		anchor: anchor,
		onMount: (container, _, shadowHost) => {
			/*
            / タグ検索ページでpixiv側の再レンダリングが起きて、既存の要素との順番が入れ替わることがあるので、
            / タグ検索のみulの親要素に挿入する。
            / https://github.com/hamachi25/Pixiv-Infinite-Scroll/issues/15
            */
			if (PAGE_REGEX.tagIllust.test(getPagePath(location))) {
				const styleElement = createStyleElement();
				document.head.append(styleElement);
				shadowHost.classList.add("tag-illust");

				// 作品グリッドの幅・余白のクラスをコピーして、1ページ目と同じ位置に揃える
				const grid = document.querySelector(anchor);
				grid?.classList.forEach((className) => {
					if (/(^|:)(mx-|w-|max-w-|min-w-|\[(max-|min-)?width:)/.test(className)) {
						shadowHost.classList.add(className);
					}
				});
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
