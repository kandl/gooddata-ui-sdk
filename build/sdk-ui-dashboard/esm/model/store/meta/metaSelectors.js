import { __rest } from "tslib";
// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { idRef, uriRef, isTempFilterContext, isDashboardDateFilter, isDashboardAttributeFilter, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import isUndefined from "lodash/isUndefined.js";
import { selectBasicLayout } from "../layout/layoutSelectors.js";
import { selectFilterContextAttributeFilters, selectFilterContextDateFilter, selectFilterContextDefinition, selectFilterContextIdentity, } from "../filterContext/filterContextSelectors.js";
import { isDashboardLayoutEmpty } from "@gooddata/sdk-backend-spi";
import isEqual from "lodash/isEqual.js";
import { selectDateFilterConfigOverrides } from "../dateFilterConfig/dateFilterConfigSelectors.js";
const selectSelf = createSelector((state) => state, (state) => state.meta);
/**
 * Selects dashboard's descriptor.
 *
 * @internal
 */
export const selectDashboardDescriptor = createSelector(selectSelf, (state) => {
    invariant(state.descriptor, "attempting to access uninitialized meta state");
    return state.descriptor;
});
/**
 * Selects persisted IDashboard object - that is the IDashboard object that was used to initialize the rest
 * of the dashboard state of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @internal
 */
