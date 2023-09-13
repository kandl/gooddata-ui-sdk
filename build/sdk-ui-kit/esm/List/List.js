// (C) 2007-2022 GoodData Corporation
import React, { useEffect, useCallback, useMemo } from "react";
import { Table, Column, Cell } from "fixed-data-table-2";
import cx from "classnames";
// it configures max number of records due to
// inefficiency with virtual memory allocation
// that causes application crash (TNT-787)
const MAX_NUMBER_OF_ROWS = 1000000;
const BORDER_HEIGHT = 1;
const HALF_ROW = 0.5;
export const MAX_VISIBLE_ITEMS_COUNT = 10;
export const DEFAULT_ITEM_HEIGHT = 28;
/**
 * @internal
 */
export function List(props) {
    const { className = "", compensateBorder = true, width = 200, height, items = [], itemsCount = items.length, itemHeight = DEFAULT_ITEM_HEIGHT, itemHeightGetter = null, maxVisibleItemsCount = MAX_VISIBLE_ITEMS_COUNT, renderItem, onScrollStart, onScrollEnd, scrollToItem, } = props;
    const currentItemsCount = itemsCount > maxVisibleItemsCount ? maxVisibleItemsCount + HALF_ROW : itemsCount;
    const listHeight = height || currentItemsCount * itemHeight;
    const scrollToItemRowIndex = useMemo(() => {
        if (!scrollToItem) {
            return undefined;
        }
        return items.indexOf(scrollToItem) + 1;
    }, [items, scrollToItem]);
    const getVisibleScrollRange = useCallback((scrollY) => {
        const rowIndex = Math.floor(scrollY / itemHeight);
        const visibleRange = Math.ceil(listHeight / itemHeight);
        return [rowIndex, rowIndex + visibleRange];
    }, [itemHeight, listHeight]);
    const handleScrollStart = useCallback((_, y) => {
        if (onScrollStart) {
            const [startIndex, endIndex] = getVisibleScrollRange(y);
            onScrollStart(startIndex, endIndex);
        }
    }, [onScrollStart, getVisibleScrollRange]);
    const handleScrollEnd = useCallback((_, y) => {
        if (onScrollEnd) {
            const [startIndex, endIndex] = getVisibleScrollRange(y);
            onScrollEnd(startIndex, endIndex);
        }
    }, [onScrollEnd, getVisibleScrollRange]);
    useEffect(() => {
        return () => {
            enablePageScrolling();
        };
    }, []);
    const styles = useMemo(() => {
        return {
            width,
        };
    }, [width]);
    return (React.createElement("div", { role: "list", className: cx("gd-list gd-infinite-list", className), style: styles, onMouseOver: disablePageScrolling, onMouseOut: enablePageScrolling },
        React.createElement(Table, { width: width, 
            // compensates for https://github.com/facebook/fixed-data-table/blob/5373535d98b08b270edd84d7ce12833a4478c6b6/src/FixedDataTableNew.react.js#L872
            height: compensateBorder ? listHeight + BORDER_HEIGHT * 2 : listHeight, headerHeight: 0, rowHeight: itemHeight, rowHeightGetter: itemHeightGetter, rowsCount: Math.min(itemsCount, MAX_NUMBER_OF_ROWS), onScrollStart: handleScrollStart, onScrollEnd: handleScrollEnd, scrollToRow: scrollToItemRowIndex, touchScrollEnabled: isTouchDevice() },
            React.createElement(Column, { flexGrow: 1, width: 1, cell: ({ columnKey, height, width, rowIndex, }) => {
                    const item = items[rowIndex];
                    return (React.createElement(Cell, { width: width, height: height, rowIndex: rowIndex, columnKey: columnKey }, renderItem({
                        rowIndex,
                        item,
                        width,
                        height,
                        isFirst: rowIndex === 0,
                        isLast: rowIndex === itemsCount - 1,
                    })));
                } }))));
}
function preventDefault(e) {
    e.preventDefault();
}
function isTouchDevice() {
    return "ontouchstart" in document.documentElement;
}
function disablePageScrolling() {
    document.body.addEventListener("wheel", preventDefault, { passive: false });
}
function enablePageScrolling() {
    document.body.removeEventListener("wheel", preventDefault);
}
//# sourceMappingURL=List.js.map