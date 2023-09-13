import { IExecutionResponse } from "@gooddata/api-model-bear";
import { IDataView, IExecutionFactory, IExecutionResult, IExportConfig, IExportResult, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition, IDimensionDescriptor } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearExecutionResult implements IExecutionResult {
    private readonly authApiCall;
    readonly definition: IExecutionDefinition;
    private readonly execFactory;
    private readonly execResponse;
    readonly dimensions: IDimensionDescriptor[];
    private readonly _fingerprint;
    constructor(authApiCall: BearAuthenticatedCallGuard, definition: IExecutionDefinition, execFactory: IExecutionFactory, execResponse: IExecutionResponse);
    readAll(): Promise<IDataView>;
    readWindow(offset: number[], size: number[]): Promise<IDataView>;
    transform(): IPreparedExecution;
    export(options: IExportConfig): Promise<IExportResult>;
    private buildExportOptions;
    equals(other: IExecutionResult): boolean;
    fingerprint(): string;
    private asDataView;
}
//# sourceMappingURL=executionResult.d.ts.map