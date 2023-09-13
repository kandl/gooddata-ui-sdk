import { ExecuteAfmModule } from "./execution/execute-afm.js";
import { XhrModule } from "./xhr.js";
import { MetadataModule } from "./metadata.js";
import { IColumnsAndDefinitions, IVisualizationObjectContent } from "@gooddata/api-model-bear";
/**
 * Execution endpoints
 *
 *
 */
export declare class ExecutionModule {
    readonly executeAfm: ExecuteAfmModule["executeAfm"];
    readonly getExecutionResponse: ExecuteAfmModule["getExecutionResponse"];
    readonly _executeVisualization: ExecuteAfmModule["_executeVisualization"];
    readonly _getVisExecutionResponse: ExecuteAfmModule["_getVisExecutionResponse"];
    readonly getPartialExecutionResult: ExecuteAfmModule["getPartialExecutionResult"];
    readonly getExecutionResult: ExecuteAfmModule["getExecutionResult"];
    private readonly executeAfmModule;
    private readonly xhr;
    private readonly md;
    constructor(xhr: XhrModule, md: MetadataModule);
    getData(projectId: string, columns: any[], executionConfiguration?: any, settings?: any): Promise<any>;
    mdToExecutionDefinitionsAndColumns(projectId: string, mdObj: IVisualizationObjectContent, options?: {
        attributesMap?: Record<string, unknown>;
        removeDateItems?: boolean;
    }): Promise<IColumnsAndDefinitions>;
    private getExperimentalExecutionsModule;
}
//# sourceMappingURL=execution.d.ts.map