// (C) 2019-2023 GoodData Corporation
import { isAttributeHeader, } from "@gooddata/api-model-bear";
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { defFingerprint, defWithDimensions, defWithSorting, uriRef, defWithDateFormat, } from "@gooddata/sdk-model";
import { AbstractExecutionFactory } from "@gooddata/sdk-backend-base";
import isEqual from "lodash/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
const defaultConfig = { hostname: "test" };
/**
 * This is legacy implementation of the recorded backend. Do not use for new tests.
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export function legacyRecordedBackend(index, config = defaultConfig) {
    const noopBackend = {
        capabilities: {},
        config,
        onHostname(hostname) {
            return legacyRecordedBackend(index, Object.assign(Object.assign({}, config), { hostname }));
        },
        withTelemetry(_component, _props) {
            return noopBackend;
        },
        withAuthentication(_) {
            return this;
        },
        organization(_organizationId) {
            throw new NotSupported("not yet supported");
        },
        organizations() {
            throw new NotSupported("not yet supported");
        },
        currentUser() {
            throw new NotSupported("not yet supported");
        },
        workspace(id) {
            return recordedWorkspace(id, index[id]);
        },
        workspaces() {
            throw new NotSupported("not yet supported");
        },
        authenticate() {
            return Promise.resolve({ userId: "recordedUser" });
        },
        deauthenticate() {
            return Promise.resolve();
        },
        isAuthenticated() {
            return Promise.resolve({ userId: "recordedUser" });
        },
        entitlements() {
            throw new NotSupported("not yet supported");
        },
    };
    return noopBackend;
}
/**
 * Creates a new data view facade for the provided recording.
 *
 * This is legacy implementation of recorded backend. Do not use for new tests.
 *
 * @param recording - recorded definition, AFM response and AFM result
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export function legacyRecordedDataView(recording) {
    const definition = recording.definition;
    const executionFactory = new RecordedExecutionFactory({}, recording.definition.workspace);
    const result = recordedExecutionResult(definition, executionFactory, recording);
    return recordedDataView(definition, result, recording);
}
//
// Internals
//
function recordedWorkspace(workspace, recordings = {}) {
    return {
        workspace,
        getDescriptor() {
            throw new NotSupported("not supported");
        },
        getParentWorkspace() {
            throw new NotSupported("not supported");
        },
        execution() {
            return new RecordedExecutionFactory(recordings, workspace);
        },
        settings() {
            throw new NotSupported("not supported");
        },
        attributes() {
            throw new NotSupported("not supported");
        },
        measures() {
            throw new NotSupported("not supported");
        },
        facts() {
            throw new NotSupported("not supported");
        },
        insights() {
            throw new NotSupported("not supported");
        },
        dashboards() {
            throw new NotSupported("not supported");
        },
        styling() {
            throw new NotSupported("not supported");
        },
        catalog() {
            throw new NotSupported("not supported");
        },
        datasets() {
            throw new NotSupported("not supported");
        },
        permissions() {
            throw new NotSupported("not supported");
        },
        users() {
            throw new NotSupported("not supported");
        },
        dateFilterConfigs() {
            throw new NotSupported("not supported");
        },
        userGroups() {
            throw new NotSupported("not supported");
        },
        accessControl() {
            throw new NotSupported("not supported");
        },
    };
}
class RecordedExecutionFactory extends AbstractExecutionFactory {
    constructor(recordings, workspace) {
        super(workspace);
        this.recordings = recordings;
    }
    forDefinition(def) {
        return recordedPreparedExecution(def, this, this.recordings);
    }
}
function recordedDataView(definition, result, recording) {
    const afmResult = recording.result.executionResult;
    const fp = defFingerprint(definition) + "/recordedData";
    return {
        definition,
        result,
        headerItems: afmResult.headerItems ? afmResult.headerItems : [],
        data: afmResult.data,
        totals: afmResult.totals,
        offset: afmResult.paging.offset,
        count: afmResult.paging.count,
        totalCount: afmResult.paging.total,
        fingerprint() {
            return fp;
        },
        equals(other) {
            return fp === other.fingerprint();
        },
    };
}
function convertDimensions(dims) {
    return dims.map((dim) => {
        return {
            headers: dim.headers.map((header) => {
                if (isAttributeHeader(header)) {
                    return {
                        attributeHeader: Object.assign(Object.assign({}, header.attributeHeader), { ref: uriRef(header.attributeHeader.uri), formOf: Object.assign(Object.assign({}, header.attributeHeader.formOf), { ref: uriRef(header.attributeHeader.formOf.uri) }) }),
                    };
                }
                else {
                    return {
                        measureGroupHeader: {
                            items: header.measureGroupHeader.items.map((measure) => {
                                return {
                                    measureHeaderItem: Object.assign(Object.assign({}, measure.measureHeaderItem), { ref: measure.measureHeaderItem.uri
                                            ? uriRef(measure.measureHeaderItem.uri)
                                            : undefined }),
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
function recordedExecutionResult(definition, executionFactory, recording) {
    const fp = defFingerprint(definition) + "/recordedResult";
    const afmResponse = recording.response.executionResponse;
    const result = {
        definition,
        dimensions: convertDimensions(afmResponse.dimensions),
        readAll() {
            return Promise.resolve(recordedDataView(definition, result, recording));
        },
        readWindow(_1, _2) {
            return Promise.resolve(recordedDataView(definition, result, recording));
        },
        fingerprint() {
            return fp;
        },
        equals(other) {
            return fp === other.fingerprint();
        },
        export(_) {
            throw new NotSupported("...");
        },
        transform() {
            return executionFactory.forDefinition(definition);
        },
    };
    return result;
}
function recordedPreparedExecution(definition, executionFactory, recordings = {}) {
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
                const recording = (_a = recordings.execution) === null || _a === void 0 ? void 0 : _a["fp_" + fp];
                if (!recording) {
                    reject(new Error("Recording not found"));
                }
                else {
                    if (definition.postProcessing) {
                        recording.definition = Object.assign(Object.assign({}, recording.definition), { postProcessing: definition.postProcessing });
                    }
                    resolve(recordedExecutionResult(definition, executionFactory, recording));
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
//# sourceMappingURL=index.js.map