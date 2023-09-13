import identity from "lodash/identity.js";
/**
 * Base class for execution factory decorators. Implements all delegates.
 *
 * There is an opt-in functionality to decorate the prepared executions - which is a typical use case for
 * factory decorators.
 *
 * @alpha
 */
export class DecoratedExecutionFactory {
    constructor(decorated, wrapper = identity) {
        this.decorated = decorated;
        this.wrapper = wrapper;
        /**
         * This method is a hook that can be used to wrap the execution prepared by the decorated factory - in essence
         * to keep the decorator chain going and add extra functionality to the prepared execution.
         *
         * By default, this method will call the wrapper function passed to this class at construction time - so use
         * that unless you need anything more fancy.
         *
         * @param execution - execution to wrap
         */
        this.wrap = (execution) => {
            return this.wrapper(execution);
        };
    }
    forDefinition(def) {
        return this.wrap(this.decorated.forDefinition(def));
    }
    forItems(items, filters) {
        return this.wrap(this.decorated.forItems(items, filters));
    }
    forBuckets(buckets, filters) {
        return this.wrap(this.decorated.forBuckets(buckets, filters));
    }
    forInsight(insight, filters) {
        return this.wrap(this.decorated.forInsight(insight, filters));
    }
    forInsightByRef(insight, filters) {
        return this.wrap(this.decorated.forInsightByRef(insight, filters));
    }
}
/**
 * Abstract base class for prepared execution decorators. Implements delegates to decorated execution. Concrete
 * implementations can override just the functions they are interested in.
 *
 * @alpha
 */
export class DecoratedPreparedExecution {
    constructor(decorated) {
        this.decorated = decorated;
        this.definition = decorated.definition;
    }
    equals(other) {
        return this.decorated.equals(other);
    }
    execute() {
        return this.decorated.execute();
    }
    explain(config) {
        return this.decorated.explain(config);
    }
    fingerprint() {
        return this.decorated.fingerprint();
    }
    withDimensions(...dim) {
        return this.createNew(this.decorated.withDimensions(...dim));
    }
    withSorting(...items) {
        return this.createNew(this.decorated.withSorting(...items));
    }
    withDateFormat(dateFormat) {
        return this.createNew(this.decorated.withDateFormat(dateFormat));
    }
    withExecConfig(config) {
        return this.createNew(this.decorated.withExecConfig(config));
    }
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
export class DecoratedExecutionResult {
    constructor(decorated, wrapper = identity) {
        this.decorated = decorated;
        this.wrapper = wrapper;
        this.definition = decorated.definition;
        this.dimensions = decorated.dimensions;
    }
    export(options) {
        return this.decorated.export(options);
    }
    readAll() {
        return this.decorated.readAll();
    }
    readWindow(offset, size) {
        return this.decorated.readWindow(offset, size);
    }
    transform() {
        return this.wrapper(this.decorated.transform());
    }
    equals(other) {
        return this.decorated.equals(other);
    }
    fingerprint() {
        return this.decorated.fingerprint();
    }
}
/**
 * Abstract base class for data view decorators. Implements delegates to decorated data view. Concrete
 * implementations can override just the functions they are interested in.
 *
 * @alpha
 */
export class DecoratedDataView {
    constructor(decorated, result) {
        this.decorated = decorated;
        this.result = result !== null && result !== void 0 ? result : decorated.result;
        this.count = decorated.count;
        this.data = decorated.data;
        this.definition = decorated.definition;
        this.headerItems = decorated.headerItems;
        this.offset = decorated.offset;
        this.totalCount = decorated.totalCount;
        this.totals = decorated.totals;
        this.totalTotals = decorated.totalTotals;
        this.warnings = decorated.warnings;
    }
    equals(other) {
        return this.decorated.equals(other);
    }
    fingerprint() {
        return this.decorated.fingerprint();
    }
}
//# sourceMappingURL=execution.js.map