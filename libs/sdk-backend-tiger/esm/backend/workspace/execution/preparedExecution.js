// (C) 2019-2023 GoodData Corporation
import { NoDataError, } from "@gooddata/sdk-backend-spi";
import { defFingerprint, defWithDimensions, defWithSorting, defWithExecConfig, defWithDateFormat, isPositiveAttributeFilter, filterIsEmpty, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import { TigerExecutionResult } from "./executionResult.js";
import { toAfmExecution } from "../../../convertors/toBackend/afm/toAfmResultSpec.js";
import { downloadFile } from "../../../utils/downloadFile.js";
export class TigerPreparedExecution {
    constructor(authCall, definition, executionFactory, dateFormatter) {
        this.authCall = authCall;
        this.definition = definition;
        this.executionFactory = executionFactory;
        this.dateFormatter = dateFormatter;
    }
    async execute() {
        checkDefIsExecutable(this.definition);
        const afmExecution = toAfmExecution(this.definition);
        return this.authCall((client) => client.execution.computeReport({
            workspaceId: this.definition.workspace,
            afmExecution,
        })).then((response) => {
            return new TigerExecutionResult(this.authCall, this.definition, this.executionFactory, response.data, this.dateFormatter);
        });
    }
    explain({ explainType, }) {
        return {
            download: () => {
                return explainCall(this.definition, this.authCall, explainType, "blob")
                    .then((response) => response && downloadFile(getExplainFileName(explainType), response.data))
                    .catch((error) => {
                    console.warn(error);
                });
            },
            data: () => {
                if (!explainType) {
                    return Promise.reject(new Error(`There must be defined "explainType" on ExplainConfig to get data.`));
                }
                return explainCall(this.definition, this.authCall, explainType, "text").then((response) => new Promise((resolve, reject) => {
                    if (response) {
                        resolve(response.data);
                        return;
                    }
                    reject(new Error(`Definition is not set or there is no response from server.`));
                }));
            },
        };
    }
    withDimensions(...dimsOrGen) {
        return this.executionFactory.forDefinition(defWithDimensions(this.definition, ...dimsOrGen));
    }
    withSorting(...items) {
        return this.executionFactory.forDefinition(defWithSorting(this.definition, items));
    }
    withDateFormat(dateFormat) {
        return this.executionFactory.forDefinition(defWithDateFormat(this.definition, dateFormat));
    }
    fingerprint() {
        if (!this._fingerprint) {
            this._fingerprint = defFingerprint(this.definition);
        }
        return this._fingerprint;
    }
    withExecConfig(config) {
        return this.executionFactory.forDefinition(defWithExecConfig(this.definition, config));
    }
    equals(other) {
        return isEqual(this.definition, other.definition);
    }
}
function checkDefIsExecutable(def) {
    var _a;
    if ((_a = def.filters) === null || _a === void 0 ? void 0 : _a.some((filter) => isPositiveAttributeFilter(filter) && filterIsEmpty(filter))) {
        throw new NoDataError("Server returned no data");
    }
}
async function explainCall(definition, authCall, explainType, responseType) {
    if (definition) {
        return authCall((client) => client.explain.explainAFM({
            workspaceId: definition.workspace,
            afmExecution: toAfmExecution(definition),
            explainType,
        }, {
            responseType,
        }));
    }
    return Promise.resolve();
}
function getExplainFileName(explainType) {
    switch (explainType) {
        case "SQL":
            return `${explainType}.sql`;
        case "QT":
        case "MAQL":
        case "WDF":
        case "GRPC_MODEL":
        case "OPT_QT":
            return `${explainType}.json`;
        case "OPT_QT_SVG":
        case "QT_SVG":
            return `${explainType}.svg`;
        default:
            return "explainAfm.zip";
    }
}
//# sourceMappingURL=preparedExecution.js.map