import { ApiResponse } from "./xhr.js";
/**
 * Omit nil or empty object/array values of the object. Keep booleans & numbers.
 * Checks only first level object properties, does not check it recursively.
 */
export declare const omitEmpty: import("lodash/fp.js").LodashOmitBy1x1<unknown>;
/**
 * Utility methods. Mostly private
 *
 *
 */
export declare const getQueryEntries: (obj: any) => any;
export interface IPollingOptions {
    /** The number of performed polling attempts */
    attempts?: number;
    /** Maximum number of polling attempts */
    maxAttempts?: number;
    /** Milliseconds delay between each polling attempts */
    pollStep?: number;
    /** Type of data Blob referenced by returned Object URL. If blobContentType is not specified, blob object URL is generated and returned.  */
    blobContentType?: string;
}
/**
 * Helper for polling
 *
 * @param xhrRequest - xhr module
 * @param uri - URI to poll
 * @param isPollingDone - function determining whether the polling is finished
 * @param options - for polling (maxAttempts, pollStep)
 * @internal
 */
export declare const handlePolling: (xhrRequest: any, uri: string, isPollingDone: (response: any) => boolean, options?: IPollingOptions) => Promise<any>;
/**
 * Helper for polling with header status
 *
 * @param xhrRequest - xhr module
 * @param uri - URI to poll
 * @param isPollingDone - function determining whether the polling is finished
 * @param options - for polling (maxAttempts, pollStep)
 * @internal
 */
export declare const handleHeadPolling: (xhrRequest: any, uri: string, isPollingDone: (responseHeaders: Response, response: ApiResponse) => boolean, options?: IPollingOptions) => Promise<any>;
/**
 * Tests whether the provided string looks like a URI of a metadata object on GoodData platform
 *
 * @param value - string to test
 * @public
 */
export declare const isUri: (value: string) => boolean;
/**
 * Builds query string from plain object
 * (Refactored from admin/routes.js)
 *
 * @param query - parameters possibly including arrays inside
 * @returns querystring
 */
export declare function queryString(query: any): string;
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
export declare function getAllPagesByOffsetLimit(xhr: any, uri: string, itemKey: string, offset?: number, pagesData?: any[]): Promise<any>;
export declare const parseSettingItemValue: (value: string) => boolean | number | string;
//# sourceMappingURL=util.d.ts.map