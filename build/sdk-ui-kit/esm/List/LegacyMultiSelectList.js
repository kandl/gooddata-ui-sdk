// (C) 2020-2022 GoodData Corporation
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import noop from "lodash/noop.js";
import { Button } from "../Button/index.js";
import { LegacyList } from "./LegacyList.js";
import { LegacyListItem } from "./LegacyListItem.js";
import LegacyMultiSelectListItem from "./LegacyMultiSelectListItem.js";
import { guidFor } from "./guid.js";
import { FlexDimensions } from "../FlexDimensions/index.js";
/**
 * @deprecated  This component is deprecated use MultiSelectList
 * @internal
 */
class LegacyMultiSelectList extends Component {
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
    }
    getSelectableItems() {
        const { props } = this;
        return props.items.map((source) => ({
            source,
            onSelect: props.onSelect,
            onMouseOver: props.onItemMouseOver,
            onMouseOut: props.onItemMouseOut,
            onOnly: props.onSelectOnly,
            selected: props.isSelected(source),
            id: props.getItemKey(source),
        }));
    }
    getRowItem() {
        const { rowItem, listItemClass } = this.props;
        return rowItem || React.createElement(LegacyListItem, { listItemClass: listItemClass });
    }
    getSelectionString(selection) {
        const { intl } = this.props;
        if (!selection.length) {
            return "";
        }
        return selection
            .map((item) => {
            if (item.available !== undefined && !item.available) {
                return intl.formatMessage({ id: "gs.list.notAvailableAbbreviation" });
            }
            return item.title || `(${intl.formatMessage({ id: "empty_value" })})`;
        })
            .join(", ");
    }
    getDataSource() {
        const selectableItems = this.getSelectableItems();
        return {
            rowsCount: this.props.itemsCount || selectableItems.length,
            getObjectAt: (rowIndex) => selectableItems[rowIndex],
        };
    }
    isEmpty() {
        const { selection, itemsCount, isInverted, isSearching, items, isSelected } = this.props;
        if (selection.length === 0) {
            return !isInverted;
        }
        if (isSearching) {
            return items.every((item) => !isSelected(item));
        }
        return (selection.length === 0 && !isInverted) || (selection.length === itemsCount && isInverted);
    }
    isPositiveSelection() {
        const { isInverted, selection } = this.props;
        return selection.length > 0 && !isInverted;
    }
    isIndefiniteSelection() {
        const { selection, isSearching, items, isSelected, filteredItemsCount } = this.props;
        if (selection.length === 0) {
            return false;
        }
        if (isSearching) {
            const selectedItems = items.filter((item) => isSelected(item));
            const selectedItemsCount = selectedItems.length;
            return selectedItemsCount !== 0 && selectedItemsCount !== filteredItemsCount;
        }
        return true;
    }
    isAllSelected() {
        const { itemsCount, isInverted, isSearching, items, isSelected, selection } = this.props;
        if (isSearching) {
            const selectedItemsCount = items.filter((item) => isSelected(item)).length;
            const totalItemsCount = items.filter((item) => item !== null).length;
            return selectedItemsCount === totalItemsCount;
        }
        return isInverted ? selection.length === 0 : selection.length === itemsCount;
    }
    renderSearchResultsLength() {
        const { itemsCount, isSearching, intl } = this.props;
        if (isSearching && itemsCount > 0) {
            return (React.createElement("span", { className: "gd-list-actions-selection-size s-list-search-selection-size" },
                intl.formatMessage({ id: "gs.list.searchResults" }),
                " (",
                itemsCount,
                ")"));
        }
        return null;
    }
    renderActions() {
        const { selectAllCheckbox, intl } = this.props;
        if (selectAllCheckbox) {
            const checkboxClasses = cx("input-checkbox", "gd-checkbox-selection", {
                "checkbox-indefinite": this.isIndefiniteSelection(),
            });
            const labelClasses = cx("input-checkbox-label", "s-select-all-checkbox");
            const checkbox = (React.createElement("label", { role: "select-all-checkbox", className: labelClasses },
                React.createElement("input", { readOnly: true, type: "checkbox", className: checkboxClasses, checked: !this.isEmpty(), onChange: this.onActionCheckboxChange }),
                React.createElement("span", { className: "input-label-text" }, intl.formatMessage({ id: "gs.list.all" }))));
            return (React.createElement("div", { className: "gd-list-actions gd-list-actions-invertable" },
                checkbox,
                this.renderSearchResultsLength()));
        }
        return (React.createElement("div", { className: "gd-list-actions" },
            React.createElement(Button, { className: "gd-button-link", tagName: "a", onClick: this.props.onSelectAll, value: intl.formatMessage({ id: "gs.list.selectAll" }) }),
            React.createElement(Button, { className: "gd-button-link", tagName: "a", onClick: this.props.onSelectNone, value: intl.formatMessage({ id: "gs.list.clear" }) })));
    }
    renderStatusBar() {
        const { selectAllCheckbox, selection, isInverted, tagName, intl } = this.props;
        if (!selectAllCheckbox) {
            return null;
        }
        const attributeName = (React.createElement("span", { className: "gd-shortened-text gd-attribute-name s-dropdown-attribute-filter-name", title: tagName }, tagName));
        const selectionItemsStr = this.getSelectionString(selection);
        const isSelectionEmpty = selection.length === 0;
        const invertedInfo = !isSelectionEmpty && isInverted ? (React.createElement("span", null,
            React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" })),
            "\u00A0",
            intl.formatMessage({ id: "gs.list.except" }),
            "\u00A0")) : null;
        const selectionList = !isSelectionEmpty ? (React.createElement("span", { className: "gd-shortened-text gd-selection-list s-dropdown-attribute-selection-list", title: selectionItemsStr }, `${selectionItemsStr}`)) : null;
        const selectionLengthInfo = selection.length > 1 ? `\xa0(${selection.length})` : null;
        const is = React.createElement("span", null,
            "\u00A0",
            intl.formatMessage({ id: "gs.list.is" }),
            "\u00A0");
        const allOrNone = isSelectionEmpty &&
            (!isInverted ? (`(${intl.formatMessage({ id: "gs.filterLabel.none" })})`) : (React.createElement("b", null, intl.formatMessage({ id: "gs.list.all" }))));
        return (React.createElement("div", { role: "list-status-bar", className: "gd-list-status-bar s-list-status-bar" },
            attributeName,
            is,
            allOrNone,
            invertedInfo,
            selectionList,
            selectionLengthInfo));
    }
    render() {
        const { isMobile, width, height, itemHeight } = this.props;
        const rowItem = this.getRowItem();
        const dataSource = this.getDataSource();
        return (React.createElement("div", { className: "gd-flex-item-stretch-mobile gd-flex-row-container-mobile" },
            this.renderActions(),
            React.createElement(FlexDimensions, { measureHeight: isMobile, measureWidth: isMobile || !width, className: "gd-flex-item-stretch-mobile" },
                React.createElement(LegacyList, { className: "is-multiselect", width: width, height: height, itemHeight: itemHeight, dataSource: dataSource, rowItem: rowItem, onScroll: this.props.onRangeChange, compensateBorder: !isMobile })),
            this.renderStatusBar()));
    }
}
LegacyMultiSelectList.defaultProps = {
    isInverted: false,
    isSearching: false,
    selection: [],
    filtered: false,
    getItemKey: guidFor,
    isFiltered: false,
    isMobile: false,
    isSelected: () => false,
    listItemClass: LegacyMultiSelectListItem,
    maxSelectionSize: 500,
    filteredItemsCount: 0,
    onItemMouseOut: noop,
    onItemMouseOver: noop,
    onRangeChange: noop,
    onSelect: noop,
    onSelectAll: noop,
    onSelectNone: noop,
    onSelectOnly: noop,
    rowItem: null,
    selectAllCheckbox: false,
    tagName: "",
};
export { LegacyMultiSelectList };
/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectList instead
 */
const LegacyMultiSelectListWithIntl = injectIntl(LegacyMultiSelectList);
export default LegacyMultiSelectListWithIntl;
//# sourceMappingURL=LegacyMultiSelectList.js.map