// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import { useIntl } from "react-intl";
/**
 * @internal
 */
export function InvertableSelectAllCheckbox(props) {
    const { isVisible, checked, onToggle, isFiltered, totalItemsCount, isPartialSelection } = props;
    const intl = useIntl();
    const handleToggle = useCallback((_e) => {
        onToggle();
    }, [onToggle]);
    const checkboxClasses = cx("input-checkbox", "gd-checkbox-selection", {
        "checkbox-indefinite": isPartialSelection,
    });
    const labelClasses = cx("input-checkbox-label", "s-select-all-checkbox");
    if (!isVisible) {
        return null;
    }
    return (React.createElement("div", { className: "gd-invertable-select-all-checkbox" },
        React.createElement("label", { className: labelClasses },
            React.createElement("input", { readOnly: true, type: "checkbox", className: checkboxClasses, checked: checked, onChange: handleToggle }),
            React.createElement("span", { className: "input-label-text" },
                React.createElement("span", { className: cx("gd-list-all-checkbox", { "gd-list-all-checkbox-checked": checked }) },
                    intl.formatMessage({ id: "gs.list.all" }),
                    isFiltered
                        ? ` ${intl.formatMessage({
                            id: "gs.list.searchResults",
                        })}`
                        : null),
                React.createElement("span", { className: "gd-list-actions-selection-size s-list-search-selection-size" }, `(${totalItemsCount})`)))));
}
//# sourceMappingURL=InvertableSelectAllCheckbox.js.map