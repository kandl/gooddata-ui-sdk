// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import { Table, Column, Cell } from "fixed-data-table-2";
import cx from "classnames";
import noop from "lodash/noop.js";
const BORDER_HEIGHT = 1;
// it configures max number of records due to
// inefficiency with virtual memory allocation
// that causes application crash (TNT-787)
const MAX_NUMBER_OF_ROWS = 1000000;
const preventDefault = (e) => e.preventDefault();
function isTouchDevice() {
    return "ontouchstart" in document.documentElement;
}
/**
 * @deprecated  This component is deprecated use List instead
 * @internal
 */
class LegacyList extends Component {
    constructor(props) {
        super(props);
        this.onSelect = (_event, rowIndex) => {
            const { dataSource, onSelect } = this.props;
            const item = dataSource.getObjectAt(rowIndex);
            if (item) {
                onSelect(item);
            }
        };
        this.onScrollStart = (_scrollX, scrollY) => {
            this.onScroll(this.props.onScrollStart, scrollY);
        };
        this.onScrollEnd = (_scrollX, scrollY) => {
            this.onScroll(this.props.onScroll, scrollY);
        };
        this.renderCell = (props) => {
            const { dataSource, rowItem } = this.props;
            const item = dataSource.getObjectAt(props.rowIndex);
            const itemElement = React.cloneElement(rowItem, Object.assign(Object.assign({}, (item ? { item } : {})), { width: this.props.width, isFirst: props.rowIndex === 0, isLast: props.rowIndex === dataSource.rowsCount - 1 }));
            return React.createElement(Cell, Object.assign({}, props), itemElement);
        };
        this.state = {
            selected: null,
        };
    }
    componentDidMount() {
        const { scrollToSelected, dataSource } = this.props;
        if (scrollToSelected) {
            [...Array(dataSource.rowsCount).keys()].forEach((row) => {
                const item = this.props.dataSource.getObjectAt(row);
                if (item === null || item === void 0 ? void 0 : item.selected) {
                    // Because list items start from 0 we need to add the +1 here
                    this.setState({ selected: row + 1 });
                }
            });
        }
    }
    componentWillUnmount() {
        this.enablePageScrolling();
    }
    onScroll(method, scrollY) {
        if (method) {
            const { height, itemHeight } = this.props;
            // vertical scroll position returned by fixed-data-table is converted to index of first visible item
            const rowIndex = Math.floor(scrollY / itemHeight);
            const visibleRange = Math.ceil(height / itemHeight);
            method(rowIndex, rowIndex + visibleRange);
        }
    }
    getClassNames() {
        return cx("gd-infinite-list", this.props.className);
    }
    disablePageScrolling() {
        document.body.addEventListener("wheel", preventDefault, { passive: false });
    }
    enablePageScrolling() {
        document.body.removeEventListener("wheel", preventDefault);
    }
    render() {
        const { width, height, itemHeight, dataSource, itemHeightGetter } = this.props;
        const { selected } = this.state;
        // compensates for https://github.com/facebook/fixed-data-table/blob/5373535d98b08b270edd84d7ce12833a4478c6b6/src/FixedDataTableNew.react.js#L872
        const compensatedHeight = this.props.compensateBorder ? height + BORDER_HEIGHT * 2 : height;
        return (React.createElement("div", { className: this.getClassNames(), onMouseOver: this.disablePageScrolling, onMouseOut: this.enablePageScrolling },
            React.createElement(Table, { width: width, height: compensatedHeight, rowHeight: itemHeight, rowHeightGetter: itemHeightGetter, headerHeight: 0, rowsCount: Math.min(dataSource.rowsCount, MAX_NUMBER_OF_ROWS), onRowClick: this.onSelect, onScrollStart: this.onScrollStart, onScrollEnd: this.onScrollEnd, touchScrollEnabled: isTouchDevice(), scrollToRow: selected },
                React.createElement(Column, { flexGrow: 1, width: 1, cell: this.renderCell }))));
    }
}
LegacyList.defaultProps = {
    className: "",
    onScroll: noop,
    onScrollStart: noop,
    onSelect: noop,
    width: 200,
    height: 300,
    itemHeight: 28,
    itemHeightGetter: null,
    compensateBorder: true,
    scrollToSelected: false,
};
export { LegacyList };
//# sourceMappingURL=LegacyList.js.map