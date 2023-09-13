// (C) 2019-2023 GoodData Corporation
import { NoDataError, } from "@gooddata/sdk-backend-spi";
import { defFingerprint, defWithDimensions, defWithSorting, defWithDateFormat, isPositiveAttributeFilter, filterIsEmpty, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
import { convertExecutionApiError } from "../../../utils/errorHandling.js";
import { BearExecutionResult } from "./executionResult.js";
import { toAfmExecution } from "../../../convertors/toBackend/afm/ExecutionConverter.js";
export class BearPreparedExecution {
    constructor(authCall, definition, executionFactory) {
        this.authCall = authCall;
        this.definition = definition;
        this.executionFactory = executionFactory;
    }
    checkDefIsExecutable(def) {
        var _a;
        if ((_a = def.filters) === null || _a === void 0 ? void 0 : _a.some((filter) => isPositiveAttributeFilter(filter) && filterIsEmpty(filter))) {
            throw new NoDataError("Server returned no data");
        }
    }
    async execute() {
        this.checkDefIsExecutable(this.definition);
        const afmExecution = toAfmExecution(this.definition);
        return this.authCall((sdk) => sdk.execution
            .getExecutionResponse(this.definition.workspace, afmExecution)
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
//# sourceMappingURL=preparedExecution.js.map