export const selectPersistedDashboard = createSelector(selectSelf, (state) => {
    var _a;
    return (_a = state.persistedDashboard) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Selects persisted IFilterContext/ITempFilterContext - that is the IFilterContext or ITempFilterContext that
 * was used to initialize the original filters of the dashboard component during the initial load of the
 * dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
export const selectPersistedDashboardFilterContext = createSelector(selectSelf, (state) => {
    var _a, _b;
    return (_b = (_a = state.persistedDashboard) === null || _a === void 0 ? void 0 : _a.filterContext) !== null && _b !== void 0 ? _b : undefined;
});
/**
 * Selects persisted IFilterContextDefinition - that is the IFilterContext or ITempFilterContext that
 * was used to initialize the original filters of the dashboard component during the initial load of the
 * dashboard but removes ref, uri and identifier, effectively creating a clone of the stored value
 * that can be used independently.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
export const selectPersistedDashboardFilterContextAsFilterContextDefinition = createSelector(selectPersistedDashboardFilterContext, (filterContext) => {
    if (!filterContext) {
        return undefined;
    }
    if (isTempFilterContext(filterContext)) {
        const { ref: _, uri: __ } = filterContext, definition = __rest(filterContext, ["ref", "uri"]);
        return Object.assign(Object.assign({}, definition), { title: "filterContext", description: "" });
    }
    else {
        const { identifier: _, ref: __, uri: ___ } = filterContext, definition = __rest(filterContext, ["identifier", "ref", "uri"]);
        return definition;
    }
});
/**
 * Selects ref of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export const selectDashboardRef = createSelector(selectPersistedDashboard, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.ref) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Selects identifier of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export const selectDashboardId = createSelector(selectPersistedDashboard, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.identifier) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Selects URI of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export const selectDashboardUri = createSelector(selectPersistedDashboard, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.uri) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Selects idRef of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export const selectDashboardIdRef = createSelector(selectDashboardId, (id) => {
    return id ? idRef(id, "analyticalDashboard") : undefined;
});
/**
 * Selects uriRef of the persisted dashboard object that backs and is rendered-by the dashboard component.
 *
 * @remarks
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 *
 * @public
 */
export const selectDashboardUriRef = createSelector(selectDashboardUri, (uri) => {
    return uri ? uriRef(uri) : undefined;
});
/**
 * Selects a boolean indication if dashboard is new
 *
 * @internal
 */
export const selectIsNewDashboard = createSelector(selectDashboardRef, isUndefined);
//
//
//
/**
 * Selects current dashboard title.
 *
 * @public
 */
export const selectDashboardTitle = createSelector(selectDashboardDescriptor, (state) => {
    return state.title;
});
/**
 * Selects current dashboard description.
 *
 * @public
 */
export const selectDashboardDescription = createSelector(selectDashboardDescriptor, (state) => {
    return state.description;
});
/**
 * Selects dashboard tags.
 *
 * @public
 */
export const selectDashboardTags = createSelector(selectDashboardDescriptor, (state) => {
    var _a;
    return (_a = state.tags) !== null && _a !== void 0 ? _a : [];
});
/**
 * Selects dashboard share status.
 *
 * @alpha
 */
export const selectDashboardShareStatus = createSelector(selectDashboardDescriptor, (state) => {
    return state.shareStatus;
});
/**
 * Returns whether dashboard is private.
 *
 * @alpha
 */
export const selectIsDashboardPrivate = createSelector(selectDashboardShareStatus, (status) => {
    return status === "private";
});
/**
 * Selects dashboard lock status.
 *
 * @alpha
 */
export const selectDashboardLockStatus = createSelector(selectDashboardDescriptor, (state) => {
    var _a;
    return (_a = state.isLocked) !== null && _a !== void 0 ? _a : false;
});
/**
 * Selects complete dashboard share info.
 *
 * @alpha
 */
export const selectDashboardShareInfo = createSelector(selectDashboardDescriptor, ({ shareStatus, isLocked }) => ({
    shareStatus,
    isLocked,
}));
//
//
//
/**
 * Selects persisted FilterContextItems - that is the FilterContextItems that were used to initialize
 * the original filters of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
const selectPersistedDashboardFilterContextFilters = createSelector(selectPersistedDashboardFilterContext, (persistedFilterContext) => {
    return persistedFilterContext === null || persistedFilterContext === void 0 ? void 0 : persistedFilterContext.filters;
});
/**
 * Selects persisted IDashboardDateFilter - that is the IDashboardDateFilter that were used to initialize
 * the original filters of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
const selectPersistedDashboardFilterContextDateFilter = createSelector(selectPersistedDashboardFilterContextFilters, (persistedFilters) => {
    return (persistedFilters !== null && persistedFilters !== void 0 ? persistedFilters : []).find(isDashboardDateFilter);
});
/**
 * Selects persisted IDashboardAttributeFilters - that is the IDashboardAttributeFilters that were used to initialize
 * the original filters of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
const selectPersistedDashboardFilterContextAttributeFilters = createSelector(selectPersistedDashboardFilterContextFilters, (persistedFilters) => {
    return (persistedFilters !== null && persistedFilters !== void 0 ? persistedFilters : []).filter(isDashboardAttributeFilter);
});
/**
 * Selects persisted title - that is the title that was used to initialize the rest
 * of the dashboard state of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
const selectPersistedDashboardTitle = createSelector(selectSelf, (state) => {
    var _a;
    return (_a = state.persistedDashboard) === null || _a === void 0 ? void 0 : _a.title;
});
/**
 * Selects persisted layout - that is the IDashboardLayout object that was used to initialize the rest
 * of the dashboard state of the dashboard component during the initial load of the dashboard.
 *
 * Note that this may be undefined when the dashboard component works with a dashboard that has not yet
 * been persisted (typically newly created dashboard being edited).
 */
const selectPersistedDashboardLayout = createSelector(selectSelf, (state) => {
    var _a;
    return (_a = state.persistedDashboard) === null || _a === void 0 ? void 0 : _a.layout;
});
/**
 * Selects a boolean indication if he dashboard has any changes to the dashboard filter compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsDateFilterChanged = createSelector(selectPersistedDashboardFilterContextDateFilter, selectFilterContextDateFilter, (persistedDateFilter, currentDateFilter) => {
    return !isEqual(persistedDateFilter, currentDateFilter);
});
/**
 * Selects a boolean indication if he dashboard has any changes to the attribute filters compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsAttributeFiltersChanged = createSelector(selectPersistedDashboardFilterContextAttributeFilters, selectFilterContextAttributeFilters, (persistedAttributeFilters, currentAttributeFilters) => {
    return !isEqual(persistedAttributeFilters, currentAttributeFilters);
});
/**
 * Selects a boolean indication if he dashboard has any changes to the any of the filters compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsFiltersChanged = createSelector(selectIsDateFilterChanged, selectIsAttributeFiltersChanged, (isDateFilterChanged, isAttributeFiltersChanged) => {
    return isDateFilterChanged || isAttributeFiltersChanged;
});
/**
 * Selects a boolean indication if he dashboard has any changes to the title compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsTitleChanged = createSelector(selectPersistedDashboardTitle, selectDashboardTitle, (persistedTitle, currentTitle) => {
    return currentTitle !== persistedTitle;
});
/**
 * Selects a boolean indication if he dashboard has any changes to the layout compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsLayoutChanged = createSelector(selectPersistedDashboardLayout, selectBasicLayout, (persistedLayout, currentLayout) => {
    return !isEqual(currentLayout, persistedLayout);
});
/**
 * Selects a boolean indication if he dashboard has any changes compared to the persisted version (if any)
 *
 * @internal
 */
export const selectIsDashboardDirty = createSelector(selectIsNewDashboard, selectBasicLayout, selectIsFiltersChanged, selectIsTitleChanged, selectIsLayoutChanged, (isNew, layout, isFiltersChanged, isTitleChanged, isLayoutChanged) => {
    if (isNew) {
        return !isDashboardLayoutEmpty(layout);
    }
    return [isFiltersChanged, isTitleChanged, isLayoutChanged].some(Boolean);
});
/**
 * @internal
 */
export const selectDashboardWorkingDefinition = createSelector(selectPersistedDashboard, selectDashboardDescriptor, selectFilterContextDefinition, selectFilterContextIdentity, selectBasicLayout, selectDateFilterConfigOverrides, (persistedDashboard, dashboardDescriptor, filterContextDefinition, filterContextIdentity, layout, dateFilterConfig) => {
    const dashboardIdentity = {
        ref: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.ref,
        uri: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.uri,
        identifier: persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.identifier,
    };
    const pluginsProp = (persistedDashboard === null || persistedDashboard === void 0 ? void 0 : persistedDashboard.plugins) ? { plugins: persistedDashboard.plugins } : {};
    return Object.assign(Object.assign(Object.assign(Object.assign({ type: "IDashboard" }, dashboardDescriptor), dashboardIdentity), { filterContext: Object.assign(Object.assign({}, filterContextIdentity), filterContextDefinition), layout,
        dateFilterConfig }), pluginsProp);
});
//# sourceMappingURL=metaSelectors.js.map