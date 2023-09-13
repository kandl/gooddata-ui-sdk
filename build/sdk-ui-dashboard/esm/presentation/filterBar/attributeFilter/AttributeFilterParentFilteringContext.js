// (C) 2022-2023 GoodData Corporation
import React, { useContext, useMemo, useCallback } from "react";
import { invariant } from "ts-invariant";
import { filterObjRef, areObjRefsEqual, } from "@gooddata/sdk-model";
import { selectAllCatalogDisplayFormsMap, selectAttributeFilterDisplayFormsMap, selectOtherContextAttributeFilters, useDashboardSelector, } from "../../../model/index.js";
import { dashboardAttributeFilterToAttributeFilter } from "../../../_staging/dashboard/dashboardFilterConverter.js";
import { useParentsConfiguration } from "./dashboardDropdownBody/configuration/hooks/useParentsConfiguration.js";
import { useDisplayFormConfiguration } from "./dashboardDropdownBody/configuration/hooks/useDisplayFormConfiguration.js";
import { useTitleConfiguration } from "./dashboardDropdownBody/configuration/hooks/useTitleConfiguration.js";
import { useSelectionModeConfiguration } from "./dashboardDropdownBody/configuration/hooks/useSelectionModeConfiguration.js";
export const AttributeFilterParentFiltering = React.createContext(null); // TODO: Fix typing
AttributeFilterParentFiltering.displayName = "AttributeFilterParentFiltering";
/**
 * @internal
 */
export const useAttributeFilterParentFiltering = () => useContext(AttributeFilterParentFiltering);
/**
 * @internal
 */
export const AttributeFilterParentFilteringProvider = (props) => {
    var _a, _b;
    const { children, filter: currentFilter, attributes } = props;
    const attributeFilter = useMemo(() => dashboardAttributeFilterToAttributeFilter(currentFilter), [currentFilter]);
    const memoizedAttributes = useMemo(() => {
        return attributes !== null && attributes !== void 0 ? attributes : [];
    }, [attributes]);
    const filterRef = useMemo(() => {
        return filterObjRef(attributeFilter);
    }, [attributeFilter]);
    const neighborFilters = useDashboardSelector(selectOtherContextAttributeFilters(filterRef));
    const catalogDisplayFormsMap = useDashboardSelector(selectAllCatalogDisplayFormsMap);
    const attributeFilterDisplayFormsMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const filterDisplayForm = attributeFilterDisplayFormsMap.get(currentFilter.attributeFilter.displayForm);
    invariant(filterDisplayForm);
    const attributeByDisplayForm = memoizedAttributes.find((attribute) => areObjRefsEqual(attribute.ref, filterDisplayForm.attribute));
    const attributeFilterDisplayForm = filterDisplayForm.attribute;
    const defaultAttributeFilterTitle = (_b = (_a = catalogDisplayFormsMap.get(filterDisplayForm.attribute)) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : attributeByDisplayForm === null || attributeByDisplayForm === void 0 ? void 0 : attributeByDisplayForm.title;
    const { parents, configurationChanged, onParentSelect, onConnectingAttributeChanged, onParentFiltersChange, onConfigurationClose: onParentFiltersClose, } = useParentsConfiguration(neighborFilters, currentFilter);
    const { onDisplayFormSelect, filterDisplayForms, displayFormChanged, onDisplayFormChange, onConfigurationClose: onDisplayFormClose, displayFormChangeStatus, } = useDisplayFormConfiguration(currentFilter, memoizedAttributes);
    const { title, titleChanged, titleChangeStatus, onTitleUpdate, onTitleReset, onTitleChange, onConfigurationClose: onTitleClose, } = useTitleConfiguration(currentFilter, defaultAttributeFilterTitle);
    const { selectionMode, selectionModeChanged, onSelectionModeChange, onSelectionModeUpdate, onConfigurationClose: onSelectionModeClose, } = useSelectionModeConfiguration(currentFilter);
    const onConfigurationSave = useCallback(() => {
        // the order is important to keep the app in valid state
        if (selectionMode === "single") {
            onParentFiltersChange();
            onSelectionModeChange();
        }
        else {
            onSelectionModeChange();
            onParentFiltersChange();
        }
        onDisplayFormChange();
        onTitleChange();
    }, [selectionMode, onParentFiltersChange, onDisplayFormChange, onTitleChange, onSelectionModeChange]);
    const onConfigurationClose = useCallback(() => {
        onParentFiltersClose();
        onDisplayFormClose();
        onTitleClose();
        onSelectionModeClose();
    }, [onParentFiltersClose, onDisplayFormClose, onTitleClose, onSelectionModeClose]);
    const showDisplayFormPicker = filterDisplayForms.availableDisplayForms.length > 1;
    const showResetTitle = title !== defaultAttributeFilterTitle;
    return (React.createElement(AttributeFilterParentFiltering.Provider, { value: {
            parents,
            onParentSelect,
            onConnectingAttributeChanged,
            onParentFiltersChange,
            onDisplayFormSelect,
            filterDisplayForms,
            displayFormChanged,
            onDisplayFormChange,
            onConfigurationSave,
            onConfigurationClose,
            showDisplayFormPicker,
            configurationChanged,
            displayFormChangeStatus,
            title,
            defaultAttributeFilterTitle,
            showResetTitle,
            titleChanged,
            titleChangeStatus,
            onTitleChange,
            onTitleUpdate,
            onTitleReset,
            attributeFilterDisplayForm,
            selectionMode,
            selectionModeChanged,
            onSelectionModeChange,
            onSelectionModeUpdate,
        } }, children));
};
//# sourceMappingURL=AttributeFilterParentFilteringContext.js.map