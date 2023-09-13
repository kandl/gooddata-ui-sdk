// (C) 2021 GoodData Corporation
/**
 * Creates a new string-based comparator.
 *
 * @internal
 */
export const stringComparatorFactory = (valueAccessor) => (direction) => {
    return (a, b) => {
        const aValue = valueAccessor(a);
        const bValue = valueAccessor(b);
        if (aValue === bValue) {
            return 0;
        }
        // undefined must be sorted at the "high" end of the collection
        if (aValue === undefined) {
            return direction === "asc" ? 1 : -1;
        }
        if (bValue === undefined) {
            return direction === "asc" ? -1 : 1;
        }
        const result = aValue === null || aValue === void 0 ? void 0 : aValue.localeCompare(bValue);
        return direction === "asc" ? result : -result;
    };
};
/**
 * Creates a new date-string-based comparator.
 *
 * @internal
 */
export const dateStringComparatorFactory = (valueAccessor) => (direction) => {
    return (a, b) => {
        const aRawValue = valueAccessor(a);
        const bRawValue = valueAccessor(b);
        const aValue = aRawValue ? +new Date(aRawValue) : undefined;
        const bValue = bRawValue ? +new Date(bRawValue) : undefined;
        if (aValue === bValue) {
            return 0;
        }
        // undefined must be sorted at the "high" end of the collection
        if (aValue === undefined) {
            return direction === "asc" ? 1 : -1;
        }
        if (bValue === undefined) {
            return direction === "asc" ? -1 : 1;
        }
        const result = aValue - bValue;
        return direction === "asc" ? result : -result;
    };
};
//# sourceMappingURL=comparators.js.map