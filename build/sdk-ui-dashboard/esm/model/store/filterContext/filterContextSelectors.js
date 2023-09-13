// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
import { areObjRefsEqual, isDashboardAttributeFilter, isDashboardDateFilter, uriRef, idRef, } from "@gooddata/sdk-model";
import { newDisplayFormMap } from "../../../_staging/metadata/objRefMap.js";
import { createMemoizedSelector } from "../_infra/selectors.js";
import compact from "lodash/compact.js";
const selectSelf = createSelector((state) => state, (state) => state.filterContext);
/**
 * This selector returns original (stored) dashboard's filter context definition.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns {@link @gooddata/sdk-backend-spi#IFilterContextDefinition} or `undefined` if original filter context definition is not set.
 *
 * @public
 */
export const selectOriginalFilterContextDefinition = createSelector(selectSelf, (filterContextState) => {
    invariant(filterContextState.filterContextDefinition, "attempting to access uninitialized filter context state");
    return filterContextState.originalFilterContextDefinition;
});
/**
 * This selector returns original (stored) dashboard's filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns an array of {@link @gooddata/sdk-backend-spi#FilterContextItem} or an empty array.
 *
 * @public
 */
export const selectOriginalFilterContextFilters = createSelector(selectOriginalFilterContextDefinition, (filterContext) => { var _a; return (_a = filterContext === null || filterContext === void 0 ? void 0 : filterContext.filters) !== null && _a !== void 0 ? _a : []; });
/**
 * This selector returns current dashboard's filter context definition.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link @gooddata/sdk-backend-spi#IFilterContextDefinition}
 *
 * @public
 */
export const selectFilterContextDefinition = createSelector(selectSelf, (filterContextState) => {
    invariant(filterContextState.filterContextDefinition, "attempting to access uninitialized filter context state");
    return filterContextState.filterContextDefinition;
});
/**
 * Selects dashboard's filter context identity.
 *
 * @remarks
 * The identity may be undefined in two circumstances:
 *
 * -  a new, yet unsaved dashboard; the filter context is saved together with the dashboard and after the
 *    save the identity will be known and added
 *
 * -  export of an existing, saved dashboard; during the export the dashboard receives a temporary
 *    filter context that represents values of filters at the time the export was initiated - which may
 *    be different from what is saved in the filter context itself. that temporary context is not
 *    persistent and lives only for that particular export operation.
 *
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link @gooddata/sdk-backend-spi#IDashboardObjectIdentity} or undefined, if the filter context identity is not set.
 *
 * @internal
 */
export const selectFilterContextIdentity = createSelector(selectSelf, (filterContextState) => {
    // this is intentional; want to fail fast when trying to access an optional identity of filter context \
    // but there is actually no filter context initialized for the dashboard
    invariant(filterContextState.filterContextDefinition, "attempting to access uninitialized filter context state");
    return filterContextState.filterContextIdentity;
});
/**
 * Selects list of display form metadata objects referenced by attribute filters.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @returns an array of {@link @gooddata/sdk-backend-spi#IAttributeDisplayFormMetadataObject}
 *
 * @public
 */
export const selectAttributeFilterDisplayForms = createSelector(selectSelf, (filterContextState) => {
    invariant(filterContextState.attributeFilterDisplayForms, "attempting to access uninitialized filter context state");
    return filterContextState.attributeFilterDisplayForms;
});
/**
 * Selects map of display form metadata objects referenced by attribute filters.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @returns a {@link ObjRefMap} of {@link @gooddata/sdk-backend-spi#IAttributeDisplayFormMetadataObject}
 *
 * @internal
 */
