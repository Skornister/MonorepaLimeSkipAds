// ==UserScript==
// @name         MonorepaLimeSkipAds
// @version      1.1
// @namespace    Violentmonkey Scripts
// @author       Skornister
// @match        https://sprint.litehd.tv/*
// @match        https://limehd.tv/*
// @match    	 https://litehd.tv/*
// @grant        none
// @icon         https://limehd.tv/logo.png
// @downloadURL  https://github.com/Skornister/MonorepaLimeSkipAds/blob/main/MonorepaLimeSkipAds.js
// @updateURL    https://github.com/Skornister/MonorepaLimeSkipAds/blob/main/MonorepaLimeSkipAds.js
// @homepage     https://github.com/Skornister/MonorepaLimeSkipAds
// ==/UserScript==

(function() {
                const elementsToRemove = [
                    { type: 'xpath', value: "//video[@class='w-full h-full bg-backdrop']/..", description: 'Ads container' },
                    { type: 'id', value: 'creativeWrapper', description: 'CreativeWrapper container' },
                    { type: 'xpath', value: "//*[contains(text(), 'The quick brown fox jumps over the lazy dog')]", description: "Text 'The quick brown fox jumps over the lazy dog'" }
                ];

                function getElement(selector) {
                    if (selector.type === 'id') return document.getElementById(selector.value);
                    return document.evaluate(selector.value, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }

                function removeAds() {
                    elementsToRemove.forEach(item => {
                        const element = getElement(item);
                        if (element) {
                            element.remove();
                            console.log(`${item.description} removed`);
                        }
                    });
                }

                const observer = new MutationObserver((mutations) => {
                    removeAds();
                });

                observer.observe(document.body, { childList: true, subtree: true });
                removeAds();
            })();
