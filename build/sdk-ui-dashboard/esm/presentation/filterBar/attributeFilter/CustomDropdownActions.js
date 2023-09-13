// (C) 2019-2023 GoodData Corporation
import React from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { AttributeFilterConfigurationButton, AttributeFilterDeleteButton } from "@gooddata/sdk-ui-filters";
import { areObjRefsEqual, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { selectAllCatalogAttributesMap, selectAttributeFilterDisplayFormsMap, selectIsDeleteFilterButtonEnabled, selectIsInEditMode, useDashboardSelector, } from "../../../model/index.js";
function useIsConfigButtonVisible(filterDisplayFormRef, attributes) {
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const dfMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const filterDisplayForm = dfMap.get(filterDisplayFormRef);
    invariant(filterDisplayForm);
    const attributesMap = useDashboardSelector(selectAllCatalogAttributesMap);
    if (!attributes) {
        return false;
    }
    const attributeByDisplayForm = attributes === null || attributes === void 0 ? void 0 : attributes.find((attribute) => areObjRefsEqual(attribute.ref, filterDisplayForm.attribute));
    const filterAttribute = attributesMap.get(filterDisplayForm.attribute) || attributeByDisplayForm;
    invariant(filterAttribute);
    return isEditMode;
}
/**
 * @internal
 */
export const CustomAttributeFilterDropdownActions = ({ isApplyDisabled, onApplyButtonClick, onCancelButtonClick, onConfigurationButtonClick, onDeleteButtonClick, cancelText, applyText, filterDisplayFormRef, attributes, filterSelectionMode, }) => {
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const isDeleteButtonEnabled = useDashboardSelector(selectIsDeleteFilterButtonEnabled);
    const isConfigButtonVisible = useIsConfigButtonVisible(filterDisplayFormRef, attributes);
    const isSingleSelect = filterSelectionMode === "single";
    if (!isEditMode && isSingleSelect) {
        return null;
    }
    return (React.createElement("div", { className: "gd-attribute-filter-dropdown-actions__next" },
        React.createElement("div", { className: "gd-attribute-filter-dropdown-actions-left-content__next" },
            isEditMode && isDeleteButtonEnabled ? (React.createElement(React.Fragment, null,
                React.createElement(AttributeFilterDeleteButton, { onDelete: onDeleteButtonClick }),
                React.createElement("div", { className: "gd-button-separator" }))) : null,
            isConfigButtonVisible ? (React.createElement(AttributeFilterConfigurationButton, { onConfiguration: onConfigurationButtonClick })) : null),
        !isSingleSelect ? (React.createElement("div", { className: "gd-attribute-filter-dropdown-actions-right-content__next" },
            React.createElement(Button, { className: "gd-attribute-filter-cancel-button__next gd-button-secondary gd-button-small cancel-button s-cancel", onClick: onCancelButtonClick, value: cancelText, title: cancelText }),
            React.createElement(Button, { disabled: isApplyDisabled, className: "gd-attribute-filter-apply-button__next gd-button-action gd-button-small s-apply", onClick: onApplyButtonClick, value: applyText, title: applyText }))) : null));
};
/**
 * @internal
 */
export const CustomConfigureAttributeFilterDropdownActions = ({ isSaveDisabled, onSaveButtonClick, onCancelButtonClick, cancelText, saveText }) => {
    return (React.createElement("div", { className: "gd-attribute-filter-dropdown-actions__next" },
        React.createElement("div", { className: "gd-attribute-filter-dropdown-actions-left-content__next" }),
        React.createElement("div", { className: "gd-attribute-filter-dropdown-actions-right-content__next" },
            React.createElement(Button, { className: "gd-attribute-filter-cancel-button__next gd-button-secondary gd-button-small cancel-button s-cancel", onClick: onCancelButtonClick, value: cancelText, title: cancelText }),
            React.createElement(Button, { disabled: isSaveDisabled, className: "gd-attribute-filter-apply-button__next gd-button-action gd-button-small s-apply", onClick: onSaveButtonClick, value: saveText, title: saveText }))));
};
//# sourceMappingURL=CustomDropdownActions.js.map