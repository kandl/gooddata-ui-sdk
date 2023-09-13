// (C) 2021-2023 GoodData Corporation
/**
 * @alpha
 */
export class DecoratedElementsQueryFactory {
    constructor(decorated) {
        this.decorated = decorated;
    }
    forDisplayForm(ref) {
        return this.decorated.forDisplayForm(ref);
    }
    forFilter(filter, dateFilterDisplayForm) {
        return this.decorated.forFilter(filter, dateFilterDisplayForm);
    }
}
/**
 * @alpha
 */
export class DecoratedElementsQuery {
    constructor(decorated, settings = {}) {
        this.decorated = decorated;
        this.settings = settings;
    }
    withLimit(limit) {
        return this.createNew(this.decorated.withLimit(limit), Object.assign(Object.assign({}, this.settings), { limit }));
    }
    withOffset(offset) {
        return this.createNew(this.decorated.withOffset(offset), Object.assign(Object.assign({}, this.settings), { offset }));
    }
    withAttributeFilters(attributeFilters) {
        return this.createNew(this.decorated.withAttributeFilters(attributeFilters), Object.assign(Object.assign({}, this.settings), { attributeFilters }));
    }
    withMeasures(measures) {
        return this.createNew(this.decorated.withMeasures(measures), Object.assign(Object.assign({}, this.settings), { measures }));
    }
    withOptions(options) {
        return this.createNew(this.decorated.withOptions(options), Object.assign(Object.assign({}, this.settings), { options }));
    }
    query() {
        return this.decorated.query();
    }
    withDateFilters(dateFilters) {
        return this.createNew(this.decorated.withDateFilters(dateFilters), Object.assign(Object.assign({}, this.settings), { dateFilters }));
    }
    withSignal(signal) {
        return this.decorated.withSignal(signal);
    }
}
/**
 * @alpha
 */
export class DecoratedElementsQueryResult {
    constructor(decorated, items, limit, offset, totalCount) {
        this.decorated = decorated;
        this.items = items;
        this.limit = limit;
        this.offset = offset;
        this.totalCount = totalCount;
    }
    async next() {
        const result = await this.decorated.next();
        return this.createNew(result, result.items, result.limit, result.offset, result.totalCount);
    }
    async goTo(pageIndex) {
        const result = await this.decorated.goTo(pageIndex);
        return this.createNew(result, result.items, result.limit, result.offset, result.totalCount);
    }
    all() {
        return this.decorated.all();
    }
    allSorted(compareFn) {
        return this.decorated.allSorted(compareFn);
    }
}
//# sourceMappingURL=elements.js.map