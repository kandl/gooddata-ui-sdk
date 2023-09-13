// (C) 2007-2022 GoodData Corporation
import React from "react";
import { DashboardLayoutItemRenderer } from "./DashboardLayoutItemRenderer.js";
import { DashboardLayoutWidgetRenderer } from "./DashboardLayoutWidgetRenderer.js";
const defaultItemRenderer = (props) => (React.createElement(DashboardLayoutItemRenderer, Object.assign({}, props)));
export function DashboardLayoutItem(props) {
    const { item, itemRenderer = defaultItemRenderer, widgetRenderer, screen } = props;
    const renderProps = {
        item,
        screen,
        DefaultWidgetRenderer: DashboardLayoutWidgetRenderer,
    };
    return itemRenderer(Object.assign(Object.assign({}, props), { DefaultItemRenderer: DashboardLayoutItemRenderer, children: widgetRenderer(renderProps) }));
}
//# sourceMappingURL=DashboardLayoutItem.js.map