// (C) 2022 GoodData Corporation
import React from "react";
import { KPI_WIDGET_SIZE_INFO_DEFAULT } from "@gooddata/sdk-ui-ext";
import { DraggableCreatePanelItem } from "../DraggableCreatePanelItem.js";
const dragItem = {
    type: "kpi-placeholder",
    size: {
        gridHeight: KPI_WIDGET_SIZE_INFO_DEFAULT.height.default,
        gridWidth: KPI_WIDGET_SIZE_INFO_DEFAULT.width.default,
    },
};
/**
 * @internal
 */
export const DraggableKpiCreatePanelItem = ({ CreatePanelItemComponent, WrapCreatePanelItemWithDragComponent, disabled, }) => {
    return (React.createElement(DraggableCreatePanelItem, { Component: CreatePanelItemComponent, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, disabled: disabled, dragItem: dragItem, hideDefaultPreview: false }));
};
//# sourceMappingURL=DraggableKpiCreatePanelItem.js.map