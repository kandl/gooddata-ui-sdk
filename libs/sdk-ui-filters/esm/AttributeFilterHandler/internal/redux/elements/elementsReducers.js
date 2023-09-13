// (C) 2021-2022 GoodData Corporation
import identity from "lodash/identity.js";
const setElementsTotalCount = (state, action) => {
    state.elements.totalCount = action.payload.totalCount;
};
const initTotalCount = identity;
const initTotalCountStart = (state) => {
    state.elements.totalCountInitialization.status = "loading";
};
const initTotalCountSuccess = (state) => {
    state.elements.totalCountInitialization.status = "success";
};
const initTotalCountError = (state, action) => {
    state.elements.totalCountInitialization.status = "error";
    state.elements.totalCountInitialization.error = action.payload.error;
};
const initTotalCountCancel = (state) => {
    state.elements.totalCountInitialization.status = "canceled";
};
const setElementsTotalCountWithCurrentSettings = (state, action) => {
    state.elements.totalCountWithCurrentSettings = action.payload.totalCount;
};
const setOffset = (state, action) => {
    state.elements.currentOptions.offset = action.payload.offset;
};
const setSearch = (state, action) => {
    state.elements.currentOptions.search = action.payload.search;
};
const setOrder = (state, action) => {
    state.elements.currentOptions.order = action.payload.order;
};
const setLimit = (state, action) => {
    state.elements.currentOptions.limit = action.payload.limit;
};
const setLimitingAttributeFilters = (state, action) => {
    state.elements.currentOptions.limitingAttributeFilters = action.payload.filters;
};
const setLimitingAttributeFiltersAttributes = (state, action) => {
    state.elements.limitingAttributeFiltersAttributes = action.payload.attributes;
};
const setLimitingMeasures = (state, action) => {
    state.elements.currentOptions.limitingMeasures = action.payload.filters;
};
const setLimitingDateFilters = (state, action) => {
    state.elements.currentOptions.limitingDateFilters = action.payload.filters;
};
/**
 * @internal
 */
export const elementsReducers = {
    setElementsTotalCount,
    initTotalCount,
    initTotalCountStart,
    initTotalCountSuccess,
    initTotalCountError,
    initTotalCountCancel,
    setElementsTotalCountWithCurrentSettings,
    setOffset,
    setLimit,
    setSearch,
    setOrder,
    setLimitingAttributeFilters,
    setLimitingMeasures,
    setLimitingDateFilters,
    setLimitingAttributeFiltersAttributes,
};
//# sourceMappingURL=elementsReducers.js.map