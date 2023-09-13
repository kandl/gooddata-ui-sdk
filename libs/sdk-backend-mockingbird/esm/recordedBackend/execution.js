// (C) 2019-2023 GoodData Corporation
import { NoDataError, NotSupported, } from "@gooddata/sdk-backend-spi";
import { defFingerprint, defWithDimensions, defWithSorting, idRef, uriRef, defWithDateFormat, isAttributeDescriptor, isResultMeasureHeader, bucketsMeasures, bucketsFind, isAttribute, isTotalDescriptor, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { Denormalizer, AbstractExecutionFactory } from "@gooddata/sdk-backend-base";
import flatMap from "lodash/flatMap.js";
import isEqual from "lodash/isEqual.js";
import values from "lodash/values.js";
import isEmpty from "lodash/isEmpty.js";
//
//
//
const DataViewPrefix = "dataView_";
/**
 * @internal
 */
export const DataViewAll = `${DataViewPrefix}all`;
/**
 * @internal
 */
export const dataViewWindow = (offset, size) => `${DataViewPrefix}${dataViewWindowId(offset, size)}`;
const dataViewWindowId = (offset, size) => `o${offset.join("_")}s${size.join("_")}`;
/**
 * @internal
 */
export const DataViewFirstPage = dataViewWindow([0, 0], [100, 1000]);
//
//
//
/**
 * @internal
 */
export class RecordedExecutionFactory extends AbstractExecutionFactory {
    constructor(recordings, workspace, resultRefType) {
        super(workspace);
        this.recordings = recordings;
        this.resultRefType = resultRefType;
    }
    forDefinition(def) {
        return recordedPreparedExecution(def, this, this.resultRefType, this.recordings);
    }
}
function recordedExecutionKey(defOrFingerprint) {
    const fp = typeof defOrFingerprint === "string" ? defOrFingerprint : defFingerprint(defOrFingerprint);
    return `fp_${fp}`;
}
function recordedPreparedExecution(definition, executionFactory, resultRefType, recordings = {}) {
    const fp = defFingerprint(definition);
    return {
        definition,
        withDimensions(...dim) {
            return executionFactory.forDefinition(defWithDimensions(definition, ...dim));
        },
        withSorting(...items) {
            return executionFactory.forDefinition(defWithSorting(definition, items));
        },
        withDateFormat(dateFormat) {
            return executionFactory.forDefinition(defWithDateFormat(definition, dateFormat));
        },
        withExecConfig(config) {
            if (!isEmpty(config === null || config === void 0 ? void 0 : config.dataSamplingPercentage)) {
                console.warn("Backend does not support data sampling, result will be not affected");
            }
            return executionFactory.forDefinition(definition);
        },
        execute() {
            return new Promise((resolve, reject) => {
                var _a;
                const key = recordedExecutionKey(fp);
                const recording = (_a = recordings.executions) === null || _a === void 0 ? void 0 : _a[key];
                if (!recording) {
                    reject(new NoDataError("recording was not found"));
                }
                else {
                    if (definition.postProcessing) {
                        recording.definition = Object.assign(Object.assign({}, recording.definition), { postProcessing: definition.postProcessing });
                    }
                    resolve(new RecordedExecutionResult(definition, executionFactory, resultRefType, recording));
                }
            });
        },
        explain() {
            console.warn("Backend does not support explain mode");
            return {
                data: () => Promise.reject(new Error(`Backend does not support explain mode data call.`)),
                download: () => Promise.resolve(),
            };
        },
        fingerprint() {
            return fp;
        },
        equals(other) {
            return isEqual(this.definition, other.definition);
        },
    };
}
/**
 * This function exists to make the recorded data more flexible in regards to what types of 'ref' objects will be
 * in the result's dimension descriptors. The 'ref' is an opaque reference of an object by either its URI or identifier.
 *
 * Different backends may reference the objects differently and the 'ref' is a way to hide this.
 *
 * In order for test data to be more flexible and allow 'simulating' test runs against one or the other backend, the
 * type of refs is variable and filled in ad-hoc.
 */
function enrichDescriptorsWithRefs(dims, resultRefType) {
    const createRef = (type, uri, identifier) => {
        if (resultRefType === "uri" && uri) {
            return uriRef(uri);
        }
        else if (resultRefType === "id" && identifier) {
            return idRef(identifier, type);
        }
        return undefined;
    };
    return dims.map((dim) => {
        return {
            headers: dim.headers.map((header) => {
                if (isAttributeDescriptor(header)) {
                    return {
                        attributeHeader: Object.assign(Object.assign({}, header.attributeHeader), { ref: createRef("displayForm", header.attributeHeader.uri, header.attributeHeader.identifier), formOf: Object.assign(Object.assign({}, header.attributeHeader.formOf), { ref: createRef("attribute", header.attributeHeader.formOf.uri, header.attributeHeader.formOf.identifier) }) }),
                    };
                }
                else {
                    return {
                        measureGroupHeader: {
                            items: header.measureGroupHeader.items.map((measure) => {
                                return {
                                    measureHeaderItem: Object.assign(Object.assign({}, measure.measureHeaderItem), { ref: createRef("measure", measure.measureHeaderItem.uri, measure.measureHeaderItem.identifier) }),
                                };
                            }),
                            totalItems: header.measureGroupHeader.totalItems,
                        },
                    };
                }
            }),
        };
    });
}
class RecordedExecutionResult {
    constructor(definition, executionFactory, resultRefType, recording, denormalizer) {
        this.definition = definition;
        this.executionFactory = executionFactory;
        this.resultRefType = resultRefType;
        this.recording = recording;
        this.denormalizer = denormalizer;
        this.export = (_options) => {
            throw new NotSupported("recorded backend does not support exports");
        };
        this.readAll = () => {
            const allData = this.recording[DataViewAll];
            if (!allData) {
                return Promise.reject(new NoDataError("there is no execution recording that contains all data"));
            }
            return Promise.resolve(new RecordedDataView(this, this.definition, allData, this.denormalizer));
        };
        this.readWindow = (offset, size) => {
            const windowDataId = `${DataViewPrefix}${dataViewWindowId(offset, size)}`;
            const windowData = this.recording[windowDataId];
            if (!windowData) {
                return Promise.reject(new NoDataError("there is no execution recording for requested window"));
            }
            return Promise.resolve(new RecordedDataView(this, this.definition, windowData, this.denormalizer));
        };
        this.transform = () => {
            return this.executionFactory.forDefinition(this.definition);
        };
        this.equals = (other) => {
            return this.fingerprint() === other.fingerprint();
        };
        this.fingerprint = () => {
            return this._fp;
        };
        const dimensions = enrichDescriptorsWithRefs(this.recording.executionResult.dimensions, resultRefType);
        this.dimensions = denormalizer ? denormalizer.denormalizeDimDescriptors(dimensions) : dimensions;
        this._fp = defFingerprint(this.definition) + "/recordedResult";
    }
}
class RecordedDataView {
    constructor(result, definition, recordedDataView, denormalizer) {
        this.result = result;
        this.definition = definition;
        this.equals = (other) => {
            return this.fingerprint() === other.fingerprint();
        };
        this.fingerprint = () => {
            return this._fp;
        };
        this.data = recordedDataView.data;
        this.headerItems = denormalizer
            ? denormalizer.denormalizeHeaders(recordedDataView.headerItems)
            : recordedDataView.headerItems;
        this.headerItems = preprocessTotalHeaderItems(this.headerItems, this.definition);
        this.totals = recordedDataView.totals;
        this.totalTotals = recordedDataView.totalTotals;
        this.count = recordedDataView.count;
        this.offset = recordedDataView.offset;
        this.totalCount = recordedDataView.totalCount;
        this._fp = `${defFingerprint(this.definition)}/dataView/${this.offset.join(",")}_${this.count.join(",")}`;
    }
}
//
//
//
function adHocExecIndex(key, execution) {
    const adHocIndex = { executions: {} };
    adHocIndex.executions[key] = execution;
    return adHocIndex;
}
function preprocessTotalHeaderItems(headerItems, definition) {
    var _a, _b;
    const columnTotals = (_a = definition === null || definition === void 0 ? void 0 : definition.dimensions[1]) === null || _a === void 0 ? void 0 : _a.totals;
    if (!(columnTotals === null || columnTotals === void 0 ? void 0 : columnTotals.length)) {
        // noop when no column totals are present
        return headerItems;
    }
    const buckets = definition.buckets;
    const measures = bucketsMeasures(buckets);
    const columns = ((_b = bucketsFind(buckets, "columns")) === null || _b === void 0 ? void 0 : _b.items) || [];
    const columnIdentifiers = columns.map((item) => { var _a; return isAttribute(item) && ((_a = item.attribute) === null || _a === void 0 ? void 0 : _a.localIdentifier); });
    const measuresIdentifiers = measures.map((m) => m.measure.localIdentifier);
    columnTotals.sort((a, b) => measuresIdentifiers.indexOf(a.measureIdentifier) -
        measuresIdentifiers.indexOf(b.measureIdentifier));
    const lookups = columnTotals
        .filter((total) => {
        return columnIdentifiers.includes(total.attributeIdentifier);
    })
        .map((total) => {
        return measures.findIndex((m) => { var _a; return ((_a = m.measure) === null || _a === void 0 ? void 0 : _a.localIdentifier) === total.measureIdentifier; });
    });
    const uniqueLookups = lookups.filter((lookup, index) => lookups.indexOf(lookup) === index);
    return headerItems.map((topHeaderItems) => {
        return topHeaderItems.map((items) => {
            // process only header items with measures
            let count = 0;
            if (items.find(isResultMeasureHeader)) {
                return items.map((item) => {
                    if (isTotalDescriptor(item)) {
                        const result = Object.assign(Object.assign({}, item), { totalHeaderItem: Object.assign(Object.assign({}, item === null || item === void 0 ? void 0 : item.totalHeaderItem), { measureIndex: uniqueLookups[count % uniqueLookups.length] }) });
                        count++;
                        return result;
                    }
                    return item;
                });
            }
            return items;
        });
    });
}
/**
 * Constructs data view, using the recording as-is. The functions sets all the necessary pieces to a point
 * where exec factory, definition and results match live results. The factory is setup in a way that attempting
 * to transform and re-execute same prepared execution results works as expected.
 */
function denormalizedDataView(recording, scenario, dataViewId, resultRefType) {
    const { execution } = recording;
    const definition = Object.assign(Object.assign({}, execution.definition), { buckets: scenario.buckets });
    const recordingKey = recordedExecutionKey(definition);
    const adHocIndex = adHocExecIndex(recordingKey, execution);
    const factory = new RecordedExecutionFactory(adHocIndex, "testWorkspace", resultRefType);
    const result = new RecordedExecutionResult(definition, factory, resultRefType, execution);
    const data = execution[dataViewId];
    invariant(data, `data for view ${dataViewId} could not be found in the recording`);
    return new RecordedDataView(result, definition, data);
}
/**
 * Constructs data view from normalized execution - performing denormalization in order to return the
 * expected data.
 */
function normalizedDataView(recording, scenario, dataViewId, resultRefType) {
    const { execution } = recording;
    const normalizationState = {
        original: scenario.originalExecution,
        normalized: execution.definition,
        n2oMap: scenario.n2oMap,
    };
    const denormalizer = Denormalizer.from(normalizationState);
    const recordingKey = recordedExecutionKey(normalizationState.original);
    const adHocIndex = adHocExecIndex(recordingKey, execution);
    const factory = new RecordedExecutionFactory(adHocIndex, "testWorkspace", resultRefType);
    const result = new RecordedExecutionResult(normalizationState.original, factory, resultRefType, execution, denormalizer);
    const data = execution[dataViewId];
    invariant(data, `data for view ${dataViewId} could not be found in the recording`);
    return new RecordedDataView(result, normalizationState.original, data, denormalizer);
}
/**
 * Creates a new data view facade for the provided recording. If the recording contains multiple sets of dataViews
 * (e.g. for different windows etc), then it is possible to provide dataViewId to look up the particular view. By default,
 * the data view with all data is wrapped in the facade.
 *
 * The returned view is linked to a valid result; calling transform() returns an instance of prepared execution which
 * is executable as-is (and leads to the same result). However any modification to this prepared execution would
 * lead a NO_DATA errors (because that different data is not included in the index)
 *
 * @remarks see {@link dataViewWindow}
 *
 * @param recording - recording (as obtained from the index, typically using the Scenario mapping)
 * @param dataViewId - Identifier of the data view; defaults to view with all data
 * @param resultRefType - Specify what types of refs should the backend create in the result's dimension descriptors (uri refs returned by bear, id refs returned by tiger)
 * @internal
 */
export function recordedDataView(recording, dataViewId = DataViewAll, resultRefType = "uri") {
    var _a;
    const { execution, scenarioIndex } = recording;
    const scenario = (_a = execution.scenarios) === null || _a === void 0 ? void 0 : _a[scenarioIndex];
    invariant(scenario, "unable to find test scenario recording; this is most likely because of invalid/stale recording index. please refresh recordings and rebuild.");
    if (!scenario.originalExecution) {
        return denormalizedDataView(recording, scenario, dataViewId, resultRefType);
    }
    else {
        return normalizedDataView(recording, scenario, dataViewId, resultRefType);
    }
}
function expandRecordingToDataViews(recording) {
    if (!recording.scenarios) {
        return [];
    }
    if (!recording[DataViewAll]) {
        return [];
    }
    return recording.scenarios.map((s, scenarioIndex) => {
        const name = `${s.vis} - ${s.scenario}`;
        const dataView = recordedDataView({ scenarioIndex, execution: recording });
        return {
            name,
            dataView,
        };
    });
}
/**
 * Given recording index with executions, this function will return named DataView instances for executions
 * that match the following criteria:
 *
 * 1.  Executions specify test scenarios to which they belong - the test scenarios are used to obtain
 *     name of the data view
 *
 * 2.  Executions contain `DataViewAll` recording = all data for the test scenario.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @returns list of named data views; names are derived from test scenarios to which the data views belong
 * @internal
 */
export function recordedDataViews(recordings) {
    if (!recordings.executions) {
        return [];
    }
    const executionRecordings = values(recordings.executions);
    return flatMap(executionRecordings, expandRecordingToDataViews);
}
/**
 * Given insight recording (as accessible through Recordings.Insights), this function returns instance of IInsight.
 *
 * @param recording - insight recording
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export function recordedInsight(recording, refType = "uri") {
    return {
        insight: Object.assign(Object.assign({}, recording.obj.insight), { ref: refType === "uri"
                ? uriRef(recording.obj.insight.uri)
                : idRef(recording.obj.insight.identifier, "insight") }),
    };
}
/**
 * Given recording index with insight metadata, this function will return IInsight objects for every recording there.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export function recordedInsights(recordings, refType = "uri") {
    var _a;
    const insightRecordings = values((_a = recordings.metadata) === null || _a === void 0 ? void 0 : _a.insights);
    return insightRecordings.map((recording) => recordedInsight(recording, refType));
}
//# sourceMappingURL=execution.js.map