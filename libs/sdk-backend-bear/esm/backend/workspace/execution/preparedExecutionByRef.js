// (C) 2019-2022 GoodData Corporation
import { defFingerprint, defWithDimensions, defWithSorting, insightRef, defWithDateFormat, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
import { convertExecutionApiError } from "../../../utils/errorHandling.js";
import { BearExecutionResult } from "./executionResult.js";
import { convertResultSpec } from "../../../convertors/toBackend/afm/ExecutionConverter.js";
import { objRefToUri } from "../../../utils/api.js";
import { convertFilters } from "../../../convertors/toBackend/afm/FilterConverter.js";
export class BearPreparedExecutionByRef {
    constructor(authCall, definition, insight, filters = [], executionFactory) {
        this.authCall = authCall;
        this.definition = definition;
        this.insight = insight;
        this.filters = filters;
        this.executionFactory = executionFactory;
    }
    async execute() {
        const execution = await this.createVisualizationExecution();
        return this.authCall((sdk) => sdk.execution
            ._getVisExecutionResponse(this.definition.workspace, execution)
            .then((response) => {
            return new BearExecutionResult(this.authCall, this.definition, this.executionFactory, response);
        }), convertExecutionApiError);
    }
    explain() {
        console.warn("Backend does not support explain mode");
        return {
            data: () => Promise.reject(new Error(`Backend does not support explain mode data call.`)),
            download: () => Promise.resolve(),
        };
    }
    async createVisualizationExecution() {
        const uri = await objRefToUri(insightRef(this.insight), this.definition.workspace, this.authCall);
        const resultSpec = convertResultSpec(this.definition);
        const filters = convertFilters(this.filters);
        return {
            visualizationExecution: {
                reference: uri,
                resultSpec,
                filters,
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
    withExecConfig(config) {
        if (!isEmpty(config === null || config === void 0 ? void 0 : config.dataSamplingPercentage)) {
            console.warn("Backend does not support data sampling, result will be not affected");
        }
        return this.executionFactory.forDefinition(this.definition);
    }
    fingerprint() {
        if (!this._fingerprint) {
            this._fingerprint = defFingerprint(this.definition);
        }
        return this._fingerprint;
    }
    equals(other) {
        return isEqual(this.definition, other.definition);
    }
}
//# sourceMappingURL=preparedExecutionByRef.js.map