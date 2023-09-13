import { transformResultHeaders } from "@gooddata/sdk-backend-base";
import { NoDataError, UnexpectedError, } from "@gooddata/sdk-backend-spi";
import { bucketsMeasures, bucketsFind, isAttribute, isResultMeasureHeader, isTotalDescriptor, isMeasureGroupIdentifier, } from "@gooddata/sdk-model";
import SparkMD5 from "spark-md5";
import { convertExecutionApiError } from "../../../utils/errorHandling.js";
import { toAfmExecution } from "../../../convertors/toBackend/afm/ExecutionConverter.js";
import { convertWarning, convertDimensions, } from "../../../convertors/fromBackend/ExecutionResultConverter.js";
import { createResultHeaderTransformer } from "../../../convertors/fromBackend/afm/result.js";
import { findDateAttributeUris } from "../../../convertors/dateFormatting/dateFormatter.js";
const TOTAL_ORDER = ["sum", "max", "min", "avg", "med", "nat"];
export class BearExecutionResult {
    constructor(authApiCall, definition, execFactory, execResponse) {
        this.authApiCall = authApiCall;
        this.definition = definition;
        this.execFactory = execFactory;
        this.execResponse = execResponse;
        this.asDataView = (promisedRes) => {
            return promisedRes.then((res) => {
                if (!res) {
                    // TODO: SDK8: investigate when can this actually happen; perhaps end of data during paging?
                    //  perhaps legitimate NoDataCase?
                    throw new UnexpectedError("Server returned no data");
                }
                if (isEmptyDataResult(res)) {
                    throw new NoDataError("The execution resulted in no data to display.", new BearDataView(this, res));
                }
                return new BearDataView(this, res);
            });
        };
        this.dimensions = convertDimensions(execResponse.dimensions);
        this._fingerprint = SparkMD5.hash(execResponse.links.executionResult);
    }
    async readAll() {
        return this.asDataView(this.authApiCall((sdk) => sdk.execution.getExecutionResult(this.execResponse.links.executionResult), convertExecutionApiError));
    }
    async readWindow(offset, size) {
        const saneOffset = sanitizeOffset(offset);
        const saneSize = sanitizeSize(size);
        return this.asDataView(this.authApiCall((sdk) => sdk.execution.getPartialExecutionResult(this.execResponse.links.executionResult, saneSize, saneOffset), convertExecutionApiError));
    }
    transform() {
        return this.execFactory.forDefinition(this.definition);
    }
    async export(options) {
        const optionsForBackend = this.buildExportOptions(options);
        return this.authApiCall((sdk) => sdk.report.exportResult(this.definition.workspace, this.execResponse.links.executionResult, optionsForBackend));
    }
    buildExportOptions(options) {
        const optionsForBackend = {
            format: options.format,
            mergeHeaders: options.mergeHeaders,
            title: options.title,
            showFilters: options.showFilters,
        };
        if (options.showFilters) {
            optionsForBackend.afm = toAfmExecution(this.definition).execution.afm;
        }
        return optionsForBackend;
    }
    equals(other) {
        return this.fingerprint() === other.fingerprint();
    }
    fingerprint() {
        return this._fingerprint;
    }
}
const BEAR_PAGE_SIZE_LIMIT = 1000;
function sanitizeOffset(offset) {
    return offset.map((offsetItem = 0) => offsetItem);
}
function sanitizeSize(size) {
    return size.map((sizeInDim = BEAR_PAGE_SIZE_LIMIT) => {
        if (sizeInDim > BEAR_PAGE_SIZE_LIMIT) {
            console.warn("The maximum limit per page is " + BEAR_PAGE_SIZE_LIMIT);
            return BEAR_PAGE_SIZE_LIMIT;
        }
        return sizeInDim;
    });
}
// for each level (column attribute), prepare a set of totals corresponding for that level
function separateTotalsByLevels(columnTotals, columnIdentifiers) {
    return columnTotals.reduce((acc, total) => {
        var _a;
        const index = columnIdentifiers.indexOf(total.attributeIdentifier);
        if (index !== -1) {
            return Object.assign(Object.assign({}, acc), { [index]: [...((_a = acc[index]) !== null && _a !== void 0 ? _a : []), total] });
        }
        return acc;
    }, {});
}
// for each of the indexed totals levels, initiate iterator at 0 for measure iteration
function initiateTotalsIterators(indexedTotals) {
    return Object.keys(indexedTotals).reduce((acc, key) => {
        return Object.assign(Object.assign({}, acc), { [key]: 0 });
    }, {});
}
// sometimes the order inside dimensions is not guaranteed so we need to sort the totals on each level by measure order
// (happens during adding measure, removing measure, changing measures order)
function fixTotalOrderByMeasuresOrder(indexedTotals, measuresIdentifiers) {
    return Object.keys(indexedTotals).reduce((acc, key) => {
        const current = [...indexedTotals[key]];
        current.sort((a, b) => {
            const totComparison = TOTAL_ORDER.indexOf(a.type) - TOTAL_ORDER.indexOf(b.type);
            if (totComparison !== 0)
                return totComparison;
            return (measuresIdentifiers.indexOf(a.measureIdentifier) -
                measuresIdentifiers.indexOf(b.measureIdentifier));
        });
        return Object.assign(Object.assign({}, acc), { [key]: current });
    }, {});
}
const DIMENSION_BUCKETS = { attribute: 0, columns: 1 };
function preprocessTotalHeaderItemsForDim(headerItems, definition, bucket) {
    var _a, _b, _c, _d;
    const dimension = DIMENSION_BUCKETS[bucket];
    const dimensionTotals = (_a = definition === null || definition === void 0 ? void 0 : definition.dimensions[dimension]) === null || _a === void 0 ? void 0 : _a.totals;
    const metricGroupPresent = (_c = (_b = definition === null || definition === void 0 ? void 0 : definition.dimensions[dimension]) === null || _b === void 0 ? void 0 : _b.itemIdentifiers) === null || _c === void 0 ? void 0 : _c.find(isMeasureGroupIdentifier);
    if (!(dimensionTotals === null || dimensionTotals === void 0 ? void 0 : dimensionTotals.length) || !metricGroupPresent) {
        // noop when no totals associated with that dimension are present
        // or when metric group is not in this particular dimension
        return headerItems;
    }
    const buckets = definition.buckets;
    const measures = bucketsMeasures(buckets);
    const bucketItems = ((_d = bucketsFind(buckets, bucket)) === null || _d === void 0 ? void 0 : _d.items) || [];
    const bucketItemsIdentifiers = bucketItems
        .filter(isAttribute)
        .map((item) => { var _a; return (_a = item.attribute) === null || _a === void 0 ? void 0 : _a.localIdentifier; });
    const measuresIdentifiers = measures.map((m) => m.measure.localIdentifier);
    // separate totals for each level and initiate iterators for them
    const indexedTotalsUnordered = separateTotalsByLevels(dimensionTotals, bucketItemsIdentifiers);
    const indexedTotals = fixTotalOrderByMeasuresOrder(indexedTotalsUnordered, measuresIdentifiers);
    const indexedTotalsIterators = initiateTotalsIterators(indexedTotals);
    return headerItems.map((topHeaderItems) => {
        // nesting level of the total; used to determine level of totals to use.
        const nesting = [];
        return topHeaderItems.map((items) => {
            // process only header items with measures
            // now, nesting info should already be up-to-date as measures are processed last
            if (items.find(isResultMeasureHeader)) {
                return items.map((item, itemIdx) => {
                    if (isTotalDescriptor(item)) {
                        // for each total item, we need to determine on which level the total is defined
                        // (use nesting info built previously when iterating other levels) and
                        // use measure lookups for totals defined on correct levels.
                        const itemLevel = Math.max(0, bucketItemsIdentifiers.length - nesting[itemIdx]);
                        const currentIteratorValue = indexedTotalsIterators[itemLevel];
                        const correspondingTotal = indexedTotals[itemLevel][currentIteratorValue];
                        const totalMeasure = correspondingTotal === null || correspondingTotal === void 0 ? void 0 : correspondingTotal.measureIdentifier;
                        const totalMeasureIndex = measuresIdentifiers.indexOf(totalMeasure);
                        const measureIndex = Math.max(totalMeasureIndex, 0);
                        const result = Object.assign(Object.assign({}, item), { totalHeaderItem: Object.assign(Object.assign({}, item === null || item === void 0 ? void 0 : item.totalHeaderItem), { measureIndex }) });
                        indexedTotalsIterators[itemLevel] =
                            (currentIteratorValue + 1) % indexedTotals[itemLevel].length;
                        return result;
                    }
                    return item;
                });
            }
            items.forEach((item, index) => {
                var _a;
                nesting[index] = (_a = nesting[index]) !== null && _a !== void 0 ? _a : 0;
                if (isTotalDescriptor(item)) {
                    nesting[index] = nesting[index] + 1;
                }
            });
            return items;
        });
    });
}
function preprocessTotalHeaderItems(headerItems, definition) {
    let result = headerItems;
    result = preprocessTotalHeaderItemsForDim(result, definition, "attribute");
    result = preprocessTotalHeaderItemsForDim(result, definition, "columns");
    return result;
}
class BearDataView {
    constructor(result, dataResult) {
        var _a, _b;
        this.result = result;
        this.definition = result.definition;
        this.data = dataResult.data;
        this.headerItems = dataResult.headerItems ? dataResult.headerItems : [];
        this.totals = dataResult.totals;
        this.totalTotals = dataResult.totalTotals;
        this.totalCount = dataResult.paging.total;
        this.count = dataResult.paging.count;
        this.offset = dataResult.paging.offset;
        this.warnings = (_b = (_a = dataResult.warnings) === null || _a === void 0 ? void 0 : _a.map(convertWarning)) !== null && _b !== void 0 ? _b : [];
        this._fingerprint = `${result.fingerprint()}/${this.offset.join(",")}-${this.count.join(",")}`;
        this.headerItems = preprocessTotalHeaderItems(this.headerItems, this.definition);
        this.headerItems = transformResultHeaders(this.headerItems, createResultHeaderTransformer(findDateAttributeUris(result.dimensions)), this.definition.postProcessing);
    }
    fingerprint() {
        return this._fingerprint;
    }
    equals(other) {
        return this.fingerprint() === other.fingerprint();
    }
}
//
//
//
function hasEmptyData(result) {
    return result.data.length === 0;
}
function hasMissingHeaderItems(result) {
    return !result.headerItems;
}
function isEmptyDataResult(result) {
    return hasEmptyData(result) && hasMissingHeaderItems(result);
}
//# sourceMappingURL=executionResult.js.map