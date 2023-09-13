import { CompatibilityFilter, IExecution, IExecutionResponse, IExecutionResponses, IExecutionResult, IResultSpec } from "@gooddata/api-model-bear";
import { XhrModule, ApiResponseError } from "../xhr.js";
export declare const DEFAULT_LIMIT = 1000;
/**
 * This interface represents input for executeVisualization API endpoint.
 *
 * NOTE: all functionality related to executeVisualization is experimental and subject to possible breaking changes
 * in the future; location and shape of this interface WILL change when the functionality is made GA.
 *
 * @internal
 * @internal
 */
export interface IVisualizationExecution {
    visualizationExecution: {
        reference: string;
        resultSpec?: IResultSpec;
        filters?: CompatibilityFilter[];
    };
}
/**
 * This interface represents error caused during second part of api execution (data fetching)
 * and contains information about first execution part if that part was successful.
 *
 * @internal
 * @internal
 */
export declare class ApiExecutionResponseError extends ApiResponseError {
    executionResponse: IExecutionResponse;
    constructor(error: ApiResponseError, executionResponse: IExecutionResponse);
}
export declare class ExecuteAfmModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Execute AFM and fetch all data results
     *
     * @param projectId - GD project identifier
     * @param execution - what to execute
     *
     * @returns Structure with `executionResponse` and `executionResult`
     */
    executeAfm(projectId: string, execution: IExecution): Promise<IExecutionResponses>;
    /**
     * Execute AFM and return execution's response; the response describes dimensionality of the results and
     * includes link to poll for the results.
     *
     * @param projectId - GD project identifier
     * @param execution - what to get the response for
     *
     * @returns Promise with `executionResponse`
     */
    getExecutionResponse(projectId: string, execution: IExecution): Promise<IExecutionResponse>;
    /**
     * Execute saved visualization and get all data.
     *
     * NOTE: all functionality related to executeVisualization is experimental and subject to possible breaking changes
     * in the future; location and shape of this interface WILL change when the functionality is made GA.
     *
     * @param projectId - GD project identifier
     * @param visExecution - execution payload
     *
     * @internal
     * @internal
     */
    _executeVisualization(projectId: string, visExecution: IVisualizationExecution): Promise<IExecutionResponses>;
    /**
     *
     * Execute visualization and return the response; the response describes dimensionality of the results and
     * includes link to poll for the results.
     *
     * NOTE: all functionality related to executeVisualization is experimental and subject to possible breaking changes
     * in the future; location and shape of this interface WILL change when the functionality is made GA.
     *
     * @param projectId - GD project identifier
     * @param visExecution - execution payload
     *
     * @internal
     * @internal
     */
    _getVisExecutionResponse(projectId: string, visExecution: IVisualizationExecution): Promise<IExecutionResponse>;
    /**
     * Get one page of Result from Execution (with requested limit and offset)
     *
     * @param executionResultUri - URI of the execution result to work with
     * @param limit - limit for each dimension
     * @param offset - offset for each dimension
     *
     * @returns Promise with `executionResult` or `null` (null means empty response - HTTP 204)
     */
    getPartialExecutionResult(executionResultUri: string, limit: number[], offset: number[]): Promise<IExecutionResult | null>;
    /**
     * Get whole ExecutionResult
     *
     * @param executionResultUri - URI of the execution result to work with
     *
     * @returns Promise with `executionResult` or `null` (null means empty response - HTTP 204)
     */
    getExecutionResult(executionResultUri: string): Promise<IExecutionResult | null>;
    private getPage;
    private getAllPages;
    private fetchExecutionResult;
}
export declare function replaceLimitAndOffsetInUri(oldUri: string, limit: number[], offset: number[]): string;
export declare function getNextOffset(limit: number[], offset: number[], total: number[]): number[];
export declare function getNextLimit(limit: number[], nextOffset: number[], total: number[]): number[];
export declare function nextPageExists(nextOffset: number[], total: number[]): boolean;
export declare function mergePage(prevExecutionResult: IExecutionResult, executionResult: IExecutionResult): IExecutionResult;
//# sourceMappingURL=execute-afm.d.ts.map