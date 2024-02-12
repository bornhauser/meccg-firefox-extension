browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        browser.storage.local.get('meccgAddonStatus').then((result) => {
            if (!!result && !!result.meccgAddonStatus) {
                browser.browserAction.setIcon({
                    path: {
                        48: "img/icon_1-48.png",
                    },
                });
                startRendering();
            } else {
                browser.browserAction.setIcon({
                    path: {
                        48: "img/icon_2-48.png",
                    },
                });
            }
        });
    }
});

async function startRendering() {
    await browser.tabs.executeScript({file: 'cards/_1_theWizards.js'});
    await browser.tabs.executeScript({file: 'cards/_2_theDragons.js'});
    await browser.tabs.executeScript({file: 'cards/_3_darkMinions.js'});
    await browser.tabs.executeScript({file: 'cards/_4_lidlessEye.js'});
    await browser.tabs.executeScript({file: 'cards/_5_againstTheShadow.js'});
    await browser.tabs.executeScript({file: 'cards/_6_whiteHand.js'});
    await browser.tabs.executeScript({file: 'cards/_7_theBalrog.js'});
    await browser.tabs.executeScript({file: 'js/jquery.js'});
    await browser.tabs.executeScript({file: 'js/render.js'});
}
