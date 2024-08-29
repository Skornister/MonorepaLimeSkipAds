// ==UserScript==
// @name         MonorepaLimeSkipAds
// @version      1.0
// @namespace    Violentmonkey Scripts
// @author       Skornister
// @grant        none
// @icon         https://limehd.tv/logo.png
// @downloadURL  https://github.com/Skornister/MonorepaLimeSkipAds/blob/main/MonorepaLimeSkipAds.js
// @updateURL    https://github.com/Skornister/MonorepaLimeSkipAds/blob/main/MonorepaLimeSkipAds.js
// @homepage     https://github.com/Skornister/MonorepaLimeSkipAds
// ==/UserScript==

const elementsToRemove = [
    { type: 'xpath', value: "//video[@class='w-full h-full bg-backdrop']/..", description: 'Ads container' },
    { type: 'id', value: 'creativeWrapper', description: 'CreativeWrapper container' },
];

function removeElement(element, description) {
    if (element) {
        element.remove();
        console.log(`${description} removed`);
    }
}

function initScript() {
    try {
        elementsToRemove.forEach(item => {
            let element = item.type === 'id' ? getElementById(item.value) : getElementByXpath(item.value);
            removeElement(element, item.description);
        });
    } catch (e) {
        console.error('Failed to execute the script', e);
    }
}

function waitForAds() {
    let debounceTimeout;
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            initScript();
        }, 100); // 100 мс задержка
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function getElementByXpath(xpath, context = document) {
    return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementById(id) {
    return document.getElementById(id);
}

waitForAds();
