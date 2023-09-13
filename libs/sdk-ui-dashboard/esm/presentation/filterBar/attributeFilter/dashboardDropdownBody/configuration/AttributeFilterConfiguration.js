// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useEffect, useMemo } from "react";
import { ConfigurationCategory } from "./ConfigurationCategory.js";
import { ConfigurationPanelHeader } from "./ConfigurationPanelHeader.js";
import { useDashboardSelector, selectOtherContextAttributeFilters, selectFilterContextAttributeFilters, selectSupportsElementsQueryParentFiltering, } from "../../../../../model/index.js";
import { ParentFiltersList } from "./parentFilters/ParentFiltersList.js";
import { invariant } from "ts-invariant";
import { AttributeDisplayFormsDropdown } from "./displayForms/AttributeDisplayFormsDropdown.js";
import { useAttributeFilterParentFiltering } from "../../AttributeFilterParentFilteringContext.js";
import { useConnectingAttributes } from "./hooks/useConnectingAttributes.js";
import { LoadingSpinner } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { useAttributes } from "../../../../../_staging/sharedHooks/useAttributes.js";
import { AttributeTitleRenaming } from "./title/AttributeTitleRenaming.js";
import { SelectionMode } from "./selectionMode/SelectionMode.js";
export const AttributeFilterConfiguration = (props) => {
    var _a, _b;
    const { filterRef, filterByText, displayValuesAsText, titleText, resetTitleText, selectionTitleText, multiSelectionOptionText, singleSelectionOptionText, singleSelectionDisabledTooltip, parentFiltersDisabledTooltip, closeHandler, } = props;
    const theme = useTheme();
    useEffect(() => {
        return () => {
            closeHandler();
        };
    }, [closeHandler]);
    const neighborFilters = useDashboardSelector(selectOtherContextAttributeFilters(filterRef));
    const isDependentFiltersEnabled = useDashboardSelector(selectSupportsElementsQueryParentFiltering);
    const neighborFilterDisplayForms = useMemo(() => {
        return neighborFilters.map((filter) => filter.attributeFilter.displayForm);
    }, [neighborFilters]);
    const currentFilter = useDashboardSelector(selectFilterContextAttributeFilters).find((filter) => neighborFilters.every((neighborFilter) => filter.attributeFilter.localIdentifier !== neighborFilter.attributeFilter.localIdentifier));
    invariant(currentFilter, "Cannot find current filter in the filter context store.");
    const { title, defaultAttributeFilterTitle, parents, onParentSelect, onConnectingAttributeChanged, showDisplayFormPicker, filterDisplayForms, onDisplayFormSelect, showResetTitle, onTitleUpdate, onTitleReset, selectionMode, onSelectionModeUpdate, } = useAttributeFilterParentFiltering();
    const { connectingAttributesLoading, connectingAttributes } = useConnectingAttributes(currentFilter.attributeFilter.displayForm, neighborFilterDisplayForms);
    const { attributes, attributesLoading } = useAttributes(neighborFilterDisplayForms);
    const parentsSelected = useCallback(() => {
        return parents.filter((parent) => parent.isSelected).length > 0;
    }, [parents]);
    if (connectingAttributesLoading || attributesLoading) {
        return (React.createElement("div", { className: "gd-loading-equalizer-attribute-filter-config-wrap" },
            React.createElement(LoadingSpinner, { className: "large gd-loading-equalizer-spinner", color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c9 })));
    }
    if (!filterRef || !connectingAttributes || !attributes) {
        return null;
    }
    return (React.createElement("div", { className: "s-attribute-filter-dropdown-configuration attribute-filter-dropdown-configuration sdk-edit-mode-on" },
        React.createElement(ConfigurationPanelHeader, null),
        React.createElement(AttributeTitleRenaming, { categoryTitle: titleText, resetTitleText: resetTitleText, onClick: onTitleReset, onChange: onTitleUpdate, showResetTitle: showResetTitle, attributeTitle: title !== null && title !== void 0 ? title : defaultAttributeFilterTitle }),
        React.createElement(SelectionMode, { selectionTitleText: selectionTitleText, multiSelectionOptionText: multiSelectionOptionText, singleSelectionOptionText: singleSelectionOptionText, singleSelectionDisabledTooltip: singleSelectionDisabledTooltip, selectionMode: selectionMode, onSelectionModeChange: onSelectionModeUpdate, disabled: parentsSelected() }),
        isDependentFiltersEnabled && parents.length > 0 ? (React.createElement(ConfigurationCategory, { categoryTitle: filterByText })) : null,
        React.createElement(ParentFiltersList, { currentFilterLocalId: currentFilter.attributeFilter.localIdentifier, parents: parents, setParents: onParentSelect, onConnectingAttributeChanged: onConnectingAttributeChanged, connectingAttributes: connectingAttributes, attributes: attributes, disabled: selectionMode === "single", disabledTooltip: parentFiltersDisabledTooltip }),
        showDisplayFormPicker ? (React.createElement("div", { className: "s-display-form-configuration" },
            React.createElement(ConfigurationCategory, { categoryTitle: displayValuesAsText }),
            React.createElement("div", { className: "configuration-panel-body" },
                React.createElement(AttributeDisplayFormsDropdown, { displayForms: filterDisplayForms.availableDisplayForms, selectedDisplayForm: filterDisplayForms.selectedDisplayForm, onChange: onDisplayFormSelect })))) : null));
};
//# sourceMappingURL=AttributeFilterConfiguration.js.map