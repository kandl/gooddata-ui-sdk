// (C) 2019-2023 GoodData Corporation
import { AbstractExecutionFactory } from "../toolkit/execution.js";
import { defFingerprint, defWithDimensions, defWithSorting, defWithDateFormat, defWithExecConfig, } from "@gooddata/sdk-model";
import { NotSupported, NotImplemented, } from "@gooddata/sdk-backend-spi";
import isEqual from "lodash/isEqual.js";
/**
 * @internal
 */
export class CustomExecutionFactory extends AbstractExecutionFactory {
    constructor(workspace, config, state) {
        super(workspace);
        this.config = config;
        this.state = state;
        this.forDefinition = (def) => {
            return new CustomPreparedExecution(def, this, this.config, this.state);
        };
    }
}
/**
 * @internal
 */
class CustomPreparedExecution {
    constructor(definition, executionFactory, config, state) {
        this.definition = definition;
        this.executionFactory = executionFactory;
        this.config = config;
        this.state = state;
        this.execute = () => {
            const { authApiCall } = this.state;
            return authApiCall((client) => {
                const context = {
                    config: this.config,
                    execution: this,
                    resultFactory: this.resultFactory,
                    state: this.state,
                    client,
                };
                return this.config.resultProvider(context);
            });
        };
        this.explain = () => {
            console.warn("Backend does not support explain mode");
            return {
                data: () => Promise.reject(new Error(`Backend does not support explain mode data call.`)),
                download: () => Promise.resolve(),
            };
        };
        this.withDimensions = (...dimsOrGen) => {
            return this.executionFactory.forDefinition(defWithDimensions(this.definition, ...dimsOrGen));
        };
        this.withSorting = (...items) => {
            return this.executionFactory.forDefinition(defWithSorting(this.definition, items));
        };
        this.withDateFormat = (dateFormat) => {
            return this.executionFactory.forDefinition(defWithDateFormat(this.definition, dateFormat));
        };
        this.withExecConfig = (config) => {
            return this.executionFactory.forDefinition(defWithExecConfig(this.definition, config));
        };
        this.equals = (other) => {
            return isEqual(this.definition, other.definition);
        };
        this.fingerprint = () => {
            if (!this._fingerprint) {
                this._fingerprint = defFingerprint(this.definition);
            }
            return this._fingerprint;
        };
        this.resultFactory = (dimensions, fingerprint) => {
            return new CustomExecutionResult(dimensions, fingerprint, this, this.config, this.state);
        };
    }
}
/**
 * @internal
 */
class CustomExecutionResult {
    constructor(dimensions, _fingerprint, execution, config, state) {
        this.dimensions = dimensions;
        this._fingerprint = _fingerprint;
        this.execution = execution;
        this.config = config;
        this.state = state;
        this.readAll = () => {
            return this.state.authApiCall((client) => {
                if (!this.config.dataProvider) {
                    throw new NotImplemented("custom backend does not specify dataProvider");
                }
                const context = {
                    config: this.config,
                    state: this.state,
                    result: this,
                    client,
                };
                return this.config.dataProvider(context);
            });
        };
        this.readWindow = (offset, size) => {
            return this.state.authApiCall((client) => {
                if (!this.config.dataProvider) {
                    throw new NotImplemented("custom backend does not specify dataProvider");
                }
                const context = {
                    config: this.config,
                    state: this.state,
                    result: this,
                    window: {
                        offset,
                        size,
                    },
                    client,
                };
                return this.config.dataProvider(context);
            });
        };
        this.transform = () => {
            return this.execution;
        };
        this.equals = (other) => {
            return this._fingerprint === other.fingerprint();
        };
        this.fingerprint = () => {
            return this._fingerprint;
        };
        this.export = (_options) => {
            throw new NotSupported("exports from custom backend are not supported");
        };
        this.definition = execution.definition;
    }
}
//# sourceMappingURL=execution.js.map