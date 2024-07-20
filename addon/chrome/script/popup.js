document.addEventListener("DOMContentLoaded", () => {
    const dividingLineLabel = document.getElementById("dividing-line-label");
    const dividingLineTitle = chrome.i18n.getMessage("dividingLine");
    console.log(dividingLineTitle);
    dividingLineLabel.childNodes[0].nodeValue = dividingLineTitle;

    const dividingLine = document.getElementById("dividing-line");
    let dividingLineSetting;

    chrome.storage.local.get("dividingLine", (result) => {
        if (result.dividingLine != undefined) {
            dividingLine.checked = result.dividingLine;
        }
    });

    dividingLine.addEventListener("change", () => {
        dividingLineSetting = dividingLine.checked;
        chrome.storage.local.set({ "dividingLine": dividingLineSetting });
    })
})