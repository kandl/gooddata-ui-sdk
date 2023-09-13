// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import cx from "classnames";
import keyBy from "lodash/keyBy.js";
import values from "lodash/values.js";
import take from "lodash/take.js";
import has from "lodash/has.js";
import noop from "lodash/noop.js";
import { Input } from "../Form/index.js";
import LegacyMultiSelectList from "./LegacyMultiSelectList.js";
import LegacyMultiSelectListItem from "./LegacyMultiSelectListItem.js";
import { Message } from "../Messages/index.js";
import { guidFor } from "./guid.js";
const NoItemsFound = () => {
    return (React.createElement("div", { className: "gd-list-noResults s-list-no-results" },
        React.createElement(FormattedMessage, { id: "gs.list.noItemsFound" })));
};
const LoadingMessage = () => {
    return React.createElement("div", null, "...");
};
const LimitHitWarning = ({ limit, bounce }) => {
    const classes = cx("gd-list-limitExceeded", {
        "animation-fadeIn": bounce,
    });
    return (React.createElement(Message, { type: "warning", className: classes },
        React.createElement(FormattedMessage, { id: "gs.list.limitExceeded", values: { limit } })));
};
/**
 * @internal
 * @deprecated This component is deprecated use InvertableList instead
 */
class LegacyInvertableList extends Component {
    constructor(props) {
        super(props);
        this.onSelect = (item) => {
            const newSelection = this.toggleItemInSelection(item);
            if (newSelection.length <= this.props.maxSelectionSize) {
                this.notifyUpstreamOfSelectionChange(newSelection);
            }
            if (newSelection.length >= this.props.maxSelectionSize) {
                // Flash the limit exceeded info
                this.setState({
                    notifyLimitHit: true,
                });
                // remove the class that causes flashing animation
                setTimeout(() => {
                    this.setState({
                        notifyLimitHit: false,
                    });
                }, 1000);
            }
        };
        this.onSelectAll = () => {
            if (this.props.searchString) {
                if (this.props.isInverted) {
                    this.shrinkSelection();
                }
                else {
                    this.growSelection();
                }
            }
            else {
                this.props.onSelect([], true);
            }
        };
        this.onSelectNone = () => {
            if (this.props.searchString) {
                if (this.props.isInverted) {
                    this.growSelection();
                }
                else {
                    this.shrinkSelection();
                }
            }
            else {
                this.props.onSelect([], false);
            }
        };
        this.onSelectOnly = (item) => {
            this.props.onSelect([item], false);
        };
        // private onSearchChange(searchString: string) {
        //     this.props.onSearch(searchString);
        // }
        this.onRangeChange = (...args) => {
            this.props.onRangeChange(this.props.searchString, ...args);
        };
        this.state = {
            notifyLimitHit: false,
        };
    }
    /**
     * Remove selected visible items from selection.
     */
    shrinkSelection() {
        const { items, selection } = this.props;
        const visibleSelection = this.intersectItems(items, selection);
        const newSelection = this.subtractItems(selection, visibleSelection);
        this.notifyUpstreamOfSelectionChange(newSelection);
    }
    intersectItems(items, otherItems) {
        const otherItemsMap = this.indexByKey(otherItems);
        return items.filter((item) => {
            const itemKey = this.props.getItemKey(item);
            return !!otherItemsMap[itemKey];
        });
    }
    subtractItems(items, otherItems) {
        const otherItemsMap = this.indexByKey(otherItems);
        return items.filter((item) => {
            const itemKey = this.props.getItemKey(item);
            return !otherItemsMap[itemKey];
        });
    }
    indexByKey(items = []) {
        return keyBy(items, this.props.getItemKey);
    }
    toggleItemInSelection(item) {
        const selectionMap = this.indexByKey(this.props.selection);
        const itemKey = this.props.getItemKey(item);
        if (selectionMap[itemKey]) {
            delete selectionMap[itemKey];
        }
        else {
            selectionMap[itemKey] = item;
        }
        return values(selectionMap);
    }
    /**
     * Add unselected visible items to the selection until selection size limit is reached.
     */
    growSelection() {
        const { maxSelectionSize, items, selection } = this.props;
        const selectionSizeLeft = maxSelectionSize - selection.length;
        const selectableItems = this.subtractItems(items, selection);
        const itemsToSelect = take(selectableItems, selectionSizeLeft);
        const newSelection = [...selection, ...itemsToSelect];
        this.notifyUpstreamOfSelectionChange(newSelection);
    }
    /**
     * If change in selection happens to select all or unselect all items it is converted
     * to the respective empty selection.
     */
    notifyUpstreamOfSelectionChange(newSelection) {
        const { itemsCount, searchString } = this.props;
        let { isInverted } = this.props;
        let selection;
        const lastItemSelected = !isInverted && !searchString && newSelection.length === itemsCount;
        if (lastItemSelected) {
            selection = [];
            isInverted = !isInverted;
        }
        else {
            selection = newSelection;
        }
        this.props.onSelect(selection, isInverted);
    }
    isItemChecked(selectionMap, item) {
        const key = this.props.getItemKey(item);
        const itemInSelection = has(selectionMap, key);
        // in inverted mode selection lists unchecked items
        // in normal mode selection contains checked items
        return this.props.isInverted ? !itemInSelection : itemInSelection;
    }
    renderLimitHitWarning() {
        const { maxSelectionSize, selection } = this.props;
        const limitHit = selection.length >= maxSelectionSize;
        if (limitHit) {
            return (React.createElement(this.props.limitHitWarningClass, { limit: maxSelectionSize, bounce: this.state.notifyLimitHit }));
        }
        return null;
    }
    renderSearchField() {
        return this.props.showSearchField ? (React.createElement(Input, { autofocus: true, className: "gd-list-searchfield gd-flex-item-mobile s-attribute-filter-button-search-field", clearOnEsc: true, isSearch: true, isSmall: this.props.smallSearch, onChange: this.props.onSearch, placeholder: this.props.searchPlaceholder, value: this.props.searchString })) : null;
    }
    renderList() {
        return this.props.isLoading ? (this.renderLoading()) : (React.createElement("div", { className: "gd-flex-item-stretch-mobile gd-flex-row-container-mobile" },
            this.renderListOrNoItems(),
            this.renderLimitHitWarning()));
    }
    renderListOrNoItems() {
        const { items, searchString, filteredItemsCount, height, selection } = this.props;
        if (searchString && filteredItemsCount === 0) {
            return React.createElement(this.props.noItemsFoundClass, { height: height });
        }
        const selectionMap = this.indexByKey(selection);
        const isChecked = this.isItemChecked.bind(this, selectionMap);
        const listProps = Object.assign(Object.assign({}, this.props), { itemsCount: filteredItemsCount });
        return (React.createElement(LegacyMultiSelectList, Object.assign({}, listProps, { onSelect: this.onSelect, onSelectAll: this.onSelectAll, onSelectNone: this.onSelectNone, onSelectOnly: this.onSelectOnly, items: items, isSelected: isChecked, isSearching: !!searchString.length, listItemClass: this.props.listItemClass, onRangeChange: this.onRangeChange, tagName: this.props.tagName })));
    }
    renderLoading() {
        return React.createElement(this.props.isLoadingClass, { height: this.props.height });
    }
    render() {
        const { isMobile, className } = this.props;
        const classNames = cx(className, {
            "gd-flex-item-stretch-mobile": isMobile,
            "gd-flex-row-container-mobile": isMobile,
        });
        return (React.createElement("div", { className: classNames },
            this.renderSearchField(),
            this.renderList()));
    }
}
LegacyInvertableList.defaultProps = {
    actionsAsCheckboxes: false,
    className: undefined,
    getItemKey: guidFor,
    isInverted: true,
    isLoading: false,
    isLoadingClass: LoadingMessage,
    isMobile: false,
    limitHitWarningClass: injectIntl(LimitHitWarning),
    listItemClass: LegacyMultiSelectListItem,
    noItemsFound: false,
    noItemsFoundClass: injectIntl(NoItemsFound),
    onRangeChange: noop,
    onSelect: noop,
    searchPlaceholder: "",
    searchString: "",
    selection: [],
    showSearchField: true,
    smallSearch: false,
    tagName: "",
    selectAllCheckbox: false,
};
export { LegacyInvertableList };
/**
 * @internal
 * @deprecated This component is deprecated use InvertableList instead
 */
const LegacyInvertableListWithIntl = injectIntl(LegacyInvertableList);
export default LegacyInvertableListWithIntl;
//# sourceMappingURL=LegacyInvertableList.js.map