[English README is here](https://github.com/hamachi25/Pixiv-Infinite-Scroll/blob/main/README-en.md)

# Pixiv Infinite Scroll

![Pixiv Infinite Scroll](https://github.com/user-attachments/assets/b0212f9b-4232-4aa6-9da3-9a55065fc398)

Pixiv Infinite Scrollはpixivに最適化された無限スクロール拡張機能です。

## インストール

<a href="https://chromewebstore.google.com/detail/pixiv-infinite-scroll/ihbbldgmjgjfpglmceokpdjenkjedcnb"><img alt="Chrome WebStore" width="191.8" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/UV4C4ybeBTsZt43U4xis.png"></a>
<a href="https://addons.mozilla.org/ja/firefox/addon/pixiv-infinite-scroll/"><img alt="Firefox Browser ADD-ONS" width="172" height="60" src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png"></a>

## 現在対応しているページ

- タグ検索
- ユーザープロフィール
- フォロー中
- フォロー新着
- ブックマーク

対応していないページがあれば、機能提案までお願します。

## 不具合報告・機能提案

- [GitHub Issue](https://github.com/hamachi25/Pixiv-Infinite-Scroll/issues)
- [Google フォーム](https://forms.gle/nWLZzi86qnWaAyEs7)

## 開発

1. [NodeJS](https://nodejs.org)と[pnpm](https://pnpm.io)をインストール

2. 依存関係をインストール

    ```shell
    pnpm install
    ```

### 開発モード

コードエディターで保存をすると、自動でページリロードされます。

```shell
# Chrome
pnpm dev
```

```shell
# Firefox
pnpm dev:firefox
```

拡張機能を既存のブラウザに読み込ませたい場合は、`web-ext.config.ts`を作成します。
`.output`フォルダにビルドされます。

https://wxt.dev/guide/essentials/config/browser-startup.html#disable-opening-browser

```ts
// web-ext.config.ts
import { defineRunnerConfig } from "wxt";

export default defineRunnerConfig({
	disabled: true,
});
```

### ビルド

```shell
# Chrome
pnpm build
```

```shell
# Firefox
pnpm build:firefox
```

## 翻訳

翻訳にご協力頂ける方は、[src/locales/](https://github.com/hamachi25/Pixiv-Infinite-Scroll/tree/main/src/locales)をご確認ください。
