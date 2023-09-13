// (C) 2019-2020 GoodData Corporation
import { defaultDimensionsGenerator, defWithDimensions, newDefForBuckets, newDefForInsight, newDefForItems, isInsight, } from "@gooddata/sdk-model";
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
export class AbstractExecutionFactory {
    constructor(workspace) {
        this.workspace = workspace;
    }
    forItems(items, filters) {
        const def = defWithDimensions(newDefForItems(this.workspace, items, filters), defaultDimensionsGenerator);
        return this.forDefinition(def);
    }
    forBuckets(buckets, filters) {
        const def = defWithDimensions(newDefForBuckets(this.workspace, buckets, filters), defaultDimensionsGenerator);
        return this.forDefinition(def);
    }
    forInsight(insight, filters) {
        const def = defWithDimensions(newDefForInsight(this.workspace, insight, filters), defaultDimensionsGenerator);
        return this.forDefinition(def);
    }
    forInsightByRef(insight, filters) {
        return this.forInsight(insight, filters);
    }
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
export class ExecutionFactoryWithFixedFilters extends DecoratedExecutionFactory {
    constructor(decorated, filters = []) {
        super(decorated);
        this.filters = filters;
    }
    forItems(items, filters = []) {
        return super.forItems(items, this.filters.concat(filters));
    }
    forBuckets(buckets, filters = []) {
        return super.forBuckets(buckets, this.filters.concat(filters));
    }
    forInsight(insight, filters = []) {
        return super.forInsight(insight, this.filters.concat(filters));
    }
    forInsightByRef(insight, filters = []) {
        return super.forInsightByRef(insight, this.filters.concat(filters));
    }
}
/**
 * This implementation of execution factory will transparently upgrade any `forInsight` execution
 * to `forInsightByRef` execution IF the argument to `forInsight` is actually a persisted insight (`IInsight` which
 * is subtype of `IInsightDefinition`).
 *
 * @internal
 */
export class ExecutionFactoryUpgradingToExecByReference extends DecoratedExecutionFactory {
    constructor(decorated) {
        super(decorated);
    }
    forInsight(insight, filters) {
        if (isInsight(insight)) {
            return this.forInsightByRef(insight, filters);
        }
        return super.forInsight(insight, filters);
    }
}
//# sourceMappingURL=execution.js.map