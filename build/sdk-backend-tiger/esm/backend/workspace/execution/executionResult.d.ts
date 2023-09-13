import { AfmExecutionResponse } from "@gooddata/api-client-tiger";
import { IDataView, IExecutionFactory, IExecutionResult, IExportConfig, IExportResult, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition, IDimensionDescriptor } from "@gooddata/sdk-model";
import { DateFormatter } from "../../../convertors/fromBackend/dateFormatting/types.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerExecutionResult implements IExecutionResult {
    private readonly authCall;
    readonly definition: IExecutionDefinition;
    private readonly executionFactory;
    readonly execResponse: AfmExecutionResponse;
    private readonly dateFormatter;
    private readonly workspace;
    readonly dimensions: IDimensionDescriptor[];
    private readonly resultId;
    private readonly _fingerprint;
    constructor(authCall: TigerAuthenticatedCallGuard, definition: IExecutionDefinition, executionFactory: IExecutionFactory, execResponse: AfmExecutionResponse, dateFormatter: DateFormatter);
    readAll(): Promise<IDataView>;
    readWindow(offset: number[], size: number[]): Promise<IDataView>;
    transform(): IPreparedExecution;
    export(options: IExportConfig): Promise<IExportResult>;
    equals(other: IExecutionResult): boolean;
    fingerprint(): string;
    private asDataView;
    private handleExportResultPolling;
}
//# sourceMappingURL=executionResult.d.ts.map