// (C) 2022 GoodData Corporation
import React from "react";
import { DraggableCreatePanelItem } from "../DraggableCreatePanelItem.js";
const dragItem = {
    type: "attributeFilter-placeholder",
};
/**
 * @internal
 */
export const DraggableAttributeFilterCreatePanelItem = ({ CreatePanelItemComponent, WrapCreatePanelItemWithDragComponent, disabled }) => {
    return (React.createElement(DraggableCreatePanelItem, { Component: CreatePanelItemComponent, WrapCreatePanelItemWithDragComponent: WrapCreatePanelItemWithDragComponent, dragItem: dragItem, disabled: disabled, hideDefaultPreview: false }));
};
//# sourceMappingURL=DraggableAttributeFilterCreatePanelItem.js.map