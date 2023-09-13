// (C) 2007-2023 GoodData Corporation
import React, { useMemo } from "react";
import { Col, Row } from "react-grid-system";
import reverse from "lodash/fp/reverse.js";
import { HeightResizerHotspot, useIsDraggingWidget } from "../../dragAndDrop/index.js";
import { DashboardLayoutItem } from "./DashboardLayoutItem.js";
const defaultItemKeyGetter = ({ item }) => item.index().toString();
export function DashboardLayoutGridRowEdit(props) {
    const { section, itemKeyGetter = defaultItemKeyGetter, gridRowRenderer, itemRenderer, widgetRenderer, getLayoutDimensions, screen, items, renderMode, itemsInRowsByIndex, } = props;
    const isDraggingWidget = useIsDraggingWidget();
    const rowItems = useMemo(() => items.map((item) => (React.createElement(DashboardLayoutItem, { key: itemKeyGetter({ item, screen }), item: item, itemRenderer: itemRenderer, widgetRenderer: widgetRenderer, screen: screen }))), [itemKeyGetter, itemRenderer, items, screen, widgetRenderer]);
    const extendedRows = useMemo(() => isDraggingWidget
        ? rowItems
        : reverse(itemsInRowsByIndex).reduce((acc, [index, itemsInRow]) => {
            return splice(acc, index + 1, 0, React.createElement(Col, { xl: 12, key: `HeightResizerHotspot-${index}`, style: { minHeight: 0 } },
                React.createElement(HeightResizerHotspot, { key: `HeightResizerHotspot-${index}`, screen: screen, getLayoutDimensions: getLayoutDimensions, section: section, items: itemsInRow })));
        }, rowItems), [isDraggingWidget, rowItems, itemsInRowsByIndex, screen, getLayoutDimensions, section]);
    return (React.createElement(Row, { className: "gd-fluidlayout-row s-gd-fluid-layout-row" }, gridRowRenderer
        ? gridRowRenderer({
            children: extendedRows,
            screen,
            section,
            items,
            renderMode,
        })
        : extendedRows));
}
function splice(arr, start, deleteCount, ...addItem) {
    const result = [];
    if (start > 0) {
        result.push(...arr.slice(0, start));
    }
    result.push(...addItem);
    const len = result.length - addItem.length;
    const count = deleteCount <= 0 ? len : len + deleteCount;
    if (arr[count]) {
        result.push(...arr.slice(count));
    }
    return result;
}
//# sourceMappingURL=DashboardLayoutGridRowEdit.js.map