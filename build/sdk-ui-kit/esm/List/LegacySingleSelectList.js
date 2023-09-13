// (C) 2007-2020 GoodData Corporation
import React, { Component } from "react";
import pick from "lodash/pick.js";
import cx from "classnames";
import noop from "lodash/noop.js";
import { LegacyList } from "./LegacyList.js";
import { LegacyListItem } from "./LegacyListItem.js";
import { LegacySingleSelectListItem } from "./LegacySingleSelectListItem.js";
import { guidFor } from "./guid.js";
/**
 * @internal
 * @deprecated This component is deprecated use SingleSelectList instead
 */
class LegacySingleSelectList extends Component {
    getSelectableItems() {
        const { props } = this;
        return props.items.map((source) => ({
            source,
            onSelect: props.onSelect,
            onMouseOver: props.onItemMouseOver,
            onMouseOut: props.onItemMouseOut,
            onMouseEnter: props.onItemMouseEnter,
            onMouseLeave: props.onItemMouseLeave,
            selected: source === props.selection,
            id: props.getItemKey(source),
        }));
    }
    getClassNames() {
        return cx("gd-list", this.props.className);
    }
    getRowItem() {
        const { rowItem, listItemClass } = this.props;
        return rowItem || React.createElement(LegacyListItem, { listItemClass: listItemClass });
    }
    getDataSource() {
        const selectableItems = this.getSelectableItems();
        return {
            rowsCount: this.props.itemsCount || selectableItems.length,
            getObjectAt: (rowIndex) => selectableItems[rowIndex],
        };
    }
    render() {
        const rowItem = this.getRowItem();
        const dataSource = this.getDataSource();
        return (React.createElement(LegacyList, Object.assign({ className: this.getClassNames() }, pick(this.props, ["width", "height", "itemHeight"]), { dataSource: dataSource, rowItem: rowItem, onScroll: this.props.onRangeChange, onScrollStart: this.props.onScrollStart, scrollToSelected: this.props.scrollToSelected })));
    }
}
LegacySingleSelectList.defaultProps = {
    className: "",
    getItemKey: guidFor,
    items: [],
    itemsCount: 0,
    listItemClass: LegacySingleSelectListItem,
    onItemMouseOut: noop,
    onItemMouseOver: noop,
    onItemMouseEnter: noop,
    onItemMouseLeave: noop,
    onRangeChange: noop,
    onScrollStart: noop,
    onSelect: noop,
    rowItem: null,
    scrollToSelected: false,
    selection: {},
};
export { LegacySingleSelectList };
//# sourceMappingURL=LegacySingleSelectList.js.map