import { IDataView, IExecutionFactory, IExecutionResult, IExportConfig, IExportResult, IPreparedExecution, ExplainConfig, IExplainProvider, ExplainType } from "@gooddata/sdk-backend-spi";
import { IAttributeOrMeasure, DimensionGenerator, IBucket, IDimension, IExecutionDefinition, IInsightDefinition, ISortItem, IInsight, INullableFilter, IExecutionConfig, DataValue, IDimensionDescriptor, IResultHeader, IResultWarning } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export type PreparedExecutionWrapper = (execution: IPreparedExecution) => IPreparedExecution;
/**
 * Base class for execution factory decorators. Implements all delegates.
 *
 * There is an opt-in functionality to decorate the prepared executions - which is a typical use case for
 * factory decorators.
 *
 * @alpha
 */
export declare class DecoratedExecutionFactory implements IExecutionFactory {
    protected readonly decorated: IExecutionFactory;
    private readonly wrapper;
    constructor(decorated: IExecutionFactory, wrapper?: PreparedExecutionWrapper);
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
    /**
     * This method is a hook that can be used to wrap the execution prepared by the decorated factory - in essence
     * to keep the decorator chain going and add extra functionality to the prepared execution.
     *
     * By default, this method will call the wrapper function passed to this class at construction time - so use
     * that unless you need anything more fancy.
     *
     * @param execution - execution to wrap
     */
    protected wrap: (execution: IPreparedExecution) => IPreparedExecution;
}
/**
 * Abstract base class for prepared execution decorators. Implements delegates to decorated execution. Concrete
 * implementations can override just the functions they are interested in.
 *
 * @alpha
 */
export declare abstract class DecoratedPreparedExecution implements IPreparedExecution {
    protected readonly decorated: IPreparedExecution;
    readonly definition: IExecutionDefinition;
    protected constructor(decorated: IPreparedExecution);
    equals(other: IPreparedExecution): boolean;
    execute(): Promise<IExecutionResult>;
    explain<T extends ExplainType | undefined>(config: ExplainConfig<T>): IExplainProvider<typeof config["explainType"]>;
    fingerprint(): string;
    withDimensions(...dim: Array<IDimension | DimensionGenerator>): IPreparedExecution;
    withSorting(...items: ISortItem[]): IPreparedExecution;
    withDateFormat(dateFormat: string): IPreparedExecution;
    withExecConfig(config: IExecutionConfig): IPreparedExecution;
    /**
     * Methods that create new instances of prepared executions (withDimensions, withSorting, withDateFormat) will
     * call out to this method to create decorated execution. This is essential to maintain the decoration
     * during immutable operations where decorated implementation creates new instances.
     *
     * @param decorated - instance to decorate
     */
    protected abstract createNew(decorated: IPreparedExecution): IPreparedExecution;
}
/**
 * Abstract base class for execution result decorators. Implements delegates to decorated execution. Concrete
 * implementations can override just the functions they are interested in.
 *
 * The prepared execution wrap is needed here because of the transform function which normally creates new
 * instances of prepared execution - and so the decoration needs to be maintained.
 *
 * @alpha
 */
export declare abstract class DecoratedExecutionResult implements IExecutionResult {
    private readonly decorated;
    private readonly wrapper;
    definition: IExecutionDefinition;
    dimensions: IDimensionDescriptor[];
    protected constructor(decorated: IExecutionResult, wrapper?: PreparedExecutionWrapper);
    export(options: IExportConfig): Promise<IExportResult>;
    readAll(): Promise<IDataView>;
    readWindow(offset: number[], size: number[]): Promise<IDataView>;
    transform(): IPreparedExecution;
    equals(other: IExecutionResult): boolean;
    fingerprint(): string;
}
/**
 * Abstract base class for data view decorators. Implements delegates to decorated data view. Concrete
 * implementations can override just the functions they are interested in.
 *
 * @alpha
 */
export declare abstract class DecoratedDataView implements IDataView {
    private readonly decorated;
    offset: number[];
    count: number[];
    totalCount: number[];
    headerItems: IResultHeader[][][];
    data: DataValue[] | DataValue[][];
    totals?: DataValue[][][];
    totalTotals?: DataValue[][][];
    definition: IExecutionDefinition;
    result: IExecutionResult;
    warnings?: IResultWarning[];
    constructor(decorated: IDataView, result?: IExecutionResult);
    equals(other: IDataView): boolean;
    fingerprint(): string;
}
//# sourceMappingURL=execution.d.ts.map