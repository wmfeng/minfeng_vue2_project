function downloadFile(data, name) {
    const blob = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, name);
    } else {
        // chrome/firefox
        let aTag = document.createElement("a");
        aTag.download = name;
        aTag.href = window.URL.createObjectURL(blob);
        aTag.click();
        window.URL.revokeObjectURL(aTag.href);
    }
}
export default downloadFile