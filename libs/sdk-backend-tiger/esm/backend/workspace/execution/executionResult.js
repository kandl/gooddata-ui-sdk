// (C) 2019-2023 GoodData Corporation
import { TabularExportRequestFormatEnum, } from "@gooddata/api-client-tiger";
import { NoDataError, UnexpectedError, TimeoutError, } from "@gooddata/sdk-backend-spi";
import SparkMD5 from "spark-md5";
import { transformResultDimensions } from "../../../convertors/fromBackend/afm/dimensions.js";
import { transformExecutionResult } from "../../../convertors/fromBackend/afm/result.js";
import { transformGrandTotalData } from "../../../convertors/fromBackend/afm/GrandTotalsConverter.js";
import { getTransformDimensionHeaders } from "../../../convertors/fromBackend/afm/DimensionHeaderConverter.js";
import { resolveCustomOverride } from "./utils.js";
import { parseNameFromContentDisposition } from "../../../utils/downloadFile.js";
const TIGER_PAGE_SIZE_LIMIT = 1000;
const DEFAULT_POLL_DELAY = 5000;
const MAX_POLL_ATTEMPTS = 50;
function sanitizeOffset(offset) {
    return offset.map((offsetItem = 0) => offsetItem);
}
function sanitizeSize(size) {
    return size.map((sizeInDim = TIGER_PAGE_SIZE_LIMIT) => {
        if (sizeInDim > TIGER_PAGE_SIZE_LIMIT) {
            console.warn("The maximum limit per page is " + TIGER_PAGE_SIZE_LIMIT);
            return TIGER_PAGE_SIZE_LIMIT;
        }
        return sizeInDim;
    });
}
export class TigerExecutionResult {
    constructor(authCall, definition, executionFactory, execResponse, dateFormatter) {
        this.authCall = authCall;
        this.definition = definition;
        this.executionFactory = executionFactory;
        this.execResponse = execResponse;
        this.dateFormatter = dateFormatter;
        this.asDataView = (promisedRes) => {
            return promisedRes.then((result) => {
                if (!result) {
                    // TODO: SDK8: investigate when can this actually happen; perhaps end of data during paging?
                    //  perhaps legitimate NoDataCase?
                    throw new UnexpectedError("Server returned no data");
                }
                if (isEmptyDataResult(result)) {
                    throw new NoDataError("The execution resulted in no data to display.", new TigerDataView(this, result, this.dateFormatter));
                }
                return new TigerDataView(this, result, this.dateFormatter);
            });
        };
        this.dimensions = transformResultDimensions(execResponse.executionResponse.dimensions, this.definition);
        this.workspace = this.definition.workspace;
        this.resultId = execResponse.executionResponse.links.executionResult;
        this._fingerprint = SparkMD5.hash(this.resultId);
    }
    async readAll() {
        const executionResultPromise = this.authCall((client) => client.executionResult
            .retrieveResult({
            workspaceId: this.workspace,
            resultId: this.resultId,
        })
            .then(({ data }) => data));
        return this.asDataView(executionResultPromise);
    }
    async readWindow(offset, size) {
        const saneOffset = sanitizeOffset(offset);
        const saneSize = sanitizeSize(size);
        const executionResultPromise = this.authCall((client) => client.executionResult
            .retrieveResult({
            workspaceId: this.workspace,
            resultId: this.resultId,
            limit: saneSize,
            offset: saneOffset,
        })
            .then(({ data }) => data));
        return this.asDataView(executionResultPromise);
    }
    transform() {
        return this.executionFactory.forDefinition(this.definition);
    }
    async export(options) {
        var _a, _b;
        const isXlsx = ((_a = options.format) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === "XLSX";
        const format = isXlsx ? TabularExportRequestFormatEnum.XLSX : TabularExportRequestFormatEnum.CSV;
        const payload = {
            format,
            executionResult: this.resultId,
            fileName: (_b = options.title) !== null && _b !== void 0 ? _b : "default",
            settings: isXlsx
                ? {
                    mergeHeaders: Boolean(options.mergeHeaders),
                    showFilters: Boolean(options.showFilters),
                }
                : undefined,
            customOverride: resolveCustomOverride(this.dimensions, this.definition),
        };
        return this.authCall(async (client) => {
            var _a;
            const tabularExport = await client.export.createTabularExport({
                workspaceId: this.workspace,
                tabularExportRequest: payload,
            });
            return await this.handleExportResultPolling(client, {
                workspaceId: this.workspace,
                exportId: (_a = tabularExport === null || tabularExport === void 0 ? void 0 : tabularExport.data) === null || _a === void 0 ? void 0 : _a.exportResult,
            }, format);
        });
    }
    equals(other) {
        return this.fingerprint() === other.fingerprint();
    }
    fingerprint() {
        return this._fingerprint;
    }
    async handleExportResultPolling(client, payload, format) {
        var _a;
        for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
            const result = await client.export.getTabularExport(payload, {
                transformResponse: (x) => x,
                responseType: "blob",
            });
            if ((result === null || result === void 0 ? void 0 : result.status) === 200) {
                const type = format === "XLSX"
                    ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    : "text/csv";
                const blob = new Blob([result === null || result === void 0 ? void 0 : result.data], { type });
                return {
                    uri: ((_a = result === null || result === void 0 ? void 0 : result.config) === null || _a === void 0 ? void 0 : _a.url) || "",
                    objectUrl: URL.createObjectURL(blob),
                    fileName: parseNameFromContentDisposition(result),
                };
            }
            await new Promise((resolve) => setTimeout(resolve, DEFAULT_POLL_DELAY));
        }
        throw new TimeoutError(`Export timeout for export id "${payload.exportId}" in workspace "${payload.workspaceId}"`);
    }
}
class TigerDataView {
    constructor(result, execResult, dateFormatter) {
        var _a, _b;
        this.result = result;
        this.definition = result.definition;
        const transformDimensionHeaders = getTransformDimensionHeaders(result.dimensions, dateFormatter, execResult.grandTotals);
        const transformedResult = transformExecutionResult(execResult, transformDimensionHeaders);
        this.data = transformedResult.data;
        this.headerItems = transformedResult.headerItems;
        this.offset = transformedResult.offset;
        this.count = transformedResult.count;
        this.totalCount = transformedResult.total;
        this.totals = transformGrandTotalData((_a = execResult.grandTotals) !== null && _a !== void 0 ? _a : [], result.definition, transformedResult.headerItems, transformDimensionHeaders);
        const grandTotalItem = (_b = execResult.grandTotals) === null || _b === void 0 ? void 0 : _b.find((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.totalDimensions) === null || _a === void 0 ? void 0 : _a.length) === 0; });
        const totalTotals = grandTotalItem === null || grandTotalItem === void 0 ? void 0 : grandTotalItem.data;
        this.totalTotals = totalTotals ? [totalTotals] : undefined;
        this._fingerprint = `${result.fingerprint()}/${this.offset.join(",")}-${this.count.join(",")}`;
    }
    fingerprint() {
        return this._fingerprint;
    }
    equals(other) {
        return this.fingerprint() === other.fingerprint();
    }
}
function hasEmptyData(result) {
    return result.data.length === 0;
}
function hasMissingDimensionHeaders(result) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    /*
     * messy fix to tiger's afm always returning dimension headers with no content
     */
    const firstDimHeaders = (_e = (_d = (_c = (_b = (_a = result.dimensionHeaders) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.headerGroups) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e[0];
    const secondDimHeaders = (_k = (_j = (_h = (_g = (_f = result.dimensionHeaders) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.headerGroups) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.headers) === null || _k === void 0 ? void 0 : _k[0];
    return !result.dimensionHeaders || (!firstDimHeaders && !secondDimHeaders);
}
function isEmptyDataResult(result) {
    return hasEmptyData(result) && hasMissingDimensionHeaders(result);
}
//# sourceMappingURL=executionResult.js.map