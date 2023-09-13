// (C) 2007-2020 GoodData Corporation
import { ExperimentalExecutionsModule } from "./execution/experimental-executions.js";
import { AttributesMapLoaderModule } from "./utils/attributesMapLoader.js";
import { ExecuteAfmModule } from "./execution/execute-afm.js";
/**
 * Execution endpoints
 *
 *
 */
export class ExecutionModule {
    constructor(xhr, md) {
        this.executeAfmModule = new ExecuteAfmModule(xhr);
        this.executeAfm = this.executeAfmModule.executeAfm.bind(this.executeAfmModule);
        this.getExecutionResponse = this.executeAfmModule.getExecutionResponse.bind(this.executeAfmModule);
        this._executeVisualization = this.executeAfmModule._executeVisualization.bind(this.executeAfmModule);
        this._getVisExecutionResponse = this.executeAfmModule._getVisExecutionResponse.bind(this.executeAfmModule);
        this.getPartialExecutionResult = this.executeAfmModule.getPartialExecutionResult.bind(this.executeAfmModule);
        this.getExecutionResult = this.executeAfmModule.getExecutionResult.bind(this.executeAfmModule);
        this.xhr = xhr;
        this.md = md;
    }
    getData(projectId, columns, executionConfiguration = {}, settings = {}) {
        return this.getExperimentalExecutionsModule().getData(projectId, columns, executionConfiguration, settings);
    }
    mdToExecutionDefinitionsAndColumns(projectId, mdObj, options = {}) {
        return this.getExperimentalExecutionsModule().mdToExecutionDefinitionsAndColumns(projectId, mdObj, options);
    }
    getExperimentalExecutionsModule() {
        const loaderModule = new AttributesMapLoaderModule(this.md);
        return new ExperimentalExecutionsModule(this.xhr, loaderModule.loadAttributesMap.bind(loaderModule));
    }
}
//# sourceMappingURL=execution.js.map