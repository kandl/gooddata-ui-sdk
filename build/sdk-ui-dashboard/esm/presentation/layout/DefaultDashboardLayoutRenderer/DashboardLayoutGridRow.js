import React from "react";
import { Row } from "react-grid-system";
import { DashboardLayoutItem } from "./DashboardLayoutItem.js";
const defaultItemKeyGetter = ({ item }) => item.index().toString();
export function DashboardLayoutGridRow(props) {
    const { section, itemKeyGetter = defaultItemKeyGetter, gridRowRenderer, itemRenderer, widgetRenderer, screen, items, renderMode, } = props;
    const rowItems = items.map((item) => (React.createElement(DashboardLayoutItem, { key: itemKeyGetter({ item, screen }), item: item, itemRenderer: itemRenderer, widgetRenderer: widgetRenderer, screen: screen })));
    return (React.createElement(Row, { className: "gd-fluidlayout-row s-gd-fluid-layout-row" }, gridRowRenderer
        ? gridRowRenderer({
            children: rowItems,
            screen,
            section,
            items,
            renderMode,
        })
        : rowItems));
}
//# sourceMappingURL=DashboardLayoutGridRow.js.map