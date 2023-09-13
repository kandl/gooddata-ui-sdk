// (C) 2007-2020 GoodData Corporation
import { invariant } from "ts-invariant";
import qs from "qs";
import range from "lodash/range.js";
import { ApiResponseError } from "../xhr.js";
import { convertExecutionToJson } from "./execute-afm.convert.js";
import { stringify } from "../utils/queryString.js";
export const DEFAULT_LIMIT = 1000;
/**
 * This interface represents error caused during second part of api execution (data fetching)
 * and contains information about first execution part if that part was successful.
 *
 * @internal
 * @internal
 */
export class ApiExecutionResponseError extends ApiResponseError {
    constructor(error, executionResponse) {
        super(error.message, error.response, error.responseBody);
        this.executionResponse = executionResponse;
    }
}
export class ExecuteAfmModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Execute AFM and fetch all data results
     *
     * @param projectId - GD project identifier
     * @param execution - what to execute
     *
     * @returns Structure with `executionResponse` and `executionResult`
     */
    executeAfm(projectId, execution) {
        var _a, _b, _c;
        validateNumOfDimensions((_c = (_b = (_a = execution.execution.resultSpec) === null || _a === void 0 ? void 0 : _a.dimensions) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0);
        return this.getExecutionResponse(projectId, execution).then((executionResponse) => {
            return this.getExecutionResult(executionResponse.links.executionResult)
                .then((executionResult) => {
                return { executionResponse, executionResult };
            })
                .catch((error) => {
                throw new ApiExecutionResponseError(error, executionResponse);
            });
        });
    }
    /**
     * Execute AFM and return execution's response; the response describes dimensionality of the results and
     * includes link to poll for the results.
     *
     * @param projectId - GD project identifier
     * @param execution - what to get the response for
     *
     * @returns Promise with `executionResponse`
     */
    getExecutionResponse(projectId, execution) {
        var _a, _b, _c;
        validateNumOfDimensions((_c = (_b = (_a = execution.execution.resultSpec) === null || _a === void 0 ? void 0 : _a.dimensions) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0);
        return this.xhr
            .post(`/gdc/app/projects/${projectId}/executeAfm`, { body: convertExecutionToJson(execution) })
            .then((apiResponse) => apiResponse.getData())
            .then(unwrapExecutionResponse);
    }
    /**
     * Execute saved visualization and get all data.
     *
     * NOTE: all functionality related to executeVisualization is experimental and subject to possible breaking changes
     * in the future; location and shape of this interface WILL change when the functionality is made GA.
     *
     * @param projectId - GD project identifier
     * @param visExecution - execution payload
     *
     * @internal
     * @internal
     */
    _executeVisualization(projectId, visExecution) {
        // We have ONE-3961 as followup to take this out of experimental mode
        return this._getVisExecutionResponse(projectId, visExecution).then((executionResponse) => {
            return this.getExecutionResult(executionResponse.links.executionResult).then((executionResult) => {
                return { executionResponse, executionResult };
            });
        });
    }
    /**
     *
     * Execute visualization and return the response; the response describes dimensionality of the results and
     * includes link to poll for the results.
     *
     * NOTE: all functionality related to executeVisualization is experimental and subject to possible breaking changes
     * in the future; location and shape of this interface WILL change when the functionality is made GA.
     *
     * @param projectId - GD project identifier
     * @param visExecution - execution payload
     *
     * @internal
     * @internal
     */
    _getVisExecutionResponse(projectId, visExecution) {
        // We have ONE-3961 as followup to take this out of experimental mode
        const body = createExecuteVisualizationBody(visExecution);
        return this.xhr
            .post(`/gdc/app/projects/${projectId}/executeVisualization`, { body })
            .then((apiResponse) => apiResponse.getData())
            .then(unwrapExecutionResponse);
    }
    //
    // working with results
    //
    /**
     * Get one page of Result from Execution (with requested limit and offset)
     *
     * @param executionResultUri - URI of the execution result to work with
     * @param limit - limit for each dimension
     * @param offset - offset for each dimension
     *
     * @returns Promise with `executionResult` or `null` (null means empty response - HTTP 204)
     */
    getPartialExecutionResult(executionResultUri, limit, offset) {
        const executionResultUriQueryPart = getExecutionResultUriQueryPart(executionResultUri);
        const numOfDimensions = Number(qs.parse(executionResultUriQueryPart).dimensions);
        validateNumOfDimensions(numOfDimensions);
        return this.getPage(executionResultUri, limit, offset);
    }
    /**
     * Get whole ExecutionResult
     *
     * @param executionResultUri - URI of the execution result to work with
     *
     * @returns Promise with `executionResult` or `null` (null means empty response - HTTP 204)
     */
    getExecutionResult(executionResultUri) {
        const executionResultUriQueryPart = getExecutionResultUriQueryPart(executionResultUri);
        const numOfDimensions = Number(qs.parse(executionResultUriQueryPart).dimensions);
        validateNumOfDimensions(numOfDimensions);
        const limit = Array(numOfDimensions).fill(DEFAULT_LIMIT);
        const offset = Array(numOfDimensions).fill(0);
        return this.getAllPages(executionResultUri, limit, offset);
    }
    getPage(executionResultUri, limit, offset) {
        return this.fetchExecutionResult(executionResultUri, limit, offset).then((executionResultWrapper) => {
            return executionResultWrapper ? unwrapExecutionResult(executionResultWrapper) : null;
        });
    }
    getAllPages(executionResultUri, limit, offset, prevExecutionResult) {
        return this.fetchExecutionResult(executionResultUri, limit, offset).then((executionResultWrapper) => {
            if (!executionResultWrapper) {
                return null;
            }
            const executionResult = unwrapExecutionResult(executionResultWrapper);
            const newExecutionResult = prevExecutionResult
                ? mergePage(prevExecutionResult, executionResult)
                : executionResult;
            const { offset, total } = executionResult.paging;
            const nextOffset = getNextOffset(limit, offset, total);
            const nextLimit = getNextLimit(limit, nextOffset, total);
            return nextPageExists(nextOffset, total)
                ? this.getAllPages(executionResultUri, nextLimit, nextOffset, newExecutionResult)
                : newExecutionResult;
        });
    }
    fetchExecutionResult(executionResultUri, limit, offset) {
        const uri = replaceLimitAndOffsetInUri(executionResultUri, limit, offset);
        return this.xhr
            .get(uri)
            .then((apiResponse) => (apiResponse.response.status === 204 ? null : apiResponse.getData()));
    }
}
function getExecutionResultUriQueryPart(executionResultUri) {
    return executionResultUri.split(/\?(.+)/)[1];
}
function unwrapExecutionResponse(executionResponseWrapper) {
    return executionResponseWrapper.executionResponse;
}
function unwrapExecutionResult(executionResultWrapper) {
    return executionResultWrapper.executionResult;
}
function validateNumOfDimensions(numOfDimensions) {
    invariant(numOfDimensions === 1 || numOfDimensions === 2, `${numOfDimensions} dimensions are not allowed. Only 1 or 2 dimensions are supported.`);
}
function createExecuteVisualizationBody(visExecution) {
    const { reference, resultSpec, filters } = visExecution.visualizationExecution;
    const resultSpecProp = resultSpec ? { resultSpec } : undefined;
    const filtersProp = filters ? { filters } : undefined;
    return JSON.stringify({
        visualizationExecution: Object.assign(Object.assign({ reference }, resultSpecProp), filtersProp),
    });
}
export function replaceLimitAndOffsetInUri(oldUri, limit, offset) {
    const [uriPart, queryPart] = oldUri.split(/\?(.+)/);
    const query = Object.assign(Object.assign({}, qs.parse(queryPart)), { limit: limit.join(","), offset: offset.join(",") });
    return uriPart + stringify(query, { addQueryPrefix: true });
}
export function getNextOffset(limit, offset, total) {
    const numOfDimensions = total.length;
    const defaultNextRowsOffset = offset[0] + limit[0];
    if (numOfDimensions === 1) {
        return [defaultNextRowsOffset];
    }
    const defaultNextColumnsOffset = offset[1] + limit[1];
    const nextColumnsExist = offset[1] + limit[1] < total[1];
    const nextRowsOffset = nextColumnsExist
        ? offset[0] // stay in the same rows
        : defaultNextRowsOffset; // go to the next rows
    const nextColumnsOffset = nextColumnsExist
        ? defaultNextColumnsOffset // next columns for the same rows
        : 0; // start in the beginning of the next rows
    return [nextRowsOffset, nextColumnsOffset];
}
export function getNextLimit(limit, nextOffset, total) {
    const numOfDimensions = total.length;
    validateNumOfDimensions(numOfDimensions);
    const getSingleNextLimit = (limit, nextOffset, total) => nextOffset + limit > total ? total - nextOffset : limit;
    // prevent set up lower limit than possible for 2nd dimension in the beginning of the next rows
    if (numOfDimensions === 2 &&
        nextOffset[1] === 0 && // beginning of the next rows
        limit[0] < total[1] // limit from 1st dimension should be used in 2nd dimension
    ) {
        return [getSingleNextLimit(limit[0], nextOffset[0], total[0]), limit[0]];
    }
    return range(numOfDimensions).map((i) => getSingleNextLimit(limit[i], nextOffset[i], total[i]));
}
export function nextPageExists(nextOffset, total) {
    // expression "return nextLimit[0] > 0" also returns correct result
    return nextOffset[0] < total[0];
}
function mergeHeaderItemsForEachAttribute(dimension, headerItems, result) {
    if (headerItems && result.headerItems) {
        for (let attrIdx = 0; attrIdx < headerItems[dimension].length; attrIdx += 1) {
            result.headerItems[dimension][attrIdx].push(...headerItems[dimension][attrIdx]);
        }
    }
}
// works only for one or two dimensions
export function mergePage(prevExecutionResult, executionResult) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const result = prevExecutionResult;
    const { headerItems, data, paging } = executionResult;
    const mergeHeaderItems = (dimension) => {
        // for 1 dimension we already have the headers from first page
        const otherDimension = dimension === 0 ? 1 : 0;
        const isEdge = paging.offset[otherDimension] === 0;
        if (isEdge) {
            mergeHeaderItemsForEachAttribute(dimension, headerItems, result);
        }
    };
    // merge data
    const rowOffset = paging.offset[0];
    if (result.data[rowOffset]) {
        // appending columns to existing rows
        for (let i = 0; i < data.length; i += 1) {
            const columns = data[i];
            const resultData = result.data[i + rowOffset];
            resultData.push(...columns);
        }
    }
    else {
        // appending new rows
        const resultData = result.data;
        const currentPageData = data;
        resultData.push(...currentPageData);
    }
    // merge headerItems
    if (paging.offset.length > 1) {
        mergeHeaderItems(0);
        mergeHeaderItems(1);
    }
    else {
        mergeHeaderItemsForEachAttribute(0, headerItems, result);
    }
    // update page count
    if (paging.offset.length === 1) {
        result.paging.count = [(_d = (_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.headerItems) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0];
    }
    if (paging.offset.length === 2) {
        result.paging.count = [
            (_h = (_g = (_f = (_e = result === null || result === void 0 ? void 0 : result.headerItems) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0,
            (_m = (_l = (_k = (_j = result === null || result === void 0 ? void 0 : result.headerItems) === null || _j === void 0 ? void 0 : _j[1]) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.length) !== null && _m !== void 0 ? _m : 0,
        ];
    }
    return result;
}
//# sourceMappingURL=execute-afm.js.map