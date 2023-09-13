// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { DashboardLayoutSectionBorder, useIsDraggingWidget, } from "../../dragAndDrop/index.js";
import { selectActiveSectionIndex, useDashboardSelector } from "../../../model/index.js";
const isHiddenStyle = { height: 0, width: 0, overflow: "hidden", flex: 0 };
const defaultStyle = {};
function useBorderStatus(sectionIndex) {
    const activeSectionIndex = useDashboardSelector(selectActiveSectionIndex);
    const isDraggingWidget = useIsDraggingWidget();
    if (isDraggingWidget) {
        return "muted";
    }
    const isActive = activeSectionIndex === sectionIndex;
    return !isActive ? "invisible" : "muted";
}
export const EditableDashboardLayoutSectionRenderer = (props) => {
    const { children, className, debug, isHidden, section } = props;
    const style = isHidden ? isHiddenStyle : defaultStyle;
    const status = useBorderStatus(section.index());
    return (React.createElement("div", { className: cx(["gd-fluidlayout-row", "s-fluid-layout-row", className], {
            "gd-fluidlayout-row-debug": debug,
        }), style: style },
        React.createElement(DashboardLayoutSectionBorder, { status: status }, children)));
};
//# sourceMappingURL=EditableDashboardLayoutSectionRenderer.js.map