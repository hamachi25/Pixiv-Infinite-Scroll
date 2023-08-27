// ==UserScript==
// @name                 Pixiv Infinite Scroll
// @name:ja              Pixiv Infinite Scroll
// @name:zh-CN           Pixiv Infinite Scroll
// @name:zh-TW           Pixiv Infinite Scroll
// @namespace            https://github.com/chimaha/Pixiv-Infinite-Scroll
// @match                https://www.pixiv.net/*
// @grant                none
// @version              1.2.1
// @author               chimaha
// @description          Add infinite scroll feature to Pixiv.
// @description:ja       Pixivに無限スクロール機能を追加します。
// @description:zh-CN    为 Pixiv 添加无限滚动功能。
// @description:zh-TW    因為Pixiv有無限移動功能。
// @license              MIT license
// @icon                 https://www.pixiv.net/favicon.ico
// @downloadURL          https://github.com/chimaha/Pixiv-Infinite-Scroll/raw/main/script/pixivinfinitescroll.user.js
// @updateURL            https://github.com/chimaha/Pixiv-Infinite-Scroll/raw/main/script/pixivinfinitescroll.user.js
// @supportURL           https://github.com/chimaha/Pixiv-Infinite-Scroll/issues
// ==/UserScript==

/*! Pixiv Infinite Scroll | MIT license | https://github.com/chimaha/Pixiv-Infinite-Scroll/blob/main/LICENSE */

// フォロー--------------------------------------------------------------------------------
function followingProcess() {
    function createDiv(userId, userName, profileImage, userComment, following, illustId, illustTitle, illustUrl, bookmarkData, illustAlt, r18, pageCount) {

        // langの値によって言語を変更する
        const followLanguage = [];
        const currentLanguage = document.querySelector("html").getAttribute("lang");
        switch (currentLanguage) {
            case "ja":
                followLanguage.push("フォロー中", "フォローする");
                break;
            case "ko":
                followLanguage.push("팔로우 중", "팔로우하기");
                break;
            case "zh-CN":
                followLanguage.push("已关注", "加关注");
                break;
            case "zh-TW":
                followLanguage.push("關注中", "加關注");
                break;
            default:
                followLanguage.push("Following", "Follow");
        }

        // フォロー中、フォローするを切り替え
        let resultFollow;
        let followClass;
        let followStyle = "";
        if (following) {
            resultFollow = followLanguage[0];
            followClass = "cnpwVx";
            followStyle = 'style="background-color: var(--charcoal-surface3); color: var(--charcoal-text2); font-weight: bold; padding-right: 24px; padding-left: 24px; border-radius: 999999px; height: 40px;"';
        } else {
            resultFollow = followLanguage[1];
            followClass = "fOWAlD";
        }
        // ブックマークを切り替え
        let bookmarkClass = [];
        let bookmarkStyle = [];
        for (const resultBookmark of bookmarkData) {
            if (resultBookmark) {
                bookmarkClass.push("bXjFLc");
                bookmarkStyle.push('style="color: rgb(255, 64, 96); fill: currentcolor;"');
            } else {
                bookmarkClass.push("dxYRhf");
            }
        }
        // コメントに特定の記号が入っていた場合にエスケープ
        function escapleHtml(escapeText) {
            return escapeText
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        const escapedText = escapleHtml(userComment);

        // R18マーク
        let r18div = [];
        for (const nsfw of r18) {
            if (nsfw == "R-18") {
                r18div.push('<div class="sc-rp5asc-15 cIllir"><div class="sc-1ovn4zb-0 bfWaOT">R-18</div></div>');
            } else {
                r18div.push("");
            }
        }

        // うごくイラスト再生マーク、イラスト数表示
        let ugokuira = [];
        let pageCountHtml = [];
        pageCount.forEach((page, i) => {
            if (illustAlt[i].slice(-4) == "うごイラ") {
                ugokuira.push('<svg viewBox="0 0 24 24" style="width: 48px; height: 48px;" class="sc-192k5ld-0 etaMpt sc-rp5asc-8 kSDUsv"><circle cx="12" cy="12" r="10" class="sc-192k5ld-1 lajlxF"></circle><path d="M9,8.74841664 L9,15.2515834 C9,15.8038681 9.44771525,16.2515834 10,16.2515834 C10.1782928,16.2515834 10.3533435,16.2039156 10.5070201,16.1135176 L16.0347118,12.8619342 C16.510745,12.5819147 16.6696454,11.969013 16.3896259,11.4929799 C16.3034179,11.3464262 16.1812655,11.2242738 16.0347118,11.1380658 L10.5070201,7.88648243 C10.030987,7.60646294 9.41808527,7.76536339 9.13806578,8.24139652 C9.04766776,8.39507316 9,8.57012386 9,8.74841664 Z" class="sc-192k5ld-2 jwyUTl"></path></svg>');
            } else {
                ugokuira.push("");
                if (page > 2) {
                    pageCountHtml.push(`
                    <div class="sc-rp5asc-5 hHNegy">
                        <div class="sc-1mr081w-0 kZlOCw">
                            <span class="sc-1mr081w-1 gODLwk">
                                <span class="sc-14heosd-0 gbNjFx">
                                    <svg viewBox="0 0 9 10" size="9" class="sc-14heosd-1 fArvVr">
                                        <path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10 C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1 C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8 0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z" transform=""></path>
                                    </svg>
                                </span>
                            </span>
                            <span>${page}</span>
                        </div>
                    </div>`);
                } else {
                    pageCountHtml.push("");
                }
            }
        });

        // "div+="で一括追加にすると、なぜかundefinedが追加され続けるので一つずつ追加
        const div = `
        <div class="sc-1y4z60g-5 cPVjJh nextPage">
            <div class="sc-11m5zdr-0 bbJBkV">
                <div class="sc-11m5zdr-1 clrYBQ">
                    <div class="sc-19z9m4s-0 fbLOpg"><a class="sc-d98f2c-0" data-gtm-value="${userId}" href="/users/${userId}">
                            <div size="80" title="${userName}" role="img" class="sc-1asno00-0 deMagM">
                                <img src="${profileImage}" style="object-fit: cover; object-position: center top;" width="80" height="80" alt="${userName}">
                            </div>
                        </a>
                        <div class="sc-19z9m4s-4 fYGGbS">
                            <div class="sc-19z9m4s-5 iqZEnZ">
                                <a class="sc-d98f2c-0 sc-19z9m4s-2 QHGGh" data-gtm-value="${userId}" href="/users/${userId}">${userName}</a>
                            </div>
                            <div class="sc-19z9m4s-3 isEYuz">${escapedText}</div>
                            <div class="sc-19z9m4s-1 qjElz">
                                <button class="sc-bdnxRM jvCTkj sc-dlnjwi ${followClass} sc-1obql3d-0 Rlftz gtm-undefined sc-1obql3d-0 Rlftz gtm-undefined" data-gtm-user-id="${userId}" data-click-action="click" data-click-label="follow" height="40" ${followStyle}>${resultFollow}</button>
                                <div aria-current="false" class="sc-125tkm8-0 sc-125tkm8-3 ka-dhPl eZXKAK">
                                    <div class="sc-1ij5ui8-0 QihHO sc-125tkm8-2 gUcOiA" role="button">
                                        <pixiv-icon name="24/Dot"></pixiv-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sc-11m5zdr-2 gClOXE">
                    <div>
                        <div class="sc-1kr69jw-2 hYTIUt">
                            <div class="sc-1kr69jw-4 hOZSpq">
                                <div class="sc-1kr69jw-5 Dzlsu">
                                    <div class="sc-1kr69jw-6 dhGRLC">
                                        <div class="sc-1kr69jw-3 wJpxo" data-add-scroll="true">
                                            <ul class="sc-1kr69jw-0 hkzusx">
                                                <div class="sc-w2rqc8-2 bgeGyS">
                                                    <div class="sc-fgp4rp-1 cQUnPX">
                                                        <div class="sc-iasfms-5 liyNwX">
                                                            <div type="illust" size="184" class="sc-iasfms-3 iIcDMF">
                                                                <div width="184" height="184" class="sc-rp5asc-0 fxGVAF">
                                                                    <a class="sc-d98f2c-0 sc-rp5asc-16 iUsZyY sc-eWnToP khjDVZ" data-gtm-value="${illustId[0]}" data-gtm-user-id="${userId}" href="/artworks/${illustId[0]}">
                                                                        <div radius="4" class="sc-rp5asc-9 cYUezH">
                                                                            <img src="${illustUrl[0]}" style="object-fit: cover; object-position: center center;" alt="${illustAlt[0]}" class="sc-rp5asc-10 erYaF">
                                                                            ${ugokuira[0]}
                                                                        </div>
                                                                        <div class="sc-rp5asc-12 Sxcoo">
                                                                            <div class="sc-rp5asc-13 liXhix">${r18div[0]}</div>
                                                                            ${pageCountHtml[0]}
                                                                        </div>
                                                                    </a>
                                                                    <div class="sc-iasfms-4 iHfghO">
                                                                        <div class="">
                                                                            <button type="button" class="sc-kgq5hw-0 fgVkZi">
                                                                                <svg viewBox="0 0 32 32" width="32" height="32" class="sc-j89e3c-1 ${bookmarkClass[0]}" ${bookmarkStyle[0]}>
                                                                                    <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                                                                    <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" class="sc-j89e3c-0 dUurgf"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="sc-iasfms-0 jtpclu">
                                                                <a class="sc-d98f2c-0 sc-iasfms-6 gqlfsh" href="/artworks/${illustId[0]}">${illustTitle[0]}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="sc-w2rqc8-2 bgeGyS">
                                                    <div class="sc-fgp4rp-1 cQUnPX">
                                                        <div class="sc-iasfms-5 liyNwX">
                                                            <div type="illust" size="184" class="sc-iasfms-3 iIcDMF">
                                                                <div width="184" height="184" class="sc-rp5asc-0 fxGVAF">
                                                                    <a class="sc-d98f2c-0 sc-rp5asc-16 iUsZyY sc-eWnToP khjDVZ" data-gtm-value="${illustId[1]}" data-gtm-user-id="${userId}" href="/artworks/${illustId[1]}">
                                                                        <div radius="4" class="sc-rp5asc-9 cYUezH">
                                                                            <img src="${illustUrl[1]}" style="object-fit: cover; object-position: center center;" alt="${illustAlt[1]}" class="sc-rp5asc-10 erYaF">
                                                                            ${ugokuira[1]}
                                                                        </div>
                                                                        <div class="sc-rp5asc-12 Sxcoo">
                                                                            <div class="sc-rp5asc-13 liXhix">${r18div[1]}</div>
                                                                            ${pageCountHtml[1]}
                                                                        </div>
                                                                    </a>
                                                                    <div class="sc-iasfms-4 iHfghO">
                                                                        <div class="">
                                                                            <button type="button" class="sc-kgq5hw-0 fgVkZi">
                                                                                <svg viewBox="0 0 32 32" width="32" height="32" class="sc-j89e3c-1 ${bookmarkClass[1]}" ${bookmarkStyle[1]}>
                                                                                    <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                                                                    <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" class="sc-j89e3c-0 dUurgf"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="sc-iasfms-0 jtpclu">
                                                                <a class="sc-d98f2c-0 sc-iasfms-6 gqlfsh" href="/artworks/${illustId[1]}">${illustTitle[1]}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="sc-w2rqc8-2 bgeGyS">
                                                    <div class="sc-fgp4rp-1 cQUnPX">
                                                        <div class="sc-iasfms-5 liyNwX">
                                                            <div type="illust" size="184" class="sc-iasfms-3 iIcDMF">
                                                                <div width="184" height="184" class="sc-rp5asc-0 fxGVAF">
                                                                    <a class="sc-d98f2c-0 sc-rp5asc-16 iUsZyY sc-eWnToP khjDVZ" data-gtm-value="${illustId[2]}" data-gtm-user-id="${userId}" href="/artworks/${illustId[2]}">
                                                                        <div radius="4" class="sc-rp5asc-9 cYUezH">
                                                                            <img src="${illustUrl[2]}" style="object-fit: cover; object-position: center center;" alt="${illustAlt[2]}" class="sc-rp5asc-10 erYaF">
                                                                            ${ugokuira[2]}
                                                                        </div>
                                                                        <div class="sc-rp5asc-12 Sxcoo">
                                                                            <div class="sc-rp5asc-13 liXhix">${r18div[2]}</div>
                                                                            ${pageCountHtml[2]}
                                                                        </div>
                                                                    </a>
                                                                    <div class="sc-iasfms-4 iHfghO">
                                                                        <div class=""><button type="button"
                                                                                class="sc-kgq5hw-0 fgVkZi">
                                                                                <svg viewBox="0 0 32 32" width="32" height="32" class="sc-j89e3c-1 ${bookmarkClass[2]}" ${bookmarkStyle[2]}>
                                                                                    <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                                                                    <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" class="sc-j89e3c-0 dUurgf"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="sc-iasfms-0 jtpclu">
                                                                <a class="sc-d98f2c-0 sc-iasfms-6 gqlfsh" href="/artworks/${illustId[2]}">${illustTitle[2]}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="sc-w2rqc8-2 bgeGyS">
                                                    <div class="sc-fgp4rp-1 cQUnPX">
                                                        <div class="sc-iasfms-5 liyNwX">
                                                            <div type="illust" size="184" class="sc-iasfms-3 iIcDMF">
                                                                <div width="184" height="184" class="sc-rp5asc-0 fxGVAF">
                                                                    <a class="sc-d98f2c-0 sc-rp5asc-16 iUsZyY sc-eWnToP khjDVZ" data-gtm-value="${illustId[3]}" data-gtm-user-id="${userId}" href="/artworks/${illustId[3]}">
                                                                        <div radius="4" class="sc-rp5asc-9 cYUezH">
                                                                            <img src="${illustUrl[3]}" style="object-fit: cover; object-position: center center;" alt="${illustAlt[3]}" class="sc-rp5asc-10 erYaF">
                                                                            ${ugokuira[3]}
                                                                        </div>
                                                                        <div class="sc-rp5asc-12 Sxcoo">
                                                                            <div class="sc-rp5asc-13 liXhix">${r18div[3]}</div>
                                                                            ${pageCountHtml[3]}
                                                                        </div>
                                                                    </a>
                                                                    <div class="sc-iasfms-4 iHfghO">
                                                                        <div class="">
                                                                            <button type="button" class="sc-kgq5hw-0 fgVkZi">
                                                                                <svg viewBox="0 0 32 32" width="32" height="32" class="sc-j89e3c-1 ${bookmarkClass[3]}" ${bookmarkStyle[3]}>
                                                                                    <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                                                                    <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" class="sc-j89e3c-0 dUurgf"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="sc-iasfms-0 jtpclu">
                                                                <a class="sc-d98f2c-0 sc-iasfms-6 gqlfsh" href="/artworks/${illustId[3]}">${illustTitle[3]}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-1kr69jw-1 ioeugW">
                                <button type="button" style="left: 0px; margin-bottom: 0px; padding-left: 16px; padding-bottom: 0px;" class="sc-lsvxoe-1 sc-lsvxoe-2 bpAOQo fXtZss">
                                    <div class="sc-lsvxoe-0 kYzpDP">
                                        <svg viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
                                            <path d="M8.08579 16.5858C7.30474 17.3668 7.30474 18.6332 8.08579 19.4142C8.86684 20.1953 10.1332 20.1953 10.9142 19.4142L18.3284 12L10.9142 4.58579C10.1332 3.80474 8.86684 3.80474 8.08579 4.58579C7.30474 5.36684 7.30474 6.63317 8.08579 7.41421L12.6716 12L8.08579 16.5858Z" transform="rotate(180 12 12)"></path>
                                        </svg>
                                    </div>
                                </button>
                                <button type="button" style="right: -72px; margin-bottom: 0px; padding-right: 16px; padding-bottom: 0px;" class="sc-lsvxoe-1 sc-lsvxoe-2 bpAOQo fXtZss">
                                    <div class="sc-lsvxoe-0 kYzpDP">
                                        <svg viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
                                            <path d="M8.08579 16.5858C7.30474 17.3668 7.30474 18.6332 8.08579 19.4142C8.86684 20.1953 10.1332 20.1953 10.9142 19.4142L18.3284 12L10.9142 4.58579C10.1332 3.80474 8.86684 3.80474 8.08579 4.58579C7.30474 5.36684 7.30474 6.63317 8.08579 7.41421L12.6716 12L8.08579 16.5858Z"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        document.querySelector(".sc-1y4z60g-4.cqwgCG").insertAdjacentHTML("beforeend", div);
    }

    // https://www.pixiv.net/ajax/user/*/following?offset=24&limit=24&rest=show
    // https://www.pixiv.net/users/*/following?p=2

    if (document.querySelectorAll(".sc-1y4z60g-5.cPVjJh").length < 24) { return; }

    // URL作成
    const matches = window.location.href.match(followingregex);
    let offset;
    if (matches[2]) {
        offset = (matches[2] * 24) + (pageNumber * 24);
    } else {
        offset = 24 + (pageNumber * 24);
    }
    pageNumber++;
    const url = `https://www.pixiv.net/ajax/user/${matches[1]}/following?offset=${offset}&limit=24&rest=show`;

    const pageAsync = async () => {
        const response = await fetch(url);
        const json = await response.json();
        for (let i = 0; i < Object.keys(json.body.users).length; i++) {
            const users = json.body.users[i];
            const userId = users.userId;
            const userName = users.userName;
            const profileImage = users.profileImageUrl;
            const userComment = users.userComment.slice(0, 98);
            const following = users.following;
            const illustId = [];
            const illustTitle = [];
            const illustUrl = [];
            const bookmarkData = [];
            const illustAlt = [];
            const r18 = [];
            const pageCount = [];
            for (let j = 0; j < Object.keys(json.body.users[i].illusts).length; j++) {
                const illusts = json.body.users[i].illusts[j];
                illustId.push(illusts.id);
                illustTitle.push(illusts.title);
                illustUrl.push(illusts.url);
                bookmarkData.push(illusts.bookmarkData);
                illustAlt.push(illusts.alt);
                r18.push(illusts.tags[0]);
                pageCount.push(illusts.pageCount);
            }
            createDiv(userId, userName, profileImage, userComment, following, illustId, illustTitle, illustUrl, bookmarkData, illustAlt, r18, pageCount);
        }
    };
    pageAsync();
}
// -----------------------------------------------------------------------------------------



// ブックマーク、フォローユーザーの作品、タグ---------------------------------------------------
function anyoneProcess(changeMode) {
    function createDiv(worksId, worksTitle, worksUrl, userId, userName, pageCount, bookmarkData, worksAlt, profileImageUrl, modeClass, modeOtherClass, r18) {

        // ブックマークを切り替え
        let bookmarkClass = "";
        let bookmarkStyle = "";
        if (bookmarkData) {
            bookmarkClass = "bXjFLc";
            bookmarkStyle = 'style="color: rgb(255, 64, 96); fill: currentcolor;"';
        } else {
            bookmarkClass = "dxYRhf";
        }

        // R18マーク
        let r18div = "";
        if (r18 == "R-18") {
            r18div = `
            <div class="sc-rp5asc-15 cIllir">
                <div class="sc-1ovn4zb-0 bfWaOT">R-18</div>
            </div>`;
        }

        // うごくイラスト再生マーク、イラスト数表示
        let ugokuira = "";
        let pageCountHtml = "";
        if (worksAlt.slice(-4) == "うごイラ") {
            ugokuira = '<svg viewBox="0 0 24 24" style="width: 48px; height: 48px;" class="sc-192k5ld-0 etaMpt sc-rp5asc-8 kSDUsv"><circle cx="12" cy="12" r="10" class="sc-192k5ld-1 lajlxF"></circle><path d="M9,8.74841664 L9,15.2515834 C9,15.8038681 9.44771525,16.2515834 10,16.2515834 C10.1782928,16.2515834 10.3533435,16.2039156 10.5070201,16.1135176 L16.0347118,12.8619342 C16.510745,12.5819147 16.6696454,11.969013 16.3896259,11.4929799 C16.3034179,11.3464262 16.1812655,11.2242738 16.0347118,11.1380658 L10.5070201,7.88648243 C10.030987,7.60646294 9.41808527,7.76536339 9.13806578,8.24139652 C9.04766776,8.39507316 9,8.57012386 9,8.74841664 Z" class="sc-192k5ld-2 jwyUTl"></path></svg>';
        } else {
            if (pageCount > 2) {
                pageCountHtml = `
                <div class="sc-rp5asc-5 hHNegy">
                    <div class="sc-1mr081w-0 kZlOCw">
                        <span class="sc-1mr081w-1 gODLwk">
                            <span class="sc-14heosd-0 gbNjFx">
                                <svg viewBox="0 0 9 10" size="9" class="sc-14heosd-1 fArvVr">
                                    <path d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10 C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1 C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8 0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z" transform=""></path>
                                </svg>
                            </span>
                        </span>
                        <span>${pageCount}</span>
                    </div>
                </div>`;
            }
        }

        div += `
        ${modeClass}
            <div class="sc-iasfms-5 liyNwX">
                <div type="illust" size="184" class="sc-iasfms-3 iIcDMF">
                    <div width="184" height="184" class="sc-rp5asc-0 fxGVAF">
                        <a class="sc-d98f2c-0 sc-rp5asc-16 iUsZyY ${modeOtherClass} sc-eWnToP khjDVZ" data-gtm-value="${worksId}" data-gtm-user-id="${userId}" href="/artworks/${worksId}">
                            <div radius="4" class="sc-rp5asc-9 cYUezH">
                                <img src="${worksUrl}" style="object-fit: cover; object-position: center center;" alt="${worksAlt}" class="sc-rp5asc-10 erYaF">
                                ${ugokuira}
                            </div>
                            <div class="sc-rp5asc-12 Sxcoo">
                                <div class="sc-rp5asc-13 liXhix">
                                ${r18div}
                                </div>
                                ${pageCountHtml}
                            </div>
                        </a>
                        <div class="sc-iasfms-4 iHfghO">
                            <div class="">
                                <button type="button" class="sc-kgq5hw-0 fgVkZi">
                                    <svg viewBox="0 0 32 32" width="32" height="32" class="sc-j89e3c-1 ${bookmarkClass}" ${bookmarkStyle}>
                                        <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183 C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5 C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366 C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                                        <path d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5 C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328 C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5 C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z" class="sc-j89e3c-0 dUurgf"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sc-iasfms-0 jtpclu">
                    <a class="sc-d98f2c-0 sc-iasfms-6 gqlfsh" href="/artworks/${worksId}">${worksTitle}</a>
                </div>
                <div class="sc-iasfms-0 jtpclu">
                    <div aria-haspopup="true" class="sc-1rx6dmq-0 icsUdQ">
                        <div class="sc-1rx6dmq-1 eMfHJB">
                            <a class="sc-d98f2c-0" data-gtm-value="${userId}" href="/users/${userId}">
                                <div size="24" title="${userName}" role="img" class="sc-1asno00-0 hMqBzA">
                                    <img src="${profileImageUrl}" style="object-fit: cover; object-position: center top;" width="24" height="24" alt="${userName}">
                                </div>
                            </a>
                        </div>
                        <a class="sc-d98f2c-0 sc-1rx6dmq-2 kghgsn" data-gtm-value="${userId}" href="/users/${userId}">${userName}</a>
                    </div>
                </div>
            </div>
        </li>`;
    }

    let div = "";
    if (changeMode == "bookmark") {
        // ブックマーク
        // https://www.pixiv.net/ajax/user/*/illusts/bookmarks?tag=&offset=0&limit=48&rest=show
        // https://www.pixiv.net/users/*/bookmarks/artworks?p=2

        if (document.querySelectorAll(".sc-9y4be5-2.kFAPOq").length < 48) { return; }

        // URL作成
        const matches = window.location.href.match(bookmarkRegex);
        let offset;
        if (matches[2]) {
            offset = (matches[1] * 48) + (pageNumber * 48);
        } else {
            offset = 48 + (pageNumber * 48);
        }
        pageNumber++
        const url = `https://www.pixiv.net/ajax/user/${matches[1]}/illusts/bookmarks?tag=&offset=${offset}&limit=48&rest=show`;

        const pageAsync = async () => {
            const response = await fetch(url);
            const json = await response.json();
            for (let i = 0; i < Object.keys(json.body.works).length; i++) {
                const works = json.body.works[i];
                const worksId = works.id;
                const worksTitle = works.title;
                const worksUrl = works.url;
                const userId = works.userId;
                const userName = works.userName;
                const pageCount = works.pageCount;
                const bookmarkData = works.bookmarkData;
                const worksAlt = works.alt;
                const profileImageUrl = works.profileImageUrl;
                const modeClass = '<li size="1" offset="0" class="sc-9y4be5-2 sc-9y4be5-3 sc-1wcj34s-1 kFAPOq CgxkO nextPage" style="display: block">';
                const modeOtherClass = "";
                const r18 = works.tags[0];
                createDiv(worksId, worksTitle, worksUrl, userId, userName, pageCount, bookmarkData, worksAlt, profileImageUrl, modeClass, modeOtherClass, r18);
            }
            document.querySelector(".sc-9y4be5-1.jtUPOE").insertAdjacentHTML("beforeend", div);
        };
        pageAsync();
    } else if (changeMode == "follow") {
        // フォローユーザーの作品
        // https://www.pixiv.net/ajax/follow_latest/illust?p=2&mode=all
        // https://www.pixiv.net/bookmark_new_illust.php?p=2

        if (document.querySelectorAll(".sc-9y4be5-2.kFAPOq").length < 60) { return; }

        // URL作成
        const matches = window.location.href.match(followUserRegex);
        let offset;
        ++pageNumber;
        if (matches[2]) {
            offset = matches[2] + pageNumber;
        } else {
            offset = 1 + pageNumber;
        }
        let mode = "";
        if (matches[1]) {
            mode = "r18";
        } else {
            mode = "all";
        }
        const url = `https://www.pixiv.net/ajax/follow_latest/illust?p=${offset}&mode=${mode}`;

        const pageAsync = async () => {
            const response = await fetch(url);
            const json = await response.json();
            for (let i = 0; i < Object.keys(json.body.thumbnails.illust).length; i++) {
                const illust = json.body.thumbnails.illust[i];
                const illustId = illust.id;
                const illustTitle = illust.title;
                const illustUrl = illust.url;
                const userId = illust.userId;
                const userName = illust.userName;
                const pageCount = illust.pageCount;
                const bookmarkData = illust.bookmarkData;
                const illustAlt = illust.alt;
                const profileImageUrl = illust.profileImageUrl;
                const modeClass = '<li size="1" offset="0" class="sc-9y4be5-2 sc-9y4be5-3 sc-1wcj34s-1 kFAPOq wHEbW nextPage" style="display: block">';
                const modeOtherClass = "gtm-followlatestpage-thumbnail-link";
                const r18 = illust.tags[0];
                createDiv(illustId, illustTitle, illustUrl, userId, userName, pageCount, bookmarkData, illustAlt, profileImageUrl, modeClass, modeOtherClass, r18);
            }
            document.querySelector(".sc-9y4be5-1.jtUPOE").insertAdjacentHTML("beforeend", div);
        };
        pageAsync();
    } else if (changeMode == "tag") {
        // タグ
        // https://www.pixiv.net/ajax/search/artworks/*?word=*&order=date_d&mode=all&p=1&s_mode=s_tag_full&type=all
        // https://www.pixiv.net/tags/*/artworks?p=2

        if (document.querySelectorAll(".sc-l7cibp-2.gpVAva").length < 60) { return; }

        // URL作成
        const matches = window.location.href.match(tagRegex);
        let offset;
        ++pageNumber;
        if (matches[7]) {
            offset = matches[7] + pageNumber;
        } else {
            offset = 1 + pageNumber;
        }

        let type = "";
        let illustType;
        if (matches[2] == "manga") {
            type = "type=manga";
            illustType = "manga";
        } else if (matches[2] == "artworks") {
            type = "type=all";
            illustType = "illustManga";
        } else if (matches[9] == "illust") {
            type = "type=illust";
            illustType = "illust";
        } else if (matches[9] == "ugoira") {
            type = "type=ugoira";
            illustType = "illust";
        } else if (matches[2] == "illustrations") {
            type = "type=illust_and_ugoira";
            illustType = "illust";
        }

        let scd = "";
        if (matches[5]) {
            scd = `&${matches[5]}`;
        }
        let ecd = "";
        if (matches[6]) {
            ecd = `&${matches[6]}`;
        }
        let othertag = "";
        if (matches[10]) {
            othertag = `&${matches[10]}`;
        }

        let mode = "";
        if (matches[4] == "mode=safe" || matches[4] == "mode=r18") {
            mode = matches[4];
        } else {
            mode = "mode=all";
        }

        let order = "";
        if (matches[3] == "order=date") {
            order = matches[3];
        } else {
            order = "order=date_d";
        }

        let tagMode = "";
        if (matches[8] == "s_mode=s_tag" || matches[8] == "s_mode=s_tc") {
            tagMode = matches[8];
        } else {
            tagMode = "s_mode=s_tag_full";
        }
        const url = `https://www.pixiv.net/ajax/search/${matches[2]}/${matches[1]}?word=${matches[1]}&${order}&${mode}&p=${offset}&${tagMode}&${type}${scd}${ecd}${othertag}`;

        const pageAsync = async () => {
            const response = await fetch(url);
            const json = await response.json();
            for (let i = 0; i < Object.keys(json.body[illustType].data).length; i++) {
                // jsonファイルに、なぜか必ず1つだけ欠けている部分があるのでスキップする
                if (!json.body[illustType].data[i].id) { continue; } 
                const illust = json.body[illustType].data[i];
                const illustId = illust.id;
                const illustTitle = illust.title;
                const illustUrl = illust.url;
                const userId = illust.userId;
                const userName = illust.userName;
                const pageCount = illust.pageCount;
                const bookmarkData = illust.bookmarkData;
                const illustAlt = illust.alt;
                const profileImageUrl = illust.profileImageUrl;
                const modeClass = '<li class="sc-l7cibp-2 gpVAva nextPage" style="display: block">';
                const modeOtherClass = "";
                const r18 = illust.tags[0];
                createDiv(illustId, illustTitle, illustUrl, userId, userName, pageCount, bookmarkData, illustAlt, profileImageUrl, modeClass, modeOtherClass, r18);
            }
            document.querySelector(".sc-l7cibp-1.krFoBL").insertAdjacentHTML("beforeend", div);
        };
        pageAsync();
    }
}
// -----------------------------------------------------------------------------------------


let confirmProcess = false;
let currentLocation;
let pageNumber = 0;
const followingregex = /https:\/\/www\.pixiv\.net(?:\/en)?\/users\/(\d+)\/following(?:\?p=(\d+))?/;
const bookmarkRegex = /https:\/\/www\.pixiv\.net(?:\/en)?\/users\/(\d+)\/bookmarks\/artworks(?:\?p=(\d+))?/;
const followUserRegex = /https:\/\/www\.pixiv\.net\/bookmark_new_illust(_r18)?\.php(?:\?p=(\d+))?/;
const tagRegex = /https:\/\/www\.pixiv\.net\/tags\/(.+)\/(artworks|illustrations|manga)(?:\?(order=date))?(?:(?:&|\?)(mode=(?:r18|safe)))?(?:(?:&|\?)(scd=\d{4}\-\d{2}-\d{2}))?(?:(?:&|\?)(ecd=\d{4}\-\d{2}-\d{2}))?(?:(?:&|\?)p=(\d+))?(?:(?:&|\?)(s_mode=(?:s_tag|s_tc)))?(?:(?:&|\?)type=([^&]+))?(?:(?:&|\?)(.+))?/;

const observer = new MutationObserver(() => {
    // URLが変更された際の処理
    if (window.location.href != currentLocation) {
        confirmProcess = false;
        pageNumber = 0;
        // タグページで条件を変更した際に、追加した要素を削除する
        if (tagRegex.test(window.location.href)) {
            const addPictures = document.querySelectorAll(".nextPage");
            for (const addPicture of addPictures) {
                addPicture.remove();
            }
        }
    }

    if (followingregex.test(window.location.href)) {
        // フォロー
        currentLocation = window.location.href;
        const targetElement = document.querySelector(".sc-1y4z60g-4.cqwgCG");

        if (targetElement && !confirmProcess) {
            confirmProcess = true;
            const scrollObserver = new IntersectionObserver(entries => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        followingProcess();
                        confirmProcess = false;
                        scrollObserver.unobserve(entry.target);
                    }
                })
            });
            scrollObserver.observe(document.querySelector(".sc-1y4z60g-5.cPVjJh:last-child").previousElementSibling);
        }
    } else if (bookmarkRegex.test(window.location.href) || followUserRegex.test(window.location.href) || tagRegex.test(window.location.href)) {
        // ブックマーク、フォローユーザーの作品、タグ
        currentLocation = window.location.href;

        let changeMode;
        if (bookmarkRegex.test(window.location.href)) {
            changeMode = "bookmark";
        } else if (followUserRegex.test(window.location.href)) {
            changeMode = "follow";
        } else {
            changeMode = "tag";
        }

        let targetElement;
        if (bookmarkRegex.test(window.location.href) || followUserRegex.test(window.location.href)) {
            targetElement = document.querySelector(".sc-9y4be5-1.jtUPOE");
        } else {
            targetElement = document.querySelector(".sc-l7cibp-1.krFoBL img");
        }

        if (targetElement && !confirmProcess) {
            confirmProcess = true;

            const options = { rootMargin: "0px 0px 300px 0px" };
            const scrollObserver = new IntersectionObserver(entries => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anyoneProcess(changeMode);
                        confirmProcess = false;
                        scrollObserver.unobserve(entry.target);
                    }
                })
            }, options);

            if (bookmarkRegex.test(window.location.href) || followUserRegex.test(window.location.href)) {
                scrollObserver.observe(document.querySelector(".sc-9y4be5-2.kFAPOq:last-child"));
            } else {
                // タグページで条件を切り替えた際に、うまく動作しないのでsetTimeoutを使用。おそらく要素を取得するタイミングの問題
                setTimeout(() => {
                    scrollObserver.observe(document.querySelector(".sc-l7cibp-2.gpVAva:last-child"));
                }, 400);
            }
        }
    }
});
const config = { childList: true, subtree: true };
observer.observe(document.querySelector("#root"), config);
