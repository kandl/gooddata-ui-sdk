import { IExecutionFactory, IExecutionResult, IPreparedExecution, ExplainType, IExplainProvider } from "@gooddata/sdk-backend-spi";
import { DimensionGenerator, IDimension, IExecutionDefinition, ISortItem, IExecutionConfig } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearPreparedExecution implements IPreparedExecution {
    private readonly authCall;
    readonly definition: IExecutionDefinition;
    private readonly executionFactory;
    private _fingerprint;
    constructor(authCall: BearAuthenticatedCallGuard, definition: IExecutionDefinition, executionFactory: IExecutionFactory);
    private checkDefIsExecutable;
    execute(): Promise<IExecutionResult>;
    explain<T extends ExplainType | undefined>(): IExplainProvider<T>;
    withDimensions(...dimsOrGen: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    withSorting(...items: ISortItem[]): IPreparedExecution;
    withDateFormat(dateFormat: string): IPreparedExecution;
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
    fingerprint(): string;
    equals(other: IPreparedExecution): boolean;
}
//# sourceMappingURL=preparedExecution.d.ts.map