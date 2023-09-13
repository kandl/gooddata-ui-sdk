import { IAttributeOrMeasure, IBucket, IExecutionDefinition, IInsightDefinition, IInsight, INullableFilter } from "@gooddata/sdk-model";
import { IExecutionFactory, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { DecoratedExecutionFactory } from "../decoratedBackend/execution.js";
/**
 * Abstract base class that can be extended to implement concrete execution factories for different
 * backend implementations.
 *
 * This class implements the convenience methods which do not need to change in implementations.
 *
 * Note: the `forInsightByRef` is implemented as fallback to freeform execution done by `forInsight`. The
 * rationale is that most backends do not support that anyway so it is a safe default behavior. If the backend
 * supports execute-by-reference, then overload the method with your own implementation (see sdk-backend-bear for
 * inspiration)
 *
 * @internal
 */
export declare abstract class AbstractExecutionFactory implements IExecutionFactory {
    protected readonly workspace: string;
    constructor(workspace: string);
    abstract forDefinition(def: IExecutionDefinition): IPreparedExecution;
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}
/**
 * This implementation of execution factory allows transparent injection of fixed set of filters to all
 * executions started through it.
 *
 * This factory will not perform any filter merging. All it does is ensure some filters are always passed
 * to the underlying factory. The responsibility to do the filter merging lies in the underlying factory.
 *
 * @internal
 */
export declare class ExecutionFactoryWithFixedFilters extends DecoratedExecutionFactory {
    private readonly filters;
    constructor(decorated: IExecutionFactory, filters?: INullableFilter[]);
    forItems(items: IAttributeOrMeasure[], filters?: INullableFilter[]): IPreparedExecution;
    forBuckets(buckets: IBucket[], filters?: INullableFilter[]): IPreparedExecution;
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
    forInsightByRef(insight: IInsight, filters?: INullableFilter[]): IPreparedExecution;
}
/**
 * This implementation of execution factory will transparently upgrade any `forInsight` execution
 * to `forInsightByRef` execution IF the argument to `forInsight` is actually a persisted insight (`IInsight` which
 * is subtype of `IInsightDefinition`).
 *
 * @internal
 */
export declare class ExecutionFactoryUpgradingToExecByReference extends DecoratedExecutionFactory {
    constructor(decorated: IExecutionFactory);
    forInsight(insight: IInsightDefinition, filters?: INullableFilter[]): IPreparedExecution;
}
//# sourceMappingURL=execution.d.ts.map