import { createSelector } from "@reduxjs/toolkit";
import compact from "lodash/compact.js";
import { selectState } from "../common/selectors.js";
/**
 * Get the elements specified by the keys.
 *
 * @remarks
 * If an element is not available in elementsMap, it is skipped. This can be the case when using hiddenElements,
 * or when a particular element is no longer accessible on the backend (either because it was removed or hidden
 * by permissions in the current context).
 *
 * @internal
 */
export const getElementsByKeys = (keys, elementsMap) => {
    return compact(keys.map((key) => elementsMap[key]));
};
/**
 * @internal
 */
export const selectElementKeys = createSelector(selectState, (state) => { var _a; return (_a = state.elements.data) !== null && _a !== void 0 ? _a : []; });
/**
 * @internal
 */
export const selectElementsCache = createSelector(selectState, (state) => state.elements.cache);
/**
 * @internal
 */
export const selectElements = createSelector(selectElementKeys, selectElementsCache, getElementsByKeys);
/**
 * @internal
 */
export const selectElementsTotalCount = createSelector(selectState, (state) => state.elements.totalCount);
/**
 * @internal
 */
export const selectInitTotalCountStatus = createSelector(selectState, (state) => { var _a; return (_a = state.elements.totalCountInitialization) === null || _a === void 0 ? void 0 : _a.status; });
/**
 * @internal
 */
export const selectInitTotalCountError = createSelector(selectState, (state) => { var _a; return (_a = state.elements.totalCountInitialization) === null || _a === void 0 ? void 0 : _a.error; });
/**
 * @internal
 */
export const selectElementsTotalCountWithCurrentSettings = createSelector(selectState, (state) => state.elements.totalCountWithCurrentSettings);
/**
 * @internal
 */
export const selectStaticElements = createSelector(selectState, (state) => { var _a; return (_a = state.config.staticElements) !== null && _a !== void 0 ? _a : []; });
/**
 * @internal
 */
export const selectSearch = createSelector(selectState, (state) => state.elements.currentOptions.search);
/**
 * @internal
 */
export const selectOrder = createSelector(selectState, (state) => state.elements.currentOptions.order);
/**
 * @internal
 */
export const selectLimit = createSelector(selectState, (state) => state.elements.currentOptions.limit);
/**
 * @internal
 */
export const selectOffset = createSelector(selectState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state.elements) === null || _a === void 0 ? void 0 : _a.lastLoadedOptions) === null || _b === void 0 ? void 0 : _b.offset) !== null && _c !== void 0 ? _c : state.elements.currentOptions.offset; });
/**
 * @internal
 */
export const selectLimitingAttributeFilters = createSelector(selectState, (state) => state.elements.currentOptions.limitingAttributeFilters);
/**
 * @internal
 */
export const selectLimitingMeasures = createSelector(selectState, (state) => state.elements.currentOptions.limitingMeasures);
/**
 * @internal
 */
export const selectLimitingDateFilters = createSelector(selectState, (state) => state.elements.currentOptions.limitingDateFilters);
/**
 * @internal
 */
export const selectLoadElementsOptions = createSelector(selectOffset, selectLimit, selectOrder, selectSearch, selectLimitingAttributeFilters, selectLimitingMeasures, selectLimitingDateFilters, (offset, limit, order, search, limitingAttributeFilters, limitingMeasures, limitingDateFilters) => {
    return {
        limit,
        limitingAttributeFilters,
        limitingDateFilters,
        limitingMeasures,
        offset,
        order,
        search,
    };
});
/**
 * @internal
 */
export const selectLastLoadedElementsOptions = createSelector(selectState, (state) => {
    return state.elements.lastLoadedOptions;
});
/**
 * @internal
 */
export const selectLimitingAttributeFiltersAttributes = createSelector(selectState, (state) => state.elements.limitingAttributeFiltersAttributes);
//# sourceMappingURL=elementsSelectors.js.map