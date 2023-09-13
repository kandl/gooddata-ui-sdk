import { IExecutionFactory, IExecutionResult, IPreparedExecution, ExplainType, IExplainProvider } from "@gooddata/sdk-backend-spi";
import { DimensionGenerator, IDimension, IExecutionDefinition, IFilter, IInsight, ISortItem, IExecutionConfig } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearPreparedExecutionByRef implements IPreparedExecution {
    private readonly authCall;
    readonly definition: IExecutionDefinition;
    private readonly insight;
    private readonly filters;
    private readonly executionFactory;
    private _fingerprint;
    constructor(authCall: BearAuthenticatedCallGuard, definition: IExecutionDefinition, insight: IInsight, filters: IFilter[], executionFactory: IExecutionFactory);
    execute(): Promise<IExecutionResult>;
    explain<T extends ExplainType | undefined>(): IExplainProvider<T>;
    private createVisualizationExecution;
    withDimensions(...dimsOrGen: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    withSorting(...items: ISortItem[]): IPreparedExecution;
    withDateFormat(dateFormat: string): IPreparedExecution;
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
    fingerprint(): string;
    equals(other: IPreparedExecution): boolean;
}
//# sourceMappingURL=preparedExecutionByRef.d.ts.map