// (C) 2007-2022 GoodData Corporation
import React from "react";
import { IDashboardLayoutSectionRenderer } from "./interfaces";
import cx from "classnames";
import { DashboardLayoutSectionBorder } from "../../dragAndDrop/draggableWidget/DashboardLayoutSectionBorder";
import { DashboardLayoutSectionBorderStatus } from "../../dragAndDrop/draggableWidget/DashboardLayoutSectionBorder/types";
import { selectActiveSectionIndex, selectIsDraggingWidget, useDashboardSelector } from "../../../model";
import { RenderMode } from "../../../types";

const isHiddenStyle = { height: 0, width: 0, overflow: "hidden", flex: 0 };
const defaultStyle = {};

function useBorderStatus(renderMode: RenderMode, sectionIndex: number): DashboardLayoutSectionBorderStatus {
    const isDraggingWidget = useDashboardSelector(selectIsDraggingWidget);
    const activeSectionIndex = useDashboardSelector(selectActiveSectionIndex);
    const isActive = activeSectionIndex === sectionIndex;

    if ((!isDraggingWidget && !isActive) || renderMode === "view") {
        return "invisible";
    }

    return "muted";
}

export const DashboardLayoutSectionRenderer: IDashboardLayoutSectionRenderer<unknown> = (props) => {
    const { children, className, debug, isHidden, renderMode, section } = props;

    const style = isHidden ? isHiddenStyle : defaultStyle;
    const status = useBorderStatus(renderMode, section.index());

    return (
        <div
            className={cx(["gd-fluidlayout-row", "s-fluid-layout-row", className], {
                "gd-fluidlayout-row-debug": debug,
            })}
            style={style}
        >
            <DashboardLayoutSectionBorder status={status}>{children}</DashboardLayoutSectionBorder>
        </div>
    );
};
