// (C) 2022-2023 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { DropdownButton } from "@gooddata/sdk-ui-kit";
/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing just the attribute title.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of the related attribute filter.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export const AttributeFilterSimpleDropdownButton = (props) => {
    const { isOpen, title, isLoading, isFiltering, onClick } = props;
    const intl = useIntl();
    let buttonTitle = title;
    if (isLoading) {
        buttonTitle = intl.formatMessage({ id: "loading" });
    }
    else if (isFiltering) {
        buttonTitle = intl.formatMessage({ id: "filtering" });
    }
    return (React.createElement(DropdownButton, { className: "gd-attribute-filter-dropdown-simple-button__next", disabled: isLoading, isOpen: isOpen, value: buttonTitle, onClick: onClick }));
};
/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing the attribute title and selection.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of related attribute filter.
 * It displays state of selection and selection count.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export const AttributeFilterSimpleDropdownButtonWithSelection = (props) => {
    const { isOpen, subtitle, title, selectedItemsCount, onClick, isLoading, isFiltering, showSelectionCount = true, } = props;
    const intl = useIntl();
    let buttonTitle = `${title}: ${subtitle}`;
    if (isLoading || isFiltering) {
        buttonTitle = intl.formatMessage({ id: "loading" });
    }
    const buttonClassNames = cx("gd-button-primary", "button-dropdown", "dropdown-button", "gd-button-small", "gd-button", { "is-dropdown-open": isOpen }, { "is-active": isOpen });
    const icoClassNames = cx("gd-button-icon", { "gd-icon-navigateup": isOpen }, { "gd-icon-navigatedown": !isOpen });
    const selectionSize = showSelectionCount ? `(${selectedItemsCount})` : undefined;
    return (React.createElement("div", { className: "gd-attribute-filter-dropdown-simple-button__next" },
        React.createElement("button", { className: buttonClassNames, onClick: onClick, title: buttonTitle },
            React.createElement("span", { className: "gd-button-text" },
                React.createElement("div", { className: "gd-attribute-filter-dropdown-simple-button-text" },
                    React.createElement("div", { className: "gd-attribute-filter-dropdown-simple-button-selection" }, buttonTitle),
                    selectionSize ? (React.createElement("div", { className: "gd-attribute-filter-dropdown-simple-button-selection-count" }, selectionSize)) : null)),
            React.createElement("span", { className: icoClassNames, role: "button-icon" }))));
};
//# sourceMappingURL=AttributeFilterSimpleDropdownButton.js.map