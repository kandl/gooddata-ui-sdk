// (C) 2007-2022 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { InvertableSelectLimitWarning } from "./InvertableSelectLimitWarning.js";
/**
 * @internal
 */
export function InvertableSelectStatusBar(props) {
    const { className, selectedItems, getItemTitle, isInverted, selectedItemsLimit } = props;
    const intl = useIntl();
    const isSelectionEmpty = selectedItems.length === 0;
    const isAll = isSelectionEmpty && isInverted;
    const isNone = isSelectionEmpty && !isInverted;
    const isAllExcept = !isSelectionEmpty && isInverted;
    const selectionString = useMemo(() => {
        return selectedItems.map((selectedItem) => getItemTitle(selectedItem)).join(", ");
    }, [selectedItems, getItemTitle]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: cx([className, "gd-invertable-select-selection-status", "s-list-status-bar"]) },
            React.createElement("span", null,
                "\u00A0",
                intl.formatMessage({ id: "gs.list.is" }),
                "\u00A0"),
            isAll ? React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" })) : null,
            isNone ? React.createElement("b", null, intl.formatMessage({ id: "gs.filterLabel.none" })) : null,
            isAllExcept ? (React.createElement("span", null,
                React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" })),
                "\u00A0",
                intl.formatMessage({ id: "gs.list.except" }),
                "\u00A0")) : null,
            !isAll && !isSelectionEmpty ? (React.createElement(React.Fragment, null,
                React.createElement("span", { className: "gd-shortened-text gd-selection-list s-dropdown-attribute-selection-list", title: selectionString }, selectionString),
                `\xa0(${selectedItems.length})`)) : null),
        selectedItems.length >= selectedItemsLimit ? (React.createElement(InvertableSelectLimitWarning, { limit: selectedItemsLimit, selectedItemsCount: selectedItems.length })) : null));
}
//# sourceMappingURL=InvertableSelectStatusBar.js.map