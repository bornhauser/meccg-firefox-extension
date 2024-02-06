document.addEventListener("click", (event) => {
    if (event.target.id === "activateMECCG") {
        browser.tabs.executeScript({
            file: "app_1.js",
        });
    }

    if (event.target.id === "deactivateMECCG") {
        browser.tabs.executeScript({
            file: "app_2.js",
        });
    }

});
