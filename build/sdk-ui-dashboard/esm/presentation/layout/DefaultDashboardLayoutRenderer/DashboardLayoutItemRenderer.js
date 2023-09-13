// (C) 2007-2023 GoodData Corporation
import cx from "classnames";
import React from "react";
import { RowEndHotspot, WidgetDropZoneColumn, useIsDraggingCurrentItem } from "../../dragAndDrop/index.js";
import { DashboardLayoutItemViewRenderer } from "./DashboardLayoutItemViewRenderer.js";
import { renderModeAware } from "../../componentDefinition/index.js";
import { isCustomWidgetBase } from "../../../model/index.js";
function getLayoutCoordinates(item) {
    var _a;
    return {
        sectionIndex: (_a = item.section()) === null || _a === void 0 ? void 0 : _a.index(),
        itemIndex: item.index(),
    };
}
const DashboardLayoutItemEditRenderer = (props) => {
    const { item, screen, children } = props;
    const { sectionIndex, itemIndex } = getLayoutCoordinates(item);
    const isDraggingCurrentItem = useIsDraggingCurrentItem(sectionIndex, itemIndex);
    const isCustomWidget = isCustomWidgetBase(item.widget());
    return (React.createElement(React.Fragment, null,
        isCustomWidget ? null : (React.createElement(WidgetDropZoneColumn, { screen: screen, sectionIndex: sectionIndex, itemIndex: itemIndex })),
        React.createElement(DashboardLayoutItemViewRenderer, Object.assign({}, props, { className: cx({
                "current-dragging-item": isDraggingCurrentItem,
            }) }), children),
        isCustomWidget ? null : React.createElement(RowEndHotspot, { item: item, screen: screen })));
};
/**
 * @internal
 */
export const DashboardLayoutItemRenderer = renderModeAware({
    view: DashboardLayoutItemViewRenderer,
    edit: DashboardLayoutItemEditRenderer,
});
//# sourceMappingURL=DashboardLayoutItemRenderer.js.map