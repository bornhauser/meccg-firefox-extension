browser.storage.local.get('meccgAddonStatus').then((result) => {
    if (!!result && !!result.meccgAddonStatus) {
        document.querySelector(".popup-content").classList.add("_active");
    } else {
        document.querySelector(".popup-content").classList.remove("_active");
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "activateButton") {
        setAddonStatusAndReloadPage(true);
    }
    if (event.target.id === "deactivateButton") {
        setAddonStatusAndReloadPage(false);
    }
    if (event.target.id === "refreshButton") {
        setAddonStatusAndReloadPage(null);
    }
    window.close();
});

const setAddonStatusAndReloadPage = (newStatus) => {
    if (newStatus === true || newStatus === false) {
        browser.storage.local.set({meccgAddonStatus: newStatus});
    }
    browser.tabs.executeScript({code: 'document.location.reload();'});
}
