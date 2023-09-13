// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isNil from "lodash/isNil.js";
import isObject from "lodash/isObject.js";
import omitBy from "lodash/fp/omitBy.js";
import { delay } from "./utils/promise.js";
import { ApiResponseError } from "./xhr.js";
import { parseFileNameFromContentDisposition } from "./utils/export.js";
/**
 * Omit nil or empty object/array values of the object. Keep booleans & numbers.
 * Checks only first level object properties, does not check it recursively.
 */
export const omitEmpty = omitBy((val) => {
    if (isNil(val)) {
        return true;
    }
    else if (isObject(val)) {
        return isEmpty(val);
    }
    return false;
});
/**
 * Utility methods. Mostly private
 *
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getQueryEntries = (obj) => {
    var _a;
    return (_a = obj === null || obj === void 0 ? void 0 : obj.query) === null || _a === void 0 ? void 0 : _a.entries;
};
/**
 * Helper for polling
 *
 * @param xhrRequest - xhr module
 * @param uri - URI to poll
 * @param isPollingDone - function determining whether the polling is finished
 * @param options - for polling (maxAttempts, pollStep)
 * @internal
 */
export const handlePolling = (
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
xhrRequest, uri, isPollingDone, options = {}) => {
    const { attempts = 0, maxAttempts = 50, pollStep = 5000 } = options;
    return xhrRequest(uri)
        .then((r) => r.getData())
        .then((response) => {
        if (attempts > maxAttempts) {
            return Promise.reject(new Error(response));
        }
        return isPollingDone(response)
            ? Promise.resolve(response)
            : delay(pollStep).then(() => {
                return handlePolling(xhrRequest, uri, isPollingDone, Object.assign(Object.assign({}, options), { attempts: attempts + 1 }));
            });
    });
};
/**
 * Helper for polling with header status
 *
 * @param xhrRequest - xhr module
 * @param uri - URI to poll
 * @param isPollingDone - function determining whether the polling is finished
 * @param options - for polling (maxAttempts, pollStep)
 * @internal
 */
export const handleHeadPolling = (
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
xhrRequest, uri, isPollingDone, options = {}) => {
    const { attempts = 0, maxAttempts = 50, pollStep = 5000, blobContentType } = options;
    return xhrRequest(uri, {
        arrayBufferResponseBody: blobContentType !== undefined,
    }).then((response) => {
        if (attempts > maxAttempts) {
            return Promise.reject(new Error("Export timeout!!!"));
        }
        const fetchResponse = response.getHeaders();
        if (isPollingDone(fetchResponse, response)) {
            if (fetchResponse.status === 200) {
                if (options.blobContentType) {
                    const blob = new Blob([response.getRawData()], { type: options.blobContentType });
                    return Promise.resolve({
                        uri,
                        objectUrl: URL.createObjectURL(blob),
                        fileName: parseFileNameFromContentDisposition(fetchResponse),
                    });
                }
                return Promise.resolve({
                    uri,
                });
            }
            return Promise.reject(new ApiResponseError(response.statusText, response, response.getData()));
        }
        else {
            return delay(pollStep).then(() => handleHeadPolling(xhrRequest, uri, isPollingDone, Object.assign(Object.assign({}, options), { attempts: attempts + 1 })));
        }
    });
};
const REG_URI_OBJ = /\/gdc\/md\/\S+\/obj\/\d+/;
/**
 * Tests whether the provided string looks like a URI of a metadata object on GoodData platform
 *
 * @param value - string to test
 * @public
 */
export const isUri = (value) => REG_URI_OBJ.test(value);
/**
 * Builds query string from plain object
 * (Refactored from admin/routes.js)
 *
 * @param query - parameters possibly including arrays inside
 * @returns querystring
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function queryString(query) {
    function getSingleParam(key, value) {
        return Array.isArray(value)
            ? value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join("&")
            : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
    return query
        ? `?${Object.keys(query)
            .map((k) => getSingleParam(k, query[k]))
            .join("&")}`
        : "";
}
/**
 * Get all results from paged api by traversing all resulting pages
 * This is usable for apis which support offset and limit (i.e. not those with next paging links)
 *
 * @param xhrGet - xhr module
 * @param uri - uri to be fetched, will append offset and limit for next pages
 * @param itemKey - key under which to look for results (differs for different apis)
 * @param optional - offset starting offset, default 0
 * @param pagesData - optional data to be pre-filled
 */
export function getAllPagesByOffsetLimit(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
xhr, uri, itemKey, offset = 0, pagesData = []) {
    const PAGE_LIMIT = 100;
    return new Promise((resolve, reject) => {
        xhr.get(`${uri}?offset=${offset}&limit=${PAGE_LIMIT}`)
            .then((r) => r.getData())
            .then((dataObjects) => {
            var _a, _b;
            const projects = dataObjects === null || dataObjects === void 0 ? void 0 : dataObjects[itemKey];
            const data = pagesData.concat(projects.items);
            const totalCount = (_b = (_a = projects === null || projects === void 0 ? void 0 : projects.paging) === null || _a === void 0 ? void 0 : _a.totalCount) !== null && _b !== void 0 ? _b : 0;
            const nextPage = offset + PAGE_LIMIT;
            if (nextPage > totalCount) {
                resolve(data);
            }
            else {
                resolve(getAllPagesByOffsetLimit(xhr, uri, itemKey, nextPage, data));
            }
        }, reject);
    });
}
// Parses string values to boolean, number and string
export const parseSettingItemValue = (value) => {
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }
    const nr = Number(value);
    if (nr.toString() === value) {
        return nr;
    }
    return value;
};
//# sourceMappingURL=util.js.map