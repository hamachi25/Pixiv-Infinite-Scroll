[日本語READMEはこちら](https://github.com/chimaha/Pixiv-Infinite-Scroll)  

# Pixiv Infinite Scroll

Add an infinite scroll function to Pixiv. When you scroll to the bottom of a page, it will automatically load the next page, allowing you to view illustrations without interruption.  
It can be used in "Search Results", "User Profile", "Following", "Works by users you are following", and "Bookmarks".  

Currently, the novel is not supported.  

https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/a12dc5ff-510f-47c7-b0d4-9a484c87028d  


You can set whether to display a dividing line for each page.  

![X4lW1KTofO](https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/fef7ec7f-fdcd-4184-a576-53331f382e51)![d4EI34y5SW](https://github.com/chimaha/Pixiv-Infinite-Scroll/assets/107383950/cefb6473-e3b4-4013-8ad0-c7467001d469)

&nbsp;  

## How to Install
### Firefox
<a href="https://addons.mozilla.org/en-US/firefox/addon/pixiv-infinite-scroll/" rel="nofollow"><img src="https://camo.githubusercontent.com/93008761190f691a7bea18556da6cad05b8ac6ef6a1e9e4121718bec79a45768/68747470733a2f2f626c6f672e6d6f7a696c6c612e6f72672f6164646f6e732f66696c65732f323031352f31312f6765742d7468652d6164646f6e2e706e67" alt="Get it on the Firefox Webstore" data-canonical-src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png" style="max-width: 100%;"></a>

### Chrome
1. Download [chrome addon](https://github.com/chimaha/Pixiv-Infinite-Scroll/releases/latest/download/chrome_PixivInfiniteScroll.zip) and unzip the zip file  
2. Open `chrome://extensions/`
3. Turn on "Developer mode" in the upper right corner.
4. Select the unzipped folder from "Load Unpacked"

### UserScript (Firefox/Chrome)
1. Download script manager extensions such as Violetmonkey and Tampermonkey
2. Download [UserScript](https://github.com/chimaha/Pixiv-Infinite-Scroll/raw/main/script/pixivinfinitescroll.user.js)

&nbsp;  

## Update  
### v1.4.4.1  
Fixes
- [Responding to specification changes](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/3cd58461c9490da64f8784ebced6465152fdf87f)  
- [Remove loading animation](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/3cd58461c9490da64f8784ebced6465152fdf87f)  

&nbsp;
### v1.4.4.1  
Fixes
- [Fixed a bug that prevented the next page from loading in "Works by users you are following"](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/002d18f5741bce7a8dfd3b363fde9936e804daf6)  

&nbsp;
### v1.4.4  
New  
- [Added the ability to display page separators](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/a78c50d8dc7a5b66fd7c5663406f6ca723a9022f)

Fixes
- [Fixed a bug where hovering over an illustration did not change its transparency](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/046a1b5b395918380aef0649f1d706ad22402df5)
- [Fixed proper element size on "follow" page](https://github.com/chimaha/Pixiv-Infinite-Scroll/commit/6e849a861db31db2bc97e5176aca364b569cbc42)