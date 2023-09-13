// (C) 2019-2023 GoodData Corporation
export function downloadFile(fileName, data) {
    const url = new Blob([data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}
export const parseNameFromContentDisposition = (response) => {
    const contentDispositionHeader = response.headers["content-disposition"];
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const matches = /filename\*?=([^']*'')?([^;]*)/.exec(contentDispositionHeader);
    const urlEncodedFileName = matches ? matches[2] : undefined;
    return urlEncodedFileName ? decodeURIComponent(urlEncodedFileName) : undefined;
};
//# sourceMappingURL=downloadFile.js.map