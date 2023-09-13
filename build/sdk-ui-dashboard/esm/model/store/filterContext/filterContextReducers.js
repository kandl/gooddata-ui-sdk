// (C) 2021-2023 GoodData Corporation
import { v4 as uuidv4 } from "uuid";
import { invariant } from "ts-invariant";
import partition from "lodash/partition.js";
import { areObjRefsEqual, attributeElementsIsEmpty, isAttributeElementsByRef, isDashboardAttributeFilter, isDashboardDateFilter, } from "@gooddata/sdk-model";
const generateFilterLocalIdentifier = () => uuidv4().replace(/-/g, "");
const setFilterContext = (state, action) => {
    var _a;
    const { filterContextDefinition, originalFilterContextDefinition, filterContextIdentity, attributeFilterDisplayForms, } = action.payload;
    // make sure attribute filters always have localId
    const filtersWithLocalId = (_a = filterContextDefinition.filters) === null || _a === void 0 ? void 0 : _a.map((filter) => {
        var _a;
        return isDashboardAttributeFilter(filter)
            ? {
                attributeFilter: Object.assign(Object.assign({}, filter.attributeFilter), { localIdentifier: (_a = filter.attributeFilter.localIdentifier) !== null && _a !== void 0 ? _a : generateFilterLocalIdentifier() }),
            }
            : filter;
    });
    // make sure that date filter is always first if present (when DateFilter is set to all time than is missing in filterContextDefinition and originalFilterContextDefinition)
    // we have to keep order of rest of array (attributeFilters) it represent order of filters in filter bar
    const [dateFilter, attributeFilters] = partition(filtersWithLocalId, isDashboardDateFilter);
    const filters = [...dateFilter, ...attributeFilters];
    state.filterContextDefinition = Object.assign(Object.assign({}, filterContextDefinition), { filters: filters });
    state.originalFilterContextDefinition = originalFilterContextDefinition;
    state.filterContextIdentity = filterContextIdentity;
    state.attributeFilterDisplayForms = attributeFilterDisplayForms;
};
const updateFilterContextIdentity = (state, action) => {
    state.filterContextIdentity = action.payload.filterContextIdentity;
};
//
//
//
const removeAttributeFilterDisplayForms = (state, action) => {
    invariant(state.attributeFilterDisplayForms, "attempting to work with uninitialized state");
    state.attributeFilterDisplayForms = state.attributeFilterDisplayForms.filter((df) => {
        return !areObjRefsEqual(df, action.payload);
    });
};
const addAttributeFilterDisplayForm = (state, action) => {
    invariant(state.attributeFilterDisplayForms, "attempting to work with uninitialized state");
    // if there is already a display form with the same ref, replace it
    const existing = state.attributeFilterDisplayForms.find((df) => areObjRefsEqual(df, action.payload.ref));
    if (existing) {
        state.attributeFilterDisplayForms = state.attributeFilterDisplayForms.filter((df) => !areObjRefsEqual(df, action.payload));
    }
    state.attributeFilterDisplayForms.push(action.payload);
};
const upsertDateFilter = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const existingFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardDateFilter(item));
    /**
     * TODO: This will cause problems once we support dateDataset-specific date filters (then, we might want
     * to keep even the all time filters to carry the information about the selected dateDataset).
     */
    if (action.payload.type === "allTime") {
        if (existingFilterIndex >= 0) {
            // if allTime remove the date filter altogether
            state.filterContextDefinition.filters.splice(existingFilterIndex, 1);
        }
    }
    else if (existingFilterIndex >= 0) {
        const { type, granularity, from, to } = action.payload;
        const dateFilter = state.filterContextDefinition.filters[existingFilterIndex];
        if (isDashboardDateFilter(dateFilter)) {
            dateFilter.dateFilter.type = type;
            dateFilter.dateFilter.granularity = granularity;
            dateFilter.dateFilter.from = from;
            dateFilter.dateFilter.to = to;
        }
    }
    else {
        const { type, granularity, from, to } = action.payload;
        state.filterContextDefinition.filters.unshift({
            dateFilter: {
                granularity,
                type,
                from,
                to,
            },
        });
    }
};
const updateAttributeFilterSelection = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { elements, filterLocalId, negativeSelection } = action.payload;
    const existingFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(existingFilterIndex >= 0, "Attempt to update non-existing filter");
    state.filterContextDefinition.filters[existingFilterIndex] = {
        attributeFilter: Object.assign(Object.assign({}, state.filterContextDefinition.filters[existingFilterIndex]
            .attributeFilter), { attributeElements: elements, negativeSelection }),
    };
};
const addAttributeFilter = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { displayForm, index, initialIsNegativeSelection, initialSelection, parentFilters, selectionMode } = action.payload;
    const hasSelection = initialSelection && !attributeElementsIsEmpty(initialSelection);
    const isNegative = selectionMode !== "single" && (initialIsNegativeSelection || !hasSelection);
    const filter = {
        attributeFilter: Object.assign({ attributeElements: initialSelection !== null && initialSelection !== void 0 ? initialSelection : { uris: [] }, displayForm, negativeSelection: isNegative, localIdentifier: generateFilterLocalIdentifier(), filterElementsBy: parentFilters ? [...parentFilters] : undefined }, (selectionMode !== undefined ? { selectionMode } : {})),
    };
    // Filters are indexed just for attribute filters, if DateFilter is present should be always first item
    const isDateFilterPresent = state.filterContextDefinition.filters.findIndex(isDashboardDateFilter) >= 0;
    if (index === -1) {
        state.filterContextDefinition.filters.push(filter);
    }
    else {
        // If DateFilter is present we have to move index by 1 because index of filter is calculated just for AttributeFilers array
        const attributeFilterIndex = isDateFilterPresent ? index + 1 : index;
        state.filterContextDefinition.filters.splice(attributeFilterIndex, 0, filter);
    }
};
const removeAttributeFilter = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId } = action.payload;
    state.filterContextDefinition.filters = state.filterContextDefinition.filters.filter((item) => isDashboardDateFilter(item) || item.attributeFilter.localIdentifier !== filterLocalId);
};
const moveAttributeFilter = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId, index } = action.payload;
    const currentFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(currentFilterIndex >= 0, "Attempt to move non-existing filter");
    const filter = state.filterContextDefinition.filters[currentFilterIndex];
    state.filterContextDefinition.filters.splice(currentFilterIndex, 1);
    // Filters are indexed just for attribute filters, if DateFilter is present should be always first item
    const isDateFilterPresent = state.filterContextDefinition.filters.findIndex(isDashboardDateFilter) >= 0;
    if (index === -1) {
        state.filterContextDefinition.filters.push(filter);
    }
    else {
        // If DateFilter is present we have to move index by 1 because index of filter is calculated just for AttributeFilers array
        const attributeFilterIndex = isDateFilterPresent ? index + 1 : index;
        state.filterContextDefinition.filters.splice(attributeFilterIndex, 0, filter);
    }
};
const setAttributeFilterParents = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId, parentFilters } = action.payload;
    const currentFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(currentFilterIndex >= 0, "Attempt to set parent of a non-existing filter");
    state.filterContextDefinition.filters[currentFilterIndex].attributeFilter.filterElementsBy = [...parentFilters];
};
const clearAttributeFiltersSelection = (state, action) => {
    const { filterLocalIds } = action.payload;
    filterLocalIds.forEach((filterLocalId) => {
        invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
        const currentFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
        invariant(currentFilterIndex >= 0, "Attempt to clear selection of a non-existing filter");
        const currentFilter = state.filterContextDefinition.filters[currentFilterIndex];
        const isMultiSelect = currentFilter.attributeFilter.selectionMode !== "single";
        currentFilter.attributeFilter.negativeSelection = isMultiSelect;
        currentFilter.attributeFilter.attributeElements = isAttributeElementsByRef(currentFilter.attributeFilter.attributeElements)
            ? { uris: [] }
            : { values: [] };
    });
};
/**
 * Changes the display form for the filter given by its local identifier.
 */