export const selectAttributeFilterDisplayFormsMap = createSelector(selectSelf, (filterContextState) => {
    invariant(filterContextState.attributeFilterDisplayForms, "attempting to access uninitialized filter context state");
    return newDisplayFormMap(filterContextState.attributeFilterDisplayForms);
});
/**
 * This selector returns dashboard's filter context filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextFilters = createSelector(selectFilterContextDefinition, (filterContext) => filterContext.filters);
/**
 * This selector returns dashboard's filter context attribute filters.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextAttributeFilters = createSelector(selectFilterContextFilters, (filters) => filters.filter(isDashboardAttributeFilter));
/**
 * This selector returns dashboard's filter context date filter.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextDateFilter = createSelector(selectFilterContextFilters, (filters) => filters.find(isDashboardDateFilter));
/**
 * Creates a selector for selecting attribute filter by its displayForm {@link @gooddata/sdk-model#ObjRef}.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextAttributeFilterByDisplayForm = createMemoizedSelector((displayForm) => createSelector(selectAttributeFilterDisplayFormsMap, selectFilterContextAttributeFilters, (attributeDisplayFormsMap, attributeFilters) => {
    const df = attributeDisplayFormsMap.get(displayForm);
    if (!df) {
        return undefined;
    }
    // try matching both uri and id in case the type of ref is different from what is in the ref field
    return attributeFilters.find((filter) => areObjRefsEqual(filter.attributeFilter.displayForm, idRef(df.id, "displayForm")) ||
        areObjRefsEqual(filter.attributeFilter.displayForm, uriRef(df.uri)));
}));
/**
 * Creates a selector for selecting attribute filter by its localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextAttributeFilterByLocalId = createMemoizedSelector((localId) => createSelector(selectFilterContextAttributeFilters, (attributeFilters) => attributeFilters.find((filter) => filter.attributeFilter.localIdentifier === localId)));
/**
 * Creates a selector for selecting attribute filter index by its localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectFilterContextAttributeFilterIndexByLocalId = createMemoizedSelector((localId) => createSelector(selectFilterContextAttributeFilters, (attributeFilters) => attributeFilters.findIndex((filter) => filter.attributeFilter.localIdentifier === localId)));
/**
 * Creates a selector for selecting all descendants of the attribute filter with given localId.
 *
 * @remarks
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectAttributeFilterDescendants = createMemoizedSelector((localId) => createSelector(selectFilterContextAttributeFilters, (attributeFilters) => {
    const toCheck = compact([localId]);
    const result = new Set();
    while (toCheck.length) {
        const current = toCheck.pop();
        const children = attributeFilters.filter((f) => {
            var _a;
            return (_a = f.attributeFilter.filterElementsBy) === null || _a === void 0 ? void 0 : _a.some((parent) => parent.filterLocalIdentifier === current);
        });
        children.forEach((child) => {
            result.add(child.attributeFilter.localIdentifier);
            toCheck.push(child.attributeFilter.localIdentifier);
        });
    }
    return Array.from(result);
}));
/**
 * Creates a selector for selecting all filters with different reference than the given one.
 *
 * @internal
 */
export const selectOtherContextAttributeFilters = createMemoizedSelector((ref) => createSelector(selectFilterContextAttributeFilters, (attributeFilters) => {
    return attributeFilters.filter((attributeFilter) => !areObjRefsEqual(attributeFilter.attributeFilter.displayForm, ref));
}));
/**
 * Creates a selector to get a display form of the filter defined by its local identifier.
 *
 * @internal
 */
export const selectAttributeFilterDisplayFormByLocalId = createMemoizedSelector((localId) => createSelector(selectFilterContextAttributeFilters, (filters) => {
    const filter = filters.find((filter) => filter.attributeFilter.localIdentifier === localId);
    invariant(filter, "Unable to find current filter to get its title.");
    return filter.attributeFilter.displayForm;
}));
/**
 * Creates a selector which checks for a circular dependency between filters.
 *
 * @internal
 */
export const selectIsCircularDependency = createMemoizedSelector((currentFilterLocalId, neighborFilterLocalId) => createSelector(selectAttributeFilterDescendants(currentFilterLocalId), (descendants) => {
    return descendants.some((descendant) => descendant === neighborFilterLocalId);
}));
const MAX_ATTRIBUTE_FILTERS_COUNT = 30;
/**
 * This selector returns whether any more attribute filters can be added.
 *
 * @remarks
 * It is expected that the selector is called only after the filter context state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectCanAddMoreAttributeFilters = createSelector(selectFilterContextAttributeFilters, (attributeFilters) => {
    return attributeFilters.length < MAX_ATTRIBUTE_FILTERS_COUNT;
});
//# sourceMappingURL=filterContextSelectors.js.map