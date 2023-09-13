// (C) 2021-2022 GoodData Corporation
import { useCallback, useMemo, useState } from "react";
import partition from "lodash/partition.js";
import { areObjRefsEqual, isDashboardDateFilter, } from "@gooddata/sdk-model";
import { addAttributeFilter as addAttributeFilterAction, dispatchAndWaitFor, selectCatalogAttributes, selectSelectedFilterIndex, uiActions, useDashboardDispatch, useDashboardSelector, } from "../../../model/index.js";
/**
 * @internal
 */
export function isFilterBarAttributeFilterPlaceholder(object) {
    return object.type === "attributeFilterPlaceholder";
}
/**
 * @internal
 */
export function useFiltersWithAddedPlaceholder(filters) {
    const dispatch = useDashboardDispatch();
    const selectedFilterIndex = useDashboardSelector(selectSelectedFilterIndex);
    const allAttributes = useDashboardSelector(selectCatalogAttributes);
    const [[dateFilter], attributeFilters] = partition(filters, isDashboardDateFilter);
    const [selectedDisplayForm, setSelectedDisplayForm] = useState();
    const [autoOpenFilter, setAutoOpenFilter] = useState();
    const addedAttributeFilter = useMemo(() => {
        if (selectedFilterIndex !== undefined) {
            if (selectedDisplayForm) {
                return Object.assign(Object.assign({}, {
                    type: "attributeFilterPlaceholder",
                    filterIndex: selectedFilterIndex,
                }), { selectedDisplayForm });
            }
            return { type: "attributeFilterPlaceholder", filterIndex: selectedFilterIndex };
        }
        return undefined;
    }, [selectedFilterIndex, selectedDisplayForm]);
    const addAttributeFilterPlaceholder = useCallback(function (index) {
        dispatch(uiActions.selectFilterIndex(index));
    }, [dispatch]);
    const clearAddedFilter = useCallback(() => {
        setSelectedDisplayForm(undefined);
        dispatch(uiActions.clearFilterIndexSelection());
    }, [dispatch]);
    const closeAttributeSelection = useCallback(function () {
        // close after select attribute should not clear placeholder
        if (selectedDisplayForm) {
            return;
        }
        clearAddedFilter();
    }, [selectedDisplayForm, clearAddedFilter]);
    const attributeFiltersWithPlaceholder = useMemo(() => {
        const filterObjects = attributeFilters.map((filter, filterIndex) => ({
            filter,
            filterIndex,
        }));
        const containsAddedAttributeDisplayForm = selectedDisplayForm &&
            attributeFilters.some((attributeFilter) => areObjRefsEqual(attributeFilter.attributeFilter.displayForm, selectedDisplayForm));
        if (addedAttributeFilter === undefined || containsAddedAttributeDisplayForm) {
            return filterObjects;
        }
        filterObjects.splice(addedAttributeFilter.filterIndex, 0, addedAttributeFilter);
        return filterObjects;
    }, [addedAttributeFilter, attributeFilters, selectedDisplayForm]);
    const selectAttributeFilter = useCallback(function (displayForm) {
        if (!addedAttributeFilter) {
            return;
        }
        const relatedAttribute = allAttributes.find((att) => att.displayForms.some((df) => areObjRefsEqual(df.ref, displayForm)));
        const usedDisplayForm = relatedAttribute === null || relatedAttribute === void 0 ? void 0 : relatedAttribute.displayForms.find((df) => {
            return attributeFilters.find((x) => areObjRefsEqual(x.attributeFilter.displayForm, df));
        });
        // We allowed just one attributeFilter for one attribute,
        if (!usedDisplayForm) {
            setSelectedDisplayForm(displayForm);
            setAutoOpenFilter(displayForm);
            dispatchAndWaitFor(dispatch, addAttributeFilterAction(displayForm, addedAttributeFilter.filterIndex)).finally(clearAddedFilter);
        }
        else {
            setAutoOpenFilter(usedDisplayForm);
            clearAddedFilter();
        }
    }, [addedAttributeFilter, attributeFilters, allAttributes, clearAddedFilter, dispatch]);
    const onCloseAttributeFilter = useCallback(() => {
        setAutoOpenFilter(undefined);
    }, []);
    return [
        {
            dateFilter,
            attributeFiltersWithPlaceholder,
            attributeFiltersCount: attributeFilters.length,
            autoOpenFilter,
        },
        {
            addAttributeFilterPlaceholder,
            selectAttributeFilter,
            closeAttributeSelection,
            onCloseAttributeFilter,
        },
    ];
}
//# sourceMappingURL=useFiltersWithAddedPlaceholder.js.map