const changeAttributeDisplayForm = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId, displayForm, supportsElementUris } = action.payload;
    const currentFilterIndex = state.filterContextDefinition.filters.findIndex((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(currentFilterIndex >= 0, "Attempt to set parent of a non-existing filter");
    const currentFilter = state.filterContextDefinition.filters[currentFilterIndex];
    currentFilter.attributeFilter.displayForm = Object.assign({}, displayForm);
    const isMultiSelect = currentFilter.attributeFilter.selectionMode !== "single";
    if (!supportsElementUris) {
        currentFilter.attributeFilter.negativeSelection = isMultiSelect;
        currentFilter.attributeFilter.attributeElements = isAttributeElementsByRef(currentFilter.attributeFilter.attributeElements)
            ? { uris: [] }
            : { values: [] };
    }
};
/**
 * Changes the title for the filter given by its local identifier.
 */
const changeAttributeTitle = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId, title } = action.payload;
    const findFilter = state.filterContextDefinition.filters.find((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(findFilter, "Attempt to change title of a non-existing filter");
    findFilter.attributeFilter.title = title;
};
/**
 * Changes the selection mode for the filter given by its local identifier.
 */
const changeSelectionMode = (state, action) => {
    invariant(state.filterContextDefinition, "Attempt to edit uninitialized filter context");
    const { filterLocalId, selectionMode } = action.payload;
    const findFilter = state.filterContextDefinition.filters.find((item) => isDashboardAttributeFilter(item) && item.attributeFilter.localIdentifier === filterLocalId);
    invariant(findFilter, "Attempt to change selection mode of a non-existing filter");
    findFilter.attributeFilter.selectionMode = selectionMode;
};
//
//
//
export const filterContextReducers = {
    setFilterContext,
    updateFilterContextIdentity,
    removeAttributeFilterDisplayForms,
    addAttributeFilterDisplayForm,
    addAttributeFilter,
    removeAttributeFilter,
    moveAttributeFilter,
    updateAttributeFilterSelection,
    setAttributeFilterParents,
    clearAttributeFiltersSelection,
    upsertDateFilter,
    changeAttributeDisplayForm,
    changeAttributeTitle,
    changeSelectionMode,
};
//# sourceMappingURL=filterContextReducers.js.map