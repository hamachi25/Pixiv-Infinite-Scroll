# Pixiv Infinite Scroll

![Pixiv Infinite Scroll](https://github.com/user-attachments/assets/e8a254a9-aac6-48a2-85ed-1837f187e7f4)

Pixiv Infinite Scroll is an infinite scroll extension optimized for Pixiv.

## Install

<a href="https://chromewebstore.google.com/detail/pixiv-infinite-scroll/ihbbldgmjgjfpglmceokpdjenkjedcnb"><img alt="Chrome WebStore" width="191.8" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/UV4C4ybeBTsZt43U4xis.png"></a>
<a href="https://addons.mozilla.org/ja/firefox/addon/pixiv-infinite-scroll/"><img alt="Firefox Browser ADD-ONS" width="172" height="60" src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png"></a>

## Currently supported pages

- Tag Search
- User Profile
- Following
- Latest by followed
- Bookmarks

If there are any unsupported pages, please make a feature request.

## Bug Reports / Feature Requests

- [GitHub Issue](https://github.com/hamachi25/Pixiv-Infinite-Scroll/issues)
- [Google Form](https://forms.gle/nWLZzi86qnWaAyEs7)

## Development

1. Install [NodeJS](https://nodejs.org) and [pnpm](https://pnpm.io)

2. Install dependencies

    ```shell
    pnpm install
    ```

### Dev Mode

When you save in the code editor, the page will automatically reload.

```shell
# Chrome
pnpm dev
```

```shell
# Firefox
pnpm dev:firefox
```

If you want to load the extension into an existing browser, create `web-ext.config.ts`.
It will be built into the `.output` folder.

https://wxt.dev/guide/essentials/config/browser-startup.html#disable-opening-browser

```ts
// web-ext.config.ts
import { defineRunnerConfig } from "wxt";

export default defineRunnerConfig({
	disabled: true,
});
```

### Build

```shell
# Chrome
pnpm build
```

```shell
# Firefox
pnpm build:firefox
```

## Translation

If you would like to help with translation, please check [src/locales/](https://github.com/hamachi25/Pixiv-Infinite-Scroll/tree/main/src/locales).
