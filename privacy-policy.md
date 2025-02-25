# Privacy Policy

本拡張機能（Pixiv Infinite Scroll）は、全てのデータをローカルで処理します。そのためデータが外部に送信されることはありません。
データの取り扱い方は以下の通りです。

This extension (Pixiv Infinite Scroll) processes all data locally and does not send any data externally.
The handling of data is as follows:

## CSRF Token

- ブックマークやフォロー機能を提供するため、CSRFトークンを一時的にメモリに保持します。
- このトークンは、pixiv APIへのリクエスト時にのみ使用されます。
- To provide bookmark and follow functions, the CSRF token is temporarily stored in memory.
- This token is only used when making requests to the pixiv API.

## ユーザー設定 / User Settings

- ミュートワードなどのユーザー設定は、ローカルストレージに保存されます。
- これらの設定は拡張機能の動作にのみ使用され、外部に送信されることはありません。
- User settings such as mute words are only stored in the browser's local storage.
- These settings are only used for the operation of the extension and are not sent externally.

## コンテンツフィルタリング / Content Filtering

- ミュート機能を提供するため、pixivが行うAPIリクエストを監視します。
- ユーザーが設定したミュートワードに基づいて、クライアントサイドでコンテンツフィルタリングを行います。
- To provide the mute function, the extension monitors API requests made by pixiv.
- Content is filtered on the client side based on the mute words set by the user.

###### Last Updated: 2025/02/26
