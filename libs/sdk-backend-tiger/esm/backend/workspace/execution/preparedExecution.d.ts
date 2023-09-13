import { IExecutionFactory, IExecutionResult, IPreparedExecution, ExplainConfig, IExplainProvider, ExplainType } from "@gooddata/sdk-backend-spi";
import { DimensionGenerator, IDimension, IExecutionDefinition, ISortItem, IExecutionConfig } from "@gooddata/sdk-model";
import { DateFormatter } from "../../../convertors/fromBackend/dateFormatting/types.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerPreparedExecution implements IPreparedExecution {
    private readonly authCall;
    readonly definition: IExecutionDefinition;
    private readonly executionFactory;
    private readonly dateFormatter;
    private _fingerprint;
    constructor(authCall: TigerAuthenticatedCallGuard, definition: IExecutionDefinition, executionFactory: IExecutionFactory, dateFormatter: DateFormatter);
    execute(): Promise<IExecutionResult>;
    explain<T extends ExplainType | undefined>({ explainType, }: ExplainConfig<T>): IExplainProvider<T>;
    withDimensions(...dimsOrGen: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    withSorting(...items: ISortItem[]): IPreparedExecution;
    withDateFormat(dateFormat: string): IPreparedExecution;
    fingerprint(): string;
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
    equals(other: IPreparedExecution): boolean;
}
//# sourceMappingURL=preparedExecution.d.ts.map