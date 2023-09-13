// (C) 2007-2023 GoodData Corporation
import { SUCCESS_REQUEST_STATUS, BAD_REQUEST_STATUS } from "../constants/errors.js";
export function isExportFinished(response) {
    const taskState = response.status;
    return taskState === SUCCESS_REQUEST_STATUS || taskState >= BAD_REQUEST_STATUS; // OK || ERROR
}
export const parseFileNameFromContentDisposition = (response) => {
    const contentDispositionHeader = response.headers.get("Content-Disposition") || "";
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const matches = /filename\*?=([^']*'')?([^;]*)/.exec(contentDispositionHeader);
    const urlEncodedFileName = matches ? matches[2] : undefined;
    return urlEncodedFileName ? decodeURIComponent(urlEncodedFileName) : undefined;
};
export const getFormatContentType = (format) => {
    switch (format) {
        case "csv":
            return "text/csv";
        case "xlsx":
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case "raw":
        default:
            return "application/octet-stream";
    }
};
//# sourceMappingURL=export.js.map