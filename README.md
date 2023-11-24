[English README is here](https://github.com/chimaha/Pixiv-Infinite-Scroll/blob/main/README-en.md)  

# Pixiv Infinite Scroll

Pixivに無限スクロール機能を追加します。ページの下までスクロールした時に自動で次のページを読み込むことで、途切れることなくイラストを閲覧することができます。  
「検索結果」「ユーザープロフィール」「フォロー中」「フォローユーザーの作品」「ブックマーク」で使用することができます。  

今のところ、小説には対応していません。  


https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/a12dc5ff-510f-47c7-b0d4-9a484c87028d


ページごとの区切り線を表示するか設定することができます。 

![Iu4PVRP7o7](https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/a5e28f2b-e340-40b8-9a63-90f85c1e1040)![nSjrBJNOUx](https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/63d0cc27-c39f-47d1-b220-5e8f9b795521)  

&nbsp;  

## インストール方法
### Firefox
<a href="https://addons.mozilla.org/ja/firefox/addon/pixiv-infinite-scroll/" rel="nofollow"><img src="https://camo.githubusercontent.com/93008761190f691a7bea18556da6cad05b8ac6ef6a1e9e4121718bec79a45768/68747470733a2f2f626c6f672e6d6f7a696c6c612e6f72672f6164646f6e732f66696c65732f323031352f31312f6765742d7468652d6164646f6e2e706e67" alt="Get it on the Firefox Webstore" data-canonical-src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png" style="max-width: 100%;"></a>

### Chrome
1. [chrome版拡張機能](https://github.com/chimaha/Pixiv-Infinite-Scroll/releases/latest/download/chrome_PixivInfiniteScroll.zip)をダウンロードし、ZIPファイルを解凍する
2. `chrome://extensions/`を開く
3. 右上の「デベロッパーモード」をオンにする
4. 「パッケージ化されていない拡張機能を読み込む」から解凍したフォルダを選択

### UserScript (Firefox/Chrome)
1. VioletmonkeyやTampermonkeyなどのスクリプトマネージャー拡張機能をダウンロード
2. [UserScript](https://github.com/chimaha/Pixiv-Infinite-Scroll/raw/main/script/pixivinfinitescroll.user.js)をダウンロード    

&nbsp;  

## アップデート  
### v1.4.4.1  
修正
- [「フォローユーザーの作品」で次ページが読み込まれないバグを修正 ](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/002d18f5741bce7a8dfd3b363fde9936e804daf6)  

&nbsp;
### v1.4.4  
新機能  
- [ページ区切り線を表示する機能を追加](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/a78c50d8dc7a5b66fd7c5663406f6ca723a9022f)

修正
- [イラストをホバーしても透明度が変更されないバグを修正](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/046a1b5b395918380aef0649f1d706ad22402df5)
- [「フォロー」のページで要素サイズが適切になるように修正](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/6e849a861db31db2bc97e5176aca364b569cbc42)
