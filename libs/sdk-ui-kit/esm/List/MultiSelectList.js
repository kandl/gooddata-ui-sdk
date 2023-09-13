// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { List } from "./List.js";
import { Button } from "../Button/index.js";
import { FlexDimensions } from "../FlexDimensions/index.js";
class MultiSelectListCore extends Component {
    constructor() {
        super(...arguments);
        this.onActionCheckboxChange = () => {
            const { onSelectAll, onSelectNone, isInverted, isSearching } = this.props;
            if (this.isAllSelected() ||
                (!isInverted && isSearching && this.isIndefiniteSelection && !this.isEmpty())) {
                return onSelectNone();
            }
            return onSelectAll();
        };
        this.getSelectionString = (selection) => {
            const { intl } = this.props;
            if (!selection.length) {
                return "";
            }
            return selection
                .map((item) => {
                if (Object.prototype.hasOwnProperty.call(item, "available") && !item.available) {
                    return intl.formatMessage({ id: "gs.list.notAvailableAbbreviation" });
                }
                return item.title || `(${intl.formatMessage({ id: "empty_value" })})`;
            })
                .join(", ");
        };
        this.isEmpty = () => {
            const { selectedItems, itemsCount, isInverted, isSearching, items, isSelected } = this.props;
            if (selectedItems.length === 0) {
                return !isInverted;
            }
            if (isSearching) {
                return items.every((item) => !isSelected(item));
            }
            return ((selectedItems.length === 0 && !isInverted) || (selectedItems.length === itemsCount && isInverted));
        };
        this.isIndefiniteSelection = () => {
            const { selectedItems, isSearching, items, isSelected, filteredItemsCount } = this.props;
            if (selectedItems.length === 0) {
                return false;
            }
            if (isSearching) {
                const selectedItems = items.filter((item) => isSelected(item));
                const selectedItemsCount = selectedItems.length;
                return selectedItemsCount !== 0 && selectedItemsCount !== filteredItemsCount;
            }
            return true;
        };
        this.isAllSelected = () => {
            const { itemsCount, isInverted, isSearching, items, isSelected, selectedItems } = this.props;
            if (isSearching) {
                const selectedItemsCount = items.filter((item) => isSelected(item)).length;
                const totalItemsCount = items.filter((item) => item !== null).length;
                return selectedItemsCount === totalItemsCount;
            }
            return isInverted ? selectedItems.length === 0 : selectedItems.length === itemsCount;
        };
        this.renderSearchResultsLength = () => {
            const { itemsCount, isSearching, intl } = this.props;
            if (isSearching && itemsCount > 0) {
                return (React.createElement("span", { className: "gd-list-actions-selection-size s-list-search-selection-size" },
                    intl.formatMessage({ id: "gs.list.searchResults" }),
                    " (",
                    itemsCount,
                    ")"));
            }
            return null;
        };
        this.renderActions = () => {
            const { selectAllCheckbox, intl } = this.props;
            if (selectAllCheckbox) {
                const checkboxClasses = cx("input-checkbox", "gd-checkbox-selection", {
                    "checkbox-indefinite": this.isIndefiniteSelection(),
                });
                const labelClasses = cx("input-checkbox-label", "s-select-all-checkbox");
                const checkbox = (React.createElement("label", { className: labelClasses },
                    React.createElement("input", { readOnly: true, type: "checkbox", className: checkboxClasses, checked: !this.isEmpty(), onChange: this.onActionCheckboxChange }),
                    React.createElement("span", { className: "input-label-text" }, intl.formatMessage({ id: "gs.list.all" }))));
                return (React.createElement("div", { className: "gd-list-actions gd-list-actions-invertable" },
                    checkbox,
                    this.renderSearchResultsLength()));
            }
            return (React.createElement("div", { className: "gd-list-actions" },
                React.createElement(Button, { className: "gd-button-link", tagName: "a", onClick: this.props.onSelectAll, value: intl.formatMessage({ id: "gs.list.selectAll" }) }),
                React.createElement(Button, { className: "gd-button-link", tagName: "a", onClick: this.props.onSelectNone, value: intl.formatMessage({ id: "gs.list.clear" }) })));
        };
        this.renderStatusBar = () => {
            const { selectAllCheckbox, selectedItems, isInverted, tagName, intl } = this.props;
            if (!selectAllCheckbox) {
                return null;
            }
            const attributeName = (React.createElement("span", { className: "gd-shortened-text gd-attribute-name s-dropdown-attribute-filter-name", title: tagName }, tagName));
            const selectionItemsStr = this.getSelectionString(selectedItems);
            const isSelectionEmpty = selectedItems.length === 0;
            const invertedInfo = !isSelectionEmpty && isInverted ? (React.createElement("span", null,
                React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" })),
                "\u00A0",
                intl.formatMessage({ id: "gs.list.except" }),
                "\u00A0")) : null;
            const selectionList = !isSelectionEmpty ? (React.createElement("span", { className: "gd-shortened-text gd-selection-list s-dropdown-attribute-selection-list", title: selectionItemsStr }, `${selectionItemsStr}`)) : null;
            const selectionLengthInfo = selectedItems.length > 1 ? `\xa0(${selectedItems.length})` : null;
            const is = React.createElement("span", null,
                "\u00A0",
                intl.formatMessage({ id: "gs.list.is" }),
                "\u00A0");
            const allOrNone = isSelectionEmpty &&
                (!isInverted ? (`(${intl.formatMessage({ id: "gs.filterLabel.none" })})`) : (React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" }))));
            return (React.createElement("div", { className: "gd-list-status-bar s-list-status-bar" },
                attributeName,
                is,
                allOrNone,
                invertedInfo,
                selectionList,
                selectionLengthInfo));
        };
    }
    render() {
        const { isMobile, width, height, items, itemHeight, itemsCount, onScrollEnd, renderItem, selectedItems, listClassNames, } = this.props;
        const classNames = cx("is-multiselect", listClassNames ? listClassNames : "");
        return (React.createElement("div", { className: "gd-flex-item-stretch-mobile gd-flex-row-container-mobile" },
            this.renderActions(),
            React.createElement(FlexDimensions, { measureHeight: isMobile, measureWidth: isMobile || !width, className: "gd-flex-item-stretch-mobile" },
                React.createElement(List, { className: classNames, width: width, height: height, items: items, itemHeight: itemHeight, itemsCount: itemsCount, renderItem: ({ item }) => {
                        return renderItem({
                            item,
                            isSelected: this.props.isSelected
                                ? this.props.isSelected(item)
                                : selectedItems.some((_item) => _item === item),
                        });
                    }, onScrollEnd: onScrollEnd, compensateBorder: !isMobile })),
            this.renderStatusBar()));
    }
}
/**
 * @internal
 */
export const MultiSelectList = injectIntl(MultiSelectListCore);
//# sourceMappingURL=MultiSelectList.js.map