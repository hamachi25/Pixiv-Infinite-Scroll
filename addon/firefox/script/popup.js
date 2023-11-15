document.addEventListener("DOMContentLoaded", () => {
    const dividingLineLabel = document.getElementById("dividing-line-label");
    const dividingLineTitle = browser.i18n.getMessage("dividingLine");
    dividingLineLabel.childNodes[0].nodeValue = dividingLineTitle;

    const dividingLine = document.getElementById("dividing-line");
    let dividingLineSetting;

    browser.storage.local.get("dividingLine").then((result) => {
        if (result.dividingLine != undefined) {
            console.log(result.dividingLine)
            dividingLine.checked = result.dividingLine;
        }
    })

    dividingLine.addEventListener("change", () => {
        dividingLineSetting = dividingLine.checked;
        browser.storage.local.set({ "dividingLine": dividingLineSetting });
    })
})