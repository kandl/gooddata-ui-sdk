export const DOWNLOADER_ID = "downloader";
export function downloadFile({ objectUrl, fileName }) {
    const anchor = document.createElement("a");
    anchor.id = DOWNLOADER_ID;
    anchor.href = objectUrl;
    anchor.download = fileName !== null && fileName !== void 0 ? fileName : "exportedFile";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    if (objectUrl) {
        URL.revokeObjectURL(objectUrl); // release blob memory from window object
    }
}
//# sourceMappingURL=downloadFile.js